import { memo } from 'react';
import { SharedDoneStep } from '../shared/SharedDoneStep';

interface DoneStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  onBackToHome?: () => void;
}

export const DoneStep = memo(function DoneStep({ data, onBackToHome }: DoneStepProps) {
  const notebookName = data.name || 'Your notebook';

  return (
    <SharedDoneStep 
      notebookName={notebookName}
      onBackToHome={onBackToHome}
    />
  );
});