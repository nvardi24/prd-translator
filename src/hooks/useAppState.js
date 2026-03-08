import { useState, useCallback } from 'react';
import { useOpenAI } from './useOpenAI';
import { getCharacterInfo } from '../utils/validation';

export const useAppState = () => {
  const [prdText, setPrdText] = useState('');
  const [processedOutput, setProcessedOutput] = useState('');
  const [cursorPrompt, setCursorPrompt] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [enableResearch, setEnableResearch] = useState(true);
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
    const result = await openAI.processPRD(prdText, enableResearch);
    if (result) {
      setProcessedOutput(result);
      setCursorPrompt('');
      setShowOutput(true);
    }
  }, [prdText, openAI, enableResearch]);

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
    openAI,
    handleProcessPRD,
    handleClearInput,
    handleTextChange,
    handleGenerateCursorPrompt,
    handleToggleResearch,
  };
};
