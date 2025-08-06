import { useState } from 'react';
import { Settings, ChevronDown, ChevronRight, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from './ui';
import { ApiKeyInput } from './settings/ApiKeyInput';
import { ModelSelector } from './settings/ModelSelector';
import { ConnectionStatus } from './settings/ConnectionStatus';
import { SecurityNotice } from './settings/SecurityNotice';
import toast from 'react-hot-toast';

export const SettingsSection = ({ 
  apiKey, 
  isConnected, 
  isLoading, 
  selectedModel, 
  securityStatus,
  onModelChange, 
  onSaveApiKey, 
  onTestConnection,
  onClearApiKey,
  onGetSecurityInfo
}) => {
  const [isExpanded, setIsExpanded] = useState(!isConnected);

  const handleShowSecurityDetails = () => {
    if (onGetSecurityInfo) {
      const report = onGetSecurityInfo();
      
      // Show in console for detailed view
      console.info('🔒 Security Report:', report);
      
      toast.success('Security details logged to console', {
        duration: 4000
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle icon={Settings}>
          OpenAI Configuration
        </CardTitle>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Security Notice */}
          <SecurityNotice 
            securityStatus={securityStatus}
            onShowDetails={handleShowSecurityDetails}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ApiKeyInput
              apiKey={apiKey}
              onSave={onSaveApiKey}
              onClear={onClearApiKey}
              isLoading={isLoading}
            />
            
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={onModelChange}
              disabled={!isConnected}
            />
          </div>
          
          <ConnectionStatus
            isConnected={isConnected}
            onTestConnection={onTestConnection}
            isLoading={isLoading}
          />

          {/* Security Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Security Tips:</strong> API keys are stored temporarily in browser session storage and automatically expire after 2 hours. For production use, consider implementing a server-side proxy for API calls.
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}; 