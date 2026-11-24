---
name: eh-wstg
description: "The OWASP Web Security Testing Guide — the detailed, category-by-category test plan for web applications and web APIs. Use when the target is a website, web app, or HTTP API and you need to decide what to test and in what order. It is the practical starting point for a developer testing their own software."
metadata:
  generatedBy: "1.0.1"
---

# OWASP WSTG — web application and API testing

**One question:** what should I test on this web application or API, and how?

The WSTG is the most practical guide in this set for a developer. It is a **testing guide**, not a
process and not a permission. PTES tells you when to test; the WSTG tells you what to test.

## Version

The current stable version is **v4.2**. Version 5.0 is in development. Cite the versioned link
when you cite a scenario — the `stable` and `latest` links move.

Test identifiers take the form **`WSTG-<category>-<number>`**, for example `WSTG-INFO-02`. A
version-specific citation adds the version: `WSTG-v42-INFO-02`.

## The twelve test categories

The guide's contents, in order:

### 4.1 Information Gathering

Search-engine discovery for information leakage, fingerprinting the web server and framework,
reviewing metafiles for leakage, enumerating applications on the server, reviewing page content
for leakage, identifying entry points, mapping execution paths, fingerprinting the application, and
mapping the application architecture.

### 4.2 Configuration and Deployment Management Testing

Network infrastructure configuration, application platform configuration, file-extension handling,
old backup and unreferenced files, admin interfaces, HTTP methods, HSTS, cross-domain policy,
file permissions, subdomain takeover, and cloud storage.

### 4.3 Identity Management Testing

Role definitions, registration, account provisioning, account enumeration and guessable accounts,
and the username policy.

### 4.4 Authentication Testing

Credentials over an encrypted channel, default credentials, lock-out mechanisms, bypassing the
authentication schema, remember-password features, browser cache weaknesses, password policy,
security questions, password change and reset, and weaker authentication in an alternative
channel.

### 4.5 Authorization Testing

Directory traversal and file include, bypassing the authorization schema, privilege escalation, and
insecure direct object references.

### 4.6 Session Management Testing

Session schema, cookie attributes, session fixation, exposed session variables, cross-site request
forgery, logout, timeout, session puzzling, and session hijacking.

### 4.7 Input Validation Testing

Reflected and stored XSS, HTTP verb tampering, parameter pollution, SQL injection (including
Oracle, MySQL, SQL Server, PostgreSQL, MS Access, NoSQL, ORM, and client-side), LDAP, XML, SSI,
XPath, IMAP/SMTP, code injection, local and remote file inclusion, command injection, format
strings, incubated vulnerabilities, HTTP splitting and smuggling, incoming requests, host-header
injection, server-side template injection, and SSRF.

### 4.8 Testing for Error Handling

Improper error handling and stack traces.

### 4.9 Testing for Weak Cryptography

Weak transport layer security, padding oracle, sensitive information over unencrypted channels, and
weak encryption.

### 4.10 Business Logic Testing

Data validation, forged requests, integrity checks, process timing, function-use limits, workflow
circumvention, defences against application misuse, and upload of unexpected or malicious files.

### 4.11 Client-side Testing

DOM-based XSS, JavaScript execution, HTML injection, client-side URL redirect, CSS injection,
client-side resource manipulation, CORS, cross-site flashing, clickjacking, WebSockets, web
messaging, browser storage, and cross-site script inclusion.

### 4.12 API Testing

GraphQL testing. Treat the API as its own surface: also load `eh-api-top10`.

### 5. Reporting

The guide has its own reporting section. Use the report shape in the identity; the WSTG's
recommendations are compatible with it.

## The SDLC phases

The WSTG also places testing across the development lifecycle:

1. before development begins;
2. during definition and design;
3. during development;
4. during deployment;
5. during maintenance and operations.

This matters for the owner: a test does not have to wait for production. If the software is still
being built, testing earlier is cheaper.

## How to use it

1. Start with **4.1 Information Gathering**. You cannot test what you have not mapped.
2. Work the identity and access path next: **4.3 → 4.4 → 4.5 → 4.6**. Most serious web findings
   are broken access control, authentication, or session handling.
3. Work input handling and server-side execution next: **4.7 → 4.8 → 4.9**.
4. Work **4.10 Business Logic** with the owner's help. A generic scanner cannot know what the
   workflow is supposed to do; the owner can.
5. Work **4.11 Client-side** where the app has meaningful browser state or JavaScript.
6. Work **4.12 API Testing** if the app exposes an API. Load `eh-api-top10` as the coverage check.
7. For each scenario, the guide gives **objectives, methodology, tools, and remediation guidance**.
   Use its objectives as the test's pass/fail question, not a vague "check for X".
8. Cite the scenario ID in the finding: `WSTG-v42-ATHZ-01`, for example. That is how the owner can
   look it up.

## What this skill does not decide

- It does not cover network, host, mobile, physical, or social testing. Use PTES, NIST, or MASTG.
- It does not cover cloud configuration beyond the cloud-storage test — a cloud account is a
  separate scope and often a separate owner.
- It does not authorize an exploit. A test scenario describes what to try; the phase gate is still
  the identity's rule.
- It is not exhaustive. A clean WSTG pass is not proof that the app is secure.

## Source

- OWASP Web Security Testing Guide, v4.2 — https://wstg.owasp.org/v4.2/
- Project page — https://owasp.org/www-project-web-security-testing-guide/
- Checked 2026-11-06. The category list, the SDLC phases, the test-ID format, and the
  objectives/methodology/tools/remediation structure were read from the v4.2 contents.
