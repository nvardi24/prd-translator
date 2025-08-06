/**
 * Research Service for gathering current API information
 * 
 * This service performs web research to gather up-to-date information
 * about APIs, SDKs, authentication methods, and capabilities for
 * services identified in PRDs.
 */

import { errorHandling } from '../utils/errorHandling';

class ResearchService {
  constructor() {
    this.webSearchFunction = null;
  }

  // Set the web search function (injected from the hook)
  setWebSearchFunction(webSearchFn) {
    this.webSearchFunction = webSearchFn;
  }

  /**
   * Research API information for a specific service
   * @param {string} serviceName - The service to research (e.g., "Box", "ServiceNow")
   * @returns {Promise<string>} Formatted research data
   */
  async researchServiceAPI(serviceName) {
    if (!this.webSearchFunction) {
      console.warn('Web search function not available, skipping research');
      return null;
    }

    if (!serviceName || serviceName === 'Unknown') {
      return null;
    }

    try {
      console.log(`🔍 Researching ${serviceName} API...`);
      
      // Search for API documentation and authentication
      const apiSearches = await Promise.allSettled([
        this.webSearchFunction(`${serviceName} API documentation authentication 2024`),
        this.webSearchFunction(`${serviceName} REST API endpoints rate limits 2024`),
        this.webSearchFunction(`${serviceName} API SDK developer guide 2024`)
      ]);

      // Extract successful search results
      const results = apiSearches
        .filter(result => result.status === 'fulfilled' && result.value)
        .map(result => result.value);

      if (results.length === 0) {
        console.warn(`No research results found for ${serviceName}`);
        return null;
      }

      // Format the research data
      const researchData = this.formatResearchData(serviceName, results);
      console.log(`✅ Research completed for ${serviceName}`);
      
      return researchData;
    } catch (error) {
      errorHandling.logError(error, `Research failed for ${serviceName}`);
      return null;
    }
  }

  /**
   * Format research results into structured data for AI analysis
   * @param {string} serviceName - The service name
   * @param {Array} searchResults - Array of search results
   * @returns {string} Formatted research data
   */
  formatResearchData(serviceName, searchResults) {
    const combinedResults = searchResults.join('\n\n---\n\n');
    
    return `=== CURRENT API RESEARCH FOR ${serviceName.toUpperCase()} ===

RESEARCH DATE: ${new Date().toISOString().split('T')[0]}

SEARCH RESULTS:
${combinedResults}

=== INSTRUCTIONS FOR AI ANALYSIS ===
Use the above current information to provide accurate details for:
1. Authentication methods (API keys, OAuth, etc.)
2. API endpoints and capabilities
3. Rate limits and pagination
4. Supported file types and content
5. Error handling and status codes
6. SDK availability and recommendations
7. Any recent API changes or deprecations

Prioritize information from official documentation and recent sources.`;
  }

  /**
   * Get research summary for display to user
   * @param {string} serviceName - The service name
   * @param {string} researchData - The research data
   * @returns {object} Summary object
   */
  getResearchSummary(serviceName, researchData) {
    if (!researchData) {
      return {
        status: 'skipped',
        service: serviceName,
        message: 'No web research performed'
      };
    }

    const lines = researchData.split('\n').length;
    const hasOfficialDocs = researchData.toLowerCase().includes('official') || 
                           researchData.toLowerCase().includes('documentation');
    
    return {
      status: 'completed',
      service: serviceName,
      message: `Researched current ${serviceName} API (${lines} lines)`,
      hasOfficialDocs,
      timestamp: new Date().toISOString()
    };
  }
}

export const researchService = new ResearchService(); 