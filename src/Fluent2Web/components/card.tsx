import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import svgPaths from './svg-8u5vq1lgbl';

/**
 * A Microsoft Fluent UI style card component that displays content in a structured, interactive container.
 * Appears as a rounded rectangular card with optional header (icon, title, metadata, action button), body text/custom content, and footer action buttons.
 * The card supports multiple visual styles and interactive states with hover, pressed, and selection feedback.
 * 
 * The card is designed to present information with associated actions in a compact, scannable format.
 * It includes a colorful Copilot icon in the header by default, making it suitable for AI-related features or general content presentation.
 */
export interface CardProps {
  className?: string; // Custom CSS classes to apply to the card container. Overrides default styling including width and background colors.
  body?: boolean; // Whether to show the body section. Default: true
  footer?: boolean; // Whether to show the footer section with action buttons. Default: true
  layout?: "Default" | "Custom"; // Card layout mode. Default: "Default". "Default": Standard card with header, optional body text, and footer buttons. "Custom": Minimal card with a placeholder area for custom content
  state?: "Rest" | "Hover" | "Pressed" | "Draggable" | "Selected" | "Disabled"; // Initial state of the card. Default: "Rest". Interactive states (Hover, Pressed) are managed automatically based on user interaction unless state is "Disabled" or "Draggable"
  style?: "Filled" | "Filled alt" | "Outline" | "Subtle"; // Visual style variant. Default: "Filled". "Filled": White background with shadow. "Filled alt": Light gray background. "Outline": Transparent background with border. "Subtle": Transparent background without border
  onHeaderActionClick?: () => void; // Callback when the header action button (three dots menu) is clicked
  onPrimaryActionClick?: () => void; // Callback when the primary footer button is clicked
  onSecondaryActionClick?: () => void; // Callback when the secondary footer button is clicked
  onQuickActionClick?: () => void; // Callback when the quick action button in footer is clicked
  onCardClick?: () => void; // Callback when the card itself is clicked
  onSelectionChange?: (selected: boolean) => void; // Callback when selection state changes, receives the new selected state
}

// ---------------------- Main Component ----------------------

