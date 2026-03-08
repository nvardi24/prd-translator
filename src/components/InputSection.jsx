import { FileText, X, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from './ui';
import { Textarea } from './ui/Input';
import { getCharacterInfo } from '../utils/validation';

export const InputSection = ({ 
  value, 
  onChange, 
  onClear, 
  enableResearch, 
  onToggleResearch,
}) => {
  const characterInfo = getCharacterInfo(value);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle icon={FileText}>
            Product Requirements Document (PRD)
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            {value && (
              <Button
                onClick={onClear}
                variant="ghost"
                size="sm"
                title="Clear input"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* PRD Text Input */}
        <div className="space-y-2">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste your PRD content here... (minimum 100 characters)

Example:
'We need to build a Box connector for our platform. Users should be able to connect their Box accounts, browse folders, select files and documents, and ingest them into our system. The connector should support various file types including PDFs, Word docs, and images. Authentication should use OAuth 2.0...'"
            rows={12}
            className="resize-none"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {characterInfo.count} / {characterInfo.minimum} characters
              </div>
              
              <Badge 
                variant={characterInfo.isValid ? 'success' : 'secondary'}
              >
                {characterInfo.isValid ? 'Valid Length' : 'Too Short'}
              </Badge>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onToggleResearch(!enableResearch)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                    enableResearch 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' 
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}
                  title={enableResearch ? 'Web research enabled - will research API docs' : 'Web research disabled - basic analysis only'}
                >
                  <Search className="w-3 h-3" />
                  <span>Web Research</span>
                  <div className={`w-2 h-2 rounded-full ${enableResearch ? 'bg-green-500' : 'bg-gray-400'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {enableResearch && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Enhanced Analysis:</strong> Will research current API documentation, authentication methods, and capabilities for more accurate requirements.
              </div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>💡 <strong>Tip:</strong> Include relevant details about the integration for a more accurate requirements table</p>
          <p>📋 The more detailed your PRD, the better the structured requirements table will be</p>
        </div>
      </CardContent>
    </Card>
  );
};
