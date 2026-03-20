import { useState, useCallback, useMemo, useEffect } from 'react';
import { DarkModeProvider } from './components/DarkModeContext';
import { Header } from './components/Header';
import { SubwayNav } from './components/SubwayNav';
import { MarketingPage } from './components/MarketingPage';
import { WelcomePage } from './components/WelcomePage';
import { ManageNotebooksPage } from './components/ManageNotebooksPage';
import { NotebookNameStep } from './components/steps/NotebookNameStep';
import { NotebookOverviewStep } from './components/steps/NotebookOverviewStep';
import { OtherTeachersStep } from './components/steps/OtherTeachersStep';
import { StudentsStep } from './components/steps/StudentsStep';
import { StudentSpacesStep } from './components/steps/StudentSpacesStep';
import { PreviewStep } from './components/steps/PreviewStep';
import { DoneStep } from './components/steps/DoneStep';
import { SelectNotebookStep } from './components/addteachers/SelectNotebookStep';
import { AddRemoveTeachersStep } from './components/addteachers/AddRemoveTeachersStep';
import { AddTeacherPreviewStep } from './components/addteachers/AddTeacherPreviewStep';
import { AddTeacherDoneStep } from './components/addteachers/AddTeacherDoneStep';
import { SelectNotebookStep as SelectNotebookForStudentsStep } from './components/addstudents/SelectNotebookStep';
import { AddRemoveStudentsStep } from './components/addstudents/AddRemoveStudentsStep';
import { AddStudentPreviewStep } from './components/addstudents/AddStudentPreviewStep';
import { AddStudentDoneStep } from './components/addstudents/AddStudentDoneStep';
import { Footer } from './components/Footer';
import { SignInDialog } from './components/SignInDialog';
import { FluentComparisonPage } from './components/FluentComparisonPage';
import { Fluent2Provider } from './components/Fluent2Context';
import faviconImage from 'figma:asset/c3797612b40bcbbcb6a0c00f24388dedd5a5d864.png';

interface Notebook {
  id: string;
  name: string;
  createdAt: string;
  overview: string;
  otherTeachers: any[];
  students: any[];
  studentSections: string[];
  type: 'class' | 'staff';
}

