import { Label } from '../ui';

const models = [
  { 
    value: 'gpt-3.5-turbo', 
    label: 'GPT-3.5 Turbo (Recommended)', 
    description: 'Fast and cost-effective for most tasks' 
  },
  { 
    value: 'gpt-4', 
    label: 'GPT-4 (Better quality)', 
    description: 'Higher quality but requires access' 
  },
  { 
    value: 'gpt-4-turbo', 
    label: 'GPT-4 Turbo', 
    description: 'Latest model, requires access' 
  }
];

export const ModelSelector = ({ 
  selectedModel, 
  onModelChange, 
  disabled = false 
}) => {
  return (
    <div className="space-y-2">
      <Label>Model Selection</Label>
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
      >
        {models.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        GPT-3.5-turbo is available to all users. GPT-4 requires additional access.
      </p>
      
      <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-xs">
        <p className="text-amber-700 dark:text-amber-300">
          <strong>Tip:</strong> If you hit quota limits, add billing info at{' '}
          <a 
            href="https://platform.openai.com/settings/organization/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-amber-800 dark:hover:text-amber-200"
          >
            OpenAI Billing
          </a>
        </p>
      </div>
    </div>
  );
}; 