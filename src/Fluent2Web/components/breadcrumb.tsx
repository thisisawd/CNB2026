import * as React from 'react';
import svgPaths from './svg-znjm2cl61g';

/**
 * A navigation component that displays the current page's location within a site hierarchy.
 * Appears as a horizontal list of text items separated by right-pointing chevron icons.
 * Each clickable item has a subtle hover effect (light gray background).
 * The last item represents the current page and is not clickable.
 *
 * Usage Notes:
 * - The last item in the breadcrumb trail is automatically styled as non-interactive (current page)
 * - All items before the last are clickable and will trigger the onItemClick callback
 * - Chevron separators are automatically inserted between items
 * - Default items are provided as fallback if no items prop is passed
 */
export interface BreadcrumbItemType {
  label: string; // The text to display for this breadcrumb item
  path?: string; // The path/route associated with this item (for reference in onItemClick)
}

export interface BreadcrumbProps {
  className?: string; // CSS class name for the root container. Defaults to "relative" if not provided
  size?: 'Small' | 'Medium' | 'Large'; // Controls the overall size of the breadcrumb including font size, padding, and icon size. "Small": 12px font, smaller padding (8px/2px), 12px chevron icons. "Medium": 14px semibold font, medium padding (12px/6px), 16px chevron icons. "Large" (default): 16px semibold font, larger padding (16px/8px), 20px chevron icons
  items?: BreadcrumbItemType[]; // Array of breadcrumb items to display. Defaults to three sample items if not provided
  onItemClick?: (item: BreadcrumbItemType, index: number) => void; // Callback fired when a breadcrumb item is clicked. Receives the clicked item object and its index. Note: only items before the last (non-current pages) will trigger this callback
}

// ---------------------- Main Component ----------------------

export function Breadcrumb({ 
  className, 
  size = "Large",
  items = [
    { label: "Text", path: "/" },
    { label: "Text", path: "/category" },
    { label: "Text" }
  ],
  onItemClick
}: BreadcrumbProps) {
  const isMedium = size === "Medium";
  const isSmall = size === "Small";
  
  const handleItemClick = (item: BreadcrumbItemType, index: number) => {
    // Don't navigate if it's the last item (current page)
    if (index < items.length - 1 && onItemClick) {
      onItemClick(item, index);
    }
  };
  
  return (
    <div className={className || "relative"}>
      <div className="content-stretch flex items-start relative">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          if (isLast) {
            // Last item without chevron
            return (
              <Wrapper key={index} size={size}>
                <Button 
                  size={size}
                  onClick={undefined}
                >
                  <div className={`flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#424242] whitespace-nowrap ${isSmall ? "font-['Segoe_UI:Regular',sans-serif] text-[12px]" : isMedium ? "font-['Segoe_UI:Semibold',sans-serif] text-[14px]" : "font-['Segoe_UI:Semibold',sans-serif] text-[16px]"}`}>
                    <p className={isSmall ? "leading-[16px]" : isMedium ? "leading-[20px]" : "leading-[22px]"}>{item.label}</p>
                  </div>
                </Button>
              </Wrapper>
            );
          }
          
          return (
            <Text 
              key={index}
              text={item.label} 
              size={size}
              onClick={() => handleItemClick(item, index)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

type WrapperProps = React.PropsWithChildren<{
  size: "Small" | "Medium" | "Large";
}>;

function Wrapper({ children, size }: WrapperProps) {
  return (
    <div className="relative shrink-0">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center relative">{children}</div>
      </div>
    </div>
  );
}

type ButtonProps = React.PropsWithChildren<{
  size: "Small" | "Medium" | "Large";
  onClick?: () => void;
}>;

function Button({ children, size, onClick }: ButtonProps) {
  const isSmall = size === "Small";
  const isMedium = size === "Medium";
  
  return (
    <div 
      className="bg-[rgba(255,255,255,0)] relative rounded-[4px] shrink-0 cursor-pointer hover:bg-[rgba(0,0,0,0.05)] transition-colors"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className={`content-stretch flex items-center justify-center relative ${isSmall ? "gap-[4px] px-[8px] py-[2px]" : isMedium ? "gap-[6px] px-[12px] py-[6px]" : "gap-[6px] px-[16px] py-[8px]"}`}>
          <div className={`content-stretch flex gap-[4px] items-center justify-center relative shrink-0 ${isSmall ? "h-[20px]" : isMedium ? "h-[20px] pb-[2px]" : "h-[24px]"}`} data-name="Container">
            <div className={`content-stretch flex items-start relative shrink-0 ${isMedium ? "" : "pb-[2px]"}`} data-name="Text wrapper for offset">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type TextProps = {
  text: string;
  size: "Small" | "Medium" | "Large";
  onClick?: () => void;
};

function Text({ text, size, onClick }: TextProps) {
  const isSmall = size === "Small";
  const isMedium = size === "Medium";
  
  return (
    <BreadcrumbBreadcrumbItem size={size} onClick={onClick}>
      <div className={`flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#424242] whitespace-nowrap ${isSmall ? "font-['Segoe_UI:Regular',sans-serif] text-[12px]" : isMedium ? "font-['Segoe_UI:Semibold',sans-serif] text-[14px]" : "font-['Segoe_UI:Semibold',sans-serif] text-[16px]"}`}>
        <p className={isSmall ? "leading-[16px]" : isMedium ? "leading-[20px]" : "leading-[22px]"}>{text}</p>
      </div>
    </BreadcrumbBreadcrumbItem>
  );
}

type BreadcrumbBreadcrumbItemProps = React.PropsWithChildren<{
  size: "Small" | "Medium" | "Large";
  onClick?: () => void;
}>;

function BreadcrumbBreadcrumbItem({ children, size, onClick }: BreadcrumbBreadcrumbItemProps) {
  const isSmall = size === "Small";
  const isMedium = size === "Medium";
  
  return (
    <Wrapper size={size}>
      <Button size={size} onClick={onClick}>{children}</Button>
      <div className="content-stretch flex items-center relative shrink-0" data-name="Divider">
        <div className={`overflow-clip relative shrink-0 ${isSmall ? "size-[12px]" : isMedium ? "size-[16px]" : "size-[20px]"}`} data-name="Chevron">
          <div className={`-translate-x-1/2 -translate-y-1/2 absolute top-1/2 ${isSmall ? "h-[8px] left-[calc(50%+0.75px)] w-[4.5px]" : isMedium ? "h-[10px] left-[calc(50%+0.25px)] w-[5.5px]" : "h-[12.001px] left-[calc(50%+0.75px)] w-[6.499px]"}`} data-name="Shape">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isSmall ? "0 0 4.5 8" : isMedium ? "0 0 5.5 10" : "0 0 6.49919 12.0008"}>
              <path d={isSmall ? svgPaths.p329e3500 : isMedium ? svgPaths.p21a22340 : svgPaths.p154164f0} fill="var(--fill-0, #424242)" id="Shape" />
            </svg>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

// ---------------------- Display Component ----------------------

interface BreadcrumbProps_Display {
  size?: 'Small' | 'Medium' | 'Large';
  items: BreadcrumbItemType[];
}

function Breadcrumb_Display({
  size,
  items,
}: BreadcrumbProps_Display) {
  return (
    <Breadcrumb
      size={size}
      items={items}
      onItemClick={() => {}}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample LargeElectronicsProductBreadcrumb
export function BreadcrumbExample1() {
  return (
    <Breadcrumb_Display
      size="Large"
      items={[
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/products' },
        { label: 'Electronics', path: '/products/electronics' },
        { label: 'Laptop' },
      ]}
    />
  );
}

// @figmaExample MediumDashboardAnalyticsBreadcrumb
export function BreadcrumbExample2() {
  return (
    <Breadcrumb_Display
      size="Medium"
      items={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Analytics', path: '/dashboard/analytics' },
        { label: 'Reports' },
      ]}
    />
  );
}

// @figmaExample SmallDocumentationBreadcrumb
export function BreadcrumbExample3() {
  return (
    <Breadcrumb_Display
      size="Small"
      items={[
        { label: 'Documentation', path: '/docs' },
        { label: 'API Reference' },
      ]}
    />
  );
}

// @figmaExample LargeSettingsProfileBreadcrumb
export function BreadcrumbExample4() {
  return (
    <Breadcrumb_Display
      size="Large"
      items={[
        { label: 'Settings', path: '/settings' },
        { label: 'Profile' },
      ]}
    />
  );
}

// @figmaExample MediumDeepClothingNavigationBreadcrumb
export function BreadcrumbExample5() {
  return (
    <Breadcrumb_Display
      size="Medium"
      items={[
        { label: 'Store', path: '/store' },
        { label: 'Categories', path: '/store/categories' },
        { label: 'Clothing', path: '/store/categories/clothing' },
        { label: 'T-Shirts', path: '/store/categories/clothing/tshirts' },
        { label: 'Blue Cotton T-Shirt' },
      ]}
    />
  );
}