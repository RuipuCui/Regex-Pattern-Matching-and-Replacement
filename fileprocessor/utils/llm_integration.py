# fileprocessor/utils/llm_integration.py

from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

  # 🔒 Replace this securely in production

def prompt_to_regex(natural_prompt):
    """
    Use LLM (e.g., OpenAI) to convert natural language into a regex pattern and a target column.
    """
    response = client.chat.completions.create(model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a regex assistant. Given an instruction, return the regex pattern and target column."},
        {"role": "user", "content": f"{natural_prompt}. Only return output in JSON: {{'column': ..., 'pattern': ...}}"}
    ],
    temperature=0)
    try:
        result = eval(response.choices[0].message.content)
        return result['column'], result['pattern']
    except Exception as e:
        raise ValueError(f"Invalid LLM output: {e}")
