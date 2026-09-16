import json
from pathlib import Path

DATA_FILE = (
    Path(__file__).parent.parent
    / "data"
    / "customers.json"
)


def load_customers():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def get_customer_profile(customer_id: str):

    customers = load_customers()

    for customer in customers:
        if customer["id"] == customer_id:
            return customer

    return None


def select_playbook(customer):

    signals = customer["signals"]

    # Executive attention required
    if (
        signals["criticalTickets"] > 0
        or signals["sentimentScore"] < 40
    ):
        return {
            "playbook": "Executive Recovery",
            "actions": [
                "Schedule executive review",
                "Resolve critical support issues",
                "Engage senior stakeholders",
            ]
        }

    # Product adoption issue
    if signals["usageTrend"] < -15:
        return {
            "playbook": "Adoption Recovery",
            "actions": [
                "Launch adoption workshop",
                "Review feature utilisation",
                "Create customer success plan",
            ]
        }

    # Renewal approaching
    if customer["daysToRenewal"] < 90:
        return {
            "playbook": "Renewal Protection",
            "actions": [
                "Review renewal objectives",
                "Demonstrate business value",
                "Align executive stakeholders",
            ]
        }

    # Expansion opportunity
    if (
        customer["healthScore"] >= 80
        and signals["sentimentScore"] >= 75
        and signals["usageTrend"] > 0
    ):
        return {
            "playbook": "Growth Opportunity",
            "actions": [
                "Identify expansion potential",
                "Schedule strategic review",
                "Present roadmap",
            ]
        }

    # Default
    return {
        "playbook": "Customer Success Review",
        "actions": [
            "Conduct business review",
            "Monitor adoption trends",
            "Review support activity",
        ]
    }


def calculate_risk(customer):

    if customer is None:
        raise ValueError("Customer not found")

    if "signals" not in customer:
        raise ValueError(
            f"Customer {customer['id']} does not contain signals data"
        )

    score = 0
    drivers = []

    if customer["signals"]["usageTrend"] < -15:
        score += 30
        drivers.append(
            {
                "id": "usage",
                "label": "Product usage declining",
                "severity": "high",
            }
        )

    if customer["signals"]["criticalTickets"] > 0:
        score += 25
        drivers.append(
            {
                "id": "tickets",
                "label": "Open critical support tickets",
                "severity": "high",
            }
        )

    if customer["daysToRenewal"] <= 90:
        score += 20
        drivers.append(
            {
                "id": "renewal",
                "label": "Upcoming renewal",
                "severity": "medium",
            }
        )

    score = min(score, 100)

    level = (
        "High"
        if score >= 70
        else "Medium"
        if score >= 40
        else "Low"
    )

    return score, level, drivers


def generate_email(customer, playbook_name):

    customer_name = customer["name"]

    usage = customer["signals"]["usageTrend"]
    tickets = customer["signals"]["criticalTickets"]
    renewal = customer["daysToRenewal"]

    if playbook_name == "Executive Recovery":
        return {
            "subject": f"Executive alignment discussion for {customer_name}",
            "body": (
                f"Hello {customer_name},\n\n"
                f"We have identified a decline in usage ({usage}%) "
                f"and {tickets} critical support ticket(s) requiring attention.\n\n"
                f"With your renewal approaching in {renewal} days, "
                "I would like to schedule an executive review to discuss "
                "current challenges, priorities and a recovery plan.\n\n"
                "Please let me know a suitable time.\n\n"
                "Kind regards,\n"
                "Customer Success Team"
            )
        }

    if playbook_name == "Adoption Recovery":
        return {
            "subject": f"Improving product adoption at {customer_name}",
            "body": (
                f"Hello {customer_name},\n\n"
                f"We observed a decline in product usage ({usage}%) "
                "and would like to review adoption patterns with your team.\n\n"
                "Our goal is to identify opportunities to increase engagement, "
                "improve value realisation and build a proactive success plan.\n\n"
                "Please let me know a suitable time.\n\n"
                "Kind regards,\n"
                "Customer Success Team"
            )
        }

    if playbook_name == "Renewal Protection":
        return {
            "subject": "Preparing for your upcoming renewal",
            "body": (
                f"Hello {customer_name},\n\n"
                f"Your renewal is planned within the next {renewal} days.\n\n"
                "I would like to review achieved outcomes, business impact, "
                "future priorities and ensure the renewal process is smooth "
                "and aligned with your goals.\n\n"
                "Please let me know a suitable time.\n\n"
                "Kind regards,\n"
                "Customer Success Team"
            )
        }

    if playbook_name == "Growth Opportunity":
        return {
            "subject": f"Exploring growth opportunities with {customer_name}",
            "body": (
                f"Hello {customer_name},\n\n"
                "Your organisation is demonstrating strong adoption, "
                "positive sentiment and healthy engagement.\n\n"
                "I would welcome the opportunity to discuss future priorities, "
                "expansion opportunities and strategic initiatives.\n\n"
                "Please let me know a suitable time.\n\n"
                "Kind regards,\n"
                "Customer Success Team"
            )
        }

    return {
        "subject": f"Customer success review for {customer_name}",
        "body": (
            f"Hello {customer_name},\n\n"
            "I would like to schedule a business review to discuss product "
            "adoption, support activity and future objectives.\n\n"
            "Please let me know a suitable time.\n\n"
            "Kind regards,\n"
            "Customer Success Team"
        )
    }