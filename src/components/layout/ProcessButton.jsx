import { Zap, Search } from 'lucide-react';
import { Button } from '../ui';

export const ProcessButton = ({ onProcess, canProcess, isProcessing, isResearching }) => {
  const getButtonState = () => {
    if (isResearching) {
      return {
        text: 'Researching API...',
        icon: Search,
        disabled: true,
        loading: true
      };
    }
    
    if (isProcessing) {
      return {
        text: 'Analyzing PRD...',
        icon: Zap,
        disabled: true,
        loading: true
      };
    }
    
    return {
      text: 'Transform PRD',
      icon: Zap,
      disabled: !canProcess,
      loading: false
    };
  };

  const buttonState = getButtonState();
  const IconComponent = buttonState.icon;

  return (
    <div className="flex justify-center">
      <Button
        onClick={onProcess}
        disabled={buttonState.disabled}
        loading={buttonState.loading}
        size="lg"
        variant="primary"
        className="px-8 py-3 text-lg font-semibold"
      >
        <IconComponent className="w-5 h-5 mr-2" />
        {buttonState.text}
      </Button>
    </div>
  );
}; 