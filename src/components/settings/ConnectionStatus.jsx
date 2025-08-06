import { CheckCircle, XCircle, TestTube } from 'lucide-react';
import { Button, Badge } from '../ui';

export const ConnectionStatus = ({ 
  isConnected, 
  onTestConnection, 
  isLoading 
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Connection Status
        </span>
        <Badge 
          variant={isConnected ? 'success' : 'error'}
          icon={isConnected ? CheckCircle : XCircle}
        >
          {isConnected ? 'Connected' : 'Not Connected'}
        </Badge>
      </div>
      
      {isConnected && (
        <Button
          variant="outline"
          size="sm"
          onClick={onTestConnection}
          disabled={isLoading}
          loading={isLoading}
          className="w-full"
        >
          <TestTube className="w-4 h-4 mr-2" />
          Test Connection
        </Button>
      )}
      
      {!isConnected && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <p className="text-amber-800 dark:text-amber-300 text-sm">
              Please configure your OpenAI API key to start processing PRDs
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 