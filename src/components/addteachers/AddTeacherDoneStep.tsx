import { memo } from 'react';
import { SharedDoneStep } from '../shared/SharedDoneStep';

interface Teacher {
  name: string;
  email: string;
}

interface AddTeacherDoneStepProps {
  notebookName: string;
  teachers: (string | Teacher)[];
  onBackToHome: () => void;
  notebookType?: 'class' | 'staff';
}

export const AddTeacherDoneStep = memo(function AddTeacherDoneStep({ 
  notebookName, 
  teachers,
  onBackToHome,
  notebookType = 'class'
}: AddTeacherDoneStepProps) {
  return (
    <SharedDoneStep 
      notebookName={notebookName}
      onBackToHome={onBackToHome}
    />
  );
});
