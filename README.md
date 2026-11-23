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

## Investor financial archive

- `/investors/financial` opens Share Holding Pattern by default; category tabs filter the archive. If that category is unavailable, All Documents is shown.
- `/investors/financial?category=annual%20report` opens a category directly.
- `/investors/financial?view=all` opens the complete document archive explicitly.
- Category tabs are generated from all Contentful `financialPage` entries, not
  a fixed list. MGT filings stored under Annual Report get separate MGT categories;
  the original CMS records are not modified. Uncategorised entries remain
  accessible under Other Documents and in All Documents.
- Each document date is displayed with a PDF-style icon; original file types and opening behaviour are unchanged.
- Quarterly documents use the April–March financial year. Archive document
  dates are displayed separately from reporting periods; unclear periods are
  retained rather than guessed. Failed or incomplete API loads show Retry,
  never sample financial data.
- Run `npm run test:financial` for pagination, date, grouping and category-navigation tests.
