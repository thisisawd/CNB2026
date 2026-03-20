import * as React from 'react';
import { useState, useEffect } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-v1bmtozmz8';

/**
 * Carousel
 * 
 * A configurable carousel/slideshow component with navigation controls, step indicators, and auto-play functionality.
 * Appears as a content area with navigation controls (chevrons and step indicators or image previews) positioned according to the layout configuration.
 * The content area is a light blue placeholder that displays "SWAP WITH CONTENT COMPONENT" and is meant to be replaced with actual carousel content.
 * The component includes an optional title and description section above the content area.
 * 
 * The carousel supports both controlled and uncontrolled modes, keyboard navigation (left/right arrow keys), and various layout configurations
 * including navigation placement relative to content.
 * 
 * USAGE NOTES:
 * - The component is designed as a placeholder - actual carousel content should replace the blue placeholder area
 * - Can be used in controlled mode (provide currentSlide and onSlideChange) or uncontrolled mode (manages its own state)
 * - Auto-play will cycle through slides automatically when enabled
 * - Clicking the content area can pause/resume auto-play when pauseButton is set to "On content click"
 * - Keyboard navigation is automatically enabled (arrow keys navigate slides)
 * - The totalSlides prop should match the actual number of slides in your carousel content
 */
export interface CarouselProps {
  className?: string; // Custom CSS classes to apply to the root container. If not provided, defaults to a width of 415px with variable height based on configuration
  chevronPlacement?: "Flexible to edges" | "Grouped to steps" | "Centered to content"; // Controls the positioning of navigation chevrons relative to the carousel (default: "Grouped to steps")
  layout?: "Over content" | "Outside content"; // Determines whether navigation controls overlay the content or appear below it (default: "Outside content")
  navType?: "Steps" | "Image preview"; // Type of navigation indicator to display (default: "Steps")
  pauseButton?: "In nav" | "On content click"; // Controls how auto-play can be paused (default: "On content click")
  title?: boolean; // Whether to display the title and description section above the carousel (default: true)
  currentSlide?: number; // Controlled slide index (0-based). When provided, the component operates in controlled mode
  totalSlides?: number; // Total number of slides in the carousel. Should match your actual content (default: 5)
  onSlideChange?: (slideIndex: number) => void; // Callback fired when the slide changes, receives the new slide index
  autoPlay?: boolean; // Whether to automatically advance slides (default: false)
  autoPlayInterval?: number; // Milliseconds between auto-advances when autoPlay is enabled (default: 3000)
}

// ---------------------- Main Component ----------------------

