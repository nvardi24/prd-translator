# Fillable PRD Requirements Table
**Connector:** _______________

## Basic Information:
**Step 1 Research the API:** Understand the source system's capabilities before filling this out  
**Step 2 Brand Guidelines:** Ensure you have rights to use the connector's logo  
**Step 3 Release Planning:** Align P0/P1 with overall product roadmap  
**Step 4 User Experience:** Write descriptions that help users understand what this connector does

| Field | Your Connector | Notes/Instructions |
|-------|---------------|-------------------|
| Connector Name | _________________ | e.g., "ServiceNow", "Confluence" "Box"<br/>Becomes class name and constant |
| Connector Description | _________________ | "Ingest [content type] from [Connector Name]"<br/>Appears in connector section UI |
| API Documentation URL | _________________ | Official API docs link<br/>Eg: https://developer.zendesk.com/api-reference/ |
| P0 Release Target | _________________ | e.g., "260", "262" |
| P1 Release Target | _________________ | Next release after P0<br/>The one after p0 |
| Connector Icon/Logo | _________________ | URL or "Request from user"<br/>Helps UI selection |

## Authentication (Pick Primary + Optional Secondary)
**Determines how users will authenticate and what credentials they need to provide.**

**Step 1:** Research the API's authentication methods
- Check the API documentation for supported auth types
- Consider security requirements and user experience

**Step 2:** Select Primary Method (check ONE box)
- **API Token:** Simplest for users, good for SaaS platforms
- **OAuth 2.0:** Most secure, better for file systems and sensitive data
- **Basic Auth:** Simple but less secure, rarely used
- **Custom:** Only if none of the above work

**Step 3:** Map the auth fields to constants
- Field 1, 2, 3 become Java constants that developers use
- These constants must match what appears in the UI

| Auth Method | Selected | Auth Fields Required |
|-------------|----------|---------------------|
| API Token | ☐ | Email, Token, URL |
| OAuth 2.0 | ☐ | Client ID, Client Secret, (URL) |
| Basic Auth | ☐ | Email, Password, URL |
| Custom | ☐ | Specify: _____________ |

**Primary Auth Fields:**
- Field 1: _______________ (maps to constant: _______________)
- Field 2: _______________ (maps to constant: _______________)
- Field 3: _______________ (maps to constant: _______________)

## Core Data Types (What will you retrieve?)
**Defines what content/data the connector will retrieve and process.**

**Primary Objects** = The main content users care about
- Box: Files (users want to search files)
- Zendesk: Articles (users want to search knowledge base articles)
- Jira: Issues (users want to search project issues)

**Secondary Objects** = Supporting structure and metadata
- Box: Comments (file discussions)
- Zendesk: Categories, Sections (knowledge organization)
- Jira: Users, Groups, Teams (project participants)

**Tertiary Objects** = Additional context and attachments
- All connectors: Attachments (files linked to main content)
- Jira: Dashboards, Sprints (project management tools)

| Data Category | Data Type | Priority | Notes |
|---------------|-----------|----------|-------|
| Primary Objects | _________________ | P0/P1/P2 | Main content (files, articles, tickets) |
| Secondary Objects | _________________ | P0/P1/P2 | Supporting content (comments, users) |
| Tertiary Objects | _________________ | P0/P1/P2 | Additional content (attachments, metadata) |
| Attachments Support | (yes or no) | P0/P1/P2 | |
| Comments Support | (yes or no) | P0/P1/P2 | |

## Content Organization Structure
**Purpose:** Defines how content is organized in the source system and how users will select what to ingest.

| Structure Element | Your Value | Constant Name | Example |
|------------------|------------|---------------|---------|
| Primary Container | _________________ | _____________ | folders, categories, projects |
| Secondary Container | _________________ | _____________ | sections, boards, spaces |
| Selection Method | _________________ | | List input, dropdown, hierarchy |
| Structure Type | (Hierarchical, Flat or Mixed) | | How content is organized |

**File Type Support**
- File support relevant? Yes/No: _______
- Determines what file formats the connector can process and in what release.
- **Note:** File types are not always specific files - we can bring different data types, so if not stated, add as "Others" in the data extraction section.

| File Type | P0 | P1 | P2 | Not Supported |
|-----------|----|----|----|--------------| 
| .pdf | ☐ | ☐ | ☐ | ☐ |
| .docx/.doc | ☐ | ☐ | ☐ | ☐ |
| .pptx/.ppt | ☐ | ☐ | ☐ | ☐ |
| .xlsx/.xls | ☐ | ☐ | ☐ | ☐ |
| .png/.jpg | ☐ | ☐ | ☐ | ☐ |
| .html | ☐ | ☐ | ☐ | ☐ |
| .txt | ☐ | ☐ | ☐ | ☐ |
| Other: _______ | ☐ | ☐ | ☐ | ☐ |

