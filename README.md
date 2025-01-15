This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sample Prompt For Resume
1. Content Enhancement
- Strengthen impact by using powerful action verbs
- Quantify achievements with specific metrics and results
- Highlight relevant skills and accomplishments
- Remove redundant or irrelevant information

2. Structure and Format
- Ensure consistent formatting throughout
- Optimize section organization for readability
- Create clear visual hierarchy
- Maintain professional spacing and alignment

3. Language and Style
- Use clear, concise, and professional language
- Eliminate passive voice and wordiness
- Maintain consistent tense usage
- Enhance keyword optimization for ATS systems

4. Industry Best Practices
- Align with current industry standards
- Incorporate relevant industry keywords
- Follow modern resume conventions
- Ensure compliance with professional expectations

## Basic Authentication

The application is protected with basic authentication. To access the application, you need to set up the following environment variables:

### Environment Variables

- `BASIC_AUTH_USER`: Username for basic authentication
- `BASIC_AUTH_PASSWORD`: Password for basic authentication

### Local Development

1. Copy the environment variables from `.env` to `.env.local`
2. Update the values in `.env.local` with your desired credentials
3. The basic auth will be active in all environments where these variables are set
4. API routes, static files, and images are excluded from authentication

Note: Make sure not to commit your actual credentials to version control. Keep your `.env.local` file in `.gitignore`.