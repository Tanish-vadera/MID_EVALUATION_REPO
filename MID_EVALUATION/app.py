import numpy as np
import pandas as pd
import os
import torch
import pickle as pkl
import streamlit as st  # Import Streamlit
from transformers import DistilBertTokenizer, DistilBertModel
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report


# Load pre-trained item embeddings and model
item_embeddings = pkl.load(open('item_embeddings.pkl', 'rb'))
trained_model = pkl.load(open('trained_model.pkl', 'rb'))

# Load all CSV files from the specified folder
def load_all_data(folder_path):
    all_data = []
    for filename in os.listdir(folder_path):
        if filename.endswith('.csv'):
            file_path = os.path.join(folder_path, filename)
            df = pd.read_csv(file_path)
            # Convert price-related columns to numeric, coerce errors to handle invalid data
            df['discount_price'] = pd.to_numeric(df['discount_price'], errors='coerce')
            df['actual_price'] = pd.to_numeric(df['actual_price'], errors='coerce')
            all_data.append(df)
    return pd.concat(all_data, ignore_index=True)


# Function to get DistilBERT embeddings
def get_embeddings(data, tokenizer, model):
    embeddings = []
    for desc in data['name']:  # Assuming 'name' or other descriptive fields are available
        inputs = tokenizer(desc, return_tensors='pt', padding=True, truncation=True)
        with torch.no_grad():
            outputs = model(**inputs)
        embeddings.append(outputs.last_hidden_state[:, 0, :].numpy())  # Use [CLS] token
    return np.vstack(embeddings)  # Stack all embeddings into a numpy array


# Train a simple model for product recommendation
def train_model(data, embeddings):
    # Convert embeddings to a numpy array if not already done
    embeddings = np.array(embeddings)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(embeddings, data['main_category'], test_size=0.2)

    # Logistic Regression model training
    model = LogisticRegression(max_iter=1000)
    
    # Reshape the embeddings and train the model
    model.fit(X_train, y_train)

    # Evaluate model
    predictions = model.predict(X_test)
    print(classification_report(y_test, predictions))

    return model


# Recommendation function
def recommend_gifts(model, data, gender, age, relationship, budget, tokenizer, bert_model):
    # Creating a dummy input based on user preferences
    user_input = f"{gender} {age} {relationship} {budget}"
    user_embedding = tokenizer(user_input, return_tensors='pt', padding=True, truncation=True)
    
    with torch.no_grad():
        user_embeds = bert_model(**user_embedding).last_hidden_state[:, 0, :].numpy()  # Use [CLS] token
    
    # Predict categories for the user's inputs
    predicted_category = model.predict(user_embeds.reshape(1, -1))[0]
    
    # Filter recommended gifts based on predicted category and budget
    recommended_gifts = data[(data['main_category'] == predicted_category) & (data['discount_price'] <= budget)]
    
    return recommended_gifts


# Streamlit Application
def main():
    st.title("Gift Recommendation System")

    # Load Data (assuming you have the dataset ready)
    folder_path = 'D:/gift_recomm/Temp_dtst'  # Update with your actual path
    data = load_all_data(folder_path)

    # Initialize DistilBERT tokenizer and model
    tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
    bert_model = DistilBertModel.from_pretrained('distilbert-base-uncased')

    # Streamlit user inputs
    recipient_gender = st.selectbox("Recipient's Gender", ['male', 'female'])
    recipient_age = st.number_input("Recipient's Age", min_value=1, max_value=120, value=25)
    relation_with_recipient = st.text_input("Your Relation with the Recipient (e.g. friend, family, etc.)", "friend")
    user_budget = st.number_input("Your Budget ($)", min_value=0.0, value=50.0, format="%.2f")

    # Get recommendations when button is clicked
    if st.button('Get Recommendations'):
        recommended_gifts = recommend_gifts(trained_model, data, recipient_gender, recipient_age, relation_with_recipient, user_budget, tokenizer, bert_model)

        # Display recommendations
        if not recommended_gifts.empty:
            st.subheader("Recommended Gifts:")
            for index, row in recommended_gifts.iterrows():
                if index < 5:  # Display up to 5 recommendations
                    st.write(f"**Name**: {row['name']}")
                    st.write(f"**Category**: {row['main_category']}")
                    st.write(f"**Price**: ${row['discount_price']:.2f}")
                    if 'image' in row:
                        st.image(row['image'], caption=row['name'], width=200)
                    st.write(f"[Link]({row['link']})")
                    st.write("---")
        else:
            st.write("No gifts found that match your criteria.")


if __name__ == "__main__":
    main()