## Filtering Capabilities
**This is the most complex section. It determines what filtering options users get to narrow down content ingestion**

| Filter Type | Supported | Constant Name | Priority | API or Client Filter |
|-------------|-----------|---------------|----------|---------------------|
| File Extensions<br/>Filter by file type (.pdf, .docx) | ☐ | FILE_PATTERNS | P0/P1/P2 | |
| Include Labels<br/>Filter Content tags (content management systems) | ☐ | INCLUDE_LABELS | P0/P1/P2 | |
| Exclude Labels | ☐ | EXCLUDE_LABELS | P0/P1/P2 | |
| Include Tags<br/>Metadata-rich systems (similar to labels) | ☐ | INCLUDE_TAGS | P0/P1/P2 | |
| Exclude Tags | ☐ | EXCLUDE_TAGS | P0/P1/P2 | |
| Creation Date Filter<br/>Only ingest content created after X date | ☐ | CREATION_DATE | P0/P1/P2 | |
| Last Updated Filter<br/>Only ingest content modified after X date | ☐ | LAST_UPDATED_DATE | P0/P1/P2 | |
| Permission Filters<br/>Only ingest content with certain permissions | ☐ | INCLUDE_PERMISSIONS | P0/P1/P2 | |
| Custom Filter: _______ | ☐ | _____________ | P0/P1/P2 | |

## Field UI Specifications
**Define how each field appears and behaves in the UI, replacing the need for Figma designs**

*[To be filled based on specific connector requirements]*

## Field Requirements and Behavior
**Define field logic, mandatory status, and empty field behavior**

*[To be filled based on specific connector requirements]*

## Validation Rules
**Define which fields need validation and when**

*[To be filled based on specific connector requirements]*

## Advanced Options
**Configures optional features that enhance the connector but aren't core functionality.**

| Option | Supported | Default<br/>(on or off) | Constant Name |
|--------|-----------|---------------------|---------------|
| Include Attachments<br/>To ingest files attached to main content | ☐ | | INCLUDE_ATTACHMENTS |
| Include Comments<br/>Whether to ingest discussion/comment threads | ☐ | | INCLUDE_COMMENTS |
| Include Archived Content<br/>Whether to ingest content marked as archived/deleted | ☐ | | INCLUDE_ARCHIVED |
| Language Auto-Detection<br/>Automatically detect content language for search | ☐ | | Built-in |
| Multi-language Support<br/>Support for content in multiple languages | ☐ | | Built-in |

## Sync Configurations
**Define scheduling and sync behavior**

*[To be filled based on specific connector requirements]*

## API Capabilities Analysis
**Documents the technical capabilities and limitations of the source system's API.**

**List Content:** Can we get a list of available content?  
**Download Files:** Can we download individual files?  
**Search/Filter:** Does the API support server-side filtering?  
**Get Metadata:** Can we retrieve content metadata separately?  
**Test Connection:** Can we validate credentials before saving?  
**Pagination:** How do we handle large datasets?

| Capability | Available | Rate Limit | Notes |
|------------|-----------|------------|-------|
| List Content | ☐ | ______/sec | Main content retrieval |
| Download Files | ☐ | ______/sec | Individual file download |
| Search/Filter | ☐ | ______/sec | Server-side filtering |
| Get Metadata | ☐ | ______/sec | Content metadata |
| Test Connection | ☐ | ______/sec | Credential validation |
| Pagination | ☐ | | Page size: _______ |

## UDLO Structure Definition
**Captures connector-specific logic that doesn't fit standard patterns**

*[To be filled based on specific connector requirements]*

## Special Requirements
**Captures connector-specific logic that doesn't fit standard patterns.**

| Requirement | Details | Priority |
|-------------|---------|----------|
| Custom Logic | _________________________ | P0/P1/P2 |
| Special Permissions | _________________________ | P0/P1/P2 |
| Unique Metadata | _________________________ | P0/P1/P2 |
| Integration Notes | _________________________ | P0/P1/P2 |

---

## Instructions for Use:
1. Fill out each section based on the connector's API documentation and requirements
2. Use this to generate the PRD document using the full template
3. Use the constants preview to create the {Connector}Constants.java file
4. Reference the implementation checklist to ensure nothing is missed

**Important Note:** File types that we should bring are not always specific files - we can bring different data types, so if it's not specifically stated, add it as "Others" in the data extraction section.