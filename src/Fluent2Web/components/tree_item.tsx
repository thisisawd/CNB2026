import * as React from 'react';
import { useState } from 'react';
import clsx from 'clsx';

const svgPaths = {
  pa51a700: "M8 2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6H2C1.44772 6 1 6.44772 1 7C1 7.55228 1.44772 8 2 8H6V14H2C1.44772 14 1 14.4477 1 15C1 15.5523 1.44772 16 2 16H6C6 16.5523 6.44772 17 7 17C7.55228 17 8 16.5523 8 16C8.55228 16 9 15.5523 9 15C9 14.4477 8.55228 14 8 14V8H14V14C13.4477 14 13 14.4477 13 15C13 15.5523 13.4477 16 14 16C14 16.5523 14.4477 17 15 17C15.5523 17 16 16.5523 16 16H16C16.5523 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14V8C16.5523 8 17 7.55228 17 7C17 6.44772 16.5523 6 16 6H16V2C16 1.44772 15.5523 1 15 1C14.4477 1 14 1.44772 14 2V6H8V2Z",
  p30769300: "M8 2C8 1.44772 7.55228 1 7 1C6.44772 1 6 1.44772 6 2V6H2C1.44772 6 1 6.44772 1 7C1 7.55228 1.44772 8 2 8H6V14H2C1.44772 14 1 14.4477 1 15C1 15.5523 1.44772 16 2 16H6C6 16.5523 6.44772 17 7 17C7.55228 17 8 16.5523 8 16C8.55228 16 9 15.5523 9 15C9 14.4477 8.55228 14 8 14V8H14V14C13.4477 14 13 14.4477 13 15C13 15.5523 13.4477 16 14 16C14 16.5523 14.4477 17 15 17C15.5523 17 16 16.5523 16 16H16C16.5523 16 17 15.5523 17 15C17 14.4477 16.5523 14 16 14V8C16.5523 8 17 7.55228 17 7C17 6.44772 16.5523 6 16 6H16V2C16 1.44772 15.5523 1 15 1C14.4477 1 14 1.44772 14 2V6H8V2Z",
  p31a9aa00: "M6 1.5C6 1.22386 5.77614 1 5.5 1C5.22386 1 5 1.22386 5 1.5V5H1.5C1.22386 5 1 5.22386 1 5.5C1 5.77614 1.22386 6 1.5 6H5V10.5H1.5C1.22386 10.5 1 10.7239 1 11C1 11.2761 1.22386 11.5 1.5 11.5H5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6.27614 11.5 6.5 11.2761 6.5 11C6.5 10.7239 6.27614 10.5 6 10.5V6H10.5V10.5C10.2239 10.5 10 10.7239 10 11C10 11.2761 10.2239 11.5 10.5 11.5C10.5 11.7761 10.7239 12 11 12C11.2761 12 11.5 11.7761 11.5 11.5H11.5C11.7761 11.5 12 11.2761 12 11C12 10.7239 11.7761 10.5 11.5 10.5V6C11.7761 6 12 5.77614 12 5.5C12 5.22386 11.7761 5 11.5 5H11.5V1.5C11.5 1.22386 11.2761 1 11 1C10.7239 1 10.5 1.22386 10.5 1.5V5H6V1.5Z",
  p329e3500: "M1.64645 0.646447C1.45118 0.451184 1.45118 0.134602 1.64645 -0.0606602C1.84171 -0.255922 2.15829 -0.255922 2.35355 -0.0606602L4.85355 2.43934C5.04882 2.6346 5.04882 2.95118 4.85355 3.14645L2.35355 5.64645C2.15829 5.84171 1.84171 5.84171 1.64645 5.64645C1.45118 5.45118 1.45118 5.1346 1.64645 4.93934L3.79289 2.79289L1.64645 0.646447Z",
  p18da8d00: "M4 1C4 0.723858 3.77614 0.5 3.5 0.5C3.22386 0.5 3 0.723858 3 1V3H1C0.723858 3 0.5 3.22386 0.5 3.5C0.5 3.77614 0.723858 4 1 4H3V7H1C0.723858 7 0.5 7.22386 0.5 7.5C0.5 7.77614 0.723858 8 1 8H3C3 8.27614 3.22386 8.5 3.5 8.5C3.77614 8.5 4 8.27614 4 8C4.27614 8 4.5 7.77614 4.5 7.5C4.5 7.22386 4.27614 7 4 7V4H7V7C6.72386 7 6.5 7.22386 6.5 7.5C6.5 7.77614 6.72386 8 7 8C7 8.27614 7.22386 8.5 7.5 8.5C7.77614 8.5 8 8.27614 8 8H8C8.27614 8 8.5 7.77614 8.5 7.5C8.5 7.22386 8.27614 7 8 7V4C8.27614 4 8.5 3.77614 8.5 3.5C8.5 3.22386 8.27614 3 8 3H8V1C8 0.723858 7.77614 0.5 7.5 0.5C7.22386 0.5 7 0.723858 7 1V3H4V1Z",
  p399cfc00: "M10 2.5C10 2.22386 9.77614 2 9.5 2C9.22386 2 9 2.22386 9 2.5V9H2.5C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H9V17.5C9 17.7761 9.22386 18 9.5 18C9.77614 18 10 17.7761 10 17.5V10H17.5C17.7761 10 18 9.77614 18 9.5C18 9.22386 17.7761 9 17.5 9H10V2.5Z",
  p20a13b40: "M20 5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5V18H5C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20H18V35C18 35.5523 18.4477 36 19 36C19.5523 36 20 35.5523 20 35V20H35C35.5523 20 36 19.5523 36 19C36 18.4477 35.5523 18 35 18H20V5Z",
  p14bd3300: "M13 3.25C13 2.83579 12.6642 2.5 12.25 2.5C11.8358 2.5 11.5 2.83579 11.5 3.25V11.5H3.25C2.83579 11.5 2.5 11.8358 2.5 12.25C2.5 12.6642 2.83579 13 3.25 13H11.5V22.75C11.5 23.1642 11.8358 23.5 12.25 23.5C12.6642 23.5 13 23.1642 13 22.75V13H22.75C23.1642 13 23.5 12.6642 23.5 12.25C23.5 11.8358 23.1642 11.5 22.75 11.5H13V3.25Z",
  p3a7e7880: "M11 2.75C11 2.33579 10.6642 2 10.25 2C9.83579 2 9.5 2.33579 9.5 2.75V9.5H2.75C2.33579 9.5 2 9.83579 2 10.25C2 10.6642 2.33579 11 2.75 11H9.5V19.25C9.5 19.6642 9.83579 20 10.25 20C10.6642 20 11 19.6642 11 19.25V11H19.25C19.6642 11 20 10.6642 20 10.25C20 9.83579 19.6642 9.5 19.25 9.5H11V2.75Z",
};

