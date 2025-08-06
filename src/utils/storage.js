/**
 * Storage utility functions
 * 
 * This module handles different types of storage:
 * - Secure storage for sensitive data (API keys)
 * - Regular storage for user preferences (theme, model selection)
 */

import { apiKeySecureStorage } from './secureStorage';

const STORAGE_KEYS = {
  THEME: 'theme',
  SELECTED_MODEL: 'selected_model',
  PRD_HISTORY: 'prd_history',
  USER_PREFERENCES: 'user_preferences'
};

// Regular storage for non-sensitive data
export const storage = {
  // Get item from localStorage with error handling
  getItem: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return localStorage.getItem(key); // Return as string if JSON parse fails
    }
  },

  // Set item in localStorage with error handling
  setItem: (key, value) => {
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch {
      return false;
    }
  },

  // Remove item from localStorage
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  // Clear all app-related storage (non-sensitive only)
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      storage.removeItem(key);
    });
  }
};

// Theme storage (non-sensitive)
export const themeStorage = {
  get: () => storage.getItem(STORAGE_KEYS.THEME),
  set: (theme) => storage.setItem(STORAGE_KEYS.THEME, theme),
  remove: () => storage.removeItem(STORAGE_KEYS.THEME)
};

// Model selection storage (non-sensitive)
export const modelStorage = {
  get: () => storage.getItem(STORAGE_KEYS.SELECTED_MODEL) || 'gpt-3.5-turbo',
  set: (model) => storage.setItem(STORAGE_KEYS.SELECTED_MODEL, model)
};

// PRD history storage (non-sensitive, for convenience features)
export const prdHistoryStorage = {
  get: () => storage.getItem(STORAGE_KEYS.PRD_HISTORY) || [],
  set: (history) => storage.setItem(STORAGE_KEYS.PRD_HISTORY, history),
  add: (prdData) => {
    const history = prdHistoryStorage.get();
    const newHistory = [prdData, ...history.slice(0, 9)]; // Keep last 10
    prdHistoryStorage.set(newHistory);
  },
  clear: () => storage.removeItem(STORAGE_KEYS.PRD_HISTORY)
};

// Re-export secure API key storage with clear naming
export { apiKeySecureStorage as apiKeyStorage };

export { STORAGE_KEYS }; 