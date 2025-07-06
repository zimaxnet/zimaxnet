# Azure Deployment Token Setup

## ✅ Token Retrieved Successfully!

Your Azure Static Web App deployment token is:
```
azure_static_web_apps_api_token_84004d6af24bfb13c70ae416b6da15ad664c4c78706c2ebb95d29fad58c822c206-0df8d3d1-a78c-4ae0-bf14-eb2666e59b7501e17310c8584d1e
```

## 🔧 Next Steps:

### 1. Add Token to GitHub Secrets

1. **Go to**: https://github.com/zimaxnet/zimaxnet/settings/secrets/actions
2. **Click "New repository secret"**
3. **Name**: `AZURE_STATIC_WEB_APPS_API_TOKEN`
4. **Value**: Copy the token above
5. **Click "Add secret"**

### 2. Test the Connection

1. **Make a small change** to your website
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Test Azure Static Web App deployment"
   git push origin main
   ```
3. **Check GitHub Actions** tab for deployment status

### 3. Verify Deployment

- **GitHub Actions**: Check the "Deploy Zimax Networks Website" workflow
- **Azure Portal**: Check your Static Web App deployment status
- **Live Site**: Visit your Static Web App URL

## 🔍 Troubleshooting

If deployment fails:
1. **Check GitHub Actions logs** for error details
2. **Verify token** is correctly added to secrets
3. **Check Azure Static Web App** configuration

## 📞 Support

- **Email**: derek@zimax.net
- **Phone**: +1 (213) 254-5197

---

**Static Web App Details:**
- **Name**: zimax-static-app
- **Resource Group**: static-web-apps-rg
- **Repository**: https://github.com/zimaxnet/zimaxnet
- **Branch**: main
- **Build Location**: build/ 