export function Card({ 
  className, 
  body = true, 
  footer = true, 
  layout = "Default", 
  state: initialState = "Rest", 
  style = "Filled",
  onHeaderActionClick,
  onPrimaryActionClick,
  onSecondaryActionClick,
  onQuickActionClick,
  onCardClick,
  onSelectionChange
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isSelected, setIsSelected] = useState(initialState === "Selected");
  
  // Determine effective state based on props and interactive state
  const effectiveState = initialState === "Disabled" ? "Disabled" : 
                        initialState === "Draggable" ? "Draggable" :
                        isPressed ? "Pressed" : 
                        isSelected ? "Selected" :
                        isHovered ? "Hover" : 
                        initialState;
  
  const state = effectiveState;
  
  const isCustomAndRestAndFilled = layout === "Custom" && state === "Rest" && style === "Filled";
  const isDefaultAndDisabledAndFilled = layout === "Default" && state === "Disabled" && style === "Filled";
  const isDefaultAndDraggableAndFilled = layout === "Default" && state === "Draggable" && style === "Filled";
  const isDefaultAndHoverAndFilled = layout === "Default" && state === "Hover" && style === "Filled";
  const isDefaultAndPressedAndFilled = layout === "Default" && state === "Pressed" && style === "Filled";
  const isDefaultAndRestAndFilled = layout === "Default" && state === "Rest" && style === "Filled";
  const isDefaultAndRestAndFilledAlt = layout === "Default" && state === "Rest" && style === "Filled alt";
  const isDefaultAndRestAndOutline = layout === "Default" && state === "Rest" && style === "Outline";
  const isDefaultAndRestAndSubtle = layout === "Default" && state === "Rest" && style === "Subtle";
  const isDefaultAndSelectedAndFilled = layout === "Default" && state === "Selected" && style === "Filled";
  
  const handleMouseEnter = () => {
    if (initialState !== "Disabled") {
      setIsHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  
  const handleMouseDown = () => {
    if (initialState !== "Disabled") {
      setIsPressed(true);
    }
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleCardClick = () => {
    if (initialState !== "Disabled") {
      onCardClick?.();
    }
  };
  
  const handleHeaderAction = () => {
    if (initialState !== "Disabled") {
      onHeaderActionClick?.();
    }
  };
  
  const handleSelectionToggle = () => {
    if (initialState !== "Disabled") {
      const newSelected = !isSelected;
      setIsSelected(newSelected);
      onSelectionChange?.(newSelected);
    }
  };
  
  return (
    <div 
      className={className || `relative rounded-[4px] w-[320px] ${isDefaultAndRestAndOutline || isDefaultAndRestAndSubtle ? "bg-[rgba(255,255,255,0)]" : isDefaultAndRestAndFilledAlt ? "bg-[#fafafa]" : isDefaultAndDisabledAndFilled ? "bg-[#f0f0f0]" : isDefaultAndSelectedAndFilled ? "bg-[#ebebeb]" : isDefaultAndPressedAndFilled ? "bg-[#e0e0e0]" : isDefaultAndHoverAndFilled ? "bg-[#f5f5f5]" : "bg-white"} ${initialState !== "Disabled" ? "cursor-pointer" : "cursor-not-allowed"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleCardClick}
    >
      <div className={`content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full ${isCustomAndRestAndFilled ? "p-[12px]" : ""}`}>
        {(isDefaultAndRestAndFilled || isDefaultAndHoverAndFilled || isDefaultAndPressedAndFilled || isDefaultAndSelectedAndFilled || isDefaultAndDraggableAndFilled || isDefaultAndDisabledAndFilled || isDefaultAndRestAndFilledAlt || isDefaultAndRestAndOutline || isDefaultAndRestAndSubtle) && (
          <div className="relative shrink-0 w-full" data-name="Header container">
            <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
              <Wrapper additionalClassNames="shrink-0 w-full">
                <div className="relative shrink-0 size-[32px]" data-name="Size=32, Theme=Color">
                  <div className="absolute inset-[9.38%_14.15%_57.88%_45.16%]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.0196 10.4782">
                      <path d={svgPaths.p38f8dd80} fill="url(#paint0_radial_0_4840)" id="Shape" />
                      <defs>
                        <radialGradient cx="0" cy="0" gradientTransform="matrix(-7.37821 -8.55084 -7.96607 7.17216 11.1238 10.5466)" gradientUnits="userSpaceOnUse" id="paint0_radial_0_4840" r="1">
                          <stop offset="0.0955758" stopColor="#00AEFF" />
                          <stop offset="0.773185" stopColor="#2253CE" />
                          <stop offset="1" stopColor="#0736C4" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute inset-[57.77%_45.21%_9.37%_15.25%]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.6514 10.5138">
                      <path d={svgPaths.p16b66900} fill="url(#paint0_radial_0_4823)" id="Shape" />
                      <defs>
                        <radialGradient cx="0" cy="0" gradientTransform="matrix(6.61516 7.92888 7.80904 -6.47171 2.29524 3.46195)" gradientUnits="userSpaceOnUse" id="paint0_radial_0_4823" r="1">
                          <stop stopColor="#FFB657" />
                          <stop offset="0.633728" stopColor="#FF5F3D" />
                          <stop offset="0.923392" stopColor="#C02B3C" />
                        </radialGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute inset-[9.38%_38.28%_29.68%_3.12%]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7522 19.5021">
                      <g id="Shape">
                        <path d={svgPaths.p3ad80900} fill="url(#paint0_radial_0_4841)" />
                        <path d={svgPaths.p3ad80900} fill="url(#paint1_linear_0_4841)" />
                      </g>
                      <defs>
                        <radialGradient cx="0" cy="0" gradientTransform="matrix(-0.990905 -17.2799 98.0282 -5.51056 7.54368 19.4952)" gradientUnits="userSpaceOnUse" id="paint0_radial_0_4841" r="1">
                          <stop offset="0.03" stopColor="#FFC800" />
                          <stop offset="0.31" stopColor="#98BD42" />
                          <stop offset="0.49" stopColor="#52B471" />
                          <stop offset="0.843838" stopColor="#0D91E1" />
                        </radialGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_0_4841" x1="8.52393" x2="9.35932" y1="-1.28148e-08" y2="19.5029">
                          <stop stopColor="#3DCBFF" />
                          <stop offset="0.246674" stopColor="#0588F7" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="absolute inset-[29.67%_3.13%_9.37%_38.27%]" data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.7522 19.5045">
                      <g id="Shape">
                        <path d={svgPaths.p186ed9b0} fill="url(#paint0_radial_0_4838)" />
                        <path d={svgPaths.p186ed9b0} fill="url(#paint1_linear_0_4838)" />
                      </g>
                      <defs>
                        <radialGradient cx="0" cy="0" gradientTransform="matrix(-8.64067 24.4636 -29.4075 -10.797 15.5618 -1.90963)" gradientUnits="userSpaceOnUse" id="paint0_radial_0_4838" r="1">
                          <stop offset="0.0661714" stopColor="#8C48FF" />
                          <stop offset="0.5" stopColor="#F2598A" />
                          <stop offset="0.895833" stopColor="#FFB152" />
                        </radialGradient>
                        <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_0_4838" x1="16.4258" x2="16.4149" y1="-1.19079" y2="4.12155">
                          <stop offset="0.0581535" stopColor="#F8ADFA" />
                          <stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap" data-name="Text container">
                  <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-[#242424] text-[14px] w-full">Card title</p>
                  <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] overflow-hidden relative shrink-0 text-[#616161] text-[12px] w-full">Additional metadata</p>
                </div>
                <Button onClick={handleHeaderAction}>
                  <path d={svgPaths.p1737d400} fill={isDefaultAndDisabledAndFilled ? "var(--fill-0, #BDBDBD)" : "var(--fill-0, #424242)"} id="Shape" />
                </Button>
              </Wrapper>
            </div>
          </div>
        )}
        {(isDefaultAndRestAndFilled || isDefaultAndHoverAndFilled || isDefaultAndPressedAndFilled || isDefaultAndSelectedAndFilled || isDefaultAndDraggableAndFilled || isDefaultAndRestAndFilledAlt || isDefaultAndRestAndOutline || isDefaultAndRestAndSubtle) && body && (
          <Wrapper2>
            <CardBody className="relative shrink-0 w-full" />
          </Wrapper2>
        )}
        {(isDefaultAndRestAndFilled || isDefaultAndHoverAndFilled || isDefaultAndPressedAndFilled || isDefaultAndSelectedAndFilled || isDefaultAndDraggableAndFilled || isDefaultAndRestAndFilledAlt || isDefaultAndRestAndOutline || isDefaultAndRestAndSubtle) && footer && (
          <Wrapper2>
            <CardFooter 
              className="relative shrink-0 w-full" 
              onPrimaryClick={onPrimaryActionClick}
              onSecondaryClick={onSecondaryActionClick}
              onQuickActionClick={onQuickActionClick}
            />
          </Wrapper2>
        )}
        {isDefaultAndDisabledAndFilled && body && (
          <Wrapper2>
            <div className="relative shrink-0 w-full" data-name=".Card body">
              <div className="flex flex-row items-center size-full">
                <div className="content-stretch flex items-center relative w-full">
                  <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#424242] text-[12px]">
                    <p className="leading-[16px] whitespace-pre-wrap">Copilot is an AI tool designed to improve productivity by integrating with Microsoft applications, offering content generation and task automation features.</p>
                  </div>
                </div>
              </div>
            </div>
          </Wrapper2>
        )}
        {isDefaultAndDisabledAndFilled && footer && (
          <Wrapper2>
            <Wrapper additionalClassNames="shrink-0 w-full">
              <ButtonText text="Button">
                <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
              </ButtonText>
              <ButtonText1 text="Button">
                <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
              </ButtonText1>
            </Wrapper>
          </Wrapper2>
        )}
        {isCustomAndRestAndFilled && (
          <div className="h-[36px] relative shrink-0 w-full" data-name=".Card body">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center relative size-full">
                <div className="bg-[#ebf3fc] flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Content placeholder">
                  <Text text="SWAP AREA WITH YOUR COMPONENT" additionalClassNames="overflow-clip rounded-[inherit]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isDefaultAndRestAndOutline ? "border-[#d1d1d1]" : isDefaultAndSelectedAndFilled ? "border-[#bdbdbd] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" : isDefaultAndHoverAndFilled || isDefaultAndDraggableAndFilled ? "border-[rgba(255,255,255,0)] shadow-[0px_4px_8px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]" : "border-[rgba(255,255,255,0)] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)]"}`} />
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start pb-[12px] px-[12px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex gap-[6px] items-center justify-center px-[12px] py-[6px] relative">{children}</div>
    </div>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative", additionalClassNames)}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center relative w-full">{children}</div>
      </div>
    </div>
  );
}

function Size20ThemeRegular({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[2px] relative">
          <div className="relative shrink-0 size-[16px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
              {children}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

type ButtonProps = {
  onClick?: () => void;
};

function Button({ children, onClick }: React.PropsWithChildren<ButtonProps>) {
  return (
    <div 
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.04)] active:bg-[rgba(0,0,0,0.08)]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[6px] relative">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container">
            <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Size=20, Theme=Regular">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[2.5px] left-1/2 top-1/2 w-[12.5px]" data-name="Shape">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.5 2.5">
                  {children}
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("flex flex-col items-center justify-center size-full", additionalClassNames)}>
      <div className="content-stretch flex flex-col items-center justify-center relative size-full">
        <div className="content-stretch flex gap-[6px] h-[44px] items-center justify-center relative shrink-0 w-full" data-name="Container">
          <div className="relative shrink-0 size-[16px]" data-name="Arrow Swap">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[13px] left-1/2 top-1/2 w-[10px]" data-name="Shape">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 13">
                <path d={svgPaths.p3958af00} fill="var(--fill-0, #115EA3)" id="Shape" />
              </svg>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center justify-center pb-[2px] relative shrink-0" data-name="Text">
            <p className="font-['Segoe_UI:Regular',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#115ea3] text-[10px] text-center w-full whitespace-pre-wrap">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type ButtonText1Props = {
  text: string;
  onClick?: () => void;
};

function ButtonText1({ text, children, onClick }: React.PropsWithChildren<ButtonText1Props>) {
  return (
    <div 
      className="bg-white relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] active:bg-[#e0e0e0]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Wrapper1>
        <Size20ThemeRegular>{children}</Size20ThemeRegular>
        <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center relative shrink-0" data-name="Container">
          <div className="content-stretch flex items-start pb-[2px] relative shrink-0" data-name="Text wrapper for offset">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#242424] text-[14px] whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        </div>
      </Wrapper1>
    </div>
  );
}

type ButtonTextProps = {
  text: string;
  onClick?: () => void;
};

function ButtonText({ text, children, onClick }: React.PropsWithChildren<ButtonTextProps>) {
  return (
    <div 
      className="bg-[#0f6cbd] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[#115ea3] active:bg-[#0e4775]"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <Wrapper1>
        <Size20ThemeRegular>{children}</Size20ThemeRegular>
        <div className="content-stretch flex gap-[4px] h-[20px] items-center justify-center pb-[2px] relative shrink-0" data-name="Container">
          <div className="content-stretch flex items-start relative shrink-0" data-name="Text wrapper for offset">
            <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
              <p className="leading-[20px]">{text}</p>
            </div>
          </div>
        </div>
      </Wrapper1>
    </div>
  );
}

type CardFooterProps = {
  className?: string;
  primaryAction?: boolean;
  quickAction?: boolean;
  secondaryAction?: boolean;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onQuickActionClick?: () => void;
};

function CardFooter({ className, primaryAction = true, quickAction = false, secondaryAction = true, onPrimaryClick, onSecondaryClick, onQuickActionClick }: CardFooterProps) {
  return (
    <div className={className || ""} data-name=".Card footer">
      <Wrapper additionalClassNames="w-[280px]">
        {primaryAction && (
          <ButtonText text="Button" onClick={onPrimaryClick}>
            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, white)" fillRule="evenodd" id="Shape" />
          </ButtonText>
        )}
        {secondaryAction && (
          <ButtonText1 text="Button" onClick={onSecondaryClick}>
            <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
          </ButtonText1>
        )}
        {quickAction && (
          <div className="content-stretch flex flex-[1_0_0] items-center justify-end min-h-px min-w-px relative" data-name="End content">
            {quickAction && (
              <Button onClick={onQuickActionClick}>
                <path d={svgPaths.p1737d400} fill="var(--fill-0, #424242)" id="Shape" />
              </Button>
            )}
          </div>
        )}
      </Wrapper>
    </div>
  );
}

function ContentPlaceholder({ className }: { className?: string }) {
  return (
    <div className={className || "bg-[#ebf3fc] h-[44px] relative w-[250px]"} data-name="Content placeholder">
      <Text text="SWAP AREA WITH YOUR COMPONENT" />
    </div>
  );
}

type CardBodyProps = {
  className?: string;
  bodyString?: string;
  customBody?: boolean;
};

function CardBody({ className, bodyString = "Copilot is an AI tool designed to improve productivity by integrating with Microsoft applications, offering content generation and task automation features.", customBody = false }: CardBodyProps) {
  const isCustomBody = customBody;
  const isNotCustomBody = !customBody;
  return (
    <div className={className || `relative w-[280px] ${isCustomBody ? "h-[36px]" : ""}`}>
      <div className="flex flex-row items-center size-full">
        <div className={`content-stretch flex items-center relative ${isCustomBody ? "size-full" : "w-full"}`}>
          {isNotCustomBody && (
            <div className="flex flex-[1_0_0] flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#424242] text-[12px]">
              <p className="leading-[16px] whitespace-pre-wrap">{bodyString}</p>
            </div>
          )}
          {isCustomBody && <ContentPlaceholder className="bg-[#ebf3fc] flex-[1_0_0] h-full min-h-px min-w-px relative" />}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface CardProps_Display {
  body?: boolean;
  footer?: boolean;
  layout?: "Default" | "Custom";
  state?: "Rest" | "Hover" | "Pressed" | "Draggable" | "Selected" | "Disabled";
  style?: "Filled" | "Filled alt" | "Outline" | "Subtle";
}

function Card_Display({
  body,
  footer,
  layout,
  state,
  style,
}: CardProps_Display) {
  return (
    <Card
      body={body}
      footer={footer}
      layout={layout}
      state={state}
      style={style}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FilledRestCard
export function FilledRestCard() {
  return (
    <Card_Display
      style="Filled"
      state="Rest"
      layout="Default"
      body={true}
      footer={true}
    />
  );
}

// @figmaExample FilledAltCard
export function FilledAltCard() {
  return (
    <Card_Display
      style="Filled alt"
      state="Rest"
      layout="Default"
      body={true}
      footer={true}
    />
  );
}

// @figmaExample OutlineCard
export function OutlineCard() {
  return (
    <Card_Display
      style="Outline"
      state="Rest"
      layout="Default"
      body={true}
      footer={true}
    />
  );
}

// @figmaExample SubtleCard
export function SubtleCard() {
  return (
    <Card_Display
      style="Subtle"
      state="Rest"
      layout="Default"
      body={true}
      footer={true}
    />
  );
}

// @figmaExample SelectedCard
export function SelectedCard() {
  return (
    <Card_Display
      style="Filled"
      state="Selected"
      layout="Default"
      body={true}
      footer={true}
    />
  );
}

// @figmaExample DisabledCard
export function DisabledCard() {
  return (
    <Card_Display
      style="Filled"
      state="Disabled"
      layout="Default"
      body={true}
      footer={true}
    />
  );
}

// @figmaExample CardWithoutBody
export function CardWithoutBody() {
  return (
    <Card_Display
      style="Filled"
      state="Rest"
      layout="Default"
      body={false}
      footer={true}
    />
  );
}

// @figmaExample CustomLayoutCard
export function CustomLayoutCard() {
  return (
    <Card_Display
      style="Filled"
      state="Rest"
      layout="Custom"
      body={true}
      footer={true}
    />
  );
}