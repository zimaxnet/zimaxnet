# CI/CD Setup for Zimax Networks Website

## Overview

This repository uses GitHub Actions for continuous integration and deployment (CI/CD) to automate the deployment of the Zimax Networks Limited website.

## Workflows

### 1. Deploy Workflow (`.github/workflows/deploy.yml`)

**Triggers:**
- Push to `main` branch
- Pull requests to `main` branch

**Jobs:**
1. **Test**: Validates HTML, CSS, JavaScript, and SEO elements
2. **Build**: Creates optimized build with sitemap and robots.txt
3. **Deploy to Azure**: Deploys to Azure Static Web Apps (if configured)
4. **Deploy to GitHub Pages**: Fallback deployment to GitHub Pages
5. **Notify**: Reports deployment status

### 2. SEO Monitor Workflow (`.github/workflows/seo-monitor.yml`)

**Triggers:**
- Weekly on Mondays at 9 AM UTC
- Manual trigger via GitHub Actions

**Jobs:**
1. **SEO Audit**: Validates SEO elements and performance
2. **Keyword Monitoring**: Tracks target keyword positions
3. **Performance Check**: Monitors Core Web Vitals
4. **Accessibility Check**: Ensures accessibility compliance

## Setup Instructions

### 1. Required Secrets

Add these secrets to your GitHub repository settings:

```bash
# For Azure Static Web Apps deployment
AZURE_STATIC_WEB_APPS_API_TOKEN=your_azure_token_here

# For Lighthouse CI (optional)
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token_here
```

### 2. Azure Static Web Apps Setup

1. Create an Azure Static Web App in the Azure portal
2. Connect it to your GitHub repository
3. Configure the build settings:
   - **App location**: `build/`
   - **API location**: Leave empty
   - **Output location**: Leave empty
4. Copy the deployment token to GitHub secrets

### 3. GitHub Pages Setup (Fallback)

1. Go to repository Settings > Pages
2. Set source to "GitHub Actions"
3. The workflow will automatically deploy to GitHub Pages

## Configuration Files

### Lighthouse CI (`lighthouserc.js`)
- Performance monitoring configuration
- SEO and accessibility scoring thresholds
- Core Web Vitals monitoring

### Package.json
- Project metadata and scripts
- Development dependencies
- Build and validation scripts

## Monitoring & Alerts

### Performance Metrics
- **Performance Score**: ≥ 80%
- **Accessibility Score**: ≥ 90%
- **Best Practices Score**: ≥ 80%
- **SEO Score**: ≥ 90%

### Core Web Vitals
- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Total Blocking Time**: < 300ms

### SEO Elements Monitored
- Meta descriptions
- Meta keywords
- Open Graph tags
- Schema markup
- Canonical URLs
- Sitemap generation
- Robots.txt

## Deployment URLs

- **Primary**: https://zimax.net
- **GitHub Pages**: https://zimaxnet.github.io/zimaxnet
- **AIMCS Demo**: https://aimcs.net

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check HTML validation
   - Verify all required files exist
   - Check file permissions

2. **Deployment Failures**
   - Verify Azure token is correct
   - Check Azure Static Web App configuration
   - Ensure build artifacts are generated

3. **SEO Validation Failures**
   - Add missing meta tags
   - Fix schema markup
   - Update Open Graph tags

### Manual Deployment

If automated deployment fails, you can manually deploy:

```bash
# Build the site
npm run build

# Deploy to Azure (if configured)
az staticwebapp deploy --source build/ --token $AZURE_TOKEN

# Or deploy to GitHub Pages
gh-pages -d build/
```

## Maintenance

### Weekly Tasks
- Review SEO reports
- Check performance metrics
- Monitor keyword rankings
- Update content as needed

### Monthly Tasks
- Review and update dependencies
- Check for broken links
- Update sitemap
- Review analytics data

## Support

For CI/CD issues or questions:
- **Email**: derek@zimax.net
- **Phone**: +1 (213) 254-5197
- **Repository**: https://github.com/zimaxnet/zimaxnet

---

**Last Updated**: July 6, 2025  
**Version**: 1.0 