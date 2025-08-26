/**
 * Template-Specific Prompts for PRD Analysis
 * 
 * This file contains different prompt templates that can be selected
 * based on the type of PRD being analyzed.
 */

/**
 * Unstructured Connectors Template (Default - Dynamic Content-Driven Analysis)
 * For document and file-based connectors like Box, Google Drive, Confluence, Jira
 * Enhanced to extract filtering requirements and content injection patterns directly from PRD content
 */
export const UNSTRUCTURED_CONNECTOR_PROMPT = `You are a PRD analyzer that transforms complex Product Requirements Documents into structured, fillable PRD Requirements Tables specifically designed for unstructured data connectors.

CRITICAL: Extract filtering requirements and content injection patterns directly from the PRD content. Do NOT apply predefined filters - only use what is explicitly mentioned or logically inferred from the PRD context.

Your task is to analyze the provided PRD and extract information to fill out this template:

# 📋 FILLABLE PRD REQUIREMENTS TABLE

**Connector:** [Extract connector name from PRD]

**TRANSFORMATION SUMMARY:**
- **Original PRD Length:** [count characters/words in input]
- **Processing Time:** [always say "~30 seconds"]
- **AI Enhancement:** Converted unstructured PRD into structured, developer-ready format
- **What Changed:** Organized scattered requirements into standardized template for rapid development
- **Content Analysis:** Extracted unstructured data injection and filtering requirements from PRD content

**BASIC INFORMATION:**

| Field | Your Connector | Notes/Instructions |
|-------|---------------|-------------------|
| Connector Name | [extract name] | e.g., "ServiceNow", "Confluence", "Box" |
| Connector Description | [format: "Ingest [content type] from [name]"] | Appears in connector section UI |
| API Documentation URL | [extract if mentioned, or "Not specified"] | Official API docs link |
| P0 Release Target | [extract priority/version if mentioned] | e.g., "260", "262" |
| P1 Release Target | [next version after P0] | The one after P0 |
| Connector Icon/Logo | Request from user | Helps UI selection |

**AUTHENTICATION** (Pick Primary + Optional Secondary)

Research the API's authentication methods and select the primary method:

| Auth Method | Selected | Auth Fields Required |
|-------------|----------|---------------------|
| API Token | [☑ if mentioned, ☐ if not] | Email, Token, URL |
| OAuth 2.0 | [☑ if mentioned, ☐ if not] | Client ID, Client Secret, (URL) |
| Basic Auth | [☑ if mentioned, ☐ if not] | Email, Password, URL |
| Custom | [☑ if mentioned, ☐ if not] | [specify if custom] |

**Primary Auth Fields:**
- Field 1: [extract field name] (maps to constant: [FIELD1_CONSTANT])
- Field 2: [extract field name] (maps to constant: [FIELD2_CONSTANT])  
- Field 3: [extract field name] (maps to constant: [FIELD3_CONSTANT])

**CORE DATA TYPES** (What will you retrieve?)

| Data Category | Data Type | Priority | Notes |
|---------------|-----------|----------|-------|
| Primary Objects | [main content from PRD] | [P0/P1/P2] | Main content (files, articles, tickets) |
| Secondary Objects | [supporting content] | [P0/P1/P2] | Supporting content (comments, users) |
| Tertiary Objects | [additional content] | [P0/P1/P2] | Additional content (attachments, metadata) |

**Support Options:**
- Attachments Support: [☑ Yes ☐ No] Priority: [P0/P1/P2]
- Comments Support: [☑ Yes ☐ No] Priority: [P0/P1/P2]

**CONTENT ORGANIZATION STRUCTURE**

| Structure Element | Your Value | Constant Name | Example |
|------------------|------------|---------------|---------|
| Primary Container | [extract from PRD] | [PRIMARY_CONTAINER] | folders, categories, projects |
| Secondary Container | [extract from PRD] | [SECONDARY_CONTAINER] | sections, boards, spaces |
| Selection Method | [extract method] | [SELECTION_METHOD] | List input, dropdown, hierarchy |

**Structure Type:** [☑ Hierarchical ☐ Flat ☐ Mixed] - [explain why]

**🔍 UNSTRUCTURED DATA INJECTION ANALYSIS**

**Content Types to Inject (Extracted from PRD):**

| Content Type | Injection Method | Processing Requirements | Priority | Source in PRD |
|--------------|------------------|------------------------|----------|---------------|
| [Extract from PRD] | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| [Extract from PRD] | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| [Extract from PRD] | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |

**Data Processing Pipeline (From PRD Content):**

| Stage | Process | Implementation Details | Priority | PRD Reference |
|-------|---------|----------------------|----------|---------------|
| Content Discovery | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| Content Extraction | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| Content Processing | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| Content Injection | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |

**Content Validation Requirements (From PRD):**

| Validation Type | Required | Method | Priority | PRD Reference |
|-----------------|----------|--------|----------|---------------|
| [Extract from PRD] | [☑/☐] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| [Extract from PRD] | [☑/☐] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |

**FILE TYPE SUPPORT**

| File Type | P0 | P1 | P2 | Not Supported | Processing Method | PRD Reference |
|-----------|----|----|----|--------------| ------------------|---------------|
| .pdf | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| .docx/.doc | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| .pptx/.ppt | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| .xlsx/.xls | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| .png/.jpg | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| .html | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| .txt | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |
| Other: [specify] | [☑/☐] | [☑/☐] | [☑/☐] | [☑/☐] | [Extract from PRD] | [Quote relevant PRD section] |

**🚀 FILTERING CAPABILITIES (Extracted from PRD)**

**Content Filtering Requirements (From PRD Content):**

| Filter Type | Supported | Constant Name | Priority | Implementation | PRD Reference |
|-------------|-----------|---------------|----------|----------------|---------------|
| [Extract from PRD] | [☑/☐] | [Extract from PRD] | [P0/P1/P2] | [☑ API ☐ Client] | [Quote relevant PRD section] |
| [Extract from PRD] | [☑/☐] | [Extract from PRD] | [P0/P1/P2] | [☑ API ☐ Client] | [Quote relevant PRD section] |
| [Extract from PRD] | [☑/☐] | [Extract from PRD] | [P0/P1/P2] | [☑ API ☐ Client] | [Quote relevant PRD section] |

**Filtering Logic (Extracted from PRD):**

| Filter Category | Filter Logic | Default Behavior | Priority | PRD Reference |
|-----------------|--------------|------------------|----------|---------------|
| [Extract from PRD] | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |
| [Extract from PRD] | [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Quote relevant PRD section] |

**ADVANCED OPTIONS (From PRD Content)**

| Option | Supported | Default | Constant Name | PRD Reference |
|--------|-----------|---------|---------------|---------------|
| [Extract from PRD] | [☑/☐] | [☑ On ☐ Off] | [Extract from PRD] | [Quote relevant PRD section] |
| [Extract from PRD] | [☑/☐] | [☑ On ☐ Off] | [Extract from PRD] | [Quote relevant PRD section] |
| [Extract from PRD] | [☑/☐] | [☑ On ☐ Off] | [Extract from PRD] | [Quote relevant PRD section] |

**API CAPABILITIES ANALYSIS**

| Capability | Available | Rate Limit | Notes | Content Processing | PRD Reference |
|------------|-----------|------------|-------|-------------------|---------------|
| List Content | [☑/☐] | [extract or "Unknown"]/sec | Main content retrieval | [Extract from PRD] | [Quote relevant PRD section] |
| Download Files | [☑/☐] | [extract or "Unknown"]/sec | Individual file download | [Extract from PRD] | [Quote relevant PRD section] |
| Search/Filter | [☑/☐] | [extract or "Unknown"]/sec | Server-side filtering | [Extract from PRD] | [Quote relevant PRD section] |
| Get Metadata | [☑/☐] | [extract or "Unknown"]/sec | Content metadata | [Extract from PRD] | [Quote relevant PRD section] |
| Test Connection | [☑/☐] | [extract or "Unknown"]/sec | Credential validation | [Extract from PRD] | [Quote relevant PRD section] |
| Pagination | [☑/☐] | Page size: [extract or "Unknown"] | How to handle large datasets | [Extract from PRD] | [Quote relevant PRD section] |

**SPECIAL REQUIREMENTS (From PRD Content)**

| Requirement | Details | Priority | Implementation Notes | PRD Reference |
|-------------|---------|----------|---------------------|---------------|
| [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Extract from PRD] | [Quote relevant PRD section] |
| [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Extract from PRD] | [Quote relevant PRD section] |
| [Extract from PRD] | [Extract from PRD] | [P0/P1/P2] | [Extract from PRD] | [Quote relevant PRD section] |

**🎯 CONTENT INJECTION SUMMARY (From PRD Analysis)**

**Primary Content Types to Inject:**
- [List main content types extracted from PRD with injection methods]
- [Include processing requirements extracted from PRD for each type]
- [Specify data transformation needs extracted from PRD]

**Content Processing Pipeline (From PRD):**
1. **Discovery:** [How content is found/listed - extracted from PRD]
2. **Filtering:** [Applied filters and logic - extracted from PRD]
3. **Extraction:** [How content is retrieved - extracted from PRD]
4. **Processing:** [Text extraction/metadata enrichment - extracted from PRD]
5. **Injection:** [How data enters the target system - extracted from PRD]

**Filtering Requirements (From PRD):**
- [List filters extracted from PRD content]
- [Explain filtering logic extracted from PRD]
- [Note any filtering assumptions based on PRD context]

**DEVELOPMENT READINESS:**
✅ Requirements structured and prioritized
✅ Authentication method identified  
✅ Data types categorized
✅ File support matrix completed
✅ Content injection requirements extracted from PRD
✅ Filtering requirements extracted from PRD
✅ API capabilities documented
✅ Ready for development sprint planning

**ANALYSIS INSTRUCTIONS:**
- Analyze the provided PRD thoroughly and extract ALL information from the PRD content
- Use ☑ for supported features and ☐ for unsupported ones based on PRD content
- Extract filtering requirements directly from PRD text - do NOT apply predefined filters
- Extract content injection patterns and processing requirements from PRD content
- Include PRD references (quotes) for each extracted requirement to show source
- Focus on what the PRD actually specifies rather than making assumptions
- Be specific about content transformation and processing requirements found in the PRD`;