export function Carousel({ 
  className, 
  chevronPlacement = "Grouped to steps", 
  layout = "Outside content", 
  navType = "Steps", 
  pauseButton = "On content click", 
  title = true,
  currentSlide: controlledSlide,
  totalSlides = 5,
  onSlideChange,
  autoPlay = false,
  autoPlayInterval = 3000
}: CarouselProps) {
  const [internalSlide, setInternalSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  
  // Use controlled or uncontrolled slide index
  const currentSlide = controlledSlide !== undefined ? controlledSlide : internalSlide;
  
  const handleSlideChange = (newSlide: number) => {
    const validSlide = Math.max(0, Math.min(newSlide, totalSlides - 1));
    if (controlledSlide === undefined) {
      setInternalSlide(validSlide);
    }
    onSlideChange?.(validSlide);
  };
  
  const handlePrevious = () => {
    handleSlideChange(currentSlide > 0 ? currentSlide - 1 : totalSlides - 1);
  };
  
  const handleNext = () => {
    handleSlideChange(currentSlide < totalSlides - 1 ? currentSlide + 1 : 0);
  };
  
  const handleStepClick = (stepIndex: number) => {
    handleSlideChange(stepIndex);
  };
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, autoPlayInterval]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);
  
  const isOutsideContentAndCenteredToContentAndOnContentClickAndSteps = layout === "Outside content" && chevronPlacement === "Centered to content" && pauseButton === "On content click" && navType === "Steps";
  const isOutsideContentAndFlexibleToEdgesAndOnContentClickAndSteps = layout === "Outside content" && chevronPlacement === "Flexible to edges" && pauseButton === "On content click" && navType === "Steps";
  const isOutsideContentAndGroupedToStepsAndInNavAndSteps = layout === "Outside content" && chevronPlacement === "Grouped to steps" && pauseButton === "In nav" && navType === "Steps";
  const isOutsideContentAndGroupedToStepsAndOnContentClickAndImage = layout === "Outside content" && chevronPlacement === "Grouped to steps" && pauseButton === "On content click" && navType === "Image preview";
  const isOutsideContentAndGroupedToStepsAndOnContentClickAndSteps = layout === "Outside content" && chevronPlacement === "Grouped to steps" && pauseButton === "On content click" && navType === "Steps";
  const isOverContentAndGroupedToStepsAndOnContentClickAndSteps = layout === "Over content" && chevronPlacement === "Grouped to steps" && pauseButton === "On content click" && navType === "Steps";
  return (
    <div className={className || `relative w-[415px] ${isOutsideContentAndGroupedToStepsAndInNavAndSteps ? "h-[297px]" : ""}`}>
      <div className={`content-stretch flex flex-col items-start relative ${isOutsideContentAndGroupedToStepsAndInNavAndSteps ? "size-full" : "w-full"}`}>
        {title && (
          <div className="max-w-[360px] relative shrink-0" data-name=".Title + BodyCopy">
            <div className="content-stretch flex flex-col items-start max-w-[inherit] pb-[12px] relative">
              <div className="content-stretch flex flex-wrap h-[20px] items-start pb-[2px] relative shrink-0 w-[360px]" data-name="Title">
                <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Semibold',sans-serif] h-full justify-end leading-[0] min-h-px min-w-px not-italic relative text-[#242424] text-[14px]">
                  <p className="leading-[20px] whitespace-pre-wrap">Descriptive title</p>
                </div>
              </div>
              <div className="content-start flex flex-wrap h-[20px] items-start pb-[2px] relative shrink-0 w-[360px]" data-name="Subheader">
                <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#242424] text-[12px] text-ellipsis">
                  <p className="leading-[16px] whitespace-pre-wrap">Description of the content in the carousel.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="bg-[#ebf3fc] relative shrink-0 w-full" data-name="Placeholder" onClick={pauseButton === "On content click" ? handlePlayPause : undefined} style={{ cursor: pauseButton === "On content click" ? 'pointer' : 'default' }}>
          <div className="flex flex-row items-center justify-center size-full">
            <div className="content-stretch flex items-center justify-center px-[43px] py-[15px] relative w-full">
              <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0f6cbd] text-[10px] text-center whitespace-nowrap">
                <p className="leading-[14px]">SWAP WITH CONTENT COMPONENT</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute ${isOutsideContentAndFlexibleToEdgesAndOnContentClickAndSteps ? "bottom-[-36px] left-0 right-0" : isOverContentAndGroupedToStepsAndOnContentClickAndSteps ? "-translate-x-1/2 bottom-[12px] left-1/2" : isOutsideContentAndGroupedToStepsAndOnContentClickAndImage ? "-translate-x-1/2 bottom-[-60px] left-1/2" : "-translate-x-1/2 bottom-[-36px] left-1/2"}`} data-name=".CarouselNav">
          <Wrapper2>
            <div className={`content-stretch flex items-center relative shrink-0 ${isOutsideContentAndGroupedToStepsAndOnContentClickAndImage || isOutsideContentAndGroupedToStepsAndInNavAndSteps ? "gap-[8px]" : ""}`} data-name="ChevronLeft">
              {(isOutsideContentAndGroupedToStepsAndOnContentClickAndSteps || isOverContentAndGroupedToStepsAndOnContentClickAndSteps || isOutsideContentAndFlexibleToEdgesAndOnContentClickAndSteps || isOutsideContentAndCenteredToContentAndOnContentClickAndSteps) && <CarouselButton onClick={handlePrevious} />}
              {(isOutsideContentAndGroupedToStepsAndOnContentClickAndImage || isOutsideContentAndGroupedToStepsAndInNavAndSteps) && (
                <>
                  <div className="relative rounded-[4px] shrink-0 size-[24px]" data-name=".Carousel play control">
                    <Wrapper additionalClassNames="absolute left-0 top-0">
                      <div className="overflow-clip relative shrink-0 size-[20px] cursor-pointer" data-name="Size=20, Theme=Regular" onClick={handlePlayPause}>
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[16px] top-1/2" data-name="Shape">
                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                            <path d={svgPaths.p2746af00} fill="var(--fill-0, #424242)" id="Shape" />
                          </svg>
                        </div>
                      </div>
                    </Wrapper>
                  </div>
                  <CarouselButton onClick={handlePrevious} />
                </>
              )}
            </div>
            {(isOutsideContentAndGroupedToStepsAndOnContentClickAndSteps || isOverContentAndGroupedToStepsAndOnContentClickAndSteps || isOutsideContentAndGroupedToStepsAndInNavAndSteps || isOutsideContentAndFlexibleToEdgesAndOnContentClickAndSteps || isOutsideContentAndCenteredToContentAndOnContentClickAndSteps) && (
              <>
                <CarouselCarouselSteps currentSlide={currentSlide} totalSlides={totalSlides} onStepClick={handleStepClick} />
                <CarouselChevronRight onClick={handleNext}>
                  <path d={svgPaths.p212a1b00} fill="var(--fill-0, #424242)" id="Shape" />
                </CarouselChevronRight>
              </>
            )}
            {isOutsideContentAndGroupedToStepsAndOnContentClickAndImage && (
              <>
                <div className="relative shrink-0" data-name=".Image Preview nav">
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex gap-[12px] items-center relative">
                      <div className="relative shrink-0 size-[48px]" data-name=".Images Preview Step">
                        <CarouselText text="Use component swap to change" onClick={() => handleStepClick(0)}>40x40</CarouselText>
                      </div>
                      <div className="relative shrink-0 size-[40px]" data-name=".Images Preview Step">
                        <CarouselText text="Use component swap to change" onClick={() => handleStepClick(1)}>40x40</CarouselText>
                      </div>
                      <div className="relative shrink-0 size-[40px]" data-name=".Images Preview Step">
                        <CarouselText text="Use component swap to change" onClick={() => handleStepClick(2)}>40x40</CarouselText>
                      </div>
                      <div className="relative shrink-0 size-[40px]" data-name=".Images Preview Step">
                        <CarouselText text="Use component swap to change" onClick={() => handleStepClick(3)}>40x40</CarouselText>
                      </div>
                      <div className="relative shrink-0 size-[40px]" data-name=".Images Preview Step">
                        <CarouselText text="Use component swap to change" onClick={() => handleStepClick(4)}>40x40</CarouselText>
                      </div>
                    </div>
                  </div>
                </div>
                <CarouselChevronRight onClick={handleNext}>
                  <path d={svgPaths.p212a1b00} fill="var(--fill-0, #424242)" id="Shape" />
                </CarouselChevronRight>
              </>
            )}
          </Wrapper2>
        </div>
        {isOutsideContentAndCenteredToContentAndOnContentClickAndSteps && (
          <div className="-translate-y-1/2 absolute left-[-36px] right-[-36px] top-[calc(50%+25.5px)]" data-name=".CarouselNav">
            <Wrapper2>
              <div className="content-stretch flex items-center relative shrink-0" data-name="ChevronLeft">
                <CarouselButton onClick={handlePrevious} />
              </div>
              <CarouselCarouselSteps currentSlide={currentSlide} totalSlides={totalSlides} onStepClick={handleStepClick} />
              <CarouselChevronRight onClick={handleNext}>
                <path d={svgPaths.p212a1b00} fill="var(--fill-0, #424242)" id="Shape" />
              </CarouselChevronRight>
            </Wrapper2>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

export function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[12px] items-center justify-center relative">{children}</div>
    </div>
  );
}

type ShapeProps = {
  additionalClassNames?: string;
};

export function Shape({ children, additionalClassNames = "" }: React.PropsWithChildren<ShapeProps>) {
  return (
    <div className={clsx("-translate-x-1/2 -translate-y-1/2 absolute h-[16px] top-1/2 w-[8.75px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.75 16">
        {children}
      </svg>
    </div>
  );
}

type Wrapper1Props = {
  additionalClassNames?: string;
};

export function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return (
    <div className={clsx("content-stretch flex items-center justify-center relative", additionalClassNames)}>
      <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
        {children}
      </div>
    </div>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
};

export function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("bg-[rgba(255,255,255,0)] rounded-[4px]", additionalClassNames)}>
      <div className="flex flex-row items-center justify-center size-full">
        <Wrapper1 additionalClassNames="p-[2px]">{children}</Wrapper1>
      </div>
    </div>
  );
}

type CarouselTextProps = {
  text: string;
  onClick?: () => void;
};

export function CarouselText({ text, children, onClick }: React.PropsWithChildren<CarouselTextProps>) {
  return (
    <div className="flex flex-row items-center justify-center size-full" onClick={onClick}>
      <div className="content-stretch flex items-center justify-center relative size-full">
        <div className="bg-[#ebf3fc] relative shrink-0 size-[40px]" data-name="Image swap placeholder">
          <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col items-center justify-center relative size-full">
              <div className="content-stretch flex flex-col gap-[4px] items-center justify-center not-italic pt-[4px] relative shrink-0 text-[#115ea3] text-center" data-name="Text">
                <div className="flex flex-col font-['Segoe_UI:Bold',sans-serif] justify-center leading-[0] relative shrink-0 text-[10px] tracking-[0.3px] whitespace-nowrap">
                  <p className="leading-[14px]">{children}</p>
                </div>
                <p className="font-['Segoe_UI:Regular',sans-serif] leading-none relative shrink-0 text-[4px] w-[32px] whitespace-pre-wrap">{text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CarouselChevronRight({ children, onClick }: React.PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <div className="content-stretch flex items-center justify-end relative shrink-0">
      <Wrapper additionalClassNames="relative shrink-0">
        <div className="overflow-clip relative shrink-0 size-[24px] cursor-pointer" data-name="Direction=Right, Size=24, Theme=Regular" onClick={onClick}>
          <Shape additionalClassNames="left-[calc(50%+0.62px)]">{children}</Shape>
        </div>
      </Wrapper>
    </div>
  );
}

export function CarouselStep({ onClick, isActive }: { onClick?: () => void; isActive?: boolean }) {
  return (
    <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative">
          <div className={`bg-[#424242] ${isActive ? 'opacity-100' : 'opacity-30'} rounded-[9999px] shrink-0 size-[8px] cursor-pointer`} data-name="Inactive carousel step" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}

export function CarouselCarouselSteps({ currentSlide, totalSlides, onStepClick }: { currentSlide: number; totalSlides: number; onStepClick: (index: number) => void }) {
  return (
    <div className="relative rounded-[8px] shrink-0">
      <div className="content-stretch flex items-start relative">
        <div className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0" data-name=".Carousel step">
          <div className="flex flex-row items-center justify-center size-full">
            <Wrapper1 additionalClassNames="px-[4px] py-[8px]">
              <div className={`bg-[#424242] h-[8px] rounded-[9999px] shrink-0 cursor-pointer ${currentSlide === 0 ? 'w-[16px]' : 'w-[8px]'}`} data-name="Active carousel step" onClick={() => onStepClick(0)} />
            </Wrapper1>
          </div>
        </div>
        <CarouselStep onClick={() => onStepClick(1)} isActive={currentSlide === 1} />
        <CarouselStep onClick={() => onStepClick(2)} isActive={currentSlide === 2} />
        <CarouselStep onClick={() => onStepClick(3)} isActive={currentSlide === 3} />
        <CarouselStep onClick={() => onStepClick(4)} isActive={currentSlide === 4} />
      </div>
    </div>
  );
}

export function CarouselButton({ onClick }: { onClick?: () => void }) {
  return (
    <Wrapper additionalClassNames="relative shrink-0">
      <div className="overflow-clip relative shrink-0 size-[24px] cursor-pointer" data-name="Direction=Left, Size=24, Theme=Regular" onClick={onClick}>
        <Shape additionalClassNames="left-[calc(50%-0.63px)]">
          <path d={svgPaths.p4dacf00} fill="var(--fill-0, #424242)" id="Shape" />
        </Shape>
      </div>
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface CarouselProps_Display {
  chevronPlacement?: "Flexible to edges" | "Grouped to steps" | "Centered to content";
  layout?: "Over content" | "Outside content";
  navType?: "Steps" | "Image preview";
  pauseButton?: "In nav" | "On content click";
  title?: boolean;
  totalSlides?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

function Carousel_Display({
  chevronPlacement,
  layout,
  navType,
  pauseButton,
  title,
  totalSlides,
  autoPlay,
  autoPlayInterval,
}: CarouselProps_Display) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <Carousel
      chevronPlacement={chevronPlacement}
      layout={layout}
      navType={navType}
      pauseButton={pauseButton}
      title={title}
      currentSlide={currentSlide}
      totalSlides={totalSlides}
      onSlideChange={setCurrentSlide}
      autoPlay={autoPlay}
      autoPlayInterval={autoPlayInterval}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample CarouselGroupedStepsDefault
export function CarouselExample1() {
  return (
    <Carousel_Display
      chevronPlacement="Grouped to steps"
      layout="Outside content"
      navType="Steps"
      title={true}
      totalSlides={5}
    />
  );
}

// @figmaExample CarouselFlexibleEdges
export function CarouselExample2() {
  return (
    <Carousel_Display
      chevronPlacement="Flexible to edges"
      layout="Outside content"
      navType="Steps"
      title={true}
      totalSlides={4}
    />
  );
}

// @figmaExample CarouselCenteredContent
export function CarouselExample3() {
  return (
    <Carousel_Display
      chevronPlacement="Centered to content"
      layout="Outside content"
      navType="Steps"
      title={true}
      totalSlides={3}
    />
  );
}

// @figmaExample CarouselOverContent
export function CarouselExample4() {
  return (
    <Carousel_Display
      chevronPlacement="Grouped to steps"
      layout="Over content"
      navType="Steps"
      title={true}
      totalSlides={5}
    />
  );
}

// @figmaExample CarouselImagePreview
export function CarouselExample5() {
  return (
    <Carousel_Display
      chevronPlacement="Grouped to steps"
      layout="Outside content"
      navType="Image preview"
      title={true}
      totalSlides={4}
    />
  );
}

// @figmaExample CarouselAutoPlay
export function CarouselExample6() {
  return (
    <Carousel_Display
      chevronPlacement="Grouped to steps"
      layout="Outside content"
      navType="Steps"
      pauseButton="In nav"
      title={true}
      totalSlides={5}
      autoPlay={true}
      autoPlayInterval={2000}
    />
  );
}

// @figmaExample CarouselNoTitle
export function CarouselExample7() {
  return (
    <Carousel_Display
      chevronPlacement="Grouped to steps"
      layout="Outside content"
      navType="Steps"
      title={false}
      totalSlides={3}
    />
  );
}

// @figmaExample CarouselCenteredOverImagePreview
export function CarouselExample8() {
  return (
    <Carousel_Display
      chevronPlacement="Centered to content"
      layout="Over content"
      navType="Image preview"
      title={true}
      totalSlides={4}
    />
  );
}