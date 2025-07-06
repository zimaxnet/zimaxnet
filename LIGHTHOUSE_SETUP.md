# Lighthouse CI Setup Guide

## What is Lighthouse CI?

Lighthouse CI automatically runs Lighthouse audits on your website to monitor performance, accessibility, SEO, and best practices.

## Step 1: Create Lighthouse CI Project

### Option A: Using Lighthouse CI CLI (Recommended)

1. **Install Lighthouse CI globally**:
   ```bash
   npm install -g @lhci/cli@0.12.x
   ```

2. **Initialize Lighthouse CI**:
   ```bash
   lhci init
   ```

3. **Choose options**:
   - **Upload target**: `temporary-public-storage` (free)
   - **GitHub App**: Yes (for GitHub integration)
   - **Project name**: `zimax-networks-website`

### Option B: Using GitHub App (Alternative)

1. **Go to Lighthouse CI**: https://github.com/apps/lighthouse-ci
2. **Install app** for your repository
3. **Configure** the app settings

## Step 2: Get Lighthouse CI Token

### If using CLI method:
1. **Run setup**:
   ```bash
   lhci wizard
   ```
2. **Follow prompts** to create GitHub App
3. **Copy the token** provided

### If using GitHub App method:
1. Go to your repository settings
2. **Integrations** → **Lighthouse CI**
3. **Copy the token**

## Step 3: Add Token to GitHub Secrets

1. Go to your GitHub repository: https://github.com/zimaxnet/zimaxnet
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. **Name**: `LHCI_GITHUB_APP_TOKEN`
5. **Value**: Paste the Lighthouse CI token
6. **Add secret**

## Step 4: Test Lighthouse CI Locally

1. **Run Lighthouse audit**:
   ```bash
   lhci autorun
   ```

2. **Check results** in terminal and browser

## Step 5: Configure Performance Budgets

The `lighthouserc.js` file is already configured with these thresholds:

```javascript
assertions: {
  'categories:performance': ['warn', {minScore: 0.8}],     // 80%
  'categories:accessibility': ['error', {minScore: 0.9}],  // 90%
  'categories:best-practices': ['warn', {minScore: 0.8}],  // 80%
  'categories:seo': ['error', {minScore: 0.9}],           // 90%
  
  // Core Web Vitals
  'first-contentful-paint': ['warn', {maxNumericValue: 2000}],      // < 2s
  'largest-contentful-paint': ['warn', {maxNumericValue: 2500}],    // < 2.5s
  'cumulative-layout-shift': ['warn', {maxNumericValue: 0.1}],      // < 0.1
  'total-blocking-time': ['warn', {maxNumericValue: 300}],          // < 300ms
}
```

## Step 6: View Results

### GitHub Actions
- Check the **Actions** tab in your repository
- Look for "SEO & Performance Monitor" workflow
- View detailed results in the workflow logs

### Lighthouse CI Dashboard
- Visit: https://lhci.app
- Login with your GitHub account
- View historical performance data

## Step 7: Set Up Alerts (Optional)

### GitHub Notifications
1. Go to repository **Settings** → **Notifications**
2. Enable notifications for:
   - **Workflow runs**
   - **Security alerts**
   - **Dependabot alerts**

### Email Alerts
1. In Lighthouse CI dashboard
2. **Settings** → **Notifications**
3. Add your email: `derek@zimax.net`

## Monitoring Schedule

The workflow runs:
- **Weekly**: Every Monday at 9 AM UTC
- **Manual**: Via GitHub Actions tab
- **On PR**: When pull requests are created

## Performance Targets

### Current Targets
- **Performance**: ≥ 80%
- **Accessibility**: ≥ 90%
- **Best Practices**: ≥ 80%
- **SEO**: ≥ 90%

### Core Web Vitals
- **FCP**: < 2 seconds
- **LCP**: < 2.5 seconds
- **CLS**: < 0.1
- **TBT**: < 300ms

## Troubleshooting

### Common Issues

1. **Token not working**:
   - Regenerate token in Lighthouse CI
   - Check GitHub secrets are correct
   - Verify repository permissions

2. **Build failures**:
   - Check website is accessible
   - Verify URL in lighthouserc.js
   - Check network connectivity

3. **Performance regressions**:
   - Review recent changes
   - Check for large images/files
   - Optimize CSS/JavaScript

### Manual Testing

```bash
# Test locally
npm run lighthouse

# Check specific URL
lighthouse https://zimax.net --output=json --output-path=./report.json
```

## Support

For Lighthouse CI issues:
- **Email**: derek@zimax.net
- **Phone**: +1 (213) 254-5197
- **Documentation**: https://github.com/GoogleChrome/lighthouse-ci

---

**Last Updated**: July 6, 2025  
**Version**: 1.0 