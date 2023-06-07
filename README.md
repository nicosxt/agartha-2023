# agartha.one

## Getting Started

1. Ensure the correct node version, run `nvm use`
2. Install packages `npm install`
3. Create a `.env.local` file via `cp .env.example .env.local`
  - Fill out environment variables for Notion and Mapbox
4. Run the development server `npm run dev`

## Third party integrations
### Notion DB
This project uses a Notion database to keep track of communities. The Notion API is queried at build time so as to make the website snappy. 
- This integration uses a private api key -> get it from @syntonikka
- TODO: create a mock response for local/offline development. This will allow anyone to dev without required api keys.
### Mapbox
Mapbox is used to display communities on a world map. There is a public API key associated with it.
- Get your own public API key for local development by signing up for a Mapbox account.

## Tech stack
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

🚀 NextJS with Typescript