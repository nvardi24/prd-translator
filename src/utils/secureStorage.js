/**
 * Secure Storage Utilities for Sensitive Data
 * 
 * This module provides secure storage for sensitive information like API keys.
 * It implements several security measures to protect user credentials.
 * 
 * Security Features:
 * - sessionStorage instead of localStorage (cleared on tab close)
 * - Basic encryption for stored data
 * - Input validation and sanitization
 * - Automatic expiration
 * - Security warnings and user education
 */

// Simple encryption utilities (for basic obfuscation)
const ENCRYPTION_KEY = 'prd-translator-key-2024';

/**
 * Simple encryption using btoa/atob with a key
 * Note: This is basic obfuscation, not cryptographically secure
 * For production, consider using Web Crypto API
 */
const encrypt = (text) => {
  try {
    const encoded = btoa(unescape(encodeURIComponent(text + ENCRYPTION_KEY)));
    return encoded;
  } catch {
    return text; // Fallback to plain text if encryption fails
  }
};

const decrypt = (encryptedText) => {
  try {
    const decoded = decodeURIComponent(escape(atob(encryptedText)));
    return decoded.replace(ENCRYPTION_KEY, '');
  } catch {
    return encryptedText; // Fallback if decryption fails
  }
};

/**
 * Secure storage class with expiration and encryption
 */
class SecureStorage {
  constructor() {
    this.storage = sessionStorage; // Use sessionStorage instead of localStorage
    this.prefix = 'secure_';
    this.showSecurityWarning();
  }

  /**
   * Show security warning to users about API key handling
   */
  showSecurityWarning() {
    if (!this.hasShownWarning()) {
      console.warn(`
🔒 SECURITY NOTICE: 
- API keys are stored temporarily in browser session storage
- Keys are cleared when you close the browser tab
- Never share your API keys or leave them in shared environments
- Consider using environment variables for development
- For production, implement server-side proxy for API calls
      `);
      sessionStorage.setItem('security_warning_shown', 'true');
    }
  }

  hasShownWarning() {
    return sessionStorage.getItem('security_warning_shown') === 'true';
  }

  /**
   * Create storage item with metadata
   */
  createStorageItem(value, expirationMinutes = 60) {
    return {
      value: encrypt(value),
      timestamp: Date.now(),
      expiration: Date.now() + (expirationMinutes * 60 * 1000),
      version: '1.0'
    };
  }

  /**
   * Check if stored item is expired
   */
  isExpired(item) {
    return Date.now() > item.expiration;
  }

  /**
   * Securely store sensitive data
   */
  setSecure(key, value, expirationMinutes = 60) {
    if (!key || !value) return false;

    try {
      const storageItem = this.createStorageItem(value, expirationMinutes);
      this.storage.setItem(this.prefix + key, JSON.stringify(storageItem));
      return true;
    } catch (error) {
      console.error('Failed to store secure data:', error);
      return false;
    }
  }

  /**
   * Retrieve and decrypt sensitive data
   */
  getSecure(key) {
    if (!key) return null;

    try {
      const stored = this.storage.getItem(this.prefix + key);
      if (!stored) return null;

      const item = JSON.parse(stored);
      
      // Check expiration
      if (this.isExpired(item)) {
        this.removeSecure(key);
        return null;
      }

      return decrypt(item.value);
    } catch (error) {
      console.error('Failed to retrieve secure data:', error);
      this.removeSecure(key); // Clean up corrupted data
      return null;
    }
  }

  /**
   * Remove sensitive data
   */
  removeSecure(key) {
    if (!key) return false;

    try {
      this.storage.removeItem(this.prefix + key);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Clear all secure storage
   */
  clearAll() {
    try {
      const keys = Object.keys(this.storage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          this.storage.removeItem(key);
        }
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if storage is available and secure
   */
  isStorageSecure() {
    // Check if we're in HTTPS (in production)
    const isSecureContext = window.isSecureContext || location.protocol === 'https:' || location.hostname === 'localhost';
    
    // Check if sessionStorage is available
    const hasSessionStorage = typeof Storage !== 'undefined' && sessionStorage;
    
    return isSecureContext && hasSessionStorage;
  }

  /**
   * Get security recommendations
   */
  getSecurityRecommendations() {
    return {
      recommendations: [
        'Use HTTPS in production environments',
        'Implement server-side API proxy for sensitive operations',
        'Use environment variables for development',
        'Never commit API keys to version control',
        'Rotate API keys regularly',
        'Monitor API key usage for anomalies'
      ],
      currentSecurity: {
        isSecureContext: window.isSecureContext,
        usesSessionStorage: true,
        hasEncryption: true,
        hasExpiration: true
      }
    };
  }
}

// Create singleton instance
export const secureStorage = new SecureStorage();

// Specific secure storage functions for API keys
export const apiKeySecureStorage = {
  get: () => secureStorage.getSecure('openai_api_key'),
  set: (apiKey) => {
    // Validate API key format
    if (!apiKey || !apiKey.startsWith('sk-') || apiKey.length < 20) {
      throw new Error('Invalid API key format');
    }
    return secureStorage.setSecure('openai_api_key', apiKey, 120); // 2 hours expiration
  },
  remove: () => secureStorage.removeSecure('openai_api_key'),
  isValid: (apiKey) => apiKey && apiKey.startsWith('sk-') && apiKey.length >= 20
};

// Security utilities
export const securityUtils = {
  /**
   * Validate if current environment is secure for API key usage
   */
  validateSecureEnvironment: () => {
    const issues = [];
    
    if (!window.isSecureContext && location.hostname !== 'localhost') {
      issues.push('Not using HTTPS - API keys may be transmitted insecurely');
    }
    
    if (!sessionStorage) {
      issues.push('SessionStorage not available - cannot store keys securely');
    }
    
    return {
      isSecure: issues.length === 0,
      issues
    };
  },

  /**
   * Generate security report
   */
  getSecurityReport: () => {
    const environment = securityUtils.validateSecureEnvironment();
    const recommendations = secureStorage.getSecurityRecommendations();
    
    return {
      environment,
      recommendations,
      bestPractices: [
        'API keys stored in sessionStorage (cleared on tab close)',
        'Basic encryption applied to stored keys',
        'Automatic expiration after 2 hours',
        'Input validation for API key format',
        'Security warnings displayed to users'
      ]
    };
  }
}; 