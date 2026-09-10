# Kebab Rush cloud setup

Kebab Rush v0.3 keeps the static game on GitHub Pages and runs accounts, cloud saves and the national leaderboard through a Cloudflare Worker + D1 database.

## What is implemented

- Player registration with a unique display name and 4–12 digit PIN
- PBKDF2-SHA256 PIN hashing with a per-account random salt
- 30-day opaque sessions; only a hash of each session token is stored in D1
- Authenticated score posting
- National leaderboard based on each player's best shift
- Server-side score bounds/validation for the playtest
- Cloud progress GET/PUT endpoints with revision checks
- CORS restricted to the Kebab Rush GitHub Pages origin and local Vite development
- Local profile and local leaderboard remain available when the cloud API is offline

## Cloudflare resources

Create one D1 database named `kebab-rush-db` and note its database ID.

Create a Cloudflare API token with the minimum permissions needed to deploy Workers and edit the D1 database. Note the Cloudflare account ID.

## GitHub Actions secrets

In the Kebab-Rush repository, add these Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_D1_DATABASE_ID`

The `Deploy Kebab Rush cloud API` workflow will substitute the D1 database ID into a temporary Wrangler config, apply `server/schema.sql`, validate the Worker and deploy `server/worker.js`.

## Connect the website to the deployed API

After the first Worker deployment, copy the HTTPS Worker origin, for example `https://<worker>.<workers-subdomain>.workers.dev`.

For a one-device test, open Kebab Rush once with `?api=<encoded-worker-origin>` appended to the game URL. The client stores that origin locally and uses it on later visits.

For the public release, put the Worker origin in the `kebab-rush-api` meta tag in `index.html`, then redeploy GitHub Pages. Do not put Cloudflare tokens, database IDs or other secrets in the frontend.

## API routes

- `GET /health`
- `POST /v1/register`
- `POST /v1/login`
- `POST /v1/logout`
- `GET /v1/me`
- `POST /v1/scores`
- `GET /v1/leaderboard`
- `GET /v1/progress`
- `PUT /v1/progress`

## Playtest security note

This is a game account system, not an identity provider. PINs are hashed and sessions are server-side, but the first live playtest still uses client-reported gameplay scores with server-side bounds. Stronger anti-cheat should move scoring events or signed shift summaries to the server before any competitive/prize leaderboard is introduced.
