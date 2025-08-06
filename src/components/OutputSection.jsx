import { useState } from 'react';
import { FileOutput, ChevronDown, ChevronRight, Copy, Download, CheckCircle, Zap, Eye, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from './ui';
import { copyToClipboard, downloadTextFile, generateFilename } from '../utils/fileOperations';
import toast from 'react-hot-toast';

const OutputStats = ({ output }) => {
  const sections = output.split('\n\n').filter(section => section.trim());
  const lines = output.split('\n').length;
  const characters = output.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <div className="font-medium text-gray-900 dark:text-white mb-1">Lines</div>
        <div className="text-gray-600 dark:text-gray-400">{lines}</div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <div className="font-medium text-gray-900 dark:text-white mb-1">Characters</div>
        <div className="text-gray-600 dark:text-gray-400">{characters.toLocaleString()}</div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
        <div className="font-medium text-gray-900 dark:text-white mb-1">Sections</div>
        <div className="text-gray-600 dark:text-gray-400">{sections.length}</div>
      </div>
    </div>
  );
};

const ActionButtons = ({ onCopy, onDownload, copied }) => (
  <div className="flex items-center space-x-2">
    <Button
      onClick={onCopy}
      variant="primary"
      size="sm"
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckCircle className="w-4 h-4 mr-1" />
      ) : (
        <Copy className="w-4 h-4 mr-1" />
      )}
      {copied ? 'Copied!' : 'Copy'}
    </Button>
    
    <Button
      onClick={onDownload}
      variant="secondary"
      size="sm"
      title="Download as text file"
    >
      <Download className="w-4 h-4 mr-1" />
      Download
    </Button>
  </div>
);

export const OutputSection = ({ 
  output, 
  cursorPrompt, 
  isVisible, 
  onGenerateCursorPrompt, 
  isGeneratingPrompt 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [copied, setCopied] = useState(false);
  const [cursorCopied, setCursorCopied] = useState(false);
  const [viewMode, setViewMode] = useState('raw'); // 'raw' or 'preview'

  const handleCopy = async () => {
    const result = await copyToClipboard(output);
    if (result.success) {
      setCopied(true);
      toast.success('PRD Requirements copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleCursorCopy = async () => {
    const result = await copyToClipboard(cursorPrompt);
    if (result.success) {
      setCursorCopied(true);
      toast.success('Cursor prompt copied to clipboard!');
      setTimeout(() => setCursorCopied(false), 2000);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    const filename = generateFilename(output, 'prd-requirements-table');
    const result = downloadTextFile(output, filename);
    if (result.success) {
      toast.success('Downloaded successfully!');
    } else {
      toast.error('Failed to download file');
    }
  };

  const handleCursorDownload = () => {
    const filename = generateFilename(cursorPrompt, 'cursor-prompt');
    const result = downloadTextFile(cursorPrompt, filename);
    if (result.success) {
      toast.success('Downloaded successfully!');
    } else {
      toast.error('Failed to download file');
    }
  };

  if (!isVisible || !output) return null;

  return (
    <div className="space-y-4">
      {/* Structured PRD Requirements Table */}
      <Card className="animate-in slide-in-from-bottom-4 duration-300">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CardTitle icon={FileOutput}>
              📋 PRD Requirements Table
            </CardTitle>
            <Badge variant="success">
              AI-Enhanced & Structured
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
            
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md p-1">
              <Button
                variant={viewMode === 'raw' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('raw')}
                title="View raw text"
                className="text-xs px-2 py-1"
              >
                <FileText className="w-3 h-3 mr-1" />
                Raw
              </Button>
              <Button
                variant={viewMode === 'preview' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('preview')}
                title="View markdown preview"
                className="text-xs px-2 py-1"
              >
                <Eye className="w-3 h-3 mr-1" />
                Preview
              </Button>
            </div>
            
            <ActionButtons
              onCopy={handleCopy}
              onDownload={handleDownload}
              copied={copied}
            />

            <Button
              onClick={onGenerateCursorPrompt}
              variant="primary"
              size="sm"
              loading={isGeneratingPrompt}
              disabled={isGeneratingPrompt}
              title="Generate Cursor prompt from this structured PRD"
            >
              <Zap className="w-4 h-4 mr-1" />
              {isGeneratingPrompt ? 'Generating...' : 'Generate Cursor Prompt'}
            </Button>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-300 text-sm">
                <strong>✅ Step 1 Complete:</strong> Your unstructured PRD has been converted into a fillable requirements table with structured fields, priorities, and implementation guidance.
              </p>
            </div>

            <div className="relative">
              {viewMode === 'raw' ? (
                <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-sm font-mono text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {output}
                </pre>
              ) : (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown>{output}</ReactMarkdown>
                </div>
              )}
            </div>

            <OutputStats output={output} />

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-300 text-sm">
                <strong>📋 Use This For:</strong> Project planning, priority setting, technical specification documentation, and team alignment on requirements.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Cursor Prompt (only show when generated) */}
      {cursorPrompt && (
        <Card className="animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <CardTitle icon={Zap}>
                🚀 Cursor Development Prompt
              </CardTitle>
              <Badge variant="success">
                Ready for Development
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <ActionButtons
                onCopy={handleCursorCopy}
                onDownload={handleCursorDownload}
                copied={cursorCopied}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-300 text-sm">
                <strong>✅ Step 2 Complete:</strong> Your structured requirements have been converted into a ready-to-use Cursor prompt for immediate development.
              </p>
            </div>

            <div className="relative">
              <pre className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-sm font-mono text-gray-900 dark:text-gray-100 overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto">
                {cursorPrompt}
              </pre>
            </div>

            <OutputStats output={cursorPrompt} />

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <p className="text-orange-800 dark:text-orange-300 text-sm">
                <strong>🚀 Ready to Code:</strong> Copy the prompt above and paste it directly into Cursor for immediate connector development with all specifications included.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 