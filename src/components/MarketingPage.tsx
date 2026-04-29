import { BookOpen, Users, FileText, CheckCircle2, Check } from 'lucide-react';
import { Button } from './ui/button';
import { F2CTAButton } from './fluent2/FluentAdapters';
import { useFluent2 } from './Fluent2Context';
import TopNavigationBarVp from '../imports/TopNavigationBarVp5';
import heroImage from '../assets/hero-marketing.png';
import heroAnimatedGif from '../assets/Hero_Animated.gif';
import hero01 from '../assets/Hero_01.png';
import hero02 from '../assets/Hero_02.png';
import hero03 from '../assets/Hero_03.png';
import hero04 from '../assets/Hero_04.png';
import blade1Image from '../assets/Blade_1.png';
import blade2Image from '../assets/Blade_2.png';
import blade3Image from '../assets/Blade_3.png';
import organizeImage from 'figma:asset/02b21b8e0794779246a59dcde3bc3f352c804083.png';
import surfaceImage from 'figma:asset/b26480fb54ec4d91eb5779a7e716450e394fef53.png';
import collaborateImage from 'figma:asset/fde8eaff45f9f47c66f1270f89546a030a8f529c.png';
// Staff Notebook section images (original Figma assets)
import staffOrganizeImage from 'figma:asset/bc0f36098eac89e7e03f4fa9355149c3a17f8f97.png';
import staffCreateImage from 'figma:asset/363c281e8eb45104d916744afa8c2f254668ac50.png';
import staffCollaborateImage from 'figma:asset/576b9f5e7b0658ffb297b7ae32f59e4451197755.png';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

interface MarketingPageProps {
  onSignIn: () => void;
  notebookType?: 'class' | 'staff';
  onNotebookTypeChange?: (type: 'class' | 'staff') => void;
  featureFlags?: Record<string, boolean>;
  onFeatureFlagChange?: (flagKey: string, value: boolean) => void;
  onFluentComparison?: () => void;
  selectedHero?: string;
  onSelectedHeroChange?: (hero: string) => void;
  selectedBlade?: string;
  onSelectedBladeChange?: (blade: string) => void;
}

// Custom hook for fade-in animations
function useFadeInOnScroll() {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return { elementRef, isVisible };
}

// Accent color constants
const CLASS_ACCENT = '#7719AA';
const CLASS_ACCENT_HOVER = '#6b15a0';
const STAFF_ACCENT = '#008272';
const STAFF_ACCENT_HOVER = '#006b5e';

