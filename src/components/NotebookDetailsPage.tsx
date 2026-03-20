import { Plus, Pencil, ChevronRight, Check, ChevronLeft, Trash2, X, AlertCircle, Link } from 'lucide-react';
import { memo, useState, useRef } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import tabIcon from 'figma:asset/7e320f661c33c556f5b01bc9c68012ced7cf4356.png';

interface Notebook {
  id: string;
  name: string;
  createdAt: string;
  studentSections?: string[];
  students?: string[];
}

interface NotebookDetailsPageProps {
  notebook: Notebook;
  onBack: () => void;
  onUpdateNotebook: (notebook: Notebook) => void;
  notebookType?: 'class' | 'staff';
}

export const NotebookDetailsPage = memo(function NotebookDetailsPage({ 
  notebook, 
  onBack,
  onUpdateNotebook,
  notebookType = 'class'
}: NotebookDetailsPageProps) {
  const isStaff = notebookType === 'staff';
  const accent = '#7719AA';
  const accentHover = '#6b15a0';
  // Terminology helpers
  const studentLabel = isStaff ? 'member' : 'student';
  const studentLabelPlural = isStaff ? 'members' : 'students';
  const StudentLabelCap = isStaff ? 'Member' : 'Student';
  const StudentLabelPluralCap = isStaff ? 'Members' : 'Students';
  const teacherLabel = isStaff ? 'leader' : 'teacher';
  const parentLinksTitle = isStaff ? 'Member Links' : 'Parent Notebook Links';

  const [sections, setSections] = useState<string[]>(
    notebook.studentSections || (isStaff ? ['Meeting Notes', 'Professional Development', 'Resources'] : ['Class Notes', 'Handouts', 'Homework', 'Quizzes'])
  );
  const [originalSections] = useState<string[]>(
    notebook.studentSections || ['Class Notes', 'Handouts', 'Homework', 'Quizzes']
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [isCollaborationLocked, setIsCollaborationLocked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isEditingNotebookName, setIsEditingNotebookName] = useState(false);
  const [notebookName, setNotebookName] = useState(notebook.name);
  const [showDeletionBanner, setShowDeletionBanner] = useState(true);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [permissionSections, setPermissionSections] = useState([
    { name: 'Kindergarten Worksheets', location: '_Collaboration Space', students: 0 },
    { name: 'Using the Collaboration Space', location: '_Collaboration Space', students: 0 },
  ]);
  const [isAddingPermissionSection, setIsAddingPermissionSection] = useState(false);
  const [newPermissionSectionName, setNewPermissionSectionName] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [readOnlyAccess, setReadOnlyAccess] = useState(false);
  // Track student assignments per section (sectionName -> array of student names)
  const [sectionStudentAssignments, setSectionStudentAssignments] = useState<Record<string, string[]>>({
    'Kindergarten Worksheets': [],
    'Using the Collaboration Space': [],
  });
  const [showAddSectionDialog, setShowAddSectionDialog] = useState(false);
  const [newSectionStudents, setNewSectionStudents] = useState<string[]>([]);
  const [newSectionReadOnly, setNewSectionReadOnly] = useState(false);
  const [newSectionNameError, setNewSectionNameError] = useState('');
  const [showParentLinksDialog, setShowParentLinksDialog] = useState(false);
  const [parentLinksTab, setParentLinksTab] = useState<'content-library' | 'student-notebooks'>('student-notebooks');
  const [parentLinkType, setParentLinkType] = useState<'individual' | 'all'>('individual');
  const [selectedStudentForLink, setSelectedStudentForLink] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Use students from notebook if available, otherwise use default list
  const students = notebook.students && notebook.students.length > 0 
    ? notebook.students 
    : ['Mei Tan', 'John Smith', 'Sarah Johnson', 'Mike Davis'];

  const notebookLink = `onenote:https://educontosomanual-my.sharepoint.com/personal/${notebook.id}`;

  // Helper function to get student name (handles both string and object formats)
  const getStudentName = (student: any): string => {
    if (typeof student === 'string') {
      return student;
    }
    return student?.name || '';
  };

  // Helper function to get student identifier for keys and comparisons
  const getStudentId = (student: any): string => {
    if (typeof student === 'string') {
      return student;
    }
    return student?.name || student?.email || '';
  };

  // Calculate deleted sections count
  const deletedSectionsCount = originalSections.length - sections.length;

  const handleEditSection = (index: number) => {
    setEditingIndex(index);
    setEditingValue(sections[index]);
  };

  const handleSaveEdit = (index: number) => {
    if (editingValue.trim()) {
      const newSections = [...sections];
      newSections[index] = editingValue.trim();
      setSections(newSections);
      setHasChanges(true);
    }
    setEditingIndex(null);
    setEditingValue('');
  };

  const handleAddSection = () => {
    if (newSectionName.trim()) {
      setSections([...sections, newSectionName.trim()]);
      setNewSectionName('');
      setIsAddingNew(false);
      setHasChanges(true);
    }
  };

  const handleSave = () => {
    onUpdateNotebook({
      ...notebook,
      studentSections: sections,
      name: notebookName,
    });
    setHasChanges(false);
    setShowDeletionBanner(false);
    toast.success('Notebook settings saved successfully');
  };

  const handleCancel = () => {
    setSections(notebook.studentSections || ['Class Notes', 'Handouts', 'Homework', 'Quizzes']);
    setHasChanges(false);
    setEditingIndex(null);
    setIsAddingNew(false);
    setIsEditingNotebookName(false);
    setNotebookName(notebook.name);
  };

  const handleCopyLink = () => {
    // Fallback clipboard implementation for environments where Clipboard API is blocked
    try {
      navigator.clipboard.writeText(notebookLink).then(() => {
        toast.success('Notebook link copied!');
        setLinkCopied(true);
        if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
        copyTimerRef.current = setTimeout(() => setLinkCopied(false), 15000);
      }).catch(() => {
        // Fallback to older method
        fallbackCopyTextToClipboard(notebookLink);
      });
    } catch (err) {
      fallbackCopyTextToClipboard(notebookLink);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Notebook link copied!');
      setLinkCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setLinkCopied(false), 15000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
    document.body.removeChild(textArea);
  };

  const handleDeleteSection = (index: number) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
    setHasChanges(true);
  };

  const handleEditNotebookName = () => {
    setIsEditingNotebookName(true);
  };

  const handleSaveNotebookName = () => {
    if (notebookName.trim()) {
      setIsEditingNotebookName(false);
      if (notebookName !== notebook.name) {
        setHasChanges(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-8" style={{ '--accent': accent, '--accent-hover': accentHover } as any}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#605e5c] hover:text-[#323130] transition-all mb-6 -ml-2 px-2 py-1 rounded hover:bg-[#f3f2f1]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          {/* Deletion Warning Banner */}
          {deletedSectionsCount > 0 && showDeletionBanner && (
            <div className="flex items-center gap-3 bg-[#fde7e9] border border-[#e1dfdd] rounded px-3 py-3 mb-6">
              <AlertCircle className="w-5 h-5 text-[#a4262c] flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-[#323130]" style={{ fontSize: '14px' }}>
                  <strong>Sections will be deleted.</strong>
                </span>
                {' '}
                <span className="text-[#605e5c]" style={{ fontSize: '14px' }}>
                  {deletedSectionsCount} {deletedSectionsCount === 1 ? 'section' : 'sections'} and all pages in {deletedSectionsCount === 1 ? 'that section' : 'those sections'} will be permanently deleted.
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={handleSave}
                  className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-4 py-1.5 rounded h-auto"
                  style={{ fontSize: '14px', backgroundColor: accent }}
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancel}
                  variant="ghost"
                  className="text-[#323130] hover:bg-[#f3f2f1] rounded px-4 py-1.5 h-auto"
                  style={{ fontSize: '14px' }}
                >
                  Cancel
                </Button>
              </div>
              <button
                onClick={() => setShowDeletionBanner(false)}
                className="text-[#605e5c] hover:text-[#323130] p-1 flex-shrink-0"
                aria-label="Dismiss banner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <h1 className="text-[#323130]" style={{ fontSize: '24px', fontWeight: '600' }}>
              Manage {notebook.name}
            </h1>
            <button className="flex items-center gap-2" style={{ color: accent }}>
              Open Notebook
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-12">
          {/* Left Column - Student Sections */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-[#323130]">
                {isStaff ? 'Member sections' : 'Student sections'}
              </h2>
            </div>
            
            <div className="space-y-3 mb-4">
              {/* Notebook Title Edit */}
              <div
                className={`flex items-center gap-3 p-3 bg-white border rounded transition-all ${
                  isEditingNotebookName ? '' : 'border-[#d1d1d1]'
                }`}
                style={isEditingNotebookName ? { borderColor: accent } : undefined}
              >
                <img src={tabIcon} alt="" className="w-4 h-6 flex-shrink-0" style={{ objectFit: 'contain' }} />
                {isEditingNotebookName ? (
                  <input
                    type="text"
                    value={notebookName}
                    onChange={(e) => setNotebookName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveNotebookName();
                      if (e.key === 'Escape') {
                        setIsEditingNotebookName(false);
                        setNotebookName(notebook.name);
                      }
                    }}
                    onBlur={handleSaveNotebookName}
                    className="flex-1 outline-none bg-transparent"
                    autoFocus
                  />
                ) : (
                  <span className="flex-1 text-[#323130]">{notebookName}</span>
                )}
                <button
                  onClick={handleEditNotebookName}
                  className="text-[#605e5c] hover:text-[#323130] p-1"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>

              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 bg-white border rounded transition-all ${
                    editingIndex === index ? '' : 'border-[#d1d1d1]'
                  }`}
                  style={editingIndex === index ? { borderColor: accent } : undefined}
                >
                  <img src={tabIcon} alt="" className="w-4 h-6 flex-shrink-0" style={{ objectFit: 'contain' }} />
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(index);
                        if (e.key === 'Escape') {
                          setEditingIndex(null);
                          setEditingValue('');
                        }
                      }}
                      onBlur={() => handleSaveEdit(index)}
                      className="flex-1 outline-none bg-transparent"
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1 text-[#323130]">{section}</span>
                  )}
                  <button
                    onClick={() => handleEditSection(index)}
                    className="text-[#605e5c] hover:text-[#323130] p-1"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteSection(index)}
                    className="text-[#605e5c] hover:text-[#323130] p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {isAddingNew ? (
              <div className="flex items-center gap-3 p-3 bg-white border rounded mb-4" style={{ borderColor: accent }}>
                <img src={tabIcon} alt="" className="w-4 h-6 flex-shrink-0" style={{ objectFit: 'contain' }} />
                <input
                  type="text"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSection();
                    if (e.key === 'Escape') {
                      setIsAddingNew(false);
                      setNewSectionName('');
                    }
                  }}
                  onBlur={handleAddSection}
                  placeholder="Enter section name"
                  className="flex-1 outline-none bg-transparent"
                  autoFocus
                />
              </div>
            ) : (
              <button
                onClick={() => setIsAddingNew(true)}
                className="flex items-center gap-2 text-[#323130] mb-6"
                style={{ color: undefined }}
                onMouseEnter={(e) => e.currentTarget.style.color = accent}
                onMouseLeave={(e) => e.currentTarget.style.color = '#323130'}
              >
                <Plus className="w-4 h-4" />
                Add section
              </button>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={!hasChanges}
                className="text-white px-6 rounded disabled:opacity-50"
                style={{ backgroundColor: accent }}
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="ghost"
                className="text-[#323130] hover:bg-[#f3f2f1] rounded"
              >
                Cancel
              </Button>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="space-y-8">
            {/* Teacher-Only Section Group */}
            <div>
              <h2 className="text-[#323130] mb-3">
                Teacher-Only section group
              </h2>
              <div className="flex items-center gap-2 text-[#107c10]">
                <Check className="w-5 h-5" />
                <span>Enabled by default</span>
              </div>
            </div>

            {/* Lock Collaboration Space */}
            <div>
              <h2 className="text-[#323130] mb-3">
                Lock Collaboration Space
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsCollaborationLocked(!isCollaborationLocked)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isCollaborationLocked ? '' : 'bg-[#8a8886]'
                  }`}
                  style={isCollaborationLocked ? { backgroundColor: accent } : undefined}
                >
                  <div
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                      isCollaborationLocked ? 'translate-x-5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span className="text-[#323130]">
                  {isCollaborationLocked ? 'Locked' : 'Unlocked'}
                </span>
              </div>
            </div>

            {/* Collaboration Space Permissions */}
            <div>
              <button
                onClick={() => setShowPermissionsDialog(true)}
                className="mb-2"
                style={{ color: accent }}
              >
                Collaboration Space permissions
              </button>
              <p className="text-[#605e5c] text-sm">
                Give specific {studentLabelPlural} permission to view and edit these sections
              </p>
            </div>

            {/* Parent and Guardian Links */}
            <div>
              <button
                onClick={() => setShowParentLinksDialog(true)}
                className="mb-2"
                style={{ color: accent }}
              >
                {parentLinksTitle}
              </button>
              <p className="text-[#605e5c] text-sm">
                {isStaff ? 'Create and manage guest links for members' : 'Create and manage guest links for parents'}
              </p>
            </div>

            {/* Notebook Link */}
            <div>
              <h2 className="text-[#323130] mb-3">
                Notebook link
              </h2>
              <div className="flex gap-0">
                <input
                  type="text"
                  value={notebookLink}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-[#d1d1d1] border-r-0 text-[#323130] text-sm outline-none"
                />
                <Button
                  onClick={handleCopyLink}
                  className="text-white px-6 rounded-l-none transition-colors"
                  style={{ backgroundColor: linkCopied ? '#107c10' : accent }}
                >
                  {linkCopied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    'Copy'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Dialog */}
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent className="max-w-[968px] sm:max-w-[968px] bg-white p-0 gap-0 rounded-lg border-0 shadow-2xl overflow-hidden" style={{ maxHeight: '600px' }}>
          <DialogTitle className="sr-only">
            {selectedSection ? 'Lock Collaboration Space' : 'Manage Section Permissions'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {selectedSection 
              ? 'Choose students who can view and edit this section.' 
              : 'Give specific students permission to view and edit these sections (e.g., for group projects).'}
          </DialogDescription>
          
          {!selectedSection ? (
            <>
              {/* Dialog Header - Section List */}
              <div className="px-6 pt-6 pb-4 border-b border-[#edebe9]">
                <h2 className="text-[#323130] m-0" style={{ fontSize: '20px' }} aria-hidden="true">
                  Manage Section Permissions
                </h2>
              </div>

              {/* Dialog Body - Section List */}
              <div className="px-6 py-4">
                <p className="text-[#605e5c] mb-6" style={{ fontSize: '14px' }} aria-hidden="true">
                  Give specific students permission to view and edit these sections (e.g., for group projects).
                </p>

                {/* Sections List */}
                <div className="space-y-3 mb-4">
                  {permissionSections.map((section, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-[#edebe9]"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <img src={tabIcon} alt="" className="w-3 h-6 flex-shrink-0" style={{ objectFit: 'contain' }} />
                        <span className="text-[#323130]" style={{ fontSize: '14px' }}>
                          {section.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-[#605e5c]" style={{ fontSize: '14px' }}>
                          {section.location}
                        </span>
                        <span className="text-[#605e5c] w-20" style={{ fontSize: '14px' }}>
                          {section.students} Students
                        </span>
                        <button
                          onClick={() => {
                            setSelectedSection(section.name);
                            // Load previously assigned students for this section
                            setSelectedStudents(sectionStudentAssignments[section.name] || []);
                          }}
                          className="text-[#605e5c] hover:text-[#323130] p-1"
                          aria-label="Edit section"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Section */}
                {isAddingPermissionSection ? (
                  <div className="flex items-center gap-3 p-3 bg-white border border-[#7719AA] rounded mb-4">
                    <img src={tabIcon} alt="" className="w-3 h-6 flex-shrink-0" style={{ objectFit: 'contain' }} />
                    <input
                      type="text"
                      value={newPermissionSectionName}
                      onChange={(e) => setNewPermissionSectionName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && newPermissionSectionName.trim()) {
                          setPermissionSections([
                            ...permissionSections,
                            { name: newPermissionSectionName.trim(), location: '_Collaboration Space', students: 0 },
                          ]);
                          setNewPermissionSectionName('');
                          setIsAddingPermissionSection(false);
                        }
                        if (e.key === 'Escape') {
                          setIsAddingPermissionSection(false);
                          setNewPermissionSectionName('');
                        }
                      }}
                      onBlur={() => {
                        if (newPermissionSectionName.trim()) {
                          setPermissionSections([
                            ...permissionSections,
                            { name: newPermissionSectionName.trim(), location: '_Collaboration Space', students: 0 },
                          ]);
                        }
                        setNewPermissionSectionName('');
                        setIsAddingPermissionSection(false);
                      }}
                      placeholder="Enter section name"
                      className="flex-1 outline-none bg-transparent"
                      style={{ fontSize: '14px' }}
                      autoFocus
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddSectionDialog(true)}
                    className="flex items-center gap-2 py-2"
                    style={{ color: accent }}
                  >
                    <Plus className="w-5 h-5" />
                    <span style={{ fontSize: '14px' }}>Add section</span>
                  </button>
                )}
              </div>

              {/* Dialog Footer */}
              <div className="px-6 py-4 border-t border-[#edebe9] flex justify-end">
                <Button
                  onClick={() => setShowPermissionsDialog(false)}
                  className="text-white px-6 rounded"
                  style={{ fontSize: '14px', backgroundColor: accent }}
                >
                  Close
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Dialog Header - Student Selection */}
              <div className="px-6 pt-6 pb-4 border-b border-[#edebe9]">
                <button
                  onClick={() => {
                    setSelectedSection(null);
                    setSelectedStudents([]);
                    setReadOnlyAccess(false);
                  }}
                  className="flex items-center gap-1 mb-6"
                  style={{ fontSize: '14px', color: accent }}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <h1 className="text-[#323130] m-0" style={{ fontSize: '20px' }} aria-hidden="true">
                  Choose {studentLabelPlural} who can view and edit this section.
                </h1>
              </div>

              {/* Dialog Body - Student Selection */}
              <div className="px-6 py-4 min-h-[400px]">
                {/* Student Checkboxes */}
                <div className="space-y-3 mb-6 border-b border-[#edebe9] pb-4">
                  {students.map((student) => (
                    <div key={getStudentId(student)} className="flex items-center gap-3">
                      <Checkbox
                        id={`student-${getStudentId(student)}`}
                        checked={selectedStudents.includes(getStudentName(student))}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStudents([...selectedStudents, getStudentName(student)]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(s => s !== getStudentName(student)));
                          }
                        }}
                        className="border-[#8a8886] flex-shrink-0"
                        style={{ width: '20px', height: '20px', '--accent-check': accent } as any}
                      />
                      <label
                        htmlFor={`student-${getStudentId(student)}`}
                        className="text-[#323130] cursor-pointer flex-1"
                        style={{ fontSize: '14px' }}
                      >
                        {getStudentName(student)}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Read-only Access Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="read-only-access"
                    checked={readOnlyAccess}
                    onCheckedChange={(checked) => {
                      setReadOnlyAccess(checked as boolean);
                      // Deselect all students when read-only is enabled
                      if (checked) {
                        setSelectedStudents([]);
                      }
                    }}
                    className="border-[#8a8886] flex-shrink-0"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <label
                    htmlFor="read-only-access"
                    className="text-[#323130] cursor-pointer flex-1"
                    style={{ fontSize: '14px' }}
                  >
                    Give read-only access to all {studentLabelPlural} in the {isStaff ? 'team' : 'class'}
                  </label>
                </div>
              </div>

              {/* Dialog Footer - Student Selection */}
              <div className="px-6 py-4 border-t border-[#edebe9] flex justify-end gap-3">
                <Button
                  onClick={() => {
                    if (selectedSection) {
                      // Update the student assignments for this section
                      setSectionStudentAssignments(prev => ({
                        ...prev,
                        [selectedSection]: selectedStudents
                      }));
                      
                      // Update the section student count in the permissionSections list
                      setPermissionSections(prev => prev.map(section => 
                        section.name === selectedSection 
                          ? { ...section, students: selectedStudents.length }
                          : section
                      ));
                    }
                    
                    toast.success('Permissions saved successfully');
                    setSelectedSection(null);
                    setSelectedStudents([]);
                    setReadOnlyAccess(false);
                  }}
                  className="text-white px-6 rounded"
                  style={{ fontSize: '14px', backgroundColor: accent }}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setSelectedSection(null);
                    setSelectedStudents([]);
                    setReadOnlyAccess(false);
                  }}
                  className="text-white px-6 rounded"
                  style={{ fontSize: '14px', backgroundColor: accent }}
                >
                  Close
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Section Dialog */}
      <Dialog open={showAddSectionDialog} onOpenChange={setShowAddSectionDialog}>
        <DialogContent className="max-w-2xl bg-white p-0 gap-0 rounded-sm border-0 shadow-2xl">
          <DialogTitle className="sr-only">Name the new section</DialogTitle>
          <DialogDescription className="sr-only">Create a new section in the Collaboration Space</DialogDescription>
          
          {/* Dialog Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[#edebe9]">
            <button
              onClick={() => {
                setShowAddSectionDialog(false);
                setNewPermissionSectionName('');
                setNewSectionStudents([]);
                setNewSectionReadOnly(false);
                setNewSectionNameError('');
              }}
              className="flex items-center gap-1 text-[#7719AA] hover:text-[#6b15a0] mb-6"
              style={{ fontSize: '14px' }}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-[#323130] m-0" style={{ fontSize: '20px' }} aria-hidden="true">
              Name the new section
            </h1>
          </div>

          {/* Dialog Body */}
          <div className="px-6 py-4">
            {/* Section Name Input */}
            <div className="mb-4">
              <div className="border-l-2 pl-3" style={{ borderColor: newSectionNameError ? '#a4262c' : accent }}>
                <input
                  type="text"
                  value={newPermissionSectionName}
                  onChange={(e) => {
                    setNewPermissionSectionName(e.target.value);
                    if (e.target.value.trim()) {
                      setNewSectionNameError('');
                    }
                  }}
                  placeholder="Name the new section"
                  className="w-full px-3 py-2 border border-[#8a8886] rounded text-[#323130] outline-none"
                  style={{ fontSize: '14px' }}
                />
              </div>
              {newSectionNameError ? (
                <p className="text-[#a4262c] mt-1 ml-5" style={{ fontSize: '12px' }}>
                  {newSectionNameError}
                </p>
              ) : (
                <p className="text-[#a4262c] mt-1 ml-5" style={{ fontSize: '12px' }}>
                  Type a name for this section.
                </p>
              )}
            </div>
            
            <h3 className="text-[#323130] mb-3" style={{ fontSize: '14px', fontWeight: '600' }}>
              Choose {studentLabelPlural} who can read and edit content
            </h3>
            
            {/* Students Display/Selection */}
            <div className="mb-4">
              <div className="px-3 py-2 bg-[#f3f2f1] border border-[#8a8886] rounded text-[#605e5c]" style={{ fontSize: '14px' }}>
                {newSectionStudents.length === 0 ? `No ${studentLabelPlural}` : `${newSectionStudents.length} ${studentLabel}${newSectionStudents.length !== 1 ? 's' : ''} selected`}
              </div>
            </div>

            {/* Create In Dropdown */}
            <div className="mb-4">
              <label className="block text-[#323130] mb-2" style={{ fontSize: '14px' }}>
                Create in
              </label>
              <select
                className="w-full px-3 py-2 border border-[#8a8886] rounded text-[#323130] outline-none"
                style={{ fontSize: '14px' }}
                defaultValue="_Collaboration Space"
              >
                <option value="_Collaboration Space">_Collaboration Space</option>
              </select>
            </div>

            {/* Read-only Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="new-section-read-only"
                checked={newSectionReadOnly}
                onCheckedChange={(checked) => setNewSectionReadOnly(checked as boolean)}
                className="border-[#8a8886] flex-shrink-0 mt-0.5"
                style={{ width: '16px', height: '16px' }}
              />
              <label
                htmlFor="new-section-read-only"
                className="text-[#323130] cursor-pointer flex-1"
                style={{ fontSize: '14px' }}
              >
                Give read-only access to all {studentLabelPlural} in the {isStaff ? 'team' : 'class'}, even if they're not in the group
              </label>
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="px-6 py-4 border-t border-[#edebe9] flex justify-end gap-3">
            <Button
              onClick={() => {
                if (!newPermissionSectionName.trim()) {
                  setNewSectionNameError('Section name is required');
                  return;
                }
                
                // Add the new section
                setPermissionSections([
                  ...permissionSections,
                  { name: newPermissionSectionName.trim(), location: '_Collaboration Space', students: newSectionStudents.length },
                ]);
                
                // Store student assignments if any
                if (newSectionStudents.length > 0) {
                  setSectionStudentAssignments(prev => ({
                    ...prev,
                    [newPermissionSectionName.trim()]: newSectionStudents
                  }));
                }
                
                toast.success('Section created successfully');
                
                // Close dialog and reset
                setShowAddSectionDialog(false);
                setNewPermissionSectionName('');
                setNewSectionStudents([]);
                setNewSectionReadOnly(false);
                setNewSectionNameError('');
              }}
              className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 rounded"
              style={{ fontSize: '14px' }}
            >
              Create
            </Button>
            <Button
              onClick={() => {
                setShowAddSectionDialog(false);
                setNewPermissionSectionName('');
                setNewSectionStudents([]);
                setNewSectionReadOnly(false);
                setNewSectionNameError('');
              }}
              className="text-white px-6 rounded"
              style={{ fontSize: '14px', backgroundColor: accent }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Parent Notebook Links Dialog */}
      <Dialog open={showParentLinksDialog} onOpenChange={(open) => {
        setShowParentLinksDialog(open);
        if (!open) {
          setParentLinksTab('student-notebooks');
          setParentLinkType('individual');
          setSelectedStudentForLink('');
          setLinkCopied(false);
        }
      }}>
        <DialogContent className="max-w-[968px] sm:max-w-[968px] bg-white p-0 gap-0 rounded-lg border-0 shadow-2xl overflow-hidden" style={{ maxHeight: '600px' }}>
          <DialogTitle className="sr-only">Parent Notebook Links</DialogTitle>
          <DialogDescription className="sr-only">
            Create and manage read-only guest links for parents and guardians.
          </DialogDescription>

          {/* Dialog Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#edebe9]">
            <h2 className="text-[#242424] m-0" style={{ fontSize: '20px', fontWeight: '600', lineHeight: '28px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
              {parentLinksTitle}
            </h2>
          </div>

          {/* Dialog Body - Two-column layout */}
          <div className="flex min-h-[360px]">
            {/* Left Nav */}
            <nav className="w-[180px] border-r border-[#edebe9] bg-[#fafafa] flex-shrink-0 pt-2">
              <button
                onClick={() => setParentLinksTab('content-library')}
                className={`w-full text-left px-5 py-2.5 transition-colors relative ${
                  parentLinksTab === 'content-library'
                    ? 'bg-[#ebebeb] text-[#242424]'
                    : 'text-[#424242] hover:bg-[#f0f0f0]'
                }`}
                style={{ fontSize: '14px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}
              >
                {parentLinksTab === 'content-library' && (
                  <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r" style={{ backgroundColor: accent }} />
                )}
                Content Library
              </button>
              <button
                onClick={() => setParentLinksTab('student-notebooks')}
                className={`w-full text-left px-5 py-2.5 transition-colors relative ${
                  parentLinksTab === 'student-notebooks'
                    ? 'bg-[#ebebeb] text-[#242424]'
                    : 'text-[#424242] hover:bg-[#f0f0f0]'
                }`}
                style={{ fontSize: '14px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}
              >
                {parentLinksTab === 'student-notebooks' && (
                  <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r" style={{ backgroundColor: accent }} />
                )}
                {isStaff ? 'Member Notebooks' : 'Student Notebooks'}
              </button>
            </nav>

            {/* Right Content Panel */}
            <div className="flex-1 px-6 py-5 overflow-y-auto">
              {parentLinksTab === 'content-library' ? (
                <>
                  <h3 className="text-[#242424] mb-4" style={{ fontSize: '16px', fontWeight: '600', lineHeight: '22px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                    Content Library
                  </h3>
                  <p className="text-[#616161] mb-6" style={{ fontSize: '14px', lineHeight: '20px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                    A read-only link will be created for the Content Library. No account is required to view.
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => {
                        toast.success('Content Library link created');
                      }}
                      className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-5 rounded-md flex items-center gap-2"
                      style={{ fontSize: '14px', fontFamily: "'Segoe UI', system-ui, sans-serif", backgroundColor: accent }}
                    >
                      <Link className="w-4 h-4" />
                      Get a link
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-[#242424] mb-5" style={{ fontSize: '16px', fontWeight: '600', lineHeight: '22px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                    {isStaff ? 'Member Notebooks' : 'Student Notebooks'}
                  </h3>

                  {/* Individual Student Radio */}
                  <div className="mb-5">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            parentLinkType === 'individual'
                              ? ''
                              : 'border-[#8a8886] group-hover:border-[#605e5c]'
                          }`}
                          style={parentLinkType === 'individual' ? { borderColor: accent } : undefined}
                        >
                          {parentLinkType === 'individual' && (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1" onClick={() => setParentLinkType('individual')}>
                        <span className="text-[#242424] block mb-1" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '20px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                          Individual {StudentLabelCap}
                        </span>
                        <span className="text-[#616161] block" style={{ fontSize: '14px', lineHeight: '20px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                          A read-only link will be created for a single {studentLabel}. No account is required to view.
                        </span>
                      </div>
                    </label>

                    {/* Student Dropdown - shown when Individual is selected */}
                    {parentLinkType === 'individual' && (
                      <div className="ml-8 mt-3">
                        <select
                          value={selectedStudentForLink}
                          onChange={(e) => setSelectedStudentForLink(e.target.value)}
                          className="w-full max-w-[260px] px-3 py-2 border border-[#8a8886] rounded-md text-[#242424] outline-none focus:border-[#7719AA] bg-white appearance-none"
                          style={{
                            fontSize: '14px',
                            fontFamily: "'Segoe UI', system-ui, sans-serif",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23616161' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 12px center',
                            paddingRight: '36px',
                          }}
                        >
                          <option value="" disabled>Select {studentLabel}</option>
                          {students.map((student) => (
                            <option key={getStudentId(student)} value={getStudentName(student)}>
                              {getStudentName(student)}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#edebe9] my-4" />

                  {/* All Students Radio */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="mt-0.5 flex-shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            parentLinkType === 'all'
                              ? ''
                              : 'border-[#8a8886] group-hover:border-[#605e5c]'
                          }`}
                          style={parentLinkType === 'all' ? { borderColor: accent } : undefined}
                        >
                          {parentLinkType === 'all' && (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
                          )}
                        </div>
                      </div>
                      <div className="flex-1" onClick={() => setParentLinkType('all')}>
                        <span className="text-[#242424] block mb-1" style={{ fontSize: '14px', fontWeight: '600', lineHeight: '20px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                          All {StudentLabelPluralCap}
                        </span>
                        <span className="text-[#616161] block" style={{ fontSize: '14px', lineHeight: '20px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
                          Read-only links will be created for each {studentLabel}'s private notebook. No account is required to view.
                        </span>
                      </div>
                    </label>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Dialog Footer */}
          <div className="px-6 py-4 border-t border-[#edebe9] flex justify-end gap-3">
            <Button
              onClick={() => {
                if (parentLinksTab === 'student-notebooks') {
                  if (parentLinkType === 'individual' && selectedStudentForLink) {
                    toast.success(`Parent link created for ${selectedStudentForLink}`);
                  } else if (parentLinkType === 'all') {
                    toast.success('Parent links created for all students');
                  } else {
                    toast('Please select a student first', { description: 'Choose a student from the dropdown to generate a link.' });
                    return;
                  }
                } else {
                  toast.success('Content Library link created');
                }
                setShowParentLinksDialog(false);
              }}
              className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-5 rounded-md"
              style={{ fontSize: '14px', fontFamily: "'Segoe UI', system-ui, sans-serif", backgroundColor: accent }}
            >
              Get link
            </Button>
            <Button
              onClick={() => setShowParentLinksDialog(false)}
              variant="outline"
              className="border-[#d1d1d1] text-[#424242] hover:bg-[#f5f5f5] px-5 rounded-md"
              style={{ fontSize: '14px', fontFamily: "'Segoe UI', system-ui, sans-serif" }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});