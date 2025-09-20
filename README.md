# GitHub Profile Stats Viewer

A modern web application built with Next.js that allows you to search and view GitHub user profiles along with their top repositories.

## Features

- 🔍 Search GitHub users by username
- 👤 View detailed profile information
- 📊 Display follower/following counts and repository stats
- ⭐ Show top 3 repositories sorted by stars
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Built with Next.js 15, TypeScript, and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Setup Instructions

1. **Clone and install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Set up environment variables**:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser** and navigate to `http://localhost:3000`

## Environment Variables

- `NEXT_PUBLIC_GITHUB_API_URL`: GitHub API base URL (defaults to https://api.github.com)

## Project Structure

\`\`\`
├── app/
│   ├── layout.tsx          # Root layout with fonts and analytics
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── SearchBar.tsx       # Username search component
│   ├── UserCard.tsx        # User profile display
│   ├── RepoList.tsx        # Repository list component
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   └── utils.ts            # Utility functions
└── .env.local.example      # Environment variables template
\`\`\`

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in your Vercel project settings
4. Deploy!

## API Rate Limits

The GitHub API has rate limits for unauthenticated requests (60 requests per hour per IP). For production use, consider adding GitHub authentication to increase the rate limit.
