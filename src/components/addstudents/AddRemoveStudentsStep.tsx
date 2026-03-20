import { ChevronLeft, X } from 'lucide-react';
import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import studentIcon from 'figma:asset/c6d6f5dcbbce0c77579cab69c515f2d4fe243444.png';

interface Student {
  name: string;
  email: string;
  photo?: string;
}

interface AddRemoveStudentsStepProps {
  notebookName: string;
  existingStudents: Student[];
  newStudents: Student[];
  removedStudents: Student[];
  onAddStudent: (student: Student) => void;
  onRemoveStudent: (student: Student) => void;
  onNext: () => void;
  onBack: () => void;
  notebookType?: 'class' | 'staff';
}

// Fake student data for autocomplete
const FAKE_STUDENTS = [
  { name: 'Alex Thompson', email: 'alex.thompson@student.edu', photo: 'https://images.unsplash.com/photo-1680983387172-aedb346ba443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB5b3VuZyUyMHdvbWFufGVufDF8fHx8MTc2MzM2NTUxMXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Emma Davis', email: 'emma.davis@student.edu', photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzI5MjAyNXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Olivia Wilson', email: 'olivia.wilson@student.edu', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYzMjQxMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Noah Martinez', email: 'noah.martinez@student.edu', photo: 'https://images.unsplash.com/photo-1592438273180-189f08032b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB5b3VuZyUyMG1hbnxlbnwxfHx8fDE3NjMzNjU1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Sophia Garcia', email: 'sophia.garcia@student.edu', photo: 'https://images.unsplash.com/photo-1706824261799-55343861e08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjMyOTM0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Liam Anderson', email: 'liam.anderson@student.edu', photo: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMyNDU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Ava Thomas', email: 'ava.thomas@student.edu', photo: 'https://images.unsplash.com/photo-1680983387172-aedb346ba443?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB5b3VuZyUyMHdvbWFufGVufDF8fHx8MTc2MzM2NTUxMXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Mason Lee', email: 'mason.lee@student.edu', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzM1ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Isabella White', email: 'isabella.white@student.edu', photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzI5MjAyNXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Ethan Harris', email: 'ethan.harris@student.edu', photo: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYzMzEzODU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Mia Clark', email: 'mia.clark@student.edu', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYzMjQxMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Lucas Lewis', email: 'lucas.lewis@student.edu', photo: 'https://images.unsplash.com/photo-1592438273180-189f08032b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB5b3VuZyUyMG1hbnxlbnwxfHx8fDE3NjMzNjU1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const AddRemoveStudentsStep = memo(function AddRemoveStudentsStep({ 
  notebookName,
  existingStudents,
  newStudents,
  removedStudents,
  onAddStudent,
  onRemoveStudent,
  onNext,
  onBack,
  notebookType = 'class'
}: AddRemoveStudentsStepProps) {
  const isStaff = notebookType === 'staff';
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter students based on search text and exclude already added ones
  const filteredStudents = FAKE_STUDENTS.filter(student => {
    const searchLower = searchText.toLowerCase();
    const alreadyAdded = newStudents.some(s => s.email === student.email);
    const alreadyExists = existingStudents.some(s => s.email === student.email);
    return !alreadyAdded && !alreadyExists && 
           (student.name.toLowerCase().includes(searchLower) || 
            student.email.toLowerCase().includes(searchLower));
  });

  const addStudent = useCallback((student: Student) => {
    onAddStudent(student);
    setSearchText('');
    setShowDropdown(false);
    setFocusedIndex(-1);
  }, [onAddStudent]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setShowDropdown(value.length > 0);
    setFocusedIndex(-1);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, filteredStudents.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      addStudent(filteredStudents[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setFocusedIndex(-1);
    }
  }, [focusedIndex, filteredStudents, addStudent]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentStudents = existingStudents.filter(
    s => !removedStudents.some(r => r.email === s.email && r.name === s.name)
  );

  return (
    <div className="max-w-3xl mx-auto px-8 py-6">
      <div className="mb-12 mt-[32px]">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] transition-all mb-8 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d]"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-[#323130] dark:text-[#ffffff] mb-8" style={{ fontSize: '28px' }}>
          {isStaff
            ? `Great! Now add or remove staff members in ${notebookName}`
            : `Great! Select students to add or remove from ${notebookName}`}
        </h1>

        {/* Add new students section */}
        <div className="mb-10">
          <h2 className="text-[#323130] dark:text-[#ffffff] mb-2" style={{ fontSize: '20px' }}>
            {isStaff ? 'Add new staff member' : 'Add new students'}
          </h2>
          <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-4" style={{ fontSize: '13px' }}>
            {isStaff
              ? 'If a staff name is not recognized, the person may not be in the directory'
              : 'If a student name is not recognized, the student may not be in the directory.'}
          </p>
          
          <div className="relative" ref={dropdownRef}>
            {/* Input container with pills */}
            <div className="flex items-start gap-3 mb-4">
              {!isStaff && (
                <div className="mt-0 pt-2">
                  <img src={studentIcon} alt="Students" className="w-8 h-8" />
                </div>
              )}
              <div className="flex-1 relative">
                {/* Pills and input wrapper */}
                <div 
                  className="flex flex-wrap gap-2 p-2 bg-white dark:bg-[#292929] border border-[#d1d1d1] dark:border-[#5d5d5d] rounded min-h-[40px] items-center cursor-text focus-within:border-[#8661c5] dark:focus-within:border-[#8661c5] transition-colors"
                  onClick={() => inputRef.current?.focus()}
                >
                  {/* Pills for newly added students */}
                  {newStudents.map((student, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 px-2 py-1 bg-[#f3f2f1] dark:bg-[#3d3d3d] rounded-full border border-[#d1d1d1] dark:border-[#5d5d5d]"
                    >
                      {student.photo && (
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-5 h-5 rounded-full object-cover"
                        />
                      )}
                      <span className="text-sm text-[#323130] dark:text-[#ffffff]">
                        {student.name}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveStudent(student);
                        }}
                        className="text-[#605e5c] dark:text-[#d0d0d0] hover:text-[#323130] dark:hover:text-[#ffffff] hover:bg-[#e1dfdd] dark:hover:bg-[#4a4a4a] rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {/* Input field */}
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder={newStudents.length === 0 ? "Enter names, email addresses or groups..." : ""}
                    value={searchText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => searchText.length > 0 && setShowDropdown(true)}
                    className="flex-1 min-w-[200px] outline-none bg-transparent text-sm px-1 py-1 text-[#323130] dark:text-[#ffffff] placeholder:text-[#707070] dark:placeholder:text-[#8a8886] no-fluent-style"
                    style={{ border: 'none' }}
                  />
                </div>

                {/* Dropdown suggestions */}
                {showDropdown && filteredStudents.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1f1f1f] border border-[#d1d1d1] dark:border-[#5d5d5d] rounded shadow-lg max-h-60 overflow-y-auto">
                    {filteredStudents.map((student, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                          index === focusedIndex ? 'bg-[#f3f2f1] dark:bg-[#2b2b2b]' : 'hover:bg-[#faf9f8] dark:hover:bg-[#2b2b2b]'
                        }`}
                        onClick={() => addStudent(student)}
                        onMouseEnter={() => setFocusedIndex(index)}
                      >
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-[#323130] dark:text-[#ffffff]">{student.name}</div>
                          <div className="text-xs text-[#605e5c] dark:text-[#d0d0d0]">{student.email}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Remove current students section */}
        <div className="mb-6">
          <h2 className="text-[#323130] dark:text-[#ffffff] mb-2" style={{ fontSize: '20px' }}>
            {isStaff ? 'Existing staff member list' : 'Remove current students'}
          </h2>
          <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-4" style={{ fontSize: '13px' }}>
            {isStaff
              ? ''
              : 'Select students to remove from this notebook. Student content will be saved unless you choose to delete it.'}
          </p>
          
          {currentStudents.length === 0 ? (
            <p className="text-[#605e5c] dark:text-[#8a8886] italic" style={{ fontSize: '13px' }}>
              {isStaff ? 'No staff members in this notebook yet.' : 'No students in this notebook yet.'}
            </p>
          ) : (
            <div className="space-y-2">
              {currentStudents.map((student, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 py-3 px-3 border-b border-[#edebe9] dark:border-[#5d5d5d] hover:bg-[#faf9f8] dark:hover:bg-[#2b2b2b] transition-colors rounded"
                >
                  {student.photo && (
                    <img 
                      src={student.photo} 
                      alt={student.name} 
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-[#323130] dark:text-[#ffffff]">{student.name}</div>
                    {student.email && (
                      <div className="text-xs text-[#605e5c] dark:text-[#d0d0d0]">{student.email}</div>
                    )}
                  </div>
                  <button
                    onClick={() => onRemoveStudent(student)}
                    className="text-[#605e5c] hover:text-[#a4262c] dark:text-[#d0d0d0] dark:hover:text-[#f1707b] transition-colors p-2 hover:bg-[#f3f2f1] dark:hover:bg-[#3d3d3d] rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer note */}
        <p className="text-[#a4262c] dark:text-[#f1707b] mt-6" style={{ fontSize: '13px' }}>
          {isStaff
            ? '* Staff member groups will be automatically updated from your directory. Changes will be visible in the preview.'
            : '* Student groups will be automatically updated from your directory. Changes will be visible in the preview.'}
        </p>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="text-white px-6 rounded"
          style={{ backgroundColor: '#7719AA' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6b15a0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7719AA')}
        >
          Next
        </Button>
      </div>
    </div>
  );
});