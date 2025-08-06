/**
 * Validation utility functions
 */

export const validation = {
  // Validate OpenAI API key format
  isValidApiKey: (apiKey) => {
    if (!apiKey || typeof apiKey !== 'string') return false;
    return apiKey.trim().length >= 10 && apiKey.startsWith('sk-');
  },

  // Validate PRD text
  isValidPRD: (text) => {
    if (!text || typeof text !== 'string') return false;
    return text.trim().length >= 100;
  },

  // Validate model selection
  isValidModel: (model) => {
    const validModels = ['gpt-3.5-turbo', 'gpt-4', 'gpt-4-turbo'];
    return validModels.includes(model);
  },

  // Get validation message for PRD
  getPRDValidationMessage: (text) => {
    if (!text) return '';
    const length = text.length;
    const minLength = 100;
    
    if (length === 0) return '';
    if (length < minLength) return `Minimum ${minLength} characters required (${minLength - length} more needed)`;
    return 'Ready to process';
  },

  // Get character count info
  getCharacterInfo: (text) => {
    const length = text.length;
    const minLength = 100;
    
    return {
      count: length,
      isValid: length >= minLength,
      isReady: length >= minLength,
      message: validation.getPRDValidationMessage(text)
    };
  }
};

export const { isValidApiKey, isValidPRD, isValidModel, getPRDValidationMessage, getCharacterInfo } = validation; 