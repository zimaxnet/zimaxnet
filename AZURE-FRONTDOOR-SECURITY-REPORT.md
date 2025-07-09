# Azure Front Door Security Hardening: Enterprise-Grade Protection for zimax.net

## Executive Summary

Zimax Networks has completed a comprehensive security hardening of its public web presence (zimax.net) using Azure Front Door Standard/Premium. This project delivers best-in-class TLS, HTTP security headers, and automated compliance, resulting in an SSL Labs A rating and eligibility for HSTS preloading.

---

## Business Value
- **Enterprise Trust**: Meets procurement and compliance requirements for Fortune 500 and regulated industries.
- **User Confidence**: Secure padlock, no browser warnings, and protection against common web attacks.
- **SEO & Performance**: Secure, fast, and globally distributed with Azure Front Door.

---

## Technical Highlights

### 1. TLS & Certificate
- Only TLS 1.3 and 1.2 are enabled; all legacy protocols are disabled.
- Strong RSA 2048-bit certificate issued by GeoTrust/DigiCert.
- SSL Labs A rating achieved.

### 2. HTTP Security Headers
- **Strict-Transport-Security**: `max-age=63072000; includeSubDomains; preload` (2 years, HSTS preloading)
- **X-Frame-Options**: `DENY` (prevents clickjacking)
- **X-Content-Type-Options**: `nosniff` (prevents MIME sniffing)
- **Referrer-Policy**: `strict-origin-when-cross-origin` (privacy by default)
- **X-XSS-Protection**: `1; mode=block` (browser XSS filter)
- **Content-Security-Policy**: `default-src 'self'` (prevents resource injection)

### 3. Infrastructure as Code
- All security headers and routing rules are managed via Bicep templates.
- Automated deployment ensures consistency and auditability.

### 4. Continuous Validation
- SSL Labs and securityheaders.com are used to validate every deployment.

---

## Implementation Steps
1. **Azure Front Door Standard/Premium** deployed as the global entry point.
2. **Custom domains** (`zimax.net`) added and validated.
3. **Security headers** implemented via Bicep and associated with the main route.
4. **HSTS max-age** set to 2 years for preloading.
5. **Automated monitoring** using SSL Labs and securityheaders.com.

---

## Results
- **SSL Labs A rating**
- **HSTS preloading eligible**
- **All modern security headers present**
- **Zero-touch, automated security posture**

---

## Learn More
- [SSL Labs Report for zimax.net](https://www.ssllabs.com/ssltest/analyze.html?d=zimax.net)
- [securityheaders.com Results](https://securityheaders.com/?q=zimax.net)
- [Azure Front Door Documentation](https://learn.microsoft.com/en-us/azure/frontdoor/)

---

*This report is suitable for sharing on LinkedIn, Alignable, or with enterprise clients to demonstrate Zimax Networks' commitment to security and compliance.* 