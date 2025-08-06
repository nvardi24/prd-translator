/**
 * PRD Template Types and Configuration
 * 
 * This file defines different PRD analysis templates that can be selected
 * by users. Each template has its own prompt and configuration.
 */

export const TEMPLATE_TYPES = {
  UNSTRUCTURED_CONNECTOR: 'unstructured_connector',
  STRUCTURED_CONNECTOR: 'structured_connector',
  API_INTEGRATION: 'api_integration',
  CUSTOM_INTEGRATION: 'custom_integration'
};

export const TEMPLATE_CONFIGURATIONS = {
  [TEMPLATE_TYPES.UNSTRUCTURED_CONNECTOR]: {
    id: TEMPLATE_TYPES.UNSTRUCTURED_CONNECTOR,
    name: 'Unstructured Connectors',
    description: 'For document and file-based connectors (Box, Google Drive, Confluence, etc.)',
    isDefault: true,
    enableWebSearch: true,
    icon: '📄',
    promptKey: 'unstructured_connector'
  },
  
  [TEMPLATE_TYPES.STRUCTURED_CONNECTOR]: {
    id: TEMPLATE_TYPES.STRUCTURED_CONNECTOR,
    name: 'Structured Data Connectors',
    description: 'For record-based systems (ServiceNow, Salesforce, Jira, etc.)',
    isDefault: false,
    enableWebSearch: true,
    icon: '🗃️',
    promptKey: 'structured_connector'
  },
  
  [TEMPLATE_TYPES.API_INTEGRATION]: {
    id: TEMPLATE_TYPES.API_INTEGRATION,
    name: 'API Integrations',
    description: 'For REST/GraphQL API integrations and custom endpoints',
    isDefault: false,
    enableWebSearch: false,
    icon: '🔌',
    promptKey: 'api_integration'
  },
  
  [TEMPLATE_TYPES.CUSTOM_INTEGRATION]: {
    id: TEMPLATE_TYPES.CUSTOM_INTEGRATION,
    name: 'Custom Integrations',
    description: 'For specialized or legacy system integrations',
    isDefault: false,
    enableWebSearch: false,
    icon: '⚙️',
    promptKey: 'custom_integration'
  }
};

/**
 * Get all available template types
 * @returns {Array} Array of template configuration objects
 */
export const getTemplateTypes = () => {
  return Object.values(TEMPLATE_CONFIGURATIONS);
};

/**
 * Get template configuration by ID
 * @param {string} templateId - The template ID
 * @returns {object} Template configuration
 */
export const getTemplateConfig = (templateId) => {
  return TEMPLATE_CONFIGURATIONS[templateId] || TEMPLATE_CONFIGURATIONS[TEMPLATE_TYPES.UNSTRUCTURED_CONNECTOR];
};

/**
 * Get the default template
 * @returns {object} Default template configuration
 */
export const getDefaultTemplate = () => {
  return Object.values(TEMPLATE_CONFIGURATIONS).find(template => template.isDefault) || 
         TEMPLATE_CONFIGURATIONS[TEMPLATE_TYPES.UNSTRUCTURED_CONNECTOR];
};

/**
 * Check if web search should be enabled for a template
 * @param {string} templateId - The template ID
 * @returns {boolean} Whether web search should be enabled
 */
export const shouldEnableWebSearch = (templateId) => {
  const config = getTemplateConfig(templateId);
  return config.enableWebSearch;
}; 