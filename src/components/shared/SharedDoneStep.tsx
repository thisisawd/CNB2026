import { GraduationCap, X } from 'lucide-react';
import { memo } from 'react';
import { Button } from '../ui/button';

interface SharedDoneStepProps {
  notebookName: string;
  onBackToHome?: () => void;
}

export const SharedDoneStep = memo(function SharedDoneStep({ 
  notebookName, 
  onBackToHome 
}: SharedDoneStepProps) {
  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-[#605e5c] dark:text-[#d0d0d0] mb-4" style={{ fontSize: '28px', fontWeight: '300' }}>
          Your notebook <span className="text-[#323130] dark:text-[#ffffff]">{notebookName}</span> is ready for you!
        </h1>
        
        <div className="mb-6">
          <a href="#" className="text-[#7719AA] hover:underline">
            Open in OneNote
          </a>
          <span className="text-[#605e5c] dark:text-[#d0d0d0] ml-2">(Open in OneNote Online)</span>
        </div>

        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-12">
          Copy the links above to share with your students.
        </p>

        {/* Enable Class Notebook in OneNote Desktop Section */}
        <div className="mb-12">
          <h2 className="text-[#323130] dark:text-[#ffffff] mb-4">
            Enable Class Notebook in OneNote Desktop
          </h2>

          <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-6">
            Follow the instructions below to enable the Class Notebook toolbar from right inside of OneNote.
          </p>

          <Button
            asChild
            className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
          >
            <a 
              href="https://support.microsoft.com/en-us/topic/enable-the-class-notebook-toolbar-in-onenote-desktop-77d17d0d-6cd0-48ed-ab55-4a5a0ecb0e61"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open toolbar instructions
            </a>
          </Button>
        </div>

        {/* Learn More Section */}
        <div className="mb-12">
          <h2 className="text-[#605e5c] dark:text-[#d0d0d0] mb-6">
            Learn More
          </h2>

          <div className="grid grid-cols-2 gap-8">
            {/* Left column - Training */}
            <div className="flex items-start gap-3">
              <GraduationCap className="w-8 h-8 text-[#605e5c] dark:text-[#d0d0d0] flex-shrink-0" />
              <div>
                <div className="text-[#605e5c] dark:text-[#d0d0d0] mb-1">Get interactive training</div>
                <a href="#" className="text-[#7719AA] hover:underline">
                  OneNote for Teachers
                </a>
              </div>
            </div>

            {/* Right column - X (formerly Twitter) */}
            <div className="flex items-start gap-3">
              <X className="w-8 h-8 text-[#000000] dark:text-[#ffffff] flex-shrink-0" />
              <div>
                <div className="text-[#605e5c] dark:text-[#d0d0d0] mb-1">Follow us on X</div>
                <a href="#" className="text-[#7719AA] hover:underline">
                  OneNoteEdu
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Free Online Training Section */}
        <div className="mb-12">
          <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-6">
            Free online training
          </p>

          <Button
            asChild
            className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
          >
            <a 
              href="https://learn.microsoft.com/en-us/training/modules/onenote-class-notebook-teacher-all-in-one-notebook/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Take the course
            </a>
          </Button>
        </div>

        {/* Back to home link */}
        {onBackToHome && (
          <div>
            <button 
              onClick={onBackToHome}
              className="text-[#7719AA] hover:underline"
            >
              Back to home
            </button>
          </div>
        )}
      </div>
    </div>
  );
});