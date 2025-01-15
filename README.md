# Career Compass - AI Career Assistant

Career Compass is a comprehensive AI-powered career support platform that helps users optimize their career development through personalized resume analysis, job matching, and skill development recommendations.

## Project Overview

This project aims to create an AI-driven career development platform that addresses several key challenges:
- Reducing time investment in resume creation
- Providing objective skill evaluation and market value assessment
- Simplifying compatibility analysis between personal skills and job requirements
- Supporting informed career direction decisions

## Target Audience

- Working professionals considering career changes
- New graduates seeking employment
- People exploring career transitions
- Professionals looking to enhance their skills

## Features

### Core Features
- **Resume Upload & Analysis**
  - PDF upload with validation
  - Text extraction and processing
  - AI-powered content analysis
  - Personalized feedback generation

- **Job Matching**
  - Integration with major job platforms (Indeed, LinkedIn, Glassdoor)
  - AI career analysis
  - Customized job recommendations
  - Direct application links

- **Skills Analysis**
  - Current skill set evaluation
  - Gap analysis
  - Learning resource recommendations (Udemy, YouTube)
  - Progress tracking

### Advanced Features
- **Market Analysis**
  - Skill evaluation visualization (radar charts)
  - Salary range insights
  - Industry trend analysis
  - Position market analysis

- **Company Analysis**
  - Company compatibility assessment
  - Match rate quantification
  - Detailed matching analysis
  - History management

- **Resume Management**
  - Version control
  - Improvement tracking
  - PDF export
  - Comparison tools

## Technology Stack

### Frontend
- Next.js 14
- TypeScript
- React
- TailwindCSS
- Shadcn UI
- Chart.js
- React-Markdown

### Backend
- Next.js API Routes
- Prisma (ORM)
- PostgreSQL

### External Services
- Google Gemini AI API

### Development & Deployment
- Vercel
- GitHub Actions
- Jest
- Cypress

## Prerequisites

- Node.js (version TBD)
- PostgreSQL database
- Google Cloud Platform account for Gemini API access

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd career-compass
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with the following variables:
```
DATABASE_URL="postgresql://[user]:[password]@localhost:5432/career_compass"
GOOGLE_GEMINI_API_KEY="your-api-key"
BASIC_AUTH_USER="your-username"
BASIC_AUTH_PASSWORD="your-password"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

## Site Structure

```
Home (/)
├── Resume Upload Page
├── Jobs (/jobs)
│   └── Job Search Results
├── Skills (/skills)
│   ├── Skill Analysis
│   └── Learning Resources
├── Market Analysis (/market)
│   ├── Salary Insights
│   └── Industry Trends
├── Company Analysis (/company)
│   ├── Compatibility Check
│   └── Analysis History (/diagnosis)
└── Resume (/resume)
    ├── Improvement Page
    └── Resume History (/resume-history)
```

## Testing

The project implements comprehensive testing:
- Unit tests with Jest for backend functionality
- E2E testing with Cypress for frontend features
- Automated CI/CD pipeline using GitHub Actions

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Full-stack engineer with over 2 years of web development experience, specializing in TypeScript, React, and Next.js development. Experienced in DX new development and online medical service development.