export function MarketingPage({ onSignIn, notebookType = 'class', onNotebookTypeChange, featureFlags = {}, onFeatureFlagChange, onFluentComparison, selectedHero = 'hero1', onSelectedHeroChange, selectedBlade = 'none', onSelectedBladeChange }: MarketingPageProps) {
  const { enabled: fluent2Enabled } = useFluent2();
  const isStaff = notebookType === 'staff';
  const accent = CLASS_ACCENT;
  const accentHover = CLASS_ACCENT_HOVER;
  const nbFullName = isStaff ? 'OneNote Staff Notebook' : 'OneNote Class Notebook';

  const heroImages: Record<string, { src: string; label: string; isVideo?: boolean }> = {
    hero1: { src: heroImage, label: 'Hero 1' },
    animatedHero1: { src: heroAnimatedGif, label: 'Animated Hero 1' },
    hero02: { src: hero01, label: 'Hero 2' },
    hero03: { src: hero02, label: 'Hero 3' },
    hero04: { src: hero03, label: 'Hero 4' },
    hero05: { src: hero04, label: 'Hero 5' },
  };
  const currentHeroImage = heroImages[selectedHero]?.src || heroImage;
  const isHeroVideo = heroImages[selectedHero]?.isVideo ?? false;

  const bladeOptions: { key: string; label: string }[] = [
    { key: 'none', label: 'No blade treatment' },
    { key: 'blade1', label: 'Blade 1' },
    { key: 'blade2', label: 'Blade 2' },
    { key: 'blade3', label: 'Blade 3' },
  ];
  const bladeImages: Record<string, string> = {
    blade1: blade1Image,
    blade2: blade2Image,
    blade3: blade3Image,
  };
  
  const tabs = useMemo(() => isStaff
    ? [
        'OneNote Staff Notebook',
        'Collaborate in one place',
        'Share information with everyone',
        'Develop yourself and your work',
        'Get Started Now',
      ]
    : [
        'OneNote Class Notebook',
        'Organize your course content',
        'Create & deliver interactive lessons',
        'Collaborate and provide feedback',
      ], [isStaff]);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [hasScrolled, setHasScrolled] = useState(false);

  const oneNoteSection = useRef<HTMLDivElement>(null);
  const organizeSection = useRef<HTMLDivElement>(null);
  const createSection = useRef<HTMLDivElement>(null);
  const collaborateSection = useRef<HTMLDivElement>(null);
  const getStartedSection = useRef<HTMLDivElement>(null);

  // Animation hooks for each content section
  const oneNoteAnim = useFadeInOnScroll();
  const organizeAnim = useFadeInOnScroll();
  const createAnim = useFadeInOnScroll();
  const collaborateAnim = useFadeInOnScroll();
  const getStartedAnim = useFadeInOnScroll();

  // Animation hooks for images (right to left)
  const organizeImageAnim = useFadeInOnScroll();
  const createImageAnim = useFadeInOnScroll();
  const collaborateImageAnim = useFadeInOnScroll();

  // Scroll detection to update active tab and trigger hero animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      }

      const sections = [
        { ref: oneNoteSection, name: tabs[0] },
        { ref: organizeSection, name: tabs[1] },
        { ref: createSection, name: tabs[2] },
        { ref: collaborateSection, name: tabs[3] },
        ...(tabs[4] && getStartedSection.current ? [{ ref: getStartedSection, name: tabs[4] }] : []),
      ];

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.ref.current) {
          const sectionTop = section.ref.current.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveTab(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled, tabs]);

  // Reset activeTab when notebookType changes
  useEffect(() => {
    setActiveTab(tabs[0]);
  }, [notebookType, tabs]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    let targetRef = null;
    const idx = tabs.indexOf(tab);
    if (idx === 0) targetRef = oneNoteSection;
    else if (idx === 1) targetRef = organizeSection;
    else if (idx === 2) targetRef = createSection;
    else if (idx === 3) targetRef = collaborateSection;
    else if (idx === 4) targetRef = getStartedSection;
    
    if (targetRef?.current) {
      const yOffset = -60;
      const y = targetRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ─── STAFF NOTEBOOK CONTENT (from onenote.com/staffnotebookedu) ───
  const renderStaffContent = () => (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat w-full" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="w-full px-6 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div 
                className={`transition-all duration-[750ms] ease-out ${
                  hasScrolled 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-[200px]'
                }`}
              >
                <h1 className="font-['Segoe_UI',sans-serif] font-semibold text-[40px] leading-[1.2] mb-6 text-[#323130] dark:text-white">
                  OneNote Staff Notebook
                </h1>
                <p className="font-['Segoe_UI',sans-serif] font-light text-[20px] leading-[1.5] mb-8 text-[#323130] dark:text-[#d0d0d0]">
                  A digital notebook for school leaders and staff. Manage your school and collaborate with your entire team.
                </p>
                <div className="flex flex-wrap gap-4">
                  {fluent2Enabled ? (
                    <>
                      <F2CTAButton onClick={onSignIn} accentColor="#262626" accentHover="#1a1a1a">Sign in</F2CTAButton>
                      <F2CTAButton accentColor="transparent" accentHover="#f5f5f5" className="text-[#262626] border-2 border-[#262626] px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]">Learn more</F2CTAButton>
                    </>
                  ) : (
                    <>
                      <Button onClick={onSignIn} className="bg-white text-[#262626] border-2 border-[#262626] hover:bg-[#f5f5f5] px-6 py-2 text-[15px] font-['Segoe_UI',sans-serif] font-semibold rounded-md h-auto">Sign in</Button>
                      <Button className="bg-[#262626] text-white hover:bg-[#1a1a1a] px-6 py-2 text-[15px] font-['Segoe_UI',sans-serif] font-semibold rounded-md h-auto border-2 border-transparent">Learn more</Button>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation Tabs */}
      {renderStickyTabs()}

      {/* OneNote Staff Notebook Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" ref={oneNoteSection}>
        <div className="max-w-2xl">
          <div 
            ref={oneNoteAnim.elementRef}
            className={`transition-all duration-500 ease-out ${
              oneNoteAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] mb-6 leading-tight" style={{ color: CLASS_ACCENT }}>
              OneNote Staff Notebooks
            </h2>
            <h3 className="font-['Segoe_UI',sans-serif] text-[24px] text-[#323130] dark:text-white mb-6 leading-tight" style={{ fontWeight: 400 }}>
              Cultivate &amp; manage<br />educator collaboration
            </h3>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-8 leading-relaxed">
              OneNote Staff Notebooks have a personal workspace for every staff member or teacher, a content library for shared information, and a collaboration space for everyone to work together, all within one powerful notebook.
            </p>
            <div className="mb-6">
              {fluent2Enabled ? (
                <F2CTAButton onClick={onSignIn} accentColor={CLASS_ACCENT} accentHover={CLASS_ACCENT_HOVER}>Staff Notebook Sign In</F2CTAButton>
              ) : (
                <Button onClick={onSignIn} className="text-white px-6 py-3 text-[15px] font-['Segoe_UI',sans-serif] rounded" style={{ backgroundColor: CLASS_ACCENT }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CLASS_ACCENT_HOVER)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CLASS_ACCENT)}>Staff Notebook Sign In</Button>
              )}
            </div>
            <p className="font-['Segoe_UI',sans-serif] text-[13px] text-[#505050] dark:text-[#d0d0d0] mb-4 leading-relaxed">
              Sign in with your Office 365 account from your school to get started.
            </p>
            <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
              Get started with Office 365 Education &gt;
            </a>

            <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] dark:text-white mb-6 mt-12 leading-tight">
              Everything you need is included
            </h3>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Staff Notebook is now built directly into OneNote for Microsoft 365 on web, Windows, Mac, and iPad. No add-in required.
            </p>
            <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] hover:underline mb-6 inline-block" style={{ color: CLASS_ACCENT }}>
              Learn how to enable it in OneNote Desktop &gt;
            </a>
            <p className="font-['Segoe_UI',sans-serif] text-[13px] text-[#505050] dark:text-[#d0d0d0] mb-4 leading-relaxed">
              If you're using OneNote 2016, 2019, or 2021 and do not have Microsoft 365, you may still need to use the downloadable Staff Notebook add-in.
            </p>
            <a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
              • Download the legacy add-in
            </a>
          </div>
        </div>
      </section>

      {/* Collaborate in one place */}
      <section className="bg-[#f2f2f2] dark:bg-[#292929] py-20" ref={organizeSection}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div 
              ref={organizeAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                organizeAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-6 leading-tight">
                Collaborate in one place
              </h2>
              <p className="font-['Segoe_UI:Light',sans-serif] text-[20px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Organize your agendas, resources, and professional development content in your own digital notebook.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Keep everything in a OneNote Staff Notebook, and use its powerful search to find what you're looking for, even text in pictures or handwriting.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Your notebooks are saved automatically and can be viewed from any device, online or offline.
              </p>
              <div className="mt-8">
                <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-2">
                  Free online training course
                </p>
                <a href="https://learn.microsoft.com/en-us/training/modules/onenote-staff-notebook/" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
                  OneNote Staff Notebook on Microsoft Learn &gt;
                </a>
              </div>
            </div>

            <div 
              ref={organizeImageAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                organizeImageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <img 
                src={staffOrganizeImage} 
                alt="OneNote Staff Notebook organize section screenshot" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Share information with everyone */}
      <section className="max-w-7xl mx-auto px-6 py-20" ref={createSection}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            ref={createAnim.elementRef}
            className={`transition-all duration-500 ease-out ${
              createAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-6 leading-tight">
              Share information with everyone
            </h2>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Gather web content and embed existing materials in your staff notebook to build custom training and PD resources.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Include audio and video recordings to create rich professional development materials for your staff.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Staff can use powerful drawing tools to highlight, annotate slides, sketch diagrams, and take handwritten notes.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Your staff notebook makes it easier to share policies, procedures, and handouts with your team.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-8 leading-relaxed">
              Staff go to the content library to get their resources. No more searching through email for attachments.
            </p>
            <div className="mt-8">
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-2">
                Free interactive online training
              </p>
              <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
                Creating professional development resources with OneNote &gt;
              </a>
            </div>
          </div>

          <div 
            ref={createImageAnim.elementRef}
            className={`transition-all duration-500 ease-out ${
              createImageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <img 
              src={staffCreateImage} 
              alt="OneNote Staff Notebook create and share section screenshot" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Develop yourself and your work */}
      <section className="bg-[#f2f2f2] dark:bg-[#292929] py-20" ref={collaborateSection}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div 
              ref={collaborateAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                collaborateAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-6 leading-tight">
                Develop yourself and your work
              </h2>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Communicate privately with individual staff members by typing or writing directly in each member's private notebook.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                The collaboration space encourages staff to work together on shared initiatives. Leaders can provide real-time feedback and coaching.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Staff leaders can review and manage all notebooks and instantly know what's happening across their team.
              </p>
              <div className="mt-8">
                <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-2">
                  Free online training course
                </p>
                <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
                  Collaborating with your staff using OneNote &gt;
                </a>
              </div>
            </div>

            <div 
              ref={collaborateImageAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                collaborateImageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <img 
                src={staffCollaborateImage} 
                alt="OneNote Staff Notebook collaborate section screenshot" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Now Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" ref={getStartedSection}>
        <div 
          ref={getStartedAnim.elementRef}
          className={`transition-all duration-500 ease-out ${
            getStartedAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-12 leading-tight">
            Get Started Now
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] dark:text-white mb-6 leading-tight">
                Lead. Organize. Collaborate.
              </h3>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-8 leading-relaxed">
                OneNote Staff Notebooks have a personal workspace for every staff member, a content library for handouts, and a collaboration space for working together.
              </p>
              {fluent2Enabled ? (
                <div className="mb-6"><F2CTAButton onClick={onSignIn} accentColor={CLASS_ACCENT} accentHover={CLASS_ACCENT_HOVER}>Staff Notebook Sign In</F2CTAButton></div>
              ) : (
                <Button onClick={onSignIn} className="text-white px-6 py-3 text-[15px] font-['Segoe_UI',sans-serif] mb-6 rounded" style={{ backgroundColor: CLASS_ACCENT }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = CLASS_ACCENT_HOVER)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = CLASS_ACCENT)}>Staff Notebook Sign In</Button>
              )}
              <div>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
                  Get started with Office 365 Education &gt;
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] dark:text-white mb-6 leading-tight">
                Everything you need is included
              </h3>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Staff Notebook is now built directly into OneNote for Microsoft 365 on web, Windows, Mac, and iPad. No add-in required.
              </p>
              <div className="mb-6">
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
                  Learn how to enable it in OneNote Desktop &gt;
                </a>
              </div>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-4 leading-relaxed">
                If you're using OneNote 2016, 2019, or 2021 and do not have Microsoft 365, you may still need to use the downloadable Staff Notebook add-in.
              </p>
              <div>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[15px] hover:underline inline-block" style={{ color: CLASS_ACCENT }}>
                  • Download the legacy add-in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  // ─── CLASS NOTEBOOK CONTENT (from onenote.com/classnotebook) ───
  const renderClassContent = () => (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat w-full" style={isHeroVideo ? undefined : { backgroundImage: `url(${currentHeroImage})` }}>
        {isHeroVideo && (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src={currentHeroImage} type="video/mp4" />
          </video>
        )}
        <div className="relative z-10 w-full px-6 py-20 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-[750ms] ease-out ${
                  hasScrolled
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-[200px]'
                }`}
              >
                <h1 className="font-['Segoe_UI',sans-serif] font-semibold text-[40px] leading-[1.2] mb-6 text-[#323130] dark:text-white">
                  OneNote Class Notebook
                </h1>
                <p className="font-['Segoe_UI',sans-serif] font-light text-[20px] leading-[1.5] mb-8 text-[#323130] dark:text-[#d0d0d0]">
                  A digital notebook for all your students. Organize lesson materials and collaborate with teachers and students.
                </p>
                <div className="flex flex-wrap gap-4">
                  {fluent2Enabled ? (
                    <>
                      <F2CTAButton onClick={onSignIn} accentColor="#262626" accentHover="#1a1a1a">Sign in</F2CTAButton>
                      <F2CTAButton accentColor="transparent" accentHover="#f5f5f5" className="text-[#262626] border-2 border-[#262626] px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]">Learn more</F2CTAButton>
                    </>
                  ) : (
                    <>
                      <Button onClick={onSignIn} className="bg-white text-[#262626] border-2 border-[#262626] hover:bg-[#f5f5f5] px-6 py-2 text-[15px] font-['Segoe_UI',sans-serif] font-semibold rounded-md h-auto">Sign in</Button>
                      <Button className="bg-[#262626] text-white hover:bg-[#1a1a1a] px-6 py-2 text-[15px] font-['Segoe_UI',sans-serif] font-semibold rounded-md h-auto border-2 border-transparent">Learn more</Button>
                    </>
                  )}
                </div>
              </div>
              <div className="hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Navigation Tabs */}
      {renderStickyTabs()}

      {/* OneNote Class Notebook Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" ref={oneNoteSection}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            ref={oneNoteAnim.elementRef}
            className={`transition-all duration-500 ease-out ${
              oneNoteAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#7719AA] mb-6 leading-tight">
              OneNote Class Notebook
            </h2>
            <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] mb-6 leading-tight">
              Save time. Organize. Collaborate.
            </h3>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] mb-6 leading-relaxed">
              OneNote Class Notebooks have a personal workspace for every student, a content library for handouts, and a collaboration space for lessons and creative activities.
            </p>
            <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#7719AA] hover:underline mb-12 inline-block">
              Get started with Office 365 Education &gt;
            </a>

            <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] mb-6 mt-12 leading-tight">
              Everything you need is included
            </h3>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] mb-6 leading-relaxed">
              Class Notebook is now built directly into OneNote for Microsoft 365 on web, Windows, Mac, and iPad. No add-in required.
            </p>
            <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#7719AA] hover:underline mb-6 inline-block">
              Learn how to enable it in OneNote Desktop &gt;
            </a>
            <p className="font-['Segoe_UI',sans-serif] text-[13px] text-[#505050] mb-4 leading-relaxed">
              If you're using OneNote 2016, 2019, or 2021 and do not have Microsoft 365, you may still need to use the downloadable Class Notebook add-in.
            </p>
            <a href="#" className="font-['Segoe_UI',sans-serif] text-[13px] text-[#7719AA] hover:underline inline-block">
              • Download the legacy add-in
            </a>
          </div>

          <div className="relative aspect-video bg-black rounded overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/iRcJpkK9oKc"
              title="OneNote Class Notebook Overview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Organize Your Course Content Section */}
      <section
        className={`py-20 ${selectedBlade !== 'none' && bladeImages[selectedBlade] ? 'bg-cover bg-center bg-no-repeat' : 'bg-[#f2f2f2] dark:bg-[#292929]'}`}
        ref={organizeSection}
        style={selectedBlade !== 'none' && bladeImages[selectedBlade] ? { backgroundImage: `url(${bladeImages[selectedBlade]})` } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div 
              ref={organizeAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                organizeAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-6 leading-tight">
                Organize your course content
              </h2>
              <p className="font-['Segoe_UI:Light',sans-serif] text-[20px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Organize your lesson plans and course content in your own digital notebook.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Keep everything in a OneNote Class Notebook, and use its powerful search to find what you're looking for, even text in pictures or handwriting.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Your notebooks are saved automatically and can be viewed from any devices, online or offline.
              </p>
              <div className="mt-8">
                <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-2">
                  Free online training course
                </p>
                <a href="https://learn.microsoft.com/en-us/training/modules/onenote-class-notebook-teacher-all-in-one-notebook/" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#7719AA] hover:underline inline-block">
                  OneNote Class Notebook on Microsoft Learn &gt;
                </a>
              </div>
            </div>

            <div 
              ref={organizeImageAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                organizeImageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <img 
                src={organizeImage} 
                alt="OneNote Math Class Notebook showing Pythagorean Theorem lesson" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Create & deliver interactive lessons Section */}
      <section className="max-w-7xl mx-auto px-6 py-20" ref={createSection}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            ref={createAnim.elementRef}
            className={`transition-all duration-500 ease-out ${
              createAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-6 leading-tight">
              Create & deliver interactive lessons
            </h2>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Gather web content and embed existing lessons in your class notebook to create custom lesson plans.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Include audio and video recordings to create rich interactive lessons for students.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Students can use powerful drawing tools to highlight, annotate slides, sketch diagrams, and take handwritten notes.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
              Your class notebook makes it easier to collect homework, quizzes, exams and handouts.
            </p>
            <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-8 leading-relaxed">
              Students go to the content library to get their assignments. No more printed handouts for the class.
            </p>
            <div className="mt-8">
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-2">
                Free interactive online training
              </p>
              <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#7719AA] hover:underline inline-block">
                Creating interactive lessons with OneNote &gt;
              </a>
            </div>
          </div>

          <div 
            ref={createImageAnim.elementRef}
            className={`transition-all duration-500 ease-out ${
              createImageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <img 
              src={surfaceImage} 
              alt="Surface device with OneNote showing biology notebook" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Collaborate and provide feedback Section */}
      <section className="bg-[#f2f2f2] dark:bg-[#292929] py-20" ref={collaborateSection}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div 
              ref={collaborateAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                collaborateAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-6 leading-tight">
                Collaborate and provide feedback
              </h2>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Provide individualized support by typing or writing directly in each student's private notebook.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                The collaboration space encourages students to work together as the teacher provides real-time feedback and coaching.
              </p>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                By searching for tags asking for help, teachers can give instant feedback to students who are struggling.
              </p>
              <div className="mt-8">
                <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-2">
                  Free online training course
                </p>
                <a href="#" className="font-['Segoe_UI:Semibold',sans-serif] text-[15px] text-[#7719AA] hover:underline inline-block">
                  Collaborating in the classroom with the OneNote Class Notebook &gt;
                </a>
              </div>
            </div>

            <div 
              ref={collaborateImageAnim.elementRef}
              className={`transition-all duration-500 ease-out ${
                collaborateImageAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
            >
              <img 
                src={collaborateImage} 
                alt="OneNote Math Class Notebook showing algebra homework with teacher feedback" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Now Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div 
          ref={getStartedAnim.elementRef}
          className={`transition-all duration-500 ease-out ${
            getStartedAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h2 className="font-['Segoe_UI:Light',sans-serif] text-[46px] text-[#505050] dark:text-white mb-12 leading-tight">
            Get Started Now
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] dark:text-white mb-6 leading-tight">
                Save time. Organize. Collaborate.
              </h3>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-8 leading-relaxed">
                OneNote Class Notebooks have a personal workspace for every student, a content library for handouts, and a collaboration space for lessons and creative activities.
              </p>
              <Button
                onClick={onSignIn}
                className="bg-[#7719AA] hover:bg-[#6b15a0] text-white px-6 py-3 text-[15px] font-['Segoe_UI',sans-serif] mb-6 rounded"
              >
                Class Notebook Sign In
              </Button>
              <div>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[15px] text-[#7719AA] hover:underline inline-block">
                  Get started with Office 365 Education &gt;
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-['Segoe_UI:Light',sans-serif] text-[34px] text-[#505050] dark:text-white mb-6 leading-tight">
                Everything you need is included
              </h3>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-6 leading-relaxed">
                Class Notebook is now built directly into OneNote for Microsoft 365 on web, Windows, Mac, and iPad. No add-in required.
              </p>
              <div className="mb-6">
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[15px] text-[#7719AA] hover:underline inline-block">
                  Learn how to enable it in OneNote Desktop &gt;
                </a>
              </div>
              <p className="font-['Segoe_UI',sans-serif] text-[15px] text-[#505050] dark:text-[#d0d0d0] mb-4 leading-relaxed">
                If you're using OneNote 2016, 2019, or 2021 and do not have Microsoft 365, you may still need to use the downloadable Class Notebook add-in.
              </p>
              <div>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[15px] text-[#7719AA] hover:underline inline-block">
                  • Download the legacy add-in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  // ─── SHARED: Sticky Navigation Tabs ───
  const [isStickyTabsDropdownOpen, setIsStickyTabsDropdownOpen] = useState(false);

  const renderStickyTabs = () => (
    <nav className="sticky top-0 bg-white dark:bg-[#1f1f1f] border-b border-[#d1d1d1] dark:border-gray-700 z-40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Desktop: horizontal tabs */}
        <div className="hidden md:flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`relative py-4 font-['Segoe_UI',sans-serif] text-[15px] whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-[#262626] dark:text-white'
                  : 'text-[#262626] dark:text-[#d0d0d0] hover:text-[#0078d4]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#000000] dark:bg-white transition-all duration-300 ease-in-out" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile: dropdown selector */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsStickyTabsDropdownOpen(!isStickyTabsDropdownOpen)}
            className="w-full flex items-center justify-between py-3 font-['Segoe_UI',sans-serif] text-[15px] text-[#262626] dark:text-white"
          >
            <span className="truncate">{activeTab}</span>
            <ChevronDown className={`w-4 h-4 shrink-0 ml-2 transition-transform ${isStickyTabsDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isStickyTabsDropdownOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setIsStickyTabsDropdownOpen(false)} />
              <div className="absolute left-0 right-0 top-full bg-white dark:bg-[#2b2b2b] shadow-lg border border-gray-200 dark:border-gray-600 rounded-b-md z-40">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      handleTabClick(tab);
                      setIsStickyTabsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 font-['Segoe_UI',sans-serif] text-[14px] transition-colors ${
                      activeTab === tab
                        ? 'bg-gray-100 dark:bg-[#3a3a3a] text-[#262626] dark:text-white'
                        : 'text-[#262626] dark:text-[#d0d0d0] hover:bg-gray-50 dark:hover:bg-[#333]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );

  return (
    <div className="bg-white dark:bg-[#1f1f1f] min-h-screen">
      {/* Top Navigation Bar */}
      <div className="h-[54px] relative z-50">
        <TopNavigationBarVp
          onSignIn={onSignIn}
          notebookType={notebookType}
          onNotebookTypeChange={onNotebookTypeChange}
          themes={Object.entries(heroImages).map(([key, { label }]) => ({ key, label }))}
          selectedTheme={selectedHero}
          onThemeChange={onSelectedHeroChange}
          blades={bladeOptions}
          selectedBlade={selectedBlade}
          onBladeChange={onSelectedBladeChange}
        />
      </div>

      {isStaff ? renderStaffContent() : renderClassContent()}

      {/* Footer */}
      <footer className="bg-[#f2f2f2] dark:bg-[#292929] border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-[1600px] mx-auto px-6 py-12">
          {/* Social Media Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <span className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0]">Follow Microsoft 365</span>
              <div className="flex gap-3">
                <a href="#" className="text-[#000000] dark:text-white hover:opacity-70" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-[#000000] dark:text-white hover:opacity-70" aria-label="X">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" className="text-[#000000] dark:text-white hover:opacity-70" aria-label="YouTube">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="#" className="text-[#000000] dark:text-white hover:opacity-70" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-1.49 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="text-[#000000] dark:text-white hover:opacity-70" aria-label="TikTok">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {/* What's new */}
            <div>
              <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] mb-3">What's new</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Surface Pro</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Surface Laptop</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Surface Laptop Studio 2</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Copilot for organizations</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Copilot for personal use</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">AI in Windows</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Explore Microsoft products</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Windows 11 apps</a></li>
              </ul>
            </div>

            {/* Microsoft Store */}
            <div>
              <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] mb-3">Microsoft Store</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Account profile</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Download Center</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Store support</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Returns</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Order tracking</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Certified Refurbished</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Store Promise</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Flexible Payments</a></li>
              </ul>
            </div>

            {/* Education */}
            <div>
              <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] mb-3">Education</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft in education</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Devices for education</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Teams for Education</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft 365 Education</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">How to buy for your school</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Educator training and development</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Deals for students and parents</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">AI for education</a></li>
              </ul>
            </div>

            {/* Business */}
            <div>
              <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] mb-3">Business</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft AI</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Security</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Dynamics 365</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft 365</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Power Platform</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Teams</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft 365 Copilot</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Small Business</a></li>
              </ul>
            </div>

            {/* Developer & IT */}
            <div>
              <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] mb-3">Developer & IT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Azure</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Developer</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Learn</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Support for AI marketplace apps</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Tech Community</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Microsoft Marketplace</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Marketplace Rewards</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Visual Studio</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-['Segoe_UI:Semibold',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] mb-3">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Careers</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">About Microsoft</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Company news</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Privacy at Microsoft</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Investors</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Diversity and inclusion</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Accessibility</a></li>
                <li><a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Sustainability</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-gray-300 dark:border-gray-600">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center gap-2 font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z"/></svg>
                  English (United States)
                </button>
                <button className="flex items-center gap-1 font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 16 16"><path d="M1 0h14a1 1 0 011 1v14a1 1 0 01-1 1H1a1 1 0 01-1-1zm8 4h2v2H9V4zm0 3h2v5H9V7zM5 4h2v5H5V4zm0 6h2v2H5v-2z"/></svg>
                  Your Privacy Choices
                </button>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[11px] text-[#505050] dark:text-[#d0d0d0] hover:underline">Consumer Health Privacy</a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Sitemap</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Contact Microsoft</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Privacy</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Terms of use</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Trademarks</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Safety & eco</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">Recycling</a>
                <a href="#" className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0] hover:underline">About our ads</a>
                <span className="font-['Segoe_UI',sans-serif] text-[#505050] dark:text-[#d0d0d0]">© Microsoft 2026</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
