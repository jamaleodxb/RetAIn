from agent.investigate import investigate
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data file path
DATA_FILE = Path(__file__).parent / "data" / "customers.json"


def load_customers():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
def root():
    return {"message": "RetAIn API running"}


@app.get("/customers")
def get_customers():
    return load_customers()


@app.get("/customers/{customer_id}")
def get_customer(customer_id: str):
    customers = load_customers()

    for customer in customers:
        if customer["id"] == customer_id:
            return customer

    raise HTTPException(
        status_code=404,
        detail="Customer not found"
    )


@app.post("/customers/{customer_id}/investigate")
def investigate_customer(customer_id: str):
    return investigate(customer_id)