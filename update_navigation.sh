#!/bin/bash

# Script to add flyout navigation to all product pages

# Flyout navigation HTML snippet
FLYOUT_NAV='    <!-- Flyout Left Navigation -->
    <button class="flyout-menu-btn" aria-label="Open navigation">&#9776;</button>
    <aside class="flyout-nav" id="flyoutNav" aria-label="Site navigation">
      <button class="flyout-close-btn" aria-label="Close navigation">&times;</button>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li>
            <span>Products</span>
            <ul>
              <li><a href="/products/aimcs/">AIMCS</a></li>
              <li><a href="/products/aimcs-lite/">AIMCS Lite</a></li>
              <li><a href="/products/azure-ai-foundry/">Azure AI Foundry</a></li>
              <li><a href="/products/azure-container-platform/">Azure Container Platform</a></li>
              <li><a href="/products/azure-networking-security/">Azure Networking & Security</a></li>
              <li><a href="/products/azure-data-analytics/">Azure Data & Analytics</a></li>
            </ul>
          </li>
          <li>
            <span>Services</span>
            <ul>
              <li><a href="/products/ai-strategy-assessment/">AI Strategy & Assessment</a></li>
              <li><a href="/products/custom-ai-development/">Custom AI Development</a></li>
              <li><a href="/products/ai-integration-services/">AI Integration Services</a></li>
              <li><a href="/products/devops-automation/">DevOps & Automation</a></li>
              <li><a href="/products/application-modernization/">Application Modernization</a></li>
              <li><a href="/products/monitoring-optimization/">Monitoring & Optimization</a></li>
            </ul>
          </li>
          <li>
            <span>Managed Services</span>
            <ul>
              <li><a href="/products/azure-infrastructure-management/">Azure Infrastructure Management</a></li>
              <li><a href="/products/ai-platform-operations/">AI Platform Operations</a></li>
              <li><a href="/products/support-training/">Support & Training</a></li>
            </ul>
          </li>
          <li>
            <span>Industry Solutions</span>
            <ul>
              <li><a href="/products/healthcare-ai-solutions/">Healthcare AI</a></li>
              <li><a href="/products/financial-services-ai/">Financial Services AI</a></li>
              <li><a href="/products/retail-ecommerce-ai/">Retail & E-commerce AI</a></li>
              <li><a href="/products/manufacturing-ai/">Manufacturing AI</a></li>
            </ul>
          </li>
          <li>
            <span>Packages</span>
            <ul>
              <li><a href="/products/enterprise-package/">Enterprise Package</a></li>
              <li><a href="/products/startup-package/">Startup Package</a></li>
            </ul>
          </li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </aside>
    <div class="flyout-overlay" id="flyoutOverlay"></div>'

# Find all product pages
find products -name "index.html" -type f | while read file; do
    echo "Processing: $file"
    
    # Skip the main products page and AIMCS (already updated)
    if [[ "$file" == "products/index.html" || "$file" == "products/aimcs/index.html" ]]; then
        echo "Skipping $file (already updated)"
        continue
    fi
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Add script tag if not present
    if ! grep -q "script.js" "$file"; then
        sed 's|</head>|    <script src="../../script.js"></script>\n</head>|' "$file" > "$temp_file"
        mv "$temp_file" "$file"
    fi
    
    # Add flyout navigation after header
    if ! grep -q "flyout-nav" "$file"; then
        sed '/<\/header>/a\'"$FLYOUT_NAV" "$file" > "$temp_file"
        mv "$temp_file" "$file"
    fi
    
    echo "Updated: $file"
done

echo "Navigation update complete!" 