/**
 * A hierarchical tree view item component with support for expansion, selection, checkboxes, icons, and badges.
 * Appears as a horizontal row element (280px default width, 32px height for medium, 24px for small) with rounded corners,
 * displaying optional chevron, checkbox, before/after icons, primary text, badges, and quick actions.
 * Background color changes based on state (hover, pressed, selected) in the Subtle style variants.
 * 
 * This component can be used in controlled or uncontrolled mode - state props (checked, expanded, selected) can be
 * managed externally or internally. It's ideal for file trees, navigation hierarchies, or any nested list structures
 * where items can be expanded/collapsed, selected, and checked.
 * 
 * IMPORTANT: For leaf nodes (items with no children), set leafNode=true to hide the chevron and adjust left padding
 * IMPORTANT: Icons should be provided as React nodes matching the size variant - use 20px icons for Medium size and 16px icons for Small size
 * The component manages its own hover, pressed, and focus states internally
 * Checkbox and chevron clicks are isolated via stopPropagation to prevent triggering the main onClick
 */
export interface TreeItemProps {
  className?: string; // Optional CSS classes to override default styling and dimensions
  badges?: boolean; // Show a blue numbered badge (displays "1") on the right side (default: true)
  checkbox?: boolean; // Show a checkbox on the left side of the item (default: true)
  chevron?: boolean; // Show expand/collapse chevron for non-leaf nodes (default: true)
  focus?: boolean; // Display a focus ring border around the item (default: false)
  iconAfter?: boolean; // Show an icon after the primary text (default: true)
  iconAfter1Filled20Px?: React.ReactNode | null; // Custom filled icon (20px) for after position when selected (default: null, shows placeholder)
  iconAfter1Regular16Px?: React.ReactNode | null; // Custom regular icon (16px) for after position in small size (default: null, shows placeholder)
  iconAfter1Regular20Px?: React.ReactNode | null; // Custom regular icon (20px) for after position (default: null, shows placeholder)
  iconBefore?: boolean; // Show an icon before the primary text (default: true)
  iconBeforeFilled20Px?: React.ReactNode | null; // Custom filled icon (20px) for before position when selected (default: null, shows placeholder)
  iconBeforeRegular16Px?: React.ReactNode | null; // Custom regular icon (16px) for before position in small size (default: null, shows placeholder)
  iconBeforeRegular20Px?: React.ReactNode | null; // Custom regular icon (20px) for before position (default: null, shows placeholder)
  leafNode?: boolean; // Whether this is a leaf node (no children). When true, hides chevron and adjusts padding (default: false)
  primaryText?: string; // The main text label displayed in the item (default: "Item title")
  quickActions?: boolean; // Show quick action button on hover (default: true)
  size?: "Small" | "Medium (Default)"; // Size variant affecting height and font size. Small is 24px height with 12px text, Medium is 32px height with 14px text (default: "Medium (Default)")
  style?: "Subtle (Default)" | "Subtle alpha" | "Transparent"; // Visual style variant. Subtle shows grey backgrounds on hover/press/selected states (default: "Subtle (Default)")
  checked?: boolean; // Controlled checked state for the checkbox. When undefined, uses internal state
  expanded?: boolean; // Controlled expanded state for the chevron. When undefined, uses internal state
  selected?: boolean; // Controlled selected state for the item. When undefined, uses internal state
  disabled?: boolean; // Disables all interactions and applies disabled styling (greyed out) (default: false)
  onCheckboxChange?: (checked: boolean) => void; // Callback when checkbox state changes, receives new checked value
  onExpandToggle?: (expanded: boolean) => void; // Callback when item is expanded/collapsed via chevron, receives new expanded value
  onClick?: () => void; // Callback when the item itself is clicked (not checkbox or chevron)
  onQuickAction?: () => void; // Callback when quick action button is clicked
}

