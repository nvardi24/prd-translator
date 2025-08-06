import OpenAI from 'openai';
import { errorHandling } from '../utils/errorHandling';
import { BASE_CURSOR_PROMPT_GENERATOR, getPromptConfig } from '../prompts/connectorPrompts';
import { getTemplatePrompt } from '../prompts/templatePrompts';

class OpenAIService {
  constructor() {
    this.client = null;
  }

  initialize(apiKey) {
    if (!apiKey) {
      throw errorHandling.createError('API key is required', 'MISSING_API_KEY');
    }

    this.client = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async testConnection() {
    if (!this.client) {
      throw errorHandling.createError('OpenAI client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const config = getPromptConfig('connectionTest');
      const response = await this.client.chat.completions.create({
        model: config.model,
        messages: [{ role: 'user', content: config.userPrompt }],
        max_tokens: config.maxTokens,
        temperature: config.temperature
      });

      return response.choices[0].message.content;
    } catch (error) {
      errorHandling.logError(error, 'Connection test failed');
      const message = errorHandling.parseOpenAIError(error);
      throw errorHandling.createError(message, error.code);
    }
  }

  async parsePRD(prdText, model = 'gpt-3.5-turbo', templateId = 'unstructured_connector', researchData = null) {
    if (!this.client) {
      throw errorHandling.createError('OpenAI client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    if (!prdText || prdText.trim().length === 0) {
      throw errorHandling.createError('PRD text is required', 'MISSING_PRD_TEXT');
    }

    try {
      const config = getPromptConfig('prdAnalyzer');
      
      // Get the template-specific prompt
      let templatePrompt = getTemplatePrompt(templateId);
      
      // Enhance with research data if available
      if (researchData) {
        templatePrompt += `\n\nIMPORTANT: Use the following current API research data to provide accurate, up-to-date information in your analysis:\n\n${researchData}\n\nUse this research to fill out authentication methods, API capabilities, rate limits, file types, and technical requirements with CURRENT and ACCURATE information instead of generic placeholders.`;
      }
      
      let userMessage = `Here's the PRD to analyze:\n\n${prdText}`;
      
      if (researchData) {
        userMessage += `\n\nAPI Research Data Available: Use the provided research data to ensure accuracy.`;
      }
      
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: templatePrompt },
          { role: 'user', content: userMessage }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature
      });

      return response.choices[0].message.content;
    } catch (error) {
      errorHandling.logError(error, 'PRD parsing failed');
      const message = errorHandling.parseOpenAIError(error);
      throw errorHandling.createError(message, error.code);
    }
  }

  async generateCursorPrompt(structuredPRD, model = 'gpt-3.5-turbo') {
    if (!this.client) {
      throw errorHandling.createError('OpenAI client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    if (!structuredPRD || structuredPRD.trim().length === 0) {
      throw errorHandling.createError('Structured PRD is required', 'MISSING_STRUCTURED_PRD');
    }

    try {
      const config = getPromptConfig('cursorGenerator');
      
      // Use the base cursor prompt generator (same for all templates)
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          { role: 'system', content: BASE_CURSOR_PROMPT_GENERATOR },
          { role: 'user', content: `Here's the structured PRD Requirements Table to convert into a Cursor prompt:\n\n${structuredPRD}` }
        ],
        max_tokens: config.maxTokens,
        temperature: config.temperature
      });

      return response.choices[0].message.content;
    } catch (error) {
      errorHandling.logError(error, 'Cursor prompt generation failed');
      const message = errorHandling.parseOpenAIError(error);
      throw errorHandling.createError(message, error.code);
    }
  }

  async identifyServiceFromPRD(prdText, model = 'gpt-3.5-turbo') {
    if (!this.client) {
      throw errorHandling.createError('OpenAI client not initialized', 'CLIENT_NOT_INITIALIZED');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: model,
        messages: [
          { 
            role: 'system', 
            content: `You are a service identifier. Extract the main service/platform name from PRD text. Return ONLY the service name (e.g., "Box", "ServiceNow", "Confluence", "GitHub", "Jira", "Slack"). If unclear, return "Unknown".` 
          },
          { 
            role: 'user', 
            content: `Identify the main service/platform from this PRD:\n\n${prdText}` 
          }
        ],
        max_tokens: 50,
        temperature: 0
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      errorHandling.logError(error, 'Service identification failed');
      return 'Unknown';
    }
  }
}

export const openaiService = new OpenAIService(); 