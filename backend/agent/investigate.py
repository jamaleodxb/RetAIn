from agent.tools import (
    get_customer_profile,
    calculate_risk,
    select_playbook,
    generate_email,
)

def investigate(customer_id: str):

    customer = get_customer_profile(customer_id)

    score, level, drivers = calculate_risk(customer)

    playbook = select_playbook(customer)

    email = generate_email(
    customer,
    playbook["playbook"]
)

    return {
    "riskScore": score,

    "riskLevel": level,

    "riskDrivers": drivers,

   "recommendedPlaybook":
    playbook["playbook"],

"recommendedActions":
    playbook["actions"],

    "outreachSubject":
    email["subject"],

"outreachBody":
    email["body"],

    "timeline": [
        "Retrieved customer profile",
        "Analysed usage metrics",
        "Reviewed support activity",
        "Calculated churn risk",
        "Selected retention playbook",
        "Prepared outreach draft"
    ]
}