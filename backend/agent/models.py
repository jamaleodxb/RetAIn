from pydantic import BaseModel
from typing import Literal


class RiskDriver(BaseModel):
    id: str
    label: str
    severity: Literal["low", "medium", "high"]


class ChurnIntervention(BaseModel):
    riskScore: int
    riskLevel: Literal["Low", "Medium", "High"]

    riskDrivers: list[RiskDriver]

    recommendedPlaybook: str
    recommendedActions: list[str]

    outreachSubject: str
    outreachBody: str

    timeline: list[str]

    approvalStatus: Literal[
        "Pending",
        "Approved",
        "Rejected",
    ]