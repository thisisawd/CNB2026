import { CheckCircle2, ExternalLink, BookOpen } from 'lucide-react';
import { Button } from './ui/button';

interface DoneStepProps {
  notebookName: string;
}

export function DoneStep({ notebookName }: DoneStepProps) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
        <CheckCircle2 className="w-12 h-12 text-green-600" />
      </div>

      <h1 className="text-neutral-800 mb-4">
        Your class notebook is ready!
      </h1>

      <p className="text-neutral-600 mb-8 max-w-md mx-auto">
        {notebookName || 'Your notebook'} has been created successfully. You can now start 
        adding content and collaborating with your students.
      </p>

      <div className="space-y-4 mb-12">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
          <h3 className="text-neutral-900 mb-2">Next steps:</h3>
          <ul className="space-y-2 text-sm text-neutral-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Share the notebook with your students and co-teachers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Add learning materials to the Content Library</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>Set up your first assignment or lesson</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          <BookOpen className="w-4 h-4" />
          Open Notebook
        </Button>
        <Button variant="outline" className="gap-2">
          <ExternalLink className="w-4 h-4" />
          View Tutorial
        </Button>
      </div>
    </div>
  );
}
