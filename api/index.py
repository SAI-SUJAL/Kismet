from fastapi import FastAPI
from pydantic import BaseModel
import requests

app = FastAPI()

HF_TOKEN = "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"  # Your Hugging Face token
MISTRAL_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"


class MessageRequest(BaseModel):
    message: str


@app.post("/api/craftMessage")
async def craft_message(request: MessageRequest):
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    data = {
        "inputs": request.message
    }
    print(request.message)

    try:
        # Send the request to Hugging Face's API
        response = requests.post(MISTRAL_API_URL, headers=headers, json=data)
        response.raise_for_status()  # Check for errors
        ai_response = response.json()
        return {"response": ai_response[0]['generated_text']}
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}
