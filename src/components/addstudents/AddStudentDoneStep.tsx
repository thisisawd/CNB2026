import { memo } from 'react';
import { SharedDoneStep } from '../shared/SharedDoneStep';

interface Student {
  name: string;
  email: string;
}

interface AddStudentDoneStepProps {
  notebookName: string;
  students: (string | Student)[];
  onBackToHome: () => void;
}

export const AddStudentDoneStep = memo(function AddStudentDoneStep({ 
  notebookName, 
  students,
  onBackToHome 
}: AddStudentDoneStepProps) {
  return (
    <SharedDoneStep 
      notebookName={notebookName}
      onBackToHome={onBackToHome}
    />
  );
});