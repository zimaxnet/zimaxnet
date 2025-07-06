#!/bin/bash

# Zimax Networks CI/CD Setup Script
# This script helps set up GitHub Actions and Lighthouse CI

echo "🚀 Zimax Networks CI/CD Setup"
echo "=============================="
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Error: Please run this script from the zimaxnet repository root"
    exit 1
fi

echo "✅ Repository found"
echo ""

# Check if GitHub Actions workflows exist
if [ -d ".github/workflows" ]; then
    echo "✅ GitHub Actions workflows found"
else
    echo "❌ GitHub Actions workflows not found"
    exit 1
fi

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ Package.json found"
else
    echo "❌ Package.json not found"
    exit 1
fi

# Check if lighthouserc.js exists
if [ -f "lighthouserc.js" ]; then
    echo "✅ Lighthouse CI config found"
else
    echo "❌ Lighthouse CI config not found"
    exit 1
fi

echo ""
echo "📋 Setup Checklist:"
echo "=================="
echo ""

echo "1. Azure Static Web Apps Setup:"
echo "   - Go to: https://portal.azure.com"
echo "   - Create Static Web App"
echo "   - Connect to GitHub repository: zimaxnet/zimaxnet"
echo "   - Set app location to: build/"
echo "   - Copy deployment token"
echo ""

echo "2. Add GitHub Secrets:"
echo "   - Go to: https://github.com/zimaxnet/zimaxnet/settings/secrets/actions"
echo "   - Add secret: AZURE_STATIC_WEB_APPS_API_TOKEN"
echo "   - Value: [Your Azure deployment token]"
echo ""

echo "3. Lighthouse CI Setup:"
echo "   - Install: npm install -g @lhci/cli@0.12.x"
echo "   - Initialize: lhci init"
echo "   - Follow prompts to create GitHub App"
echo "   - Copy Lighthouse CI token"
echo ""

echo "4. Add Lighthouse CI Secret:"
echo "   - Go to: https://github.com/zimaxnet/zimaxnet/settings/secrets/actions"
echo "   - Add secret: LHCI_GITHUB_APP_TOKEN"
echo "   - Value: [Your Lighthouse CI token]"
echo ""

echo "5. Test Setup:"
echo "   - Make a small change to the website"
echo "   - Commit and push to main branch"
echo "   - Check GitHub Actions tab for deployment"
echo ""

echo "📚 Documentation:"
echo "================"
echo "- Azure Setup: AZURE_SETUP.md"
echo "- Lighthouse Setup: LIGHTHOUSE_SETUP.md"
echo "- CI/CD Setup: CI_CD_SETUP.md"
echo ""

echo "🎯 Next Steps:"
echo "============="
echo "1. Follow the Azure setup guide in AZURE_SETUP.md"
echo "2. Follow the Lighthouse setup guide in LIGHTHOUSE_SETUP.md"
echo "3. Test the deployment with a small change"
echo "4. Monitor performance in GitHub Actions"
echo ""

echo "📞 Support:"
echo "=========="
echo "- Email: derek@zimax.net"
echo "- Phone: +1 (213) 254-5197"
echo ""

echo "✅ Setup script completed!"
echo "Check the documentation files for detailed instructions." 