export default function App() {
  const [showMarketing, setShowMarketing] = useState(true);
  const [notebookType, setNotebookType] = useState<'class' | 'staff'>('class');
  const [showSignInDialog, setShowSignInDialog] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showManageNotebooks, setShowManageNotebooks] = useState(false);
  const [showAddTeachersWizard, setShowAddTeachersWizard] = useState(false);
  const [showAddStudentsWizard, setShowAddStudentsWizard] = useState(false);
  const [showFluentComparison, setShowFluentComparison] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [addTeachersStep, setAddTeachersStep] = useState(1);
  const [addStudentsStep, setAddStudentsStep] = useState(1);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [notebookData, setNotebookData] = useState({
    name: '',
    overview: '',
    otherTeachers: [] as string[],
    students: [] as string[],
    studentSpaces: true,
  });
  const [addTeachersData, setAddTeachersData] = useState({
    selectedNotebookId: '',
    teachers: [] as string[],
    newTeachers: [] as Array<{ name: string; email: string; photo?: string }>,
    removedTeachers: [] as Array<{ name: string; email: string; photo?: string }>,
  });
  const [addStudentsData, setAddStudentsData] = useState({
    selectedNotebookId: '',
    students: [] as string[],
    newStudents: [] as Array<{ name: string; email: string; photo?: string }>,
    removedStudents: [] as Array<{ name: string; email: string; photo?: string }>,
  });
  const [featureFlags, setFeatureFlags] = useState<Record<string, boolean>>({
    teacher_student_icon_alt1: true,
    fluent2_components: false,
  });

  // Set favicon
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = faviconImage;
    document.head.appendChild(link);
  }, []);

  // Load notebooks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('onenote_notebooks');
    if (stored) {
      try {
        setNotebooks(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load notebooks:', e);
      }
    }
  }, []);

  // Save notebooks to localStorage whenever they change
  useEffect(() => {
    if (notebooks.length > 0) {
      localStorage.setItem('onenote_notebooks', JSON.stringify(notebooks));
    }
  }, [notebooks]);

  const handleFeatureFlagChange = useCallback((flagKey: string, value: boolean) => {
    setFeatureFlags(prev => ({
      ...prev,
      [flagKey]: value
    }));
  }, []);

  const steps = useMemo(() => [
    { id: 1, title: 'Add Notebook Name', component: NotebookNameStep },
    { id: 2, title: 'Notebook Overview', component: NotebookOverviewStep },
    { id: 3, title: notebookType === 'staff' ? 'Add Another Co-owner' : 'Add Another Teacher', component: OtherTeachersStep },
    { id: 4, title: notebookType === 'staff' ? 'Add Staff Names' : 'Add Student Names', component: StudentsStep },
    { id: 5, title: notebookType === 'staff' ? 'Design Private Spaces' : 'Student Spaces', component: StudentSpacesStep },
    { id: 6, title: 'Preview', component: PreviewStep },
    { id: 7, title: 'Done', component: DoneStep },
  ], [notebookType]);

  const handleNext = useCallback(() => {
    setCurrentStep(prev => prev < steps.length ? prev + 1 : prev);
  }, [steps.length]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to welcome page from step 1
      setShowWizard(false);
    }
  }, [currentStep]);

  const handleStepClick = useCallback((stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId);
    }
  }, [currentStep]);

  const handleCreateNotebook = useCallback(() => {
    setShowWizard(true);
    setCurrentStep(1);
  }, []);

  const handleManageNotebooks = useCallback(() => {
    setShowManageNotebooks(true);
  }, []);

  const handleAddTeachers = useCallback(() => {
    setShowAddTeachersWizard(true);
    setAddTeachersStep(1);
    setAddTeachersData({
      selectedNotebookId: '',
      teachers: [],
      newTeachers: [],
      removedTeachers: [],
    });
  }, []);

  const handleAddStudents = useCallback(() => {
    setShowAddStudentsWizard(true);
    setAddStudentsStep(1);
    setAddStudentsData({
      selectedNotebookId: '',
      students: [],
      newStudents: [],
      removedStudents: [],
    });
  }, []);

  const handleSignIn = useCallback(() => {
    setShowSignInDialog(true);
  }, []);

  const handleSignInConfirm = useCallback(() => {
    setShowSignInDialog(false);
    setShowMarketing(false);
  }, []);

  const handleSignInCancel = useCallback(() => {
    setShowSignInDialog(false);
  }, []);

  const handleSignOut = useCallback(() => {
    setShowMarketing(true);
    // Reset all state when signing out
    setShowWizard(false);
    setShowManageNotebooks(false);
    setShowAddTeachersWizard(false);
    setShowAddStudentsWizard(false);
    setCurrentStep(1);
    setAddTeachersStep(1);
    setAddStudentsStep(1);
    setNotebookData({
      name: '',
      overview: '',
      otherTeachers: [] as string[],
      students: [] as string[],
      studentSpaces: true,
    });
  }, []);

  const handleBackToWelcome = useCallback(() => {
    setShowManageNotebooks(false);
    setShowWizard(false);
    setShowAddTeachersWizard(false);
    setShowAddStudentsWizard(false);
    setCurrentStep(1);
    setAddTeachersStep(1);
    setAddStudentsStep(1);
    // Reset notebook data
    setNotebookData({
      name: '',
      overview: '',
      otherTeachers: [] as string[],
      students: [] as string[],
      studentSpaces: true,
    });
  }, []);

  const handleSaveNotebook = useCallback(() => {
    const newNotebook: Notebook = {
      id: Date.now().toString(),
      name: notebookData.name,
      createdAt: new Date().toISOString(),
      overview: notebookData.overview,
      otherTeachers: notebookData.otherTeachers,
      students: notebookData.students,
      studentSections: (notebookData as any).studentSections || ['Handouts', 'Class Notes', 'Homework', 'Quizzes'],
      type: notebookType,
    };
    setNotebooks(prev => [...prev, newNotebook]);
    // Move to done step
    setCurrentStep(7);
  }, [notebookData, notebookType]);

  if (showMarketing) {
    return (
      <DarkModeProvider>
        <Fluent2Provider enabled={featureFlags.fluent2_components}>
          <MarketingPage 
            onSignIn={handleSignIn} 
            notebookType={notebookType}
            onNotebookTypeChange={setNotebookType}
            featureFlags={featureFlags}
            onFeatureFlagChange={handleFeatureFlagChange}
            onFluentComparison={() => setShowFluentComparison(true)}
          />
          <SignInDialog
            isOpen={showSignInDialog}
            onSignIn={handleSignInConfirm}
            onCancel={handleSignInCancel}
          />
        </Fluent2Provider>
      </DarkModeProvider>
    );
  }

  if (!showWizard && !showManageNotebooks && !showAddTeachersWizard && !showAddStudentsWizard) {
    if (showFluentComparison) {
      return (
        <DarkModeProvider>
          <Fluent2Provider enabled={featureFlags.fluent2_components}>
            <FluentComparisonPage
              onBack={() => setShowFluentComparison(false)}
              notebookType={notebookType}
            />
          </Fluent2Provider>
        </DarkModeProvider>
      );
    }

    return (
      <DarkModeProvider>
        <Fluent2Provider enabled={featureFlags.fluent2_components}>
          <div className="flex flex-col h-screen">
            <Header featureFlags={featureFlags} onFeatureFlagChange={handleFeatureFlagChange} onSignOut={handleSignOut} notebookType={notebookType} onFluentComparison={() => setShowFluentComparison(true)} />
            <WelcomePage 
              onCreateNotebook={handleCreateNotebook} 
              onManageNotebooks={handleManageNotebooks}
              onAddTeachers={handleAddTeachers}
              onAddStudents={handleAddStudents}
              featureFlags={featureFlags}
              notebookType={notebookType}
            />
          </div>
        </Fluent2Provider>
      </DarkModeProvider>
    );
  }

  if (showManageNotebooks) {
    return (
      <DarkModeProvider>
        <Fluent2Provider enabled={featureFlags.fluent2_components}>
          <div className="flex flex-col h-screen">
            <Header featureFlags={featureFlags} onFeatureFlagChange={handleFeatureFlagChange} onSignOut={handleSignOut} notebookType={notebookType} onFluentComparison={() => setShowFluentComparison(true)} />
            <ManageNotebooksPage 
              notebooks={notebooks} 
              onBack={handleBackToWelcome}
              onUpdateNotebook={(updatedNotebook) => {
                setNotebooks(prev => prev.map(nb => 
                  nb.id === updatedNotebook.id ? updatedNotebook : nb
                ));
              }}
              notebookType={notebookType}
            />
          </div>
        </Fluent2Provider>
      </DarkModeProvider>
    );
  }

  if (showAddTeachersWizard) {
    const addTeachersSteps = notebookType === 'staff' 
      ? [
          { id: 1, title: 'Select Notebook' },
          { id: 2, title: 'Add New Co-owner' },
          { id: 3, title: 'Preview' },
          { id: 4, title: 'Done' },
        ]
      : [
          { id: 1, title: 'Select Notebook' },
          { id: 2, title: 'Add New Teacher' },
          { id: 3, title: 'Preview' },
          { id: 4, title: 'Done' },
        ];

    const selectedNotebook = notebooks.find(n => n.id === addTeachersData.selectedNotebookId);

    const handleAddTeachersNext = () => {
      if (addTeachersStep < 4) {
        setAddTeachersStep(prev => prev + 1);
      }
    };

    const handleAddTeachersBack = () => {
      if (addTeachersStep > 1) {
        setAddTeachersStep(prev => prev - 1);
      } else {
        setShowAddTeachersWizard(false);
      }
    };

    const handleAddTeachersStepClick = (stepId: number) => {
      if (stepId <= addTeachersStep) {
        setAddTeachersStep(stepId);
      }
    };

    const handleSaveTeachers = () => {
      // Update the notebook with new teachers
      if (selectedNotebook) {
        setNotebooks(prev => prev.map(nb => 
          nb.id === selectedNotebook.id
            ? { ...nb, otherTeachers: [...nb.otherTeachers, ...addTeachersData.teachers] }
            : nb
        ));
      }
      setAddTeachersStep(4);
    };

    return (
      <DarkModeProvider>
        <Fluent2Provider enabled={featureFlags.fluent2_components}>
        <div className="flex flex-col h-screen">
          <Header featureFlags={featureFlags} onFeatureFlagChange={handleFeatureFlagChange} notebookType={notebookType} onFluentComparison={() => setShowFluentComparison(true)} />
          
          <div className="flex flex-1 overflow-hidden">
            <SubwayNav
              steps={addTeachersSteps}
              currentStep={addTeachersStep}
              onStepClick={handleAddTeachersStepClick}
            />
            
            <main className="flex-1 overflow-auto bg-[#f5f5f5] dark:bg-[#292929]">
              <div 
                key={`add-teachers-${addTeachersStep}`}
                className="animate-fade-in"
              >
                {addTeachersStep === 1 && (
                  <SelectNotebookStep
                    notebooks={notebooks}
                    selectedNotebookId={addTeachersData.selectedNotebookId}
                    onSelect={(id) => {
                      setAddTeachersData(prev => ({ ...prev, selectedNotebookId: id }));
                      handleAddTeachersNext();
                    }}
                    onBack={handleAddTeachersBack}
                    notebookType={notebookType}
                  />
                )}
                {addTeachersStep === 2 && (
                  <AddRemoveTeachersStep
                    notebookName={selectedNotebook?.name || ''}
                    existingTeachers={selectedNotebook?.otherTeachers || []}
                    newTeachers={addTeachersData.newTeachers}
                    removedTeachers={addTeachersData.removedTeachers}
                    onAddTeacher={(teacher) => {
                      setAddTeachersData(prev => ({
                        ...prev,
                        newTeachers: [...prev.newTeachers, teacher],
                        teachers: [...prev.teachers, teacher]
                      }));
                    }}
                    onRemoveTeacher={(teacher) => {
                      const isNewTeacher = addTeachersData.newTeachers.some(
                        t => t.email === teacher.email && t.name === teacher.name
                      );
                      
                      if (isNewTeacher) {
                        setAddTeachersData(prev => ({
                          ...prev,
                          newTeachers: prev.newTeachers.filter(
                            t => !(t.email === teacher.email && t.name === teacher.name)
                          ),
                          teachers: prev.teachers.filter(
                            t => !(t.email === teacher.email && t.name === teacher.name)
                          )
                        }));
                      } else {
                        setAddTeachersData(prev => ({
                          ...prev,
                          removedTeachers: [...prev.removedTeachers, teacher]
                        }));
                      }
                    }}
                    onNext={handleAddTeachersNext}
                    onBack={handleAddTeachersBack}
                    notebookType={notebookType}
                  />
                )}
                {addTeachersStep === 3 && (
                  <AddTeacherPreviewStep
                    notebookName={selectedNotebook?.name || ''}
                    teachers={addTeachersData.teachers}
                    newTeachers={addTeachersData.newTeachers}
                    removedTeachers={addTeachersData.removedTeachers}
                    onBack={handleAddTeachersBack}
                    onNext={handleSaveTeachers}
                    notebookType={notebookType}
                  />
                )}
                {addTeachersStep === 4 && (
                  <AddTeacherDoneStep
                    notebookName={selectedNotebook?.name || ''}
                    teachers={addTeachersData.teachers}
                    onBackToHome={handleBackToWelcome}
                    notebookType={notebookType}
                  />
                )}
              </div>
            </main>
          </div>
          
          <Footer />
        </div>
        </Fluent2Provider>
      </DarkModeProvider>
    );
  }

  if (showAddStudentsWizard) {
    const addStudentsSteps = [
      { id: 1, title: 'Select Notebook' },
      { id: 2, title: notebookType === 'staff' ? 'Add or Remove Staff Members' : 'Add or Remove Students' },
      { id: 3, title: 'Preview' },
      { id: 4, title: 'Done' },
    ];

    const selectedNotebook = notebooks.find(n => n.id === addStudentsData.selectedNotebookId);

    const handleAddStudentsNext = () => {
      if (addStudentsStep < 4) {
        setAddStudentsStep(prev => prev + 1);
      }
    };

    const handleAddStudentsBack = () => {
      if (addStudentsStep > 1) {
        setAddStudentsStep(prev => prev - 1);
      } else {
        setShowAddStudentsWizard(false);
      }
    };

    const handleAddStudentsStepClick = (stepId: number) => {
      if (stepId <= addStudentsStep) {
        setAddStudentsStep(stepId);
      }
    };

    const handleSaveStudents = () => {
      // Update the notebook with new students
      if (selectedNotebook) {
        setNotebooks(prev => prev.map(nb => 
          nb.id === selectedNotebook.id
            ? { ...nb, students: [...nb.students, ...addStudentsData.students] }
            : nb
        ));
      }
      setAddStudentsStep(4);
    };

    return (
      <DarkModeProvider>
        <Fluent2Provider enabled={featureFlags.fluent2_components}>
        <div className="flex flex-col h-screen">
          <Header featureFlags={featureFlags} onFeatureFlagChange={handleFeatureFlagChange} notebookType={notebookType} onFluentComparison={() => setShowFluentComparison(true)} />
          
          <div className="flex flex-1 overflow-hidden">
            <SubwayNav
              steps={addStudentsSteps}
              currentStep={addStudentsStep}
              onStepClick={handleAddStudentsStepClick}
            />
            
            <main className="flex-1 overflow-auto bg-[#f5f5f5] dark:bg-[#292929]">
              <div 
                key={`add-students-${addStudentsStep}`}
                className="animate-fade-in"
              >
                {addStudentsStep === 1 && (
                  <SelectNotebookForStudentsStep
                    notebooks={notebooks}
                    selectedNotebookId={addStudentsData.selectedNotebookId}
                    onSelect={(id) => {
                      setAddStudentsData(prev => ({ ...prev, selectedNotebookId: id }));
                      handleAddStudentsNext();
                    }}
                    onBack={handleAddStudentsBack}
                    notebookType={notebookType}
                  />
                )}
                {addStudentsStep === 2 && (
                  <AddRemoveStudentsStep
                    notebookName={selectedNotebook?.name || ''}
                    existingStudents={selectedNotebook?.students || []}
                    newStudents={addStudentsData.newStudents}
                    removedStudents={addStudentsData.removedStudents}
                    onAddStudent={(student) => {
                      setAddStudentsData(prev => ({
                        ...prev,
                        newStudents: [...prev.newStudents, student],
                        students: [...prev.students, student]
                      }));
                    }}
                    onRemoveStudent={(student) => {
                      const isNewStudent = addStudentsData.newStudents.some(
                        s => s.email === student.email && s.name === student.name
                      );
                      
                      if (isNewStudent) {
                        setAddStudentsData(prev => ({
                          ...prev,
                          newStudents: prev.newStudents.filter(
                            s => !(s.email === student.email && s.name === student.name)
                          ),
                          students: prev.students.filter(
                            s => !(s.email === student.email && s.name === student.name)
                          )
                        }));
                      } else {
                        setAddStudentsData(prev => ({
                          ...prev,
                          removedStudents: [...prev.removedStudents, student]
                        }));
                      }
                    }}
                    onNext={handleAddStudentsNext}
                    onBack={handleAddStudentsBack}
                    notebookType={notebookType}
                  />
                )}
                {addStudentsStep === 3 && (
                  <AddStudentPreviewStep
                    notebookName={selectedNotebook?.name || ''}
                    newStudents={addStudentsData.newStudents}
                    removedStudents={addStudentsData.removedStudents}
                    onBack={handleAddStudentsBack}
                    onNext={handleSaveStudents}
                    notebookType={notebookType}
                  />
                )}
                {addStudentsStep === 4 && (
                  <AddStudentDoneStep
                    notebookName={selectedNotebook?.name || ''}
                    students={addStudentsData.students}
                    onBackToHome={handleBackToWelcome}
                  />
                )}
              </div>
            </main>
          </div>
          
          <Footer />
        </div>
        </Fluent2Provider>
      </DarkModeProvider>
    );
  }

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <DarkModeProvider>
      <Fluent2Provider enabled={featureFlags.fluent2_components}>
      <div className="flex flex-col h-screen">
        <Header featureFlags={featureFlags} onFeatureFlagChange={handleFeatureFlagChange} onSignOut={handleSignOut} notebookType={notebookType} onFluentComparison={() => setShowFluentComparison(true)} />
        
        <div className="flex flex-1 overflow-hidden">
          <SubwayNav
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
          
          <main className="flex-1 overflow-auto bg-[#f5f5f5] dark:bg-[#292929]">
            <div 
              key={`main-wizard-${currentStep}`}
              className="animate-fade-in"
            >
              <CurrentStepComponent
                data={notebookData}
                onDataChange={setNotebookData}
                onNext={currentStep === 6 ? handleSaveNotebook : handleNext}
                onBack={handleBack}
                onBackToHome={handleBackToWelcome}
                featureFlags={featureFlags}
                notebookType={notebookType}
              />
            </div>
          </main>
        </div>
        
        <Footer />
      </div>
      </Fluent2Provider>
    </DarkModeProvider>
  );
}