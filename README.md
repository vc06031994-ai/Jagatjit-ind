# Jagatjit website

The public website is a React 18 application built with Vite. Its source is in
`src/`, with static assets in `src/Assets/` and `public/`.

## Frontend

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTENTFUL_SPACE_ID` and `VITE_CONTENTFUL_ACCESS_TOKEN` for the
   Contentful delivery API.
3. Install dependencies with `npm install`.
4. Run `npm run dev` for local development or `npm run build` for a production
   build.

The Laravel application and its authenticated content-management interface are
in `api/`. See `api/README.md` for Laravel setup.
