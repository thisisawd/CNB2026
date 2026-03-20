import * as React from 'react';
import { useState } from "react";
import clsx from "clsx";
import svgPaths from "./svg-ncs3il94wa";
import imgDropdown from "figma:asset/58d5b025426e9844392ec23bd1425afba4bdff61.png";

/**
 * A searchable tag picker component with dropdown functionality for selecting and managing multiple tags or items.
 * Displays selected tags as dismissible chips and provides a text input for filtering or searching.
 * 
 * The component manages its own internal state for expansion, input value, and tag visibility.
 * Tags are displayed as chips with avatars showing initials.
 * The dropdown displays when expanded is true and shows a list of selectable items.
 * Different sizes affect the height and padding: Medium (32px), Large (40px), Extra Large (48px).
 * The thick underline changes color based on state (focus shows blue, hover shows dark gray).
 */
export interface TagPickerTagPickerProps {
  className?: string; // Optional custom CSS class to override default styling and dimensions
  caretEnd?: boolean; // Shows a blinking cursor at the end of the input text (default: false)
  caretStart?: boolean; // Shows a blinking cursor at the start of the input text (default: false)
  enteredString?: string; // Initial value for the text input (default: "Entered text")
  enteredText?: boolean; // Whether text has been entered (affects input appearance) (default: false)
  expanded?: boolean; // Initial expanded state of the dropdown (default: false)
  placeholderString?: string; // Placeholder text shown when input is empty (default: "Placeholder text")
  placeholderText?: boolean; // Whether to show placeholder text (default: true)
  secondaryAction?: boolean; // Shows a "Secondary action" link in the end content area (default: false)
  size?: "Medium (Default)" | "Large" | "Extra large"; // Controls the overall size and spacing of the component (default: "Medium (Default)")
  state?: "Rest" | "Hover" | "Pressed" | "Focused" | "Disabled"; // Visual state of the component (default: "Rest")
  style?: "Outline" | "Transparent" | "Filled darker" | "Filled lighter"; // Background style of the component (default: "Outline")
  tags?: boolean; // Whether to show tag chips in the input area (default: false)
  text?: boolean; // Whether to show the text input field (default: true)
  onInputChange?: (value: string) => void; // Callback fired when input text changes
  onTagAdd?: (tag: any) => void; // Callback fired when a dropdown item is selected to add as a tag
  onTagRemove?: (tagIndex: number) => void; // Callback fired when a tag dismiss button is clicked
  onExpandToggle?: (expanded: boolean) => void; // Callback fired when the dropdown is expanded or collapsed
  onSecondaryAction?: () => void; // Callback fired when the secondary action link is clicked
  onFocus?: () => void; // Callback fired when the input receives focus
  onBlur?: () => void; // Callback fired when the input loses focus
}

