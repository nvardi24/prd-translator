/**
 * Error handling utility functions
 */

export const errorHandling = {
  // Parse OpenAI API errors
  parseOpenAIError: (error) => {
    if (!error) return 'Unknown error occurred';

    // Handle different error types
    if (error.code === 'insufficient_quota') {
      return 'OpenAI API quota exceeded. Please check your billing at platform.openai.com';
    }
    
    if (error.code === 'invalid_api_key') {
      return 'Invalid OpenAI API key. Please check your key and try again.';
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return 'Rate limit exceeded. Please wait a moment and try again.';
    }
    
    if (error.status === 404) {
      return 'The selected model is not available in your account. Try GPT-3.5-turbo instead.';
    }
    
    if (error.status === 401) {
      return 'Authentication failed. Please check your API key.';
    }
    
    if (error.status === 429) {
      return 'Too many requests. Please wait and try again.';
    }
    
    // Network errors
    if (error.name === 'NetworkError' || error.message?.includes('fetch')) {
      return 'Network error. Please check your internet connection.';
    }
    
    // Default error message
    return error.message || 'An unexpected error occurred. Please try again.';
  },

  // Get user-friendly error messages
  getUserFriendlyMessage: (error, context = '') => {
    const baseMessage = errorHandling.parseOpenAIError(error);
    
    if (context) {
      return `${context}: ${baseMessage}`;
    }
    
    return baseMessage;
  },

  // Log errors for debugging
  logError: (error, context = '') => {
    console.error(`[${context}]`, error);
  },

  // Create error object with additional context
  createError: (message, code = null, details = null) => {
    const error = new Error(message);
    if (code) error.code = code;
    if (details) error.details = details;
    return error;
  }
};

export const { parseOpenAIError, getUserFriendlyMessage, logError, createError } = errorHandling; 