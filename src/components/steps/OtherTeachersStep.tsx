import { ChevronLeft, X } from 'lucide-react';
import { Button } from '../ui/button';
import { useState, memo, useCallback, useRef, useEffect } from 'react';
import teacherIconNew from 'figma:asset/0a31c2716a285560a7e9d2c223bb6153727c10cd.png';

interface OtherTeachersStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
  featureFlags?: Record<string, boolean>;
  notebookType?: 'class' | 'staff';
}

// Fake teacher data for autocomplete
const FAKE_TEACHERS = [
  { name: 'Sarah Johnson', email: 'sarah.johnson@school.edu', photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzI5MjAyNXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Michael Chen', email: 'michael.chen@school.edu', photo: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMyNDU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Emily Rodriguez', email: 'emily.rodriguez@school.edu', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHdvbWFuJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYzMjQxMDcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'David Williams', email: 'david.williams@school.edu', photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc2MzM1ODQ2OHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Jennifer Martinez', email: 'jennifer.martinez@school.edu', photo: 'https://images.unsplash.com/photo-1706824261799-55343861e08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjMyOTM0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Robert Taylor', email: 'robert.taylor@school.edu', photo: 'https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzYzMzEzODU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Lisa Anderson', email: 'lisa.anderson@school.edu', photo: 'https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzI5MjAyNXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'James Brown', email: 'james.brown@school.edu', photo: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjMyNDU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const OtherTeachersStep = memo(function OtherTeachersStep({ data, onDataChange, onNext, onBack, featureFlags, notebookType = 'class' }: OtherTeachersStepProps) {
  const [searchText, setSearchText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const isStaff = notebookType === 'staff';
  const useGraduationHat = featureFlags?.teacher_student_icon_alt1;

  // Filter teachers based on search text and exclude already added ones
  const filteredTeachers = FAKE_TEACHERS.filter(teacher => {
    const searchLower = searchText.toLowerCase();
    const alreadyAdded = data.otherTeachers.some((t: any) => 
      typeof t === 'string' ? t === teacher.email : t.email === teacher.email
    );
    return !alreadyAdded && 
           (teacher.name.toLowerCase().includes(searchLower) || 
            teacher.email.toLowerCase().includes(searchLower));
  });

  const addTeacher = useCallback((teacher: { name: string; email: string }) => {
    onDataChange({
      ...data,
      otherTeachers: [...data.otherTeachers, teacher],
    });
    setSearchText('');
    setShowDropdown(false);
    setFocusedIndex(-1);
  }, [data, onDataChange]);

  const removeTeacher = useCallback((index: number) => {
    onDataChange({
      ...data,
      otherTeachers: data.otherTeachers.filter((_: any, i: number) => i !== index),
    });
  }, [data, onDataChange]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    setShowDropdown(value.length > 0);
    setFocusedIndex(-1);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => Math.min(prev + 1, filteredTeachers.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      addTeacher(filteredTeachers[focusedIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setFocusedIndex(-1);
    }
  }, [focusedIndex, filteredTeachers, addTeacher]);

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
        
        <h1 className="text-[#323130] dark:text-[#ffffff] mb-6" style={{ fontSize: '28px' }}>
          {isStaff 
            ? '(Optional) Give another person permission to co-own this staff notebook?'
            : 'Add other teachers'
          }
        </h1>
        
        <p className="text-[#605e5c] dark:text-[#d0d0d0] mb-4" style={{ fontSize: '13px' }}>
          {isStaff
            ? <>This might be a co-owner, business manager, delegate, or administrative assistant.<br />Type or paste your co-owner names (separated by semicolon) to add them to the staff notebook*</>
            : <>Want to add other teachers to {data.name || 'this notebook'}? They'll have the same permissions as you.</>
          }
        </p>
        
        <div className="relative" ref={dropdownRef}>
          {/* Input container with pills */}
          <div className={`flex items-start gap-3 mb-6`}>
            {!isStaff && (
              <div className="mt-0 pt-2">
                <img src={useGraduationHat ? teacherIconNew : teacherIconNew} alt="" className="w-8 h-8" />
              </div>
            )}
            <div className="flex-1 relative">
              {/* Pills and input wrapper */}
              <div 
                className="flex flex-wrap gap-2 p-2 bg-white dark:bg-[#292929] border border-[#d1d1d1] dark:border-[#5d5d5d] rounded min-h-[40px] items-center cursor-text focus-within:border-[#8661c5] dark:focus-within:border-[#8661c5] transition-colors"
                onClick={() => inputRef.current?.focus()}
              >
                {/* Pills for added teachers */}
                {data.otherTeachers.map((teacher: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-2 py-1 bg-[#f3f2f1] dark:bg-[#3d3d3d] rounded-full border border-[#d1d1d1] dark:border-[#5d5d5d]"
                  >
                    {teacher.photo && (
                      <img 
                        src={teacher.photo} 
                        alt={teacher.name || ''} 
                        className="w-5 h-5 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-[#323130] dark:text-[#ffffff]">
                      {typeof teacher === 'string' ? teacher : teacher.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTeacher(index);
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
                  placeholder={data.otherTeachers.length === 0 
                    ? (isStaff ? "Enter names or email addresses..." : "Enter teacher name or email") 
                    : ""}
                  value={searchText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchText.length > 0 && setShowDropdown(true)}
                  className="flex-1 min-w-[200px] outline-none bg-transparent text-sm px-1 py-1 text-[#323130] dark:text-[#ffffff] placeholder:text-[#605e5c] dark:placeholder:text-[#8a8886] no-fluent-style"
                  style={{ border: 'none' }}
                />
              </div>

              {/* Dropdown suggestions */}
              {showDropdown && filteredTeachers.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1f1f1f] border border-[#d1d1d1] dark:border-[#5d5d5d] rounded shadow-lg max-h-60 overflow-y-auto">
                  {filteredTeachers.map((teacher, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 px-4 py-2 cursor-pointer transition-colors ${
                        index === focusedIndex ? 'bg-[#f3f2f1] dark:bg-[#2b2b2b]' : 'hover:bg-[#faf9f8] dark:hover:bg-[#2b2b2b]'
                      }`}
                      onClick={() => addTeacher(teacher)}
                      onMouseEnter={() => setFocusedIndex(index)}
                    >
                      <img 
                        src={teacher.photo} 
                        alt={teacher.name} 
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-[#323130] dark:text-[#ffffff]">{teacher.name}</div>
                        <div className="text-xs text-[#605e5c] dark:text-[#d0d0d0]">{teacher.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="border-[#8a8886] text-[#323130] hover:bg-[#f3f2f1] rounded"
        >
          Back
        </Button>
        <Button
          onClick={onNext}
          className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
        >
          Next
        </Button>
      </div>
    </div>
  );
});