export function TagPickerTagPicker({ 
  className, 
  caretEnd = false, 
  caretStart = false, 
  enteredString: initialEnteredString = "Entered text", 
  enteredText: initialEnteredText = false, 
  expanded: initialExpanded = false, 
  placeholderString = "Placeholder text", 
  placeholderText = true, 
  secondaryAction = false, 
  size = "Medium (Default)", 
  state = "Rest", 
  style = "Outline", 
  tags: initialTags = false, 
  text = true,
  onInputChange,
  onTagAdd,
  onTagRemove,
  onExpandToggle,
  onSecondaryAction,
  onFocus,
  onBlur
}: TagPickerTagPickerProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [inputValue, setInputValue] = useState(initialEnteredString);
  const [hasTags, setHasTags] = useState(initialTags);
  const [isFocused, setIsFocused] = useState(false);

  const handleExpandToggle = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    onExpandToggle?.(newExpanded);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onInputChange?.(value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleTagDismiss = (index: number) => {
    onTagRemove?.(index);
  };

  const handleDropdownItemClick = (item: any) => {
    onTagAdd?.(item);
    setIsExpanded(false);
  };

  const handleSecondaryActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSecondaryAction?.();
  };

  const expanded = isExpanded;
  const enteredText = initialEnteredText || inputValue.length > 0;
  const enteredString = inputValue;
  const tags = hasTags;

  const isFilledDarkerAndMediumDefaultAndRestAndNotExpanded = style === "Filled darker" && size === "Medium (Default)" && state === "Rest" && !expanded;
  const isFilledLighterAndMediumDefaultAndRestAndNotExpanded = style === "Filled lighter" && size === "Medium (Default)" && state === "Rest" && !expanded;
  const isOutlineAndExtraLargeAndRestAndNotExpanded = style === "Outline" && size === "Extra large" && state === "Rest" && !expanded;
  const isOutlineAndLargeAndRestAndNotExpanded = style === "Outline" && size === "Large" && state === "Rest" && !expanded;
  const isOutlineAndMediumDefaultAndDisabledAndNotExpanded = style === "Outline" && size === "Medium (Default)" && state === "Disabled" && !expanded;
  const isOutlineAndMediumDefaultAndFocusedAndExpanded = style === "Outline" && size === "Medium (Default)" && state === "Focused" && expanded;
  const isOutlineAndMediumDefaultAndFocusedAndNotExpanded = style === "Outline" && size === "Medium (Default)" && state === "Focused" && !expanded;
  const isOutlineAndMediumDefaultAndHoverAndNotExpanded = style === "Outline" && size === "Medium (Default)" && state === "Hover" && !expanded;
  const isOutlineAndMediumDefaultAndPressedAndNotExpanded = style === "Outline" && size === "Medium (Default)" && state === "Pressed" && !expanded;
  const isOutlineAndMediumDefaultAndRestAndNotExpanded = style === "Outline" && size === "Medium (Default)" && state === "Rest" && !expanded;
  const isTransparentAndMediumDefaultAndRestAndNotExpanded = style === "Transparent" && size === "Medium (Default)" && state === "Rest" && !expanded;
  return (
    <div className={className || `relative w-[320px] ${isOutlineAndMediumDefaultAndFocusedAndExpanded ? "" : "rounded-[4px]"}`}>
      <div className={`content-stretch flex items-start relative w-full ${isOutlineAndMediumDefaultAndFocusedAndExpanded ? "" : "overflow-clip rounded-[inherit]"}`}>
        {(isOutlineAndMediumDefaultAndRestAndNotExpanded || isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded || isOutlineAndMediumDefaultAndDisabledAndNotExpanded || isOutlineAndLargeAndRestAndNotExpanded || isOutlineAndExtraLargeAndRestAndNotExpanded || isTransparentAndMediumDefaultAndRestAndNotExpanded || isFilledDarkerAndMediumDefaultAndRestAndNotExpanded || isFilledLighterAndMediumDefaultAndRestAndNotExpanded) && (
          <div className={`content-stretch flex flex-[1_0_0] gap-[2px] items-start min-h-px min-w-px relative ${isFilledLighterAndMediumDefaultAndRestAndNotExpanded ? "bg-white" : isFilledDarkerAndMediumDefaultAndRestAndNotExpanded ? "bg-[#f5f5f5]" : isTransparentAndMediumDefaultAndRestAndNotExpanded ? "bg-[rgba(255,255,255,0)]" : isOutlineAndMediumDefaultAndDisabledAndNotExpanded ? "bg-[#f0f0f0] rounded-[4px]" : "bg-white rounded-[4px]"}`} data-name="Input">
            {(isOutlineAndMediumDefaultAndRestAndNotExpanded || isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded || isOutlineAndMediumDefaultAndDisabledAndNotExpanded || isOutlineAndLargeAndRestAndNotExpanded || isOutlineAndExtraLargeAndRestAndNotExpanded) && <div aria-hidden="true" className={`absolute border border-solid inset-0 pointer-events-none rounded-[4px] ${isOutlineAndMediumDefaultAndDisabledAndNotExpanded ? "border-[#e0e0e0]" : isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded ? "border-[#c7c7c7]" : "border-[#d1d1d1]"}`} />}
            <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Start content">
              <div className={`content-start flex flex-wrap gap-[2px] items-start relative w-full ${isOutlineAndLargeAndRestAndNotExpanded || isOutlineAndExtraLargeAndRestAndNotExpanded ? "px-[12px]" : "px-[10px]"}`}>
                {(isOutlineAndMediumDefaultAndRestAndNotExpanded || isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded || isOutlineAndMediumDefaultAndDisabledAndNotExpanded || isFilledLighterAndMediumDefaultAndRestAndNotExpanded) && tags && <TagGroup onTagDismiss={handleTagDismiss} />}
                {(isOutlineAndMediumDefaultAndRestAndNotExpanded || isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded || isFilledLighterAndMediumDefaultAndRestAndNotExpanded) && text && <TagPickerTagPickerTextBase additionalClassNames="py-[6px]" caretStart={caretStart} placeholderText={placeholderText} placeholderString={placeholderString} enteredText={enteredText} enteredString={enteredString} caretEnd={caretEnd} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />}
                {(isTransparentAndMediumDefaultAndRestAndNotExpanded || isFilledDarkerAndMediumDefaultAndRestAndNotExpanded) && tags && (
                  <div className="content-stretch flex gap-[4px] items-start py-[6px] relative shrink-0" data-name="TagGroup">
                    <Tag1 onDismiss={() => handleTagDismiss(0)} />
                    <Tag1 onDismiss={() => handleTagDismiss(1)} />
                  </div>
                )}
                {(isTransparentAndMediumDefaultAndRestAndNotExpanded || isFilledDarkerAndMediumDefaultAndRestAndNotExpanded) && text && <TagPickerTagPickerTextBase additionalClassNames="py-[6px]" caretStart={caretStart} placeholderText={placeholderText} placeholderString={placeholderString} enteredText={enteredText} enteredString={enteredString} caretEnd={caretEnd} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />}
                {isOutlineAndMediumDefaultAndDisabledAndNotExpanded && text && (
                  <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px py-[6px] relative" data-name="Text base">
                    <Text>
                      {caretStart && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
                      {placeholderText && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#bdbdbd] text-[14px]">{placeholderString}</p>}
                      {enteredText && <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">{enteredString}</p>}
                      {caretEnd && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
                    </Text>
                  </div>
                )}
                {isOutlineAndLargeAndRestAndNotExpanded && tags && (
                  <div className="content-stretch flex gap-[6px] items-start py-[8px] relative shrink-0" data-name="TagGroup">
                    <Tag2 onDismiss={() => handleTagDismiss(0)}>MB</Tag2>
                    <Tag2 onDismiss={() => handleTagDismiss(1)}>MB</Tag2>
                  </div>
                )}
                {isOutlineAndLargeAndRestAndNotExpanded && text && <TagPickerTagPickerTextBase additionalClassNames="py-[10px]" caretStart={caretStart} placeholderText={placeholderText} placeholderString={placeholderString} enteredText={enteredText} enteredString={enteredString} caretEnd={caretEnd} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />}
                {isOutlineAndExtraLargeAndRestAndNotExpanded && tags && (
                  <div className="content-stretch flex gap-[6px] items-start py-[8px] relative shrink-0" data-name="TagGroup">
                    <Tag3 text="Mona Kane" text1="Secondary" onDismiss={() => handleTagDismiss(0)}>
                      MB
                    </Tag3>
                    <Tag3 text="Mona Kane" text1="Secondary" onDismiss={() => handleTagDismiss(1)}>
                      MB
                    </Tag3>
                  </div>
                )}
                {isOutlineAndExtraLargeAndRestAndNotExpanded && text && <TagPickerTagPickerTextBase additionalClassNames="py-[12px]" caretStart={caretStart} placeholderText={placeholderText} placeholderString={placeholderString} enteredText={enteredText} enteredString={enteredString} caretEnd={caretEnd} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />}
              </div>
            </div>
            <div className={`content-stretch flex items-center justify-end relative shrink-0 ${isOutlineAndExtraLargeAndRestAndNotExpanded ? "pr-[12px] py-[12px]" : isOutlineAndLargeAndRestAndNotExpanded ? "pr-[12px] py-[10px]" : "pr-[10px] py-[6px]"}`} data-name="End content">
              <div className={`content-stretch flex gap-[6px] items-center justify-end relative shrink-0 ${isOutlineAndExtraLargeAndRestAndNotExpanded ? "py-[2px]" : ""}`} data-name="Content end base">
                {secondaryAction && <TagPickerTagPickerTagPickerSecondaryActionText text="Secondary action" onClick={handleSecondaryActionClick} />}
                <div className="cursor-pointer" onClick={handleExpandToggle}>
                  <TagPickerTagPickerChevron>
                    <path d={svgPaths.p101e4700} fill={isOutlineAndMediumDefaultAndDisabledAndNotExpanded ? "var(--fill-0, #BDBDBD)" : isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded ? "var(--fill-0, #424242)" : "var(--fill-0, #616161)"} id="Shape" />
                  </TagPickerTagPickerChevron>
                </div>
              </div>
            </div>
          </div>
        )}
        {(isOutlineAndMediumDefaultAndRestAndNotExpanded || isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded || isOutlineAndMediumDefaultAndDisabledAndNotExpanded || isOutlineAndLargeAndRestAndNotExpanded || isOutlineAndExtraLargeAndRestAndNotExpanded || isTransparentAndMediumDefaultAndRestAndNotExpanded) && <div className={`absolute bottom-0 h-px left-0 right-0 rounded-[4px] ${isOutlineAndMediumDefaultAndDisabledAndNotExpanded ? "bg-[#e0e0e0]" : isOutlineAndMediumDefaultAndHoverAndNotExpanded || isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded ? "bg-[#575757]" : "bg-[#616161]"}`} data-name="Thick underline" />}
        {(isOutlineAndMediumDefaultAndPressedAndNotExpanded || isOutlineAndMediumDefaultAndFocusedAndNotExpanded) && <div className={`absolute bg-[#0f6cbd] bottom-0 h-[2px] rounded-[4px] ${isOutlineAndMediumDefaultAndFocusedAndNotExpanded ? "left-0 right-0" : "left-[100px] right-[100px]"}`} data-name="Thick underline" />}
        {isOutlineAndMediumDefaultAndFocusedAndExpanded && (
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Expanded">
            <div className="content-stretch flex flex-col gap-px items-start overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Input container">
              <div className="bg-white content-stretch flex gap-[2px] items-start relative rounded-[4px] shrink-0 w-full" data-name="Input">
                <div aria-hidden="true" className="absolute border border-[#bdbdbd] border-solid inset-0 pointer-events-none rounded-[4px]" />
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Start content">
                  <div className="content-start flex flex-wrap gap-[2px] items-start px-[10px] relative w-full">
                    {tags && <TagGroup onTagDismiss={handleTagDismiss} />}
                    {text && <TagPickerTagPickerTextBase additionalClassNames="py-[6px]" caretStart={caretStart} placeholderText={placeholderText} placeholderString={placeholderString} enteredText={enteredText} enteredString={enteredString} caretEnd={caretEnd} onChange={handleInputChange} onFocus={handleInputFocus} onBlur={handleInputBlur} />}
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-end pr-[10px] py-[6px] relative shrink-0" data-name="End content">
                  <div className="content-stretch flex gap-[6px] items-center justify-end relative shrink-0" data-name="Content end base">
                    {secondaryAction && <TagPickerTagPickerTagPickerSecondaryActionText text="Secondary action" onClick={handleSecondaryActionClick} />}
                    <div className="cursor-pointer" onClick={handleExpandToggle}>
                      <TagPickerTagPickerChevron>
                        <path d={svgPaths.p101e4700} fill="var(--fill-0, #424242)" id="Shape" />
                      </TagPickerTagPickerChevron>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-[#0f6cbd] bottom-0 h-[2px] left-0 right-0 rounded-[4px]" data-name="Thick underline" />
            </div>
            <div className="bg-white relative rounded-[4px] shadow-[0px_8px_16px_0px_rgba(0,0,0,0.14),0px_0px_2px_0px_rgba(0,0,0,0.12)] shrink-0 w-[340px]" data-name="TagPicker/Dropdown">
              <div className="content-stretch flex flex-col gap-[2px] items-start p-[4px] relative w-full">
                <div className="bg-white relative rounded-[4px] shrink-0 w-full" data-name="Section header">
                  <div className="content-stretch flex flex-col items-start py-[8px] relative w-full">
                    <div className="content-stretch flex h-[16px] items-center px-[8px] relative shrink-0" data-name="left lockup">
                      <p className="font-['Segoe_UI:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#616161] text-[12px]">Section header</p>
                    </div>
                  </div>
                </div>
                <TagPickerItem text="Primary content" text1="Secondary content" onClick={() => handleDropdownItemClick({ primary: "Primary content", secondary: "Secondary content" })} />
                <TagPickerItem text="Primary content" text1="Secondary content" onClick={() => handleDropdownItemClick({ primary: "Primary content", secondary: "Secondary content" })} />
                <TagPickerItem text="Primary content" text1="Secondary content" onClick={() => handleDropdownItemClick({ primary: "Primary content", secondary: "Secondary content" })} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------- Helper Components ----------------------

function Text({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="content-stretch flex items-start px-[2px] relative w-full">{children}</div>
    </div>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center max-h-[inherit] size-full">
      <div className="content-stretch flex h-full items-center max-h-[inherit] relative">{children}</div>
    </div>
  );
}

function TagPickerTagPickerChevron({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[6.499px] left-1/2 top-[calc(50%+0.75px)] w-[12.001px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0008 6.49919">
          {children}
        </svg>
      </div>
    </div>
  );
}

type AvatarAvatarProps = {
  additionalClassNames?: string;
};

function AvatarAvatar({ children, additionalClassNames = "" }: React.PropsWithChildren<AvatarAvatarProps>) {
  return (
    <div className={clsx("relative rounded-[9999px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-1px] pointer-events-none rounded-[10000px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center relative size-full">{children}</div>
      </div>
    </div>
  );
}

type WrapperProps = {
  additionalClassNames?: string;
  onClick?: () => void;
};

function Wrapper({ children, additionalClassNames = "", onClick }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("bg-[#f5f5f5] relative rounded-[4px] shrink-0", additionalClassNames)} onClick={onClick}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Wrapper1>{children}</Wrapper1>
    </div>
  );
}

type TagPickerItemProps = {
  text: string;
  text1: string;
  onClick?: () => void;
};

function TagPickerItem({ text, text1, onClick }: TagPickerItemProps) {
  return (
    <div className="bg-white relative rounded-[4px] shrink-0 w-full cursor-pointer hover:bg-[#f5f5f5]" onClick={onClick}>
      <TagPickerTagPickerImage>
        <div className="flex flex-[1_0_0] flex-col justify-center min-h-px min-w-px relative text-[14px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">{text}</p>
        </div>
        <div className="flex flex-col justify-center relative shrink-0 text-[12px] w-full">
          <p className="leading-[16px] whitespace-pre-wrap">{text1}</p>
        </div>
      </TagPickerTagPickerImage>
    </div>
  );
}

function TagPickerTagPickerImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip rounded-[inherit] size-full">
      <div className="content-stretch flex items-start px-[6px] relative w-full">
        <div className="content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative" data-name="Content">
          <div className="content-stretch flex flex-[1_0_0] gap-[6px] items-start min-h-px min-w-px relative self-stretch" data-name="Start content">
            <div className="content-stretch flex h-full items-start pl-[2px] py-[8px] relative shrink-0" data-name="Avatar slot">
              <div className="relative shrink-0 size-[32px]" data-name=".[DEPRECATED] Avatar">
                <div className="absolute left-0 size-[32px] top-0" data-name="Subtract">
                  <img alt="" className="block max-w-none size-full" height="32" src={imgDropdown} width="32" />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px py-[6px] relative" data-name="Content slot">
              <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative" data-name="Content slot">
                <div className="flex flex-col justify-center size-full">
                  <div className="content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start justify-center leading-[0] not-italic pl-[2px] relative size-full text-[#424242]">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TagPickerTagPickerTagPickerSecondaryActionTextProps = {
  text: string;
  onClick?: () => void;
};

function TagPickerTagPickerTagPickerSecondaryActionText({ text, onClick }: TagPickerTagPickerTagPickerSecondaryActionTextProps) {
  return (
    <div className="relative shrink-0 cursor-pointer" onClick={onClick}>
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[2px] relative">
          <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#616161] text-[12px] whitespace-nowrap">
            <p className="leading-[16px]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tag3Props = {
  text: string;
  text1: string;
  additionalClassNames?: string;
  onDismiss?: () => void;
};

function Tag3({ text, text1, children, additionalClassNames = "", onDismiss }: React.PropsWithChildren<Tag3Props>) {
  return (
    <Wrapper additionalClassNames="h-[32px] max-h-[32px]">
      <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
        <AvatarAvatar additionalClassNames="size-[28px]">
          <Fill additionalClassNames="size-[28px]" />
          <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[16px] left-1/2 not-italic overflow-hidden text-[#616161] text-[12px] text-center text-ellipsis top-[calc(50%-8px)] w-[28px] whitespace-nowrap">{children}</p>
        </AvatarAvatar>
      </div>
      <div className="content-stretch flex gap-[4px] h-full items-center max-h-[32px] px-[8px] relative shrink-0" data-name="Content">
        <div className="content-stretch flex flex-col font-['Segoe_UI:Regular',sans-serif] items-start justify-center leading-[0] not-italic pb-[2px] px-[2px] relative shrink-0 text-[#424242] whitespace-nowrap" data-name="Text slot">
          <div className="flex flex-col justify-center relative shrink-0 text-[12px]">
            <p className="leading-[16px]">{text}</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 text-[10px]">
            <p className="leading-[14px]">{text1}</p>
          </div>
        </div>
        <div className="overflow-clip relative shrink-0 size-[20px] cursor-pointer" data-name="Dismiss" onClick={onDismiss}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[12px] top-1/2" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
              <path d={svgPaths.p301c8b00} fill="var(--fill-0, #424242)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

type Tag2Props = {
  additionalClassNames?: string;
  onDismiss?: () => void;
};

function Tag2({ children, additionalClassNames = "", onDismiss }: React.PropsWithChildren<Tag2Props>) {
  return (
    <Wrapper additionalClassNames="h-[24px] max-h-[24px]">
      <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
        <AvatarAvatar additionalClassNames="size-[20px]">
          <Fill additionalClassNames="size-[20px]" />
          <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] h-[14px] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[20px] whitespace-nowrap">{children}</p>
        </AvatarAvatar>
      </div>
      <div className="content-stretch flex gap-[2px] h-full items-center max-h-[32px] px-[6px] relative shrink-0" data-name="Content">
        <TextSlotText text="Mona Kane" />
        <div className="overflow-clip relative shrink-0 size-[16px] cursor-pointer" data-name="Dismiss" onClick={onDismiss}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[11px] top-1/2" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path d={svgPaths.pd515600} fill="var(--fill-0, #424242)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

type Tag1Props = {
  onDismiss?: () => void;
};

function Tag1({ onDismiss }: Tag1Props) {
  return (
    <div className="h-[20px] max-h-[20px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#d1d1d1] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <TagPickerTagPickerHelper text="M" text1="Mona Kane" onDismiss={onDismiss} />
    </div>
  );
}

type TagPickerTagPickerTextBaseProps = {
  caretStart: boolean;
  placeholderText: boolean;
  placeholderString: string;
  enteredText: boolean;
  enteredString: string;
  caretEnd: boolean;
  additionalClassNames?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

function TagPickerTagPickerTextBase({ caretStart, placeholderText, placeholderString, enteredText, enteredString, caretEnd, additionalClassNames = "", onChange, onFocus, onBlur }: TagPickerTagPickerTextBaseProps) {
  return (
    <div className={clsx("content-stretch flex flex-[1_0_0] items-start min-h-px min-w-px relative", additionalClassNames)}>
      <Text>
        {caretStart && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
        {placeholderText && !enteredText && (
          <input
            type="text"
            placeholder={placeholderString}
            value={enteredString}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#707070] text-[14px] bg-transparent border-none outline-none flex-1"
          />
        )}
        {enteredText && (
          <input
            type="text"
            value={enteredString}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px] bg-transparent border-none outline-none flex-1"
          />
        )}
        {caretEnd && <div className="bg-[#242424] h-[20px] shrink-0 w-px" data-name="Type Cursor" />}
      </Text>
    </div>
  );
}

type TagProps = {
  onDismiss?: () => void;
};

function Tag({ onDismiss }: TagProps) {
  return (
    <div className="bg-[#f5f5f5] h-[20px] max-h-[20px] relative rounded-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <TagPickerTagPickerHelper text="M" text1="Mona Kane" onDismiss={onDismiss} />
    </div>
  );
}

type TagGroupProps = {
  onTagDismiss?: (index: number) => void;
};

function TagGroup({ onTagDismiss }: TagGroupProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-start py-[6px] relative shrink-0">
      <Tag onDismiss={() => onTagDismiss?.(0)} />
      <Tag onDismiss={() => onTagDismiss?.(1)} />
    </div>
  );
}

type TextSlotTextProps = {
  text: string;
};

function TextSlotText({ text }: TextSlotTextProps) {
  return (
    <div className="content-stretch flex flex-col items-start justify-center pb-[2px] px-[2px] relative shrink-0">
      <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#424242] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">{text}</p>
      </div>
    </div>
  );
}

type FillProps = {
  additionalClassNames?: string;
};

function Fill({ additionalClassNames = "" }: FillProps) {
  return (
    <div className={clsx("bg-[#e6e6e6] relative rounded-[9999px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
    </div>
  );
}

type TagPickerTagPickerHelperProps = {
  text: string;
  text1: string;
  onDismiss?: () => void;
};

function TagPickerTagPickerHelper({ text, text1, onDismiss }: TagPickerTagPickerHelperProps) {
  return (
    <Wrapper1>
      <div className="content-stretch flex h-full items-center pl-[2px] relative shrink-0" data-name="Avatar container">
        <AvatarAvatar additionalClassNames="size-[16px]">
          <Fill additionalClassNames="size-[16px]" />
          <p className="-translate-x-1/2 absolute font-['Segoe_UI:Semibold',sans-serif] leading-[14px] left-1/2 not-italic overflow-hidden text-[#616161] text-[10px] text-center text-ellipsis top-[calc(50%-7px)] w-[16px] whitespace-nowrap">{text}</p>
        </AvatarAvatar>
      </div>
      <div className="content-stretch flex gap-[2px] h-full items-center max-h-[32px] px-[6px] relative shrink-0" data-name="Content">
        <TextSlotText text={text1} />
        <div className="overflow-clip relative shrink-0 size-[12px] cursor-pointer" data-name="Dismiss" onClick={onDismiss}>
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
              <path d={svgPaths.p3cfa52f0} fill="var(--fill-0, #424242)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </Wrapper1>
  );
}

// ---------------------- Display Component ----------------------

interface TagPickerTagPickerProps_Display {
  placeholderString?: string;
  secondaryAction?: boolean;
  size?: "Medium (Default)" | "Large" | "Extra large";
  state?: "Rest" | "Hover" | "Pressed" | "Focused" | "Disabled";
  style?: "Outline" | "Transparent" | "Filled darker" | "Filled lighter";
}

function TagPickerTagPicker_Display({
  placeholderString = "Search tags...",
  secondaryAction = false,
  size = "Medium (Default)",
  state = "Rest",
  style = "Outline",
}: TagPickerTagPickerProps_Display) {
  const [expanded, setExpanded] = React.useState(false);
  const [tags, setTags] = React.useState<any[]>([]);
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleTagAdd = (tag: any) => {
    setTags([...tags, tag]);
  };

  const handleTagRemove = (tagIndex: number) => {
    setTags(tags.filter((_, index) => index !== tagIndex));
  };

  const handleExpandToggle = (isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const handleSecondaryAction = () => {
    // Handle secondary action internally
  };

  return (
    <TagPickerTagPicker
      placeholderString={placeholderString}
      secondaryAction={secondaryAction}
      size={size}
      state={state}
      style={style}
      tags={tags.length > 0}
      text={true}
      expanded={expanded}
      enteredString={inputValue}
      enteredText={inputValue.length > 0}
      placeholderText={inputValue.length === 0 && tags.length === 0}
      onInputChange={handleInputChange}
      onTagAdd={handleTagAdd}
      onTagRemove={handleTagRemove}
      onExpandToggle={handleExpandToggle}
      onSecondaryAction={handleSecondaryAction}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample SearchTagsPicker
export function SearchTagsPicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Search tags..."
      size="Medium (Default)"
      state="Rest"
      style="Outline"
      secondaryAction={false}
    />
  );
}

// @figmaExample SearchPeoplePicker
export function SearchPeoplePicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Search people..."
      size="Large"
      state="Rest"
      style="Outline"
      secondaryAction={false}
    />
  );
}

// @figmaExample AddTeamMembersPicker
export function AddTeamMembersPicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Add team members..."
      size="Extra large"
      state="Rest"
      style="Outline"
      secondaryAction={true}
    />
  );
}

// @figmaExample FocusedPicker
export function FocusedPicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Select options..."
      size="Medium (Default)"
      state="Focused"
      style="Outline"
      secondaryAction={false}
    />
  );
}

// @figmaExample FilterItemsPicker
export function FilterItemsPicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Filter items..."
      size="Medium (Default)"
      state="Rest"
      style="Filled darker"
      secondaryAction={false}
    />
  );
}

// @figmaExample ChooseCategoriesPicker
export function ChooseCategoriesPicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Choose categories..."
      size="Large"
      state="Rest"
      style="Filled lighter"
      secondaryAction={true}
    />
  );
}

// @figmaExample DisabledPicker
export function DisabledPicker() {
  return (
    <TagPickerTagPicker_Display
      placeholderString="Disabled picker"
      size="Medium (Default)"
      state="Disabled"
      style="Outline"
      secondaryAction={false}
    />
  );
}