import { SettingsSection } from './components/SettingsSection';
import { InputSection } from './components/InputSection';
import { OutputSection } from './components/OutputSection';
import {
  MainLayout, InstructionsCard, ProcessButton, AppFooter, AppToaster
} from './components/layout';
import { useAppState } from './hooks/useAppState';

export default function App() {
  const {
    prdText, processedOutput, cursorPrompt, showOutput, hasInput, canProcess,
    enableResearch, selectedTemplate, openAI, handleProcessPRD, handleClearInput, 
    handleTextChange, handleGenerateCursorPrompt, handleToggleResearch, handleTemplateChange
  } = useAppState();
  

  return (
    <MainLayout>
      <SettingsSection 
        apiKey={openAI.apiKey}
        isConnected={openAI.isConnected}
        isLoading={openAI.isLoading}
        selectedModel={openAI.selectedModel}
        securityStatus={openAI.securityStatus}
        onModelChange={openAI.setSelectedModel}
        onSaveApiKey={openAI.saveApiKey}
        onTestConnection={openAI.testConnection}
        onClearApiKey={openAI.clearApiKey}
        onGetSecurityInfo={openAI.getSecurityInfo}
      />
      
      <InputSection 
        value={prdText}
        onChange={handleTextChange}
        onClear={handleClearInput}
        enableResearch={enableResearch}
        onToggleResearch={handleToggleResearch}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
      />
      
      <ProcessButton 
        onProcess={handleProcessPRD}
        canProcess={canProcess}
        isProcessing={openAI.isProcessing}
        isResearching={openAI.isResearching}
      />
      
      <InstructionsCard 
        isConnected={openAI.isConnected}
        hasInput={hasInput}
      />
      
      <OutputSection 
        output={processedOutput}
        cursorPrompt={cursorPrompt}
        isVisible={showOutput}
        onGenerateCursorPrompt={handleGenerateCursorPrompt}
        isGeneratingPrompt={openAI.isGeneratingPrompt}
      />
      
      <AppFooter />
      <AppToaster />
    </MainLayout>
  );
}