// ---------------------- Main Component ----------------------

export function TreeItem({ 
  className, 
  badges = true, 
  checkbox = true, 
  chevron = true, 
  focus = false, 
  iconAfter = true, 
  iconAfter1Filled20Px = null, 
  iconAfter1Regular16Px = null, 
  iconAfter1Regular20Px = null, 
  iconBefore = true, 
  iconBeforeFilled20Px = null, 
  iconBeforeRegular16Px = null, 
  iconBeforeRegular20Px = null, 
  leafNode = false, 
  primaryText = "Item title", 
  quickActions = true, 
  size = "Medium (Default)", 
  style = "Subtle (Default)",
  checked: checkedProp,
  expanded: expandedProp,
  selected: selectedProp,
  disabled: disabledProp = false,
  onCheckboxChange,
  onExpandToggle,
  onClick,
  onQuickAction
}: TreeItemProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [internalSelected, setInternalSelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  
  const isChecked = checkedProp !== undefined ? checkedProp : internalChecked;
  const isExpanded = expandedProp !== undefined ? expandedProp : internalExpanded;
  const isSelected = selectedProp !== undefined ? selectedProp : internalSelected;
  const isDisabled = disabledProp;
  
  const state = isDisabled ? "Disabled" : pressed ? "Pressed" : isSelected ? "Selected" : hovered ? "Hover" : "Rest";
  
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    
    const newChecked = !isChecked;
    if (checkedProp === undefined) {
      setInternalChecked(newChecked);
    }
    onCheckboxChange?.(newChecked);
  };
  
  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    
    const newExpanded = !isExpanded;
    if (expandedProp === undefined) {
      setInternalExpanded(newExpanded);
    }
    onExpandToggle?.(newExpanded);
  };
  
  const handleItemClick = () => {
    if (isDisabled) return;
    
    if (selectedProp === undefined) {
      setInternalSelected(true);
    }
    onClick?.();
  };
  
  const handleQuickActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    onQuickAction?.();
  };
  
  const handleMouseEnter = () => {
    if (!isDisabled) {
      setHovered(true);
    }
  };
  
  const handleMouseLeave = () => {
    setHovered(false);
    setPressed(false);
  };
  
  const handleMouseDown = () => {
    if (!isDisabled) {
      setPressed(true);
    }
  };
  
  const handleMouseUp = () => {
    setPressed(false);
  };

  const isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode = style === "Subtle alpha" && size === "Medium (Default)" && state === "Rest" && !leafNode;
  const isSubtleDefaultAndMediumDefaultAndDisabledAndNotLeafNode = style === "Subtle (Default)" && size === "Medium (Default)" && state === "Disabled" && !leafNode;
  const isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode = style === "Subtle (Default)" && size === "Medium (Default)" && state === "Hover" && !leafNode;
  const isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode = style === "Subtle (Default)" && size === "Medium (Default)" && state === "Pressed" && !leafNode;
  const isSubtleDefaultAndMediumDefaultAndRestAndLeafNode = style === "Subtle (Default)" && size === "Medium (Default)" && state === "Rest" && leafNode;
  const isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode = style === "Subtle (Default)" && size === "Medium (Default)" && state === "Rest" && !leafNode;
  const isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode = style === "Subtle (Default)" && size === "Medium (Default)" && state === "Selected" && !leafNode;
  const isSubtleDefaultAndSmallAndRestAndNotLeafNode = style === "Subtle (Default)" && size === "Small" && state === "Rest" && !leafNode;
  const isTransparentAndMediumDefaultAndRestAndNotLeafNode = style === "Transparent" && size === "Medium (Default)" && state === "Rest" && !leafNode;
  
  return (
    <div 
      className={className || `relative rounded-[4px] w-[280px] ${isSubtleDefaultAndSmallAndRestAndNotLeafNode ? "bg-[rgba(255,255,255,0)] min-h-[24px]" : isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode ? "bg-[#ebebeb] min-h-[32px]" : isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode ? "bg-[#e0e0e0] min-h-[32px]" : isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode ? "bg-[#f5f5f5] min-h-[32px]" : "bg-[rgba(255,255,255,0)] min-h-[32px]"}`}
      onClick={handleItemClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{ cursor: isDisabled ? 'default' : 'pointer' }}
    >
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className={`content-stretch flex items-center min-h-[inherit] pr-[8px] relative w-full ${isSubtleDefaultAndMediumDefaultAndRestAndLeafNode ? "pl-[24px]" : ""}`}>
          {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndRestAndLeafNode || isSubtleDefaultAndSmallAndRestAndNotLeafNode) && focus && (
            <div className="absolute inset-0 rounded-[4px]" data-name="Focus ring">
              <div className="overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute border border-solid border-white inset-0 rounded-[4px]" data-name="Inner stroke" />
              </div>
              <div aria-hidden="true" className="absolute border-2 border-black border-solid inset-[-2px] pointer-events-none rounded-[6px]" />
            </div>
          )}
          {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndSmallAndRestAndNotLeafNode) && chevron && (
            <TreeItemTreeItemChevron onClick={handleChevronClick}>
              <path d={svgPaths.p329e3500} fill="var(--fill-0, #616161)" id="Shape" />
            </TreeItemTreeItemChevron>
          )}
          {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndRestAndLeafNode || isSubtleDefaultAndSmallAndRestAndNotLeafNode) && (
            <>
              <TreeItemHelper checkbox={checkbox} onCheckboxClick={handleCheckboxClick} />
              <div className={`content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px relative ${isSubtleDefaultAndSmallAndRestAndNotLeafNode ? "py-[4px]" : "py-[6px]"}`} data-name="Start content">
                {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndRestAndLeafNode) && iconBefore && (iconBeforeRegular20Px || <TreeItemPlaceholder />)}
                {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndRestAndLeafNode) && (
                  <div className="content-stretch flex items-center px-[2px] relative shrink-0" data-name="Content slot">
                    <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#424242] text-[14px]">{primaryText}</p>
                  </div>
                )}
                {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndRestAndLeafNode) && iconAfter && (
                  <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon after">
                    {iconAfter1Regular20Px || <TreeItemPlaceholder />}
                  </div>
                )}
                {isSubtleDefaultAndSmallAndRestAndNotLeafNode && iconBefore && (iconBeforeRegular16Px || <TreeItemPlaceholder1 />)}
                {isSubtleDefaultAndSmallAndRestAndNotLeafNode && (
                  <div className="content-stretch flex items-center px-[2px] relative shrink-0" data-name="Content slot">
                    <p className="font-['Segoe_UI:Regular',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#424242] text-[12px]">{primaryText}</p>
                  </div>
                )}
                {isSubtleDefaultAndSmallAndRestAndNotLeafNode && iconAfter && (
                  <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon after">
                    {iconAfter1Regular16Px || <TreeItemPlaceholder1 />}
                  </div>
                )}
              </div>
            </>
          )}
          {(isSubtleDefaultAndMediumDefaultAndRestAndNotLeafNode || isSubtleAlphaAndMediumDefaultAndRestAndNotLeafNode || isTransparentAndMediumDefaultAndRestAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndRestAndLeafNode) && <TreeItemHelper1 badges={badges} />}
          {(isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode) && chevron && (
            <TreeItemTreeItemChevron onClick={handleChevronClick}>
              <path d={svgPaths.p329e3500} fill="var(--fill-0, #424242)" id="Shape" />
            </TreeItemTreeItemChevron>
          )}
          {(isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode) && (
            <>
              <div className="flex flex-row items-center self-stretch">
                {isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode && checkbox && (
                  <Wrapper1 onClick={handleCheckboxClick}>
                    <div aria-hidden="true" className="absolute border border-[#575757] border-solid inset-0 pointer-events-none rounded-[2px]" />
                  </Wrapper1>
                )}
                {isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode && checkbox && (
                  <Wrapper1 onClick={handleCheckboxClick}>
                    <div aria-hidden="true" className="absolute border border-[#4d4d4d] border-solid inset-0 pointer-events-none rounded-[2px]" />
                  </Wrapper1>
                )}
                {isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode && checkbox && <TreeItemCheckbox onClick={handleCheckboxClick} />}
              </div>
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px py-[6px] relative" data-name="Start content">
                {(isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode) && iconBefore && (iconBeforeRegular20Px || <TreeItemHelper2 />)}
                {(isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode) && <TreeItemContentSlot primaryText={primaryText} />}
                {(isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode) && iconAfter && (
                  <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon after">
                    {iconAfter1Regular20Px || <TreeItemHelper2 />}
                  </div>
                )}
                {isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode && iconBefore && (iconBeforeFilled20Px || <TreeItemPlaceholder2 />)}
                {isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode && <TreeItemContentSlot primaryText={primaryText} />}
                {isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode && iconAfter && (
                  <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon after">
                    {iconAfter1Filled20Px || <TreeItemPlaceholder2 />}
                  </div>
                )}
              </div>
            </>
          )}
          {(isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndPressedAndNotLeafNode || isSubtleDefaultAndMediumDefaultAndSelectedAndNotLeafNode) && badges && <TreeItemBadgeContainerText text="1" additionalClassNames="px-[4px] py-[8px]" />}
          {isSubtleDefaultAndMediumDefaultAndHoverAndNotLeafNode && quickActions && (
            <div className="content-stretch flex items-center justify-end py-[4px] relative shrink-0" data-name="Quick actions">
              <Wrapper2 additionalClassNames="bg-[rgba(255,255,255,0)] rounded-[4px]">
                <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Container" onClick={handleQuickActionClick}>
                  <TreeItemHelper2 />
                </div>
              </Wrapper2>
            </div>
          )}
          {isSubtleDefaultAndMediumDefaultAndDisabledAndNotLeafNode && chevron && (
            <TreeItemTreeItemChevron>
              <path d={svgPaths.p329e3500} fill="var(--fill-0, #BDBDBD)" id="Shape" />
            </TreeItemTreeItemChevron>
          )}
          {isSubtleDefaultAndMediumDefaultAndDisabledAndNotLeafNode && (
            <>
              <TreeItemHelper checkbox={checkbox} />
              <div className="content-stretch flex flex-[1_0_0] gap-[4px] items-start min-h-px min-w-px py-[6px] relative" data-name="Start content">
                {iconBefore && (iconBeforeRegular20Px || <TreeItemPlaceholder3 />)}
                <div className="content-stretch flex items-center px-[2px] relative shrink-0" data-name="Content slot">
                  <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#bdbdbd] text-[14px]">{primaryText}</p>
                </div>
                {iconAfter && (
                  <div className="content-stretch flex gap-[4px] items-start relative shrink-0" data-name="Icon after">
                    {iconAfter1Regular20Px || <TreeItemPlaceholder3 />}
                  </div>
                )}
              </div>
              <TreeItemHelper1 badges={badges} />
            </>
          )}
          {isSubtleDefaultAndSmallAndRestAndNotLeafNode && badges && <TreeItemBadgeContainerText text="1" additionalClassNames="p-[4px]" />}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center p-[2px] relative">{children}</div>
    </div>
  );
}

type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <Wrapper3>{children}</Wrapper3>
    </div>
  );
}

function Wrapper1({ children, onClick }: React.PropsWithChildren<{ onClick?: (e: React.MouseEvent) => void }>) {
  return (
    <div className="h-full relative shrink-0" onClick={onClick}>
      <div className="content-stretch flex gap-[4px] h-full items-start relative">
        <div className="content-stretch flex items-start p-[8px] relative shrink-0" data-name="Checkbox elements">
          <div className="relative rounded-[2px] shrink-0 size-[16px]" data-name="Background">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function TreeItemTreeItemChevron({ children, onClick }: React.PropsWithChildren<{ onClick?: (e: React.MouseEvent) => void }>) {
  return (
    <div className="relative shrink-0" onClick={onClick}>
      <div className="content-stretch flex items-start px-[6px] py-[10px] relative">
        <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Chevron">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[8px] left-[calc(50%+0.75px)] top-1/2 w-[4.5px]" data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.5 8">
              {children}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <Wrapper2>
      <div className="relative shrink-0 size-[16px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
          {children}
        </svg>
      </div>
    </Wrapper2>
  );
}

function TreeItemPlaceholder3() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #BDBDBD)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

function TreeItemPlaceholder2() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.p30769300} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

type TreeItemContentSlotProps = {
  primaryText: string;
};

function TreeItemContentSlot({ primaryText }: TreeItemContentSlotProps) {
  return (
    <div className="content-stretch flex items-center px-[2px] relative shrink-0">
      <p className="font-['Segoe_UI:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#242424] text-[14px]">{primaryText}</p>
    </div>
  );
}

function TreeItemHelper2() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #242424)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

type TreeItemBadgeContainerTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TreeItemBadgeContainerText({ text, additionalClassNames = "" }: TreeItemBadgeContainerTextProps) {
  return (
    <div className={clsx("content-stretch flex gap-[8px] items-center justify-end relative shrink-0", additionalClassNames)}>
      <div className="bg-[#0f6cbd] h-[16px] min-w-[16px] relative rounded-[9999px] shrink-0" data-name="Badge">
        <div className="flex flex-row items-center justify-center min-w-[inherit] overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex h-full items-center justify-center min-w-[inherit] px-[2px] relative">
            <div className="content-stretch flex flex-col h-[14px] items-center justify-end pb-[0.5px] px-[2px] relative shrink-0" data-name="Text offset">
              <div className="flex flex-col font-['Segoe_UI:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[10px] text-center text-white whitespace-nowrap">
                <p className="leading-[14px]">{text}</p>
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-[#0f6cbd] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
    </div>
  );
}

type TreeItemHelper1Props = {
  badges: boolean;
};

function TreeItemHelper1({ badges }: TreeItemHelper1Props) {
  return <div className="flex flex-row items-center self-stretch">{badges && <TreeItemBadgeContainerText text="1" additionalClassNames="h-full p-[4px]" />}</div>;
}

function TreeItemPlaceholder1() {
  return (
    <Wrapper2>
      <div className="relative shrink-0 size-[12px]" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <path clipRule="evenodd" d={svgPaths.p31a9aa00} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
        </svg>
      </div>
    </Wrapper2>
  );
}

function TreeItemPlaceholder() {
  return (
    <Wrapper>
      <path clipRule="evenodd" d={svgPaths.pa51a700} fill="var(--fill-0, #424242)" fillRule="evenodd" id="Shape" />
    </Wrapper>
  );
}

function TreeItemCheckbox({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <Wrapper1 onClick={onClick}>
      <div aria-hidden="true" className="absolute border border-[#616161] border-solid inset-0 pointer-events-none rounded-[2px]" />
    </Wrapper1>
  );
}

type TreeItemHelperProps = {
  checkbox: boolean;
  onCheckboxClick?: (e: React.MouseEvent) => void;
};

function TreeItemHelper({ checkbox, onCheckboxClick }: TreeItemHelperProps) {
  return <div className="flex flex-row items-center self-stretch">{checkbox && <TreeItemCheckbox onClick={onCheckboxClick} />}</div>;
}

// ---------------------- Display Component ----------------------

interface TreeItemProps_Display {
  className?: string;
  badges?: boolean;
  checkbox?: boolean;
  chevron?: boolean;
  focus?: boolean;
  iconAfter?: boolean;
  iconAfter1Filled20Px?: React.ReactNode | null;
  iconAfter1Regular16Px?: React.ReactNode | null;
  iconAfter1Regular20Px?: React.ReactNode | null;
  iconBefore?: boolean;
  iconBeforeFilled20Px?: React.ReactNode | null;
  iconBeforeRegular16Px?: React.ReactNode | null;
  iconBeforeRegular20Px?: React.ReactNode | null;
  leafNode?: boolean;
  primaryText?: string;
  quickActions?: boolean;
  size?: "Small" | "Medium (Default)";
  style?: "Subtle (Default)" | "Subtle alpha" | "Transparent";
  disabled?: boolean;
}

function TreeItem_Display({
  className,
  badges,
  checkbox,
  chevron,
  focus,
  iconAfter,
  iconAfter1Filled20Px,
  iconAfter1Regular16Px,
  iconAfter1Regular20Px,
  iconBefore,
  iconBeforeFilled20Px,
  iconBeforeRegular16Px,
  iconBeforeRegular20Px,
  leafNode,
  primaryText,
  quickActions,
  size,
  style,
  disabled,
}: TreeItemProps_Display) {
  const [checked, setChecked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  return (
    <TreeItem
      className={className}
      badges={badges}
      checkbox={checkbox}
      chevron={chevron}
      focus={focus}
      iconAfter={iconAfter}
      iconAfter1Filled20Px={iconAfter1Filled20Px}
      iconAfter1Regular16Px={iconAfter1Regular16Px}
      iconAfter1Regular20Px={iconAfter1Regular20Px}
      iconBefore={iconBefore}
      iconBeforeFilled20Px={iconBeforeFilled20Px}
      iconBeforeRegular16Px={iconBeforeRegular16Px}
      iconBeforeRegular20Px={iconBeforeRegular20Px}
      leafNode={leafNode}
      primaryText={primaryText}
      quickActions={quickActions}
      size={size}
      style={style}
      disabled={disabled}
      checked={checked}
      expanded={expanded}
      selected={selected}
      onCheckboxChange={setChecked}
      onExpandToggle={setExpanded}
      onClick={() => setSelected(!selected)}
      onQuickAction={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample FolderItem
export function FolderItemExample() {
  return (
    <TreeItem_Display
      primaryText="Folder Item"
      leafNode={false}
      size="Medium (Default)"
      style="Subtle (Default)"
    />
  );
}

// @figmaExample DocumentLeafItem
export function DocumentLeafItemExample() {
  return (
    <TreeItem_Display
      primaryText="Documents.txt"
      leafNode={true}
      size="Medium (Default)"
      style="Subtle (Default)"
    />
  );
}

// @figmaExample SmallLeafItem
export function SmallLeafItemExample() {
  return (
    <TreeItem_Display
      primaryText="Small Leaf Item"
      leafNode={true}
      size="Small"
      style="Subtle (Default)"
    />
  );
}

// @figmaExample NoCheckboxOrBadge
export function NoCheckboxOrBadgeExample() {
  return (
    <TreeItem_Display
      primaryText="No Checkbox or Badge"
      leafNode={true}
      checkbox={false}
      badges={false}
      size="Medium (Default)"
      style="Subtle (Default)"
    />
  );
}

// @figmaExample TransparentStyle
export function TransparentStyleExample() {
  return (
    <TreeItem_Display
      primaryText="Transparent Style"
      leafNode={false}
      size="Medium (Default)"
      style="Transparent"
    />
  );
}

// @figmaExample SubtleAlphaStyle
export function SubtleAlphaStyleExample() {
  return (
    <TreeItem_Display
      primaryText="Subtle Alpha Style"
      leafNode={false}
      size="Medium (Default)"
      style="Subtle alpha"
    />
  );
}

// @figmaExample DisabledItem
export function DisabledItemExample() {
  return (
    <TreeItem_Display
      primaryText="Disabled Item"
      leafNode={false}
      disabled={true}
      size="Medium (Default)"
      style="Subtle (Default)"
    />
  );
}

// @figmaExample CustomIconsItem
export function CustomIconsItemExample() {
  return (
    <TreeItem_Display
      primaryText="Custom Icons Item"
      leafNode={true}
      size="Medium (Default)"
      style="Subtle (Default)"
      iconBeforeRegular20Px={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2L3 7v6c0 3.5 2.5 6.5 7 8 4.5-1.5 7-4.5 7-8V7l-7-5z" />
        </svg>
      }
      iconAfter1Regular20Px={
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="10" r="8" />
        </svg>
      }
    />
  );
}
