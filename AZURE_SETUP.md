# Azure Static Web Apps Setup Guide

## Step 1: Create Azure Static Web App

### Via Azure Portal
1. **Login to Azure Portal**: https://portal.azure.com
2. **Create Resource**: Click "Create a resource"
3. **Search**: Type "Static Web App" and select it
4. **Create**: Click "Create"

### Configuration
- **Subscription**: Choose your subscription
- **Resource Group**: Create new or use existing
- **Name**: `zimax-networks-website`
- **Region**: Choose closest to your users (e.g., East US)
- **Build Details**:
  - **Build Preset**: Custom
  - **App location**: `build/`
  - **API location**: Leave empty
  - **Output location**: Leave empty

### GitHub Integration
1. **Source**: Select "GitHub"
2. **Organization**: Select your GitHub organization/account
3. **Repository**: Select `zimaxnet/zimaxnet`
4. **Branch**: Select `main`
5. **Build Preset**: Custom
6. **App location**: `build/`
7. **API location**: Leave empty
8. **Output location**: Leave empty

## Step 2: Get Deployment Token

After creation:
1. Go to your Static Web App in Azure Portal
2. **Configuration** → **Deployment tokens**
3. **Copy the token** (starts with `azure_static_web_apps_api_token_`)

## Step 3: Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/zimaxnet/zimaxnet
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
5. **Value**: Paste the token from Azure
6. **Add secret**

## Step 4: Configure Custom Domain (Optional)

1. In Azure Portal, go to your Static Web App
2. **Custom domains**
3. **Add custom domain**
4. **Domain**: `zimax.net`
5. **Validation**: Follow DNS validation steps

## Step 5: Test Deployment

1. Make a small change to your website
2. Commit and push to main branch
3. Check GitHub Actions tab for deployment status
4. Visit your Azure Static Web App URL to verify

---

## Troubleshooting

### Common Issues
- **Build fails**: Check that `build/` directory exists
- **Token invalid**: Regenerate deployment token in Azure
- **Domain not working**: Check DNS settings and validation

### Support
- **Email**: derek@zimax.net
- **Phone**: +1 (213) 254-5197 