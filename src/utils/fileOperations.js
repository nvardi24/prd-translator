/**
 * File operation utility functions
 */

export const fileOperations = {
  // Copy text to clipboard
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Download text as file
  downloadTextFile: (content, filename = 'connector-prompt.txt') => {
    try {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Generate filename based on content
  generateFilename: (content, prefix = 'connector-prompt') => {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-');
    
    // Try to extract connector name from content
    const connectorNameMatch = content.match(/Build a (\w+) connector/i);
    const connectorName = connectorNameMatch 
      ? connectorNameMatch[1].toLowerCase() 
      : 'unknown';
    
    return `${prefix}-${connectorName}-${timestamp}.txt`;
  },

  // Format file size
  formatFileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }
};

export const { copyToClipboard, downloadTextFile, generateFilename, formatFileSize } = fileOperations; 