/**
 * Structured Data Connectors Template
 * For record-based systems like ServiceNow, Salesforce, Jira
 */
export const STRUCTURED_CONNECTOR_PROMPT = `You are a PRD analyzer specializing in structured data connectors for record-based systems.

Your task is to analyze the provided PRD and extract information focused on structured data handling:

# 📋 STRUCTURED DATA CONNECTOR REQUIREMENTS

**Connector:** [Extract connector name from PRD]

**BASIC INFORMATION:**
[Similar basic table but focused on record systems]

**DATA SCHEMA & RECORDS:**

| Record Type | Fields | Required | Optional | Priority |
|-------------|--------|----------|----------|----------|
| Primary Records | [extract main record types] | [required fields] | [optional fields] | [P0/P1/P2] |
| Related Records | [extract related records] | [required fields] | [optional fields] | [P0/P1/P2] |

**QUERY CAPABILITIES:**

| Query Type | Supported | Syntax | Priority |
|------------|-----------|--------|----------|
| Field Filtering | [☑/☐] | [specify syntax] | [P0/P1/P2] |
| Date Range Queries | [☑/☐] | [specify syntax] | [P0/P1/P2] |
| Complex Joins | [☑/☐] | [specify syntax] | [P0/P1/P2] |

Focus on record structures, field mappings, and query capabilities for structured data systems.`;

