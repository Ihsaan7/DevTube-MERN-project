Write-Host "Vercel deployment helper (interactive)"

# Ensure vercel CLI available
$vercelPath = (Get-Command vercel -ErrorAction SilentlyContinue).Source
if (-not $vercelPath) {
  Write-Host "Vercel CLI not found. Installing globally..."
  npm i -g vercel
}

Write-Host "Please login to Vercel if not already signed in."
vercel login

# Ask for project names
$backendProject = Read-Host "Enter the Vercel project name for backend (root project)"
$frontendProject = Read-Host "Enter the Vercel project name for frontend (frontend folder)"

# Ask for environment variables (safely interactive)
Write-Host "Enter environment values now. Press ENTER to skip any optional value."
$MONGODB_URI = Read-Host "MONGODB_URI"
$JWT_SECRET = Read-Host "JWT_SECRET"
$JWT_REFRESH_TOKEN = Read-Host "JWT_REFRESH_TOKEN"
$JWT_SECRET_EXPIRY = Read-Host "JWT_SECRET_EXPIRY"
$JWT_REFRESH_EXPIRY = Read-Host "JWT_REFRESH_EXPIRY"
$CLOUDINARY_CLOUD_NAME = Read-Host "CLOUDINARY_CLOUD_NAME"
$CLOUDINARY_API_KEY = Read-Host "CLOUDINARY_API_KEY"
$CLOUDINARY_API_SECRET = Read-Host "CLOUDINARY_API_SECRET"

# Helper to add env var to specific vercel project
function Add-EnvIfValue($project, $name, $value) {
    if ([string]::IsNullOrWhiteSpace($value)) { return }
    Write-Host "Adding $name to project $project (production)"
    vercel env add $name production --project $project <<<$value
}

# Add env vars to backend project
Add-EnvIfValue $backendProject "MONGODB_URI" $MONGODB_URI
Add-EnvIfValue $backendProject "JWT_SECRET" $JWT_SECRET
Add-EnvIfValue $backendProject "JWT_REFRESH_TOKEN" $JWT_REFRESH_TOKEN
Add-EnvIfValue $backendProject "JWT_SECRET_EXPIRY" $JWT_SECRET_EXPIRY
Add-EnvIfValue $backendProject "JWT_REFRESH_EXPIRY" $JWT_REFRESH_EXPIRY
Add-EnvIfValue $backendProject "CLOUDINARY_CLOUD_NAME" $CLOUDINARY_CLOUD_NAME
Add-EnvIfValue $backendProject "CLOUDINARY_API_KEY" $CLOUDINARY_API_KEY
Add-EnvIfValue $backendProject "CLOUDINARY_API_SECRET" $CLOUDINARY_API_SECRET

# Deploy backend (root project) — ensures that `api/` serverless functions are deployed
Write-Host "Deploying backend project (root) -- confirm prompts if shown"
Push-Location ..\
vercel --prod --confirm --name $backendProject
Pop-Location

# Ask for frontend VITE_API_BASE_URL
$backendDomain = Read-Host "Enter backend URL installed on Vercel (e.g. https://my-backend.vercel.app)"
$frontendAPIUrl = "$backendDomain/api/v1"
Write-Host "Frontend API base will be set to: $frontendAPIUrl"

# Add VITE_API_BASE_URL to frontend project
Add-EnvIfValue $frontendProject "VITE_API_BASE_URL" $frontendAPIUrl

# Deploy frontend
Write-Host "Deploying frontend (folder 'frontend')"
Push-Location frontend
vercel --prod --confirm --name $frontendProject
Pop-Location

Write-Host "Deployment complete. Check Vercel dashboard for logs and URLs."