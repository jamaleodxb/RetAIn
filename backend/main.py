from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def root():
    return {"message": "RetAIn API running"}


@app.get("/customers")
def get_customers():
    return [
        {
            "id": "northstar-logistics",
            "name": "Northstar Logistics",
            "segment": "Enterprise",
            "acv": 240000,
            "daysToRenewal": 43,
            "healthScore": 41,
            "riskStatus": "High",
            "signals": {
                "usageTrend": -28,
                "openTickets": 9,
                "criticalTickets": 3,
                "sentimentScore": 34
            }
        }
    ]