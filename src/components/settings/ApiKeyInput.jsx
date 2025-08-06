import { useState } from 'react';
import { Eye, EyeOff, Key, Trash2 } from 'lucide-react';
import { Button, Input, Label } from '../ui';

export const ApiKeyInput = ({ 
  apiKey, 
  onSave, 
  onClear, 
  isLoading 
}) => {
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    if (tempApiKey.trim()) {
      onSave(tempApiKey.trim());
      setTempApiKey('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && tempApiKey.trim()) {
      handleSave();
    }
  };

  const maskedApiKey = apiKey ? `${apiKey.slice(0, 8)}...${apiKey.slice(-4)}` : '';

  if (apiKey) {
    return (
      <div className="space-y-2">
        <Label>OpenAI API Key</Label>
        <div className="flex items-center space-x-2">
          <div className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm">
            {showApiKey ? apiKey : maskedApiKey}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKey(!showApiKey)}
            title={showApiKey ? 'Hide API key' : 'Show API key'}
          >
            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-red-500 hover:text-red-600"
            title="Clear API key"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label required>OpenAI API Key</Label>
      <div className="flex space-x-2">
        <Input
          type="password"
          value={tempApiKey}
          onChange={(e) => setTempApiKey(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="sk-..."
          className="flex-1"
        />
        <Button
          onClick={handleSave}
          disabled={!tempApiKey.trim() || isLoading}
          loading={isLoading}
          size="md"
        >
          <Key className="w-4 h-4 mr-1" />
          Save
        </Button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Get your API key from{' '}
        <a 
          href="https://platform.openai.com/api-keys" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-600 underline"
        >
          OpenAI Platform
        </a>
      </p>
    </div>
  );
}; 