import { useState, useEffect, useCallback } from 'react';
import { apiKeyStorage, modelStorage } from '../utils/storage';
import { securityUtils } from '../utils/secureStorage';
import { isValidApiKey } from '../utils/validation';
import toast from 'react-hot-toast';

export const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [isLoading, setIsLoading] = useState(false);
  const [securityStatus, setSecurityStatus] = useState(null);

  // Check security environment on mount
  useEffect(() => {
    const status = securityUtils.validateSecureEnvironment();
    setSecurityStatus(status);
    
    if (!status.isSecure) {
      console.warn('⚠️ Security Warning:', status.issues.join(', '));
    }
  }, []);

  // Load saved values on mount
  useEffect(() => {
    try {
      const savedApiKey = apiKeyStorage.get();
      const savedModel = modelStorage.get();
      
      if (savedApiKey && apiKeyStorage.isValid(savedApiKey)) {
        setApiKey(savedApiKey);
      }
      
      setSelectedModel(savedModel);
    } catch (error) {
      console.error('Failed to load saved API key:', error);
      toast.error('Failed to load saved API key. Please re-enter.');
    }
  }, []);

  const saveApiKey = useCallback(async (newApiKey) => {
    if (!isValidApiKey(newApiKey)) {
      toast.error('Please enter a valid OpenAI API key (starts with sk-)');
      return false;
    }

    // Additional security validation
    if (!apiKeyStorage.isValid(newApiKey)) {
      toast.error('Invalid API key format. Please check your key.');
      return false;
    }

    setIsLoading(true);
    try {
      const trimmedKey = newApiKey.trim();
      
      // Attempt to store securely
      const stored = apiKeyStorage.set(trimmedKey);
      if (!stored) {
        throw new Error('Failed to store API key securely');
      }

      setApiKey(trimmedKey);
      
      // Show security notice
      toast.success('API key saved securely! (Auto-expires in 2 hours)', {
        duration: 5000
      });
      
      // Show security warning if environment is not secure
      if (securityStatus && !securityStatus.isSecure) {
        toast.error('⚠️ Insecure environment detected. Use HTTPS in production.', {
          duration: 8000
        });
      }
      
      return true;
    } catch (error) {
      console.error('Failed to save API key:', error);
      toast.error('Failed to save API key securely. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [securityStatus]);

  const clearApiKey = useCallback(() => {
    try {
      setApiKey('');
      apiKeyStorage.remove();
      toast.success('API key cleared securely');
    } catch (error) {
      console.error('Failed to clear API key:', error);
      toast.error('Failed to clear API key');
    }
  }, []);

  const updateModel = useCallback((model) => {
    setSelectedModel(model);
    modelStorage.set(model);
  }, []);

  const getSecurityInfo = useCallback(() => {
    return securityUtils.getSecurityReport();
  }, []);

  const isConfigured = Boolean(apiKey && isValidApiKey(apiKey));

  return {
    apiKey,
    selectedModel,
    isLoading,
    isConfigured,
    securityStatus,
    saveApiKey,
    clearApiKey,
    updateModel,
    setSelectedModel: updateModel,
    getSecurityInfo
  };
}; 