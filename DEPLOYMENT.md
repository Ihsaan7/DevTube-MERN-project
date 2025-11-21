# Vercel Deployment Guide (automatable)

This guide walks through deploying the MiniTube repository to Vercel (monorepo with backend API and frontend Vite app). The included `deploy-to-vercel.ps1` script will help run the Vercel CLI interactively from your machine.

## Prerequisites
- You must own or have admin permissions on the GitHub repo.
- Install Vercel CLI locally (interactive login happens):
  ```powershell
  npm i -g vercel
  vercel login
  ```

## What the repo contains for Vercel
- Root `api/index.js` - serverless entry that initialises DB and forwards to Express app (`backend/src/app.js`).
- `backend/api/index.js` - ESM serverless handler for backend code where needed.
- `frontend` - Vite React app, ready to build on Vercel.
- `vercel.json` - Rewrites config to map `/api/*` to serverless functions.

## Environment variables to add in Vercel (required)
- MONGODB_URI
- JWT_SECRET
- JWT_REFRESH_TOKEN
- JWT_SECRET_EXPIRY
- JWT_REFRESH_EXPIRY
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- (Optional) Any other `.env` keys present in `backend/.env`.

Also add in frontend project settings (or same project if monorepo):
- VITE_API_BASE_URL -> `https://<your-backend-domain>/api/v1` (or production endpoint)

## Manual Deployment Steps (web UI)
1. Push your code to GitHub (main branch) — already done.
2. Go to Vercel → New Project → Import Git Repository.
3. Choose **Monorepo** import.
   - Create a frontend project with root directory `frontend` (Vite). Set `VITE_API_BASE_URL` env var.
   - Create a project for backend (root) so `api/` serverless files are used, or let Vercel auto-detect serverless functions.
4. Add required environment variables in each project.
5. Deploy and check logs.

## CLI Automation (interactive)
A helper script is available at `scripts/deploy-to-vercel.ps1`. It:
- Prompts you for required env var values (can paste secrets);
- Adds them to the Vercel project using `vercel env add` (production);
- Deploys backend and frontend using `vercel --prod`.

Run locally (PowerShell):
```powershell
cd PATH/TO/REPO
# install vercel if missing
npm i -g vercel
# login if needed
vercel login
# run interactive deploy script
.\scripts\deploy-to-vercel.ps1
```

## Troubleshooting
- DB connection errors: confirm `MONGODB_URI` contains the correct username/password and IP whitelist for your Atlas cluster.
- CORS/auth errors: confirm `VITE_API_BASE_URL` matches your backend URL + `/api/v1`.
- Check Vercel logs for any runtime errors and confirm environment variables are set.

---

If you want, I can create the interactive script now and push it so you can just run it locally. I cannot login or set environment variables on Vercel on your behalf — you must authenticate locally or provide access.
