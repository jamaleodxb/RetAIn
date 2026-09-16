from typing import TypedDict


class InvestigationState(TypedDict):
    customer_id: str

    customer: dict

    risk_score: int
    risk_level: str

    risk_drivers: list

    recommended_playbook: str

    recommended_actions: list

    outreach_subject: str
    outreach_body: str

    timeline: list