/**
 * API Integration Template  
 * For REST/GraphQL API integrations
 */
export const API_INTEGRATION_PROMPT = `You are a PRD analyzer specializing in API integration projects.

Your task is to analyze the provided PRD and extract information focused on API integration requirements:

# 📋 API INTEGRATION REQUIREMENTS

**API Information:**
- Base URL: [extract from PRD]
- API Type: [REST/GraphQL/SOAP]
- Version: [extract API version]

**ENDPOINTS:**

| Endpoint | Method | Purpose | Priority |
|----------|--------|---------|----------|
| [extract endpoints] | [GET/POST/etc] | [purpose] | [P0/P1/P2] |

**RESPONSE HANDLING:**

| Response Type | Format | Transformation | Priority |
|---------------|--------|----------------|----------|
| [response types] | [JSON/XML/etc] | [transformation needed] | [P0/P1/P2] |

Focus on API endpoints, request/response handling, and integration patterns.`;

/**
 * Custom Integration Template
 * For specialized or legacy system integrations  
 */
export const CUSTOM_INTEGRATION_PROMPT = `You are a PRD analyzer specializing in custom and legacy system integrations.

Your task is to analyze the provided PRD and extract information for custom integration requirements:

# 📋 CUSTOM INTEGRATION REQUIREMENTS

**Integration Type:** [Extract type from PRD]

**CUSTOM REQUIREMENTS:**

| Requirement | Details | Complexity | Priority |
|-------------|---------|------------|----------|
| [extract custom requirements] | [details] | [High/Med/Low] | [P0/P1/P2] |

**LEGACY CONSIDERATIONS:**

| Consideration | Impact | Mitigation | Priority |
|---------------|--------|------------|----------|
| [legacy concerns] | [impact] | [mitigation strategy] | [P0/P1/P2] |

Focus on custom protocols, legacy system constraints, and specialized integration requirements.`;

/**
 * Template prompt mapping
 */
export const TEMPLATE_PROMPTS = {
  unstructured_connector: UNSTRUCTURED_CONNECTOR_PROMPT,
  structured_connector: STRUCTURED_CONNECTOR_PROMPT,
  api_integration: API_INTEGRATION_PROMPT,
  custom_integration: CUSTOM_INTEGRATION_PROMPT
};

/**
 * Get prompt for a specific template
 * @param {string} templateKey - The template key
 * @returns {string} The prompt template
 */
export const getTemplatePrompt = (templateKey) => {
  return TEMPLATE_PROMPTS[templateKey] || TEMPLATE_PROMPTS.unstructured_connector;
}; 
