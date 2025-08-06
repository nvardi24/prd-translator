export const InstructionsCard = ({ isConnected, hasInput }) => {
  if (!isConnected) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Get Started
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          Add your OpenAI API key above, then paste your PRD to get a structured requirements table. Generate a Cursor prompt on-demand.
        </p>
        <div className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <p>1. Configure your OpenAI API key (stored securely)</p>
          <p>2. Paste your PRD text (minimum 100 characters)</p>
          <p>3. Click "Transform PRD" to get structured requirements</p>
          <p>4. Click "Generate Cursor Prompt" when ready to code</p>
        </div>
      </div>
    );
  }

  if (!hasInput) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          Ready to Process
        </h3>
        <p className="text-green-700 dark:text-green-300">
          OpenAI connection established. Paste your PRD text above to transform it into structured requirements, then generate a Cursor prompt when ready.
        </p>
      </div>
    );
  }

  return null;
}; 