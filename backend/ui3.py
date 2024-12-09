from flask import Flask, request, jsonify

from flask_cors import CORS

from langchain_community.document_loaders import PyPDFLoader

from langchain.text_splitter import RecursiveCharacterTextSplitter

from langchain_community.vectorstores import FAISS

from langchain_community.llms.ollama import Ollama

from langchain.chains import RetrievalQA

from langchain_community.embeddings import HuggingFaceBgeEmbeddings

import os

from langchain.prompts import PromptTemplate

# Initialize Flask app

app = Flask(__name__)

CORS(app)

# Configure embeddings environment

os.environ["CURL_CA_BUNDLE"] = ""

os.environ['HF_API_SSL_VERIFY'] = '0'

os.environ['REQUESTS_CA_BUNDLE'] = ''

# Initialize the LLM and Embedding models

llm = Ollama(

  model="llama3.2:latest",

  num_ctx=2048,

  num_predict=1024,

  repeat_penalty=1.1,

  temperature=0.9,

  top_k=50,

  top_p=0.95

)
# Load documents

loader = PyPDFLoader(r"C:\Users\DELL\Desktop\chatbot\frontend\public\Health-Guard-Brochure-print.pdf")

documents = loader.load()

# Split documents into smaller chunks

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

final_documents = text_splitter.split_documents(documents)

# Initialize HuggingFace embeddings model

huggingface_embeddings = HuggingFaceBgeEmbeddings(

  model_name="BAAI/bge-small-en-v1.5",

  model_kwargs={'device':'cpu'},

  encode_kwargs={'normalize_embeddings':True}

  )

# Create a vector store from document chunks

vectorstore = FAISS.from_documents(final_documents[:120], huggingface_embeddings)

# Set up the retriever

retriever = vectorstore.as_retriever(search_type="similarity", search_kwargs={"k": 3})

# Define the prompt template

prompt_template = """

You are a helpful assistant specialized in healthcare billing, insurance plans, and related queries.

Please provide answers based on the following context. Make sure to only use the context provided.

{context}

Question: {question}

Answer:

"""

prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])

# Initialize RetrievalQA chain

retrievalQA = RetrievalQA.from_chain_type(

  llm=llm,

  chain_type="stuff",

  retriever=retriever,

  return_source_documents=True,

  chain_type_kwargs={"prompt": prompt}

)

# API route to handle queries

@app.route('/query', methods=['POST'])

def query():

  data = request.json

  question = data.get("question", "")

  if not question:

    return jsonify({"error": "Question is required"}), 400

  # Process the query using RetrievalQA

  result = retrievalQA.invoke({"query": question})

  answer = result.get('result', "Sorry, I couldn't find an answer.")

  # Return the answer as JSON

  return jsonify({"answer": answer})

if __name__ == "__main__":

  app.run(port=5000)