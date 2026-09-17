# RetAIn.ai

RetAIn.ai is an AI-powered customer churn investigation and retention planning platform designed for Customer Success teams.

The platform helps teams proactively identify at-risk customers, understand the drivers behind churn risk, generate retention recommendations, draft customer outreach and support human decision-making through approval workflows.

## Problem Statement

Customer Success teams often identify churn risk too late, after customer engagement has already deteriorated.

RetAIn.ai helps Customer Success teams:

- Identify customers at risk of churn
- Understand the main risk drivers
- Generate retention recommendations
- Create actionable intervention plans
- Draft customer outreach communications
- Maintain human oversight through approval workflows

## Solution Overview

RetAIn.ai combines deterministic business logic, agent orchestration and AI-generated recommendations to support proactive customer retention.

The platform:

1. Retrieves customer context
2. Analyses customer health signals
3. Assesses churn risk
4. Selects an appropriate retention playbook
5. Generates AI-powered recommendations
6. Drafts customer outreach
7. Validates structured outputs
8. Supports human approval before execution

## Agent Workflow

```text
START
  ↓
Retrieve Customer Context
  ↓
Analyse Risk Signals
  ↓
Assess Churn Risk
  ↓
Select Retention Playbook
  ↓
Generate AI Recommendations
  ↓
Generate Customer Outreach
  ↓
Validate Structured Output
  ↓
Human Approval
  ↓
END
```

## Architecture

```text
React Frontend
        │
        ▼
FastAPI Backend
        │
        ▼
LangGraph Agent
        │
 ┌──────┼───────────┬─────────────┐
 ▼      ▼           ▼             ▼
Customer Risk      Playbook      OpenAI
Profile  Analysis  Selection     Reasoning
                                 │
                                 ▼
                         Pydantic Validation
                                 │
                                 ▼
                          Human Approval
```

## Features

### Customer Portfolio Dashboard

- Customer health overview
- Risk indicators
- Renewal visibility
- Portfolio-level monitoring

### Risk Investigation

- Churn risk scoring
- Risk level classification
- Risk driver identification
- Explainable recommendations

### AI-Powered Recommendations

- Context-aware retention actions
- Customer outreach generation
- AI reasoning and explainability
- Structured outputs

### Human-in-the-Loop Governance

- Approval workflow
- Recommendation review
- Human oversight before execution

### Agent Explainability

- Investigation timeline
- AI reasoning summary
- Transparent risk drivers
- Visible workflow progression

## Technology Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- TanStack Router
- TanStack Query

### Backend

- FastAPI
- Python

### Agent Framework

- LangGraph

### AI Layer

- OpenAI
- Structured Outputs

### Validation

- Pydantic

## AI Design

RetAIn.ai uses a hybrid approach to balance explainability and AI flexibility.

### Deterministic Components

Business-critical decisions remain deterministic:

- Risk scoring
- Risk classification
- Risk driver identification
- Playbook selection

### LLM Components

The OpenAI model is used for:

- Retention recommendations
- Customer outreach generation
- Recommendation reasoning

### Governance

All recommendations:

- Follow a structured Pydantic schema
- Are validated before use
- Require human approval before execution

## Future Enhancements

Potential future enhancements include:

- Salesforce integration
- HubSpot integration
- CRM write-back
- Agent memory
- Multi-agent workflows
- Customer telemetry ingestion
- Monitoring and evaluation dashboards
- Enterprise deployment through DataRobot Agentic AI

## Disclaimer

All customer data used in this project is synthetic and intended solely for demonstration and educational purposes.

No real customer data is used by the application.

## What This Demonstrates

RetAIn.ai demonstrates how Agentic AI can be applied to Customer Success workflows by combining:

- LangGraph workflow orchestration
- OpenAI-powered reasoning and content generation
- Pydantic structured outputs
- Explainable recommendations
- Human approval workflows
- Customer retention planning

The result is a practical example of how AI agents can help Customer Success teams proactively reduce churn and improve customer outcomes.
