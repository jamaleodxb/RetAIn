# Customer Compass

Build a modern SaaS web application called "RetainAI".

Purpose:

RetainAI helps Customer Success teams identify customers at risk of churn and investigate the reasons behind that risk.

Use:

- React

- TypeScript

- Tailwind CSS

- Responsive design

- Modern B2B SaaS styling

- Clean dashboards

- Professional colour palette (blue, white, grey)

Create these pages:

PAGE 1: Customer Portfolio Dashboard

Display a table of customers.

Columns:

- Customer Name

- Segment

- Annual Contract Value

- Days To Renewal

- Health Score

- Risk Status

Include sample customers:

1. Northstar Logistics

 Enterprise

 $240,000

 43 days

 Health Score 41

 High Risk

2. Atlas Manufacturing

 Mid-Market

 $120,000

 180 days

 Health Score 82

 Low Risk

3. Horizon Retail

 Enterprise

 $310,000

 65 days

 Health Score 58

 Medium Risk

Each customer row should be clickable.

When clicked, navigate to:

/customers/[id]

PAGE 2: Customer Investigation Page

Display:

Customer Overview Card:

- Customer Name

- Segment

- ACV

- Days To Renewal

Risk Signals Card:

- Usage Trend

- Open Support Tickets

- Critical Tickets

- Sentiment Score

Add button:

"Investigate Risk"

When clicked:

Call a backend endpoint:

POST /customers/{id}/investigate

Display loading state while processing.

After response display:

Risk Assessment Card

Fields:

- Risk Score

- Risk Level

- Risk Drivers

Example:

Risk Score: 82

Risk Level: High

Risk Drivers:

- Product usage declining

- Open critical support tickets

- Upcoming renewal

Create clean reusable components.

Create mock data now but structure the application so it can later consume a FastAPI backend.

Do NOT implement authentication.

Do NOT implement email sending.

Do NOT implement AI chat.

Focus on dashboard experience only.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/69de687f-c895-4553-bf4f-dac90ac6585e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
