import { useState, useCallback } from 'react';
import { useOpenAI } from './useOpenAI';
import { getCharacterInfo } from '../utils/validation';
import { getDefaultTemplate, shouldEnableWebSearch } from '../types/templateTypes';

export const useAppState = () => {
  const [prdText, setPrdText] = useState('');
  const [processedOutput, setProcessedOutput] = useState('');
  const [cursorPrompt, setCursorPrompt] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [enableResearch, setEnableResearch] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(getDefaultTemplate().id);
  const openAI = useOpenAI();

  const handleTextChange = useCallback((value) => {
    setPrdText(value);
  }, []);

  const handleClearInput = useCallback(() => {
    setPrdText('');
    setProcessedOutput('');
    setCursorPrompt('');
    setShowOutput(false);
  }, []);

  const handleProcessPRD = useCallback(async () => {
    // Only use research if the template supports it and it's enabled
    const useResearch = shouldEnableWebSearch(selectedTemplate) && enableResearch;
    
    const result = await openAI.processPRD(prdText, useResearch, selectedTemplate);
    if (result) {
      setProcessedOutput(result);
      setCursorPrompt(''); // Clear any existing cursor prompt
      setShowOutput(true);
    }
  }, [prdText, openAI, enableResearch, selectedTemplate]);

  const handleGenerateCursorPrompt = useCallback(async () => {
    if (!processedOutput) return;
    
    const result = await openAI.generateCursorPrompt(processedOutput);
    if (result) {
      setCursorPrompt(result);
    }
  }, [processedOutput, openAI]);

  const handleToggleResearch = useCallback((enabled) => {
    setEnableResearch(enabled);
  }, []);

  const handleTemplateChange = useCallback((templateId) => {
    setSelectedTemplate(templateId);
    
    // Auto-enable research if the new template supports it
    if (shouldEnableWebSearch(templateId)) {
      setEnableResearch(true);
    } else {
      setEnableResearch(false);
    }
  }, []);

  const characterInfo = getCharacterInfo(prdText);
  const hasInput = prdText.trim().length > 0;
  const canProcess = hasInput && characterInfo.isValid && openAI.isConnected && !openAI.isProcessing;

  return {
    prdText,
    processedOutput,
    cursorPrompt,
    showOutput,
    hasInput,
    canProcess,
    characterInfo,
    enableResearch,
    selectedTemplate,
    openAI,
    handleProcessPRD,
    handleClearInput,
    handleTextChange,
    handleGenerateCursorPrompt,
    handleToggleResearch,
    handleTemplateChange
  };
}; 