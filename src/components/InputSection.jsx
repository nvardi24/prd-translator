import { FileText, X, Search, ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from './ui';
import { Textarea } from './ui/Input';
import { getCharacterInfo } from '../utils/validation';
import { getTemplateTypes, shouldEnableWebSearch } from '../types/templateTypes';
import { useState } from 'react';

export const InputSection = ({ 
  value, 
  onChange, 
  onClear, 
  enableResearch, 
  onToggleResearch,
  selectedTemplate,
  onTemplateChange 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const characterInfo = getCharacterInfo(value);
  const templateTypes = getTemplateTypes();
  
  const selectedTemplateConfig = templateTypes.find(template => template.id === selectedTemplate);
  const webSearchSupported = shouldEnableWebSearch(selectedTemplate);
  
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
        {/* Template Type Selector */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            PRD Template Type
          </label>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-left text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{selectedTemplateConfig?.icon || '📄'}</span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {selectedTemplateConfig?.name || 'Select template type'}
                  </div>
                  {selectedTemplateConfig && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedTemplateConfig.description}
                    </div>
                  )}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-auto">
                {templateTypes.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => {
                      onTemplateChange(template.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      selectedTemplate === template.id 
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                        : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{template.icon}</span>
                      <div>
                        <div className="font-medium">{template.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {template.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

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

              {/* Research Toggle - only show if template supports web search */}
              {webSearchSupported && (
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
              )}
            </div>
          </div>
        </div>
        
        {/* Template Info */}
        {selectedTemplateConfig && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <div className="text-lg">{selectedTemplateConfig.icon}</div>
              <div className="text-sm text-green-800 dark:text-green-300">
                <strong>Template Applied:</strong> Analysis will use the {selectedTemplateConfig.name} template optimized for {selectedTemplateConfig.description.toLowerCase()}.
              </div>
            </div>
          </div>
        )}
        
        {/* Web Search Info - only show if template supports it and it's enabled */}
        {webSearchSupported && enableResearch && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Search className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Enhanced Analysis:</strong> Will research current API documentation, authentication methods, and capabilities for more accurate requirements.
              </div>
            </div>
          </div>
        )}
        
        {/* Web Search Not Available Info */}
        {!webSearchSupported && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
              <div className="text-sm text-amber-800 dark:text-amber-300">
                <strong>Note:</strong> Web research is not needed for this template type. Analysis will focus on the template-specific requirements.
              </div>
            </div>
          </div>
        )}
        
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>💡 <strong>Tip:</strong> Select the appropriate template type and include relevant details for your integration</p>
          <p>📋 The more detailed your PRD, the better the structured requirements table will be</p>
        </div>
      </CardContent>
    </Card>
  );
}; 