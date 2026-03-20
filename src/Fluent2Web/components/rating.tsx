import * as React from 'react';
import { useState } from 'react';
import svgPaths from './svg-faw10zb2qx';

/**
 * A flexible rating component that displays and captures user ratings using stars, circles, or squares.
 * Appears as a horizontal row of rating icons (5 items) within its container, with optional rating value and quantity text displayed inline.
 * The component adapts its visual size based on the size prop, ranging from 12px to 48px per icon.
 *
 * The component supports both controlled and uncontrolled modes. When `value` is provided, it operates as a controlled component and requires `onChange` to update.
 * When `value` is omitted, it maintains its own internal state starting at 3.5.
 *
 * In Interactive mode, hovering over icons shows a preview of the rating, and clicking sets the rating.
 * In Display mode, the component is static and shows the current rating visually.
 *
 * IMPORTANT NOTES:
 * - The component uses a 5-point rating scale (1-5)
 * - Interactive type adds hover effects and click handlers to each icon
 * - Filled icons indicate the current rating, unfilled icons use a lighter gray color
 * - The compact prop affects layout spacing and text display
 * - Display type with Small size shows the numeric rating and quantity text
 */
export interface RatingProps {
  className?: string; // Custom CSS class to override default positioning and sizing
  compact?: boolean; // Controls layout density and text display (default: false). true: Compact layout with minimal spacing, shows rating and quantity inline. false: Standard layout with more spacing
  ratingQuantity?: string; // Text label showing total number of ratings (e.g., "1,160"). Default: "1,160". Only displayed when type is "Display" and size is "Small"
  shape?: 'Stars' | 'Circles' | 'Square'; // Icon shape for rating display (default: "Stars"). "Stars": Star-shaped icons, "Circles": Circular icons, "Square": Square-shaped icons
  size?: 'Small' | 'Medium' | 'Large' | 'XLarge'; // Visual size of rating icons (default: "Small"). "Small": 12px, "Medium": 16px, "Large": 20px, "XLarge": 28px
  type?: 'Interactive' | 'Display'; // Interaction mode (default: "Interactive"). "Interactive": Clickable with hover states, allows user to set rating. "Display": Read-only, shows current rating value
  value?: number; // Controlled rating value (1-5, supports decimals). When provided, component operates in controlled mode. When omitted, component uses internal state (starts at 3.5)
  onChange?: (rating: number) => void; // Callback fired when rating changes. Receives the new rating value (1-5) as parameter. Called on click in Interactive mode. Required for controlled components to update
}

// ---------------------- Main Component ----------------------

export function Rating({ className, compact = false, ratingQuantity = "1,160", shape = "Stars", size = "Small", type = "Interactive", value: controlledValue, onChange }: RatingProps) {
  const [internalRating, setInternalRating] = useState(3.5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  
  const isControlled = controlledValue !== undefined;
  const rating = isControlled ? controlledValue : internalRating;
  const displayRating = hoverRating !== null ? hoverRating : rating;
  
  const isInteractive = type === "Interactive";
  
  const handleRatingClick = (newRating: number) => {
    if (!isInteractive) return;
    
    if (isControlled) {
      onChange?.(newRating);
    } else {
      setInternalRating(newRating);
      onChange?.(newRating);
    }
  };
  
  const handleMouseEnter = (rating: number) => {
    if (!isInteractive) return;
    setHoverRating(rating);
  };
  
  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setHoverRating(null);
  };
  
  const isDisplayAndSmallAndCompactAndStars = type === "Display" && size === "Small" && compact && shape === "Stars";
  const isDisplayAndSmallAndNotCompactAndStars = type === "Display" && size === "Small" && !compact && shape === "Stars";
  const isInteractiveAndLargeAndNotCompactAndStars = type === "Interactive" && size === "Large" && !compact && shape === "Stars";
  const isInteractiveAndMediumAndNotCompactAndStars = type === "Interactive" && size === "Medium" && !compact && shape === "Stars";
  const isInteractiveAndSmallAndNotCompactAndCircles = type === "Interactive" && size === "Small" && !compact && shape === "Circles";
  const isInteractiveAndSmallAndNotCompactAndSquare = type === "Interactive" && size === "Small" && !compact && shape === "Square";
  const isInteractiveAndSmallAndNotCompactAndStars = type === "Interactive" && size === "Small" && !compact && shape === "Stars";
  const isInteractiveAndXLargeAndNotCompactAndStars = type === "Interactive" && size === "XLarge" && !compact && shape === "Stars";
  return (
    <div className={className || "relative"}>
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[2px] items-center relative">
          <div className={`content-stretch flex items-start relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare ? "pr-[68px] py-[2px]" : isDisplayAndSmallAndCompactAndStars ? "pr-[12px] py-[2px]" : isInteractiveAndMediumAndNotCompactAndStars ? "pr-[88px]" : isInteractiveAndLargeAndNotCompactAndStars ? "pr-[108px]" : "pr-[148px]"}`} data-name="Rating group">
            <div className={`content-stretch flex gap-[2px] items-start overflow-clip relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare ? "mr-[-68px]" : isDisplayAndSmallAndCompactAndStars ? "mr-[-12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "mr-[-88px]" : isInteractiveAndLargeAndNotCompactAndStars ? "mr-[-108px]" : "mr-[-148px]"}`} data-name="Shape">
              {(isInteractiveAndXLargeAndNotCompactAndStars || isInteractiveAndLargeAndNotCompactAndStars || isInteractiveAndMediumAndNotCompactAndStars || isDisplayAndSmallAndCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars) && (
                <div 
                  className={`overflow-clip relative shrink-0 ${isInteractive ? 'cursor-pointer' : ''} ${isDisplayAndSmallAndCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} 
                  data-name="Star"
                  onClick={() => handleRatingClick(1)}
                  onMouseEnter={() => handleMouseEnter(1)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isDisplayAndSmallAndCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "0 0 10.0017 9.59062" : isInteractiveAndMediumAndNotCompactAndStars ? "0 0 13.0019 12.4538" : isInteractiveAndLargeAndNotCompactAndStars ? "0 0 16.0021 15.317" : "0 0 22.5031 21.5438"}>
                      <path d={isInteractiveAndSmallAndNotCompactAndStars ? svgPaths.p2783ea00 : isDisplayAndSmallAndCompactAndStars || isDisplayAndSmallAndNotCompactAndStars ? svgPaths.p9d5a000 : isInteractiveAndMediumAndNotCompactAndStars ? svgPaths.p1c63ef80 : isInteractiveAndLargeAndNotCompactAndStars ? svgPaths.p1c338e00 : svgPaths.pc41a3c0} fill={displayRating >= 1 ? "var(--fill-0, #242424)" : "var(--fill-0, #E0E0E0)"} id="Shape" />
                    </svg>
                  </div>
                </div>
              )}
              {(isInteractiveAndXLargeAndNotCompactAndStars || isInteractiveAndLargeAndNotCompactAndStars || isInteractiveAndMediumAndNotCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars) && (
                <>
                  <div 
                    className={`overflow-clip relative shrink-0 ${isInteractive ? 'cursor-pointer' : ''} ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} 
                    data-name="Star"
                    onClick={() => handleRatingClick(2)}
                    onMouseEnter={() => handleMouseEnter(2)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "0 0 10.0017 9.59062" : isInteractiveAndMediumAndNotCompactAndStars ? "0 0 13.0019 12.4538" : isInteractiveAndLargeAndNotCompactAndStars ? "0 0 16.0021 15.317" : "0 0 22.5031 21.5438"}>
                        <path d={isInteractiveAndSmallAndNotCompactAndStars ? svgPaths.p2783ea00 : isDisplayAndSmallAndNotCompactAndStars ? svgPaths.p9d5a000 : isInteractiveAndMediumAndNotCompactAndStars ? svgPaths.p1c63ef80 : isInteractiveAndLargeAndNotCompactAndStars ? svgPaths.p1c338e00 : svgPaths.pc41a3c0} fill={displayRating >= 2 ? "var(--fill-0, #242424)" : "var(--fill-0, #E0E0E0)"} id="Shape" />
                      </svg>
                    </div>
                  </div>
                  <div 
                    className={`overflow-clip relative shrink-0 ${isInteractive ? 'cursor-pointer' : ''} ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} 
                    data-name="Star"
                    onClick={() => handleRatingClick(3)}
                    onMouseEnter={() => handleMouseEnter(3)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "0 0 10.0017 9.59062" : isInteractiveAndMediumAndNotCompactAndStars ? "0 0 13.0019 12.4538" : isInteractiveAndLargeAndNotCompactAndStars ? "0 0 16.0021 15.317" : "0 0 22.5031 21.5438"}>
                        <path d={isInteractiveAndSmallAndNotCompactAndStars ? svgPaths.p2783ea00 : isDisplayAndSmallAndNotCompactAndStars ? svgPaths.p9d5a000 : isInteractiveAndMediumAndNotCompactAndStars ? svgPaths.p1c63ef80 : isInteractiveAndLargeAndNotCompactAndStars ? svgPaths.p1c338e00 : svgPaths.pc41a3c0} fill={displayRating >= 3 ? "var(--fill-0, #242424)" : "var(--fill-0, #E0E0E0)"} id="Shape" />
                      </svg>
                    </div>
                  </div>
                  <div 
                    className={`overflow-clip relative shrink-0 ${isInteractive ? 'cursor-pointer' : ''} ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} 
                    data-name="Star"
                    onClick={() => handleRatingClick(4)}
                    onMouseEnter={() => handleMouseEnter(4)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "0 0 10.0017 9.59062" : isInteractiveAndMediumAndNotCompactAndStars ? "0 0 13.0019 12.4538" : isInteractiveAndLargeAndNotCompactAndStars ? "0 0 16.0021 15.317" : "0 0 22.5031 21.5438"}>
                        <path d={isInteractiveAndSmallAndNotCompactAndStars ? svgPaths.p2783ea00 : isDisplayAndSmallAndNotCompactAndStars ? svgPaths.p9d5a000 : isInteractiveAndMediumAndNotCompactAndStars ? svgPaths.p1c63ef80 : isInteractiveAndLargeAndNotCompactAndStars ? svgPaths.p1c338e00 : svgPaths.pc41a3c0} fill={displayRating >= 4 ? "var(--fill-0, #242424)" : "var(--fill-0, #E0E0E0)"} id="Shape" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
              {isInteractiveAndSmallAndNotCompactAndCircles && (
                <>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}><RatingCircle /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}><RatingCircle /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}><RatingCircle /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}><RatingCircle /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(5)} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave}><RatingCircle /></div>
                </>
              )}
              {isInteractiveAndSmallAndNotCompactAndSquare && (
                <>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}><RatingSquare /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}><RatingSquare /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}><RatingSquare /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}><RatingSquare /></div>
                  <div className="cursor-pointer" onClick={() => handleRatingClick(5)} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave}><RatingSquare /></div>
                </>
              )}
            </div>
            {(isInteractiveAndXLargeAndNotCompactAndStars || isInteractiveAndLargeAndNotCompactAndStars || isInteractiveAndMediumAndNotCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare) && (
              <>
                <div className={`content-stretch flex gap-[2px] items-start overflow-clip relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare ? "mr-[-68px]" : isInteractiveAndMediumAndNotCompactAndStars ? "mr-[-88px]" : isInteractiveAndLargeAndNotCompactAndStars ? "mr-[-108px]" : "mr-[-148px]"}`} data-name="Shape">
                  {(isInteractiveAndXLargeAndNotCompactAndStars || isInteractiveAndLargeAndNotCompactAndStars || isInteractiveAndMediumAndNotCompactAndStars || isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars) && (
                    <>
                      <div className={`overflow-clip relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} data-name="Star">
                        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                          <RatingHelper1 />
                        </div>
                      </div>
                      <div className={`overflow-clip relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} data-name="Star">
                        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                          <RatingHelper1 />
                        </div>
                      </div>
                      <div className={`overflow-clip relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} data-name="Star">
                        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                          <RatingHelper1 />
                        </div>
                      </div>
                      <div className={`overflow-clip relative shrink-0 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "size-[12px]" : isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} data-name="Star">
                        <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : isInteractiveAndLargeAndNotCompactAndStars ? "h-[15.317px] top-1/2 w-[16.002px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
                          <RatingHelper1 />
                        </div>
                      </div>
                    </>
                  )}
                  {(isInteractiveAndXLargeAndNotCompactAndStars || isInteractiveAndLargeAndNotCompactAndStars || isInteractiveAndMediumAndNotCompactAndStars) && <Star className={`overflow-clip relative shrink-0 ${isInteractive ? 'cursor-pointer' : ''} ${isInteractiveAndMediumAndNotCompactAndStars ? "size-[16px]" : isInteractiveAndLargeAndNotCompactAndStars ? "size-[20px]" : "size-[28px]"}`} size={isInteractiveAndMediumAndNotCompactAndStars ? "16" : isInteractiveAndLargeAndNotCompactAndStars ? "20" : undefined} theme="Filled" />}
                  {(isDisplayAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars) && (
                    <div 
                      className={`overflow-clip relative shrink-0 size-[12px] ${isInteractive ? 'cursor-pointer' : ''}`} 
                      data-name="Star"
                      onClick={() => handleRatingClick(5)}
                      onMouseEnter={() => handleMouseEnter(5)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[9.591px] left-1/2 top-[calc(50%-0.1px)] w-[10.002px]" data-name="Shape">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.0017 9.59062">
                          <path d={svgPaths.p9d5a000} fill={displayRating >= 5 ? "var(--fill-0, #242424)" : "var(--fill-0, #E0E0E0)"} id="Shape" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {isInteractiveAndSmallAndNotCompactAndCircles && (
                    <>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}><RatingCircle1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}><RatingCircle1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}><RatingCircle1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}><RatingCircle1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(5)} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave}><RatingCircle1 /></div>
                    </>
                  )}
                  {isInteractiveAndSmallAndNotCompactAndSquare && (
                    <>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave}><RatingSquare1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave}><RatingSquare1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave}><RatingSquare1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave}><RatingSquare1 /></div>
                      <div className="cursor-pointer" onClick={() => handleRatingClick(5)} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave}><RatingSquare1 /></div>
                    </>
                  )}
                </div>
                <div className={`absolute ${isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare ? "-translate-y-1/2 left-[-48px] top-1/2 w-[115px]" : isDisplayAndSmallAndNotCompactAndStars ? "-translate-y-1/2 content-stretch flex flex-col items-end left-[-48px] px-[19px] top-1/2 w-[115px]" : isInteractiveAndMediumAndNotCompactAndStars ? "left-[-28px] top-0 w-[115px]" : isInteractiveAndLargeAndNotCompactAndStars ? "left-[-6px] top-0 w-[115px]" : "content-stretch flex flex-col items-end px-[152px] right-0 top-0"}`} data-name="✏️ Rating">
                  {(isInteractiveAndLargeAndNotCompactAndStars || isInteractiveAndMediumAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare) && (
                    <div className="flex flex-col items-end size-full">
                      <div className={`content-stretch flex flex-col items-end relative w-full ${isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare ? "px-[73px]" : isInteractiveAndMediumAndNotCompactAndStars ? "px-[87px]" : "px-[109px]"}`}>
                        <div className={`bg-[#242424] shrink-0 ${isInteractiveAndSmallAndNotCompactAndStars || isInteractiveAndSmallAndNotCompactAndCircles || isInteractiveAndSmallAndNotCompactAndSquare ? "h-[12px] w-[68px]" : isInteractiveAndMediumAndNotCompactAndStars ? "h-[16px] w-[88px]" : "h-[20px] w-[108px]"}`} data-name="Foreground color" />
                      </div>
                    </div>
                  )}
                  {(isInteractiveAndXLargeAndNotCompactAndStars || isDisplayAndSmallAndNotCompactAndStars) && <div className={`bg-[#242424] shrink-0 ${isDisplayAndSmallAndNotCompactAndStars ? "h-[12px] w-[68px]" : "h-[28px] w-[155px]"}`} data-name="Foreground color" />}
                </div>
              </>
            )}
          </div>
          {(isDisplayAndSmallAndCompactAndStars || isDisplayAndSmallAndNotCompactAndStars) && (
            <>
              <div className="content-stretch flex items-center pl-[2px] relative shrink-0" data-name="Rating value">
                <div className={`flex flex-col font-["Segoe_UI:Semibold",sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] whitespace-nowrap ${isDisplayAndSmallAndNotCompactAndStars ? "text-right" : ""}`}>
                  <p className="leading-[16px]">{rating.toFixed(1)}</p>
                </div>
              </div>
              <div className={`flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] whitespace-nowrap ${isDisplayAndSmallAndNotCompactAndStars ? "text-right" : ""}`}>
                <p className="leading-[16px]">·</p>
              </div>
            </>
          )}
          {isDisplayAndSmallAndCompactAndStars && (
            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] whitespace-nowrap">
              <p className="leading-[16px]">{ratingQuantity}</p>
            </div>
          )}
          {isDisplayAndSmallAndNotCompactAndStars && (
            <div className="flex flex-col font-['Segoe_UI:Regular',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[#242424] text-[12px] text-right whitespace-nowrap">
              <p className="leading-[16px]">{ratingQuantity}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Helper Components & Utilities ----------------------

function Wrapper2({ children }: React.PropsWithChildren<{}>) {
  return (
    <svg fill="none" preserveAspectRatio="none" viewBox="0 0 10.0017 9.59062" className="block size-full">
      {children}
    </svg>
  );
}

function Wrapper1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[10px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
          {children}
        </svg>
      </div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="overflow-clip relative shrink-0 size-[12px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[8px] top-1/2" data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          {children}
        </svg>
      </div>
    </div>
  );
}

function RatingSquare1() {
  return (
    <Wrapper>
      <path d={svgPaths.p351f1600} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper>
  );
}

function RatingCircle1() {
  return (
    <Wrapper1>
      <path d={svgPaths.p2ae0ba80} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper1>
  );
}

function RatingHelper1() {
  return (
    <Wrapper2>
      <path d={svgPaths.p9d5a000} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper2>
  );
}

function RatingSquare() {
  return (
    <Wrapper>
      <path d={svgPaths.p3a9d400} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper>
  );
}

function RatingCircle() {
  return (
    <Wrapper1>
      <path d={svgPaths.p2c75972} fill="var(--fill-0, #242424)" id="Shape" />
    </Wrapper1>
  );
}

function RatingHelper() {
  return (
    <Wrapper2>
      <path d={svgPaths.p9d5a000} fill="var(--fill-0, #E0E0E0)" id="Shape" />
    </Wrapper2>
  );
}

type SquareProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Square({ className, size = "16", theme = "Filled" }: SquareProps) {
  const is12AndFilled = size === "12" && theme === "Filled";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndFilled = size === "20" && theme === "Filled";
  const is24AndFilled = size === "24" && theme === "Filled";
  const is28AndFilled = size === "28" && theme === "Filled";
  const is32AndFilled = size === "32" && theme === "Filled";
  const is48AndFilled = size === "48" && theme === "Filled";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is24AndFilled ? "size-[24px]" : is28AndFilled ? "size-[28px]" : is48AndFilled ? "size-[48px]" : is32AndFilled ? "size-[32px]" : is12AndFilled ? "size-[12px]" : is20AndFilled ? "size-[20px]" : "size-[16px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is24AndFilled ? "size-[18px]" : is28AndFilled ? "size-[22px]" : is48AndFilled ? "size-[36px]" : is32AndFilled ? "size-[26px]" : is12AndFilled ? "size-[8px]" : is20AndFilled ? "size-[14px]" : "size-[12px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is24AndFilled ? "0 0 18 18" : is28AndFilled ? "0 0 22 22" : is48AndFilled ? "0 0 36 36" : is32AndFilled ? "0 0 26 26" : is12AndFilled ? "0 0 8 8" : is20AndFilled ? "0 0 14 14" : "0 0 12 12"}>
          <path d={is24AndFilled ? svgPaths.p10c4c480 : is28AndFilled ? svgPaths.p29af9180 : is48AndFilled ? svgPaths.p308ae500 : is32AndFilled ? svgPaths.p3dc78000 : is12AndFilled ? svgPaths.p3a9d400 : is20AndFilled ? svgPaths.p1486500 : is16AndRegular ? svgPaths.p62dd5f0 : svgPaths.p2b4e3b00} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

type CircleProps = {
  className?: string;
  size?: "24" | "20" | "16" | "12" | "32" | "48" | "28";
  theme?: "Regular" | "Filled";
};

function Circle({ className, size = "24", theme = "Regular" }: CircleProps) {
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndFilled = size === "16" && theme === "Filled";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndFilled = size === "20" && theme === "Filled";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndFilled = size === "24" && theme === "Filled";
  const is28AndFilled = size === "28" && theme === "Filled";
  const is28AndRegular = size === "28" && theme === "Regular";
  const is32AndRegular = size === "32" && theme === "Regular";
  const is48AndRegular = size === "48" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is28AndRegular || is28AndFilled ? "size-[28px]" : is48AndRegular ? "size-[48px]" : is32AndRegular ? "size-[32px]" : is12AndRegular ? "size-[12px]" : is16AndRegular || is16AndFilled ? "size-[16px]" : is20AndRegular || is20AndFilled ? "size-[20px]" : "size-[24px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 ${is28AndRegular || is28AndFilled ? "size-[24px]" : is48AndRegular ? "size-[40px]" : is32AndRegular ? "size-[28px]" : is12AndRegular ? "size-[10px]" : is16AndRegular || is16AndFilled ? "size-[12px]" : is20AndRegular || is20AndFilled ? "size-[16px]" : "size-[20px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is28AndRegular || is28AndFilled ? "0 0 24 24" : is48AndRegular ? "0 0 40 40" : is32AndRegular ? "0 0 28 28" : is12AndRegular ? "0 0 10 10" : is16AndRegular || is16AndFilled ? "0 0 12 12" : is20AndRegular || is20AndFilled ? "0 0 16 16" : "0 0 20 20"}>
          <path d={is28AndRegular || is28AndFilled ? svgPaths.p21d80100 : is48AndRegular ? svgPaths.p23490600 : is32AndRegular ? svgPaths.p9413d00 : is12AndRegular ? svgPaths.p2ae0ba80 : is16AndRegular || is16AndFilled ? svgPaths.p31a9aa00 : is20AndRegular || is20AndFilled ? svgPaths.p2a632300 : svgPaths.p3ad04d00} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

type StarProps = {
  className?: string;
  size?: "12" | "16" | "20" | "24" | "28" | "32" | "48";
  theme?: "Regular" | "Filled";
};

function Star({ className, size = "28", theme = "Regular" }: StarProps) {
  const is12AndRegular = size === "12" && theme === "Regular";
  const is16AndFilled = size === "16" && theme === "Filled";
  const is16AndRegular = size === "16" && theme === "Regular";
  const is20AndFilled = size === "20" && theme === "Filled";
  const is20AndRegular = size === "20" && theme === "Regular";
  const is24AndRegular = size === "24" && theme === "Regular";
  const is28AndFilled = size === "28" && theme === "Filled";
  const is32AndRegular = size === "32" && theme === "Regular";
  const is48AndRegular = size === "48" && theme === "Regular";
  return (
    <div className={className || `-translate-x-1/2 -translate-y-1/2 relative ${is32AndRegular ? "size-[32px]" : is48AndRegular ? "size-[48px]" : is12AndRegular ? "size-[12px]" : is16AndRegular || is16AndFilled ? "size-[16px]" : is20AndRegular || is20AndFilled ? "size-[20px]" : is24AndRegular ? "size-[24px]" : "size-[28px]"}`}>
      <div className={`-translate-x-1/2 -translate-y-1/2 absolute left-1/2 ${is32AndRegular ? "h-[25px] top-[calc(50%-0.5px)] w-[26.002px]" : is48AndRegular ? "h-[38.282px] top-[calc(50%-0.14px)] w-[40px]" : is12AndRegular ? "h-[9.591px] top-[calc(50%-0.1px)] w-[10.002px]" : is16AndRegular || is16AndFilled ? "h-[12.454px] top-[calc(50%-0.17px)] w-[13.002px]" : is20AndRegular || is20AndFilled ? "h-[15.317px] top-1/2 w-[16.002px]" : is24AndRegular ? "h-[19.15px] top-[calc(50%-0.07px)] w-[19.997px]" : "h-[21.544px] top-[calc(50%-0.13px)] w-[22.503px]"}`} data-name="Shape">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={is32AndRegular ? "0 0 26.0024 24.9997" : is48AndRegular ? "0 0 39.9999 38.2824" : is12AndRegular ? "0 0 10.0017 9.59062" : is16AndRegular || is16AndFilled ? "0 0 13.0019 12.4538" : is20AndRegular || is20AndFilled ? "0 0 16.0021 15.317" : is24AndRegular ? "0 0 19.9968 19.1505" : "0 0 22.5031 21.5438"}>
          <path d={is32AndRegular ? svgPaths.p37a7fe00 : is48AndRegular ? svgPaths.p249b0b00 : is12AndRegular ? svgPaths.p2783ea00 : is16AndRegular || is16AndFilled ? svgPaths.p1c63ef80 : is20AndFilled ? svgPaths.p18b06300 : is20AndRegular ? svgPaths.p1c338e00 : is24AndRegular ? svgPaths.p32694580 : svgPaths.pc41a3c0} fill="var(--fill-0, #242424)" id="Shape" />
        </svg>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface RatingProps_Display {
  compact?: boolean;
  ratingQuantity?: string;
  shape?: 'Stars' | 'Circles' | 'Square';
  size?: 'Small' | 'Medium' | 'Large' | 'XLarge';
  type?: 'Interactive' | 'Display';
}

function Rating_Display({
  type,
  shape,
  size,
  compact,
  ratingQuantity,
}: RatingProps_Display) {
  const [rating, setRating] = React.useState(3.5);

  return (
    <Rating
      type={type}
      shape={shape}
      size={size}
      compact={compact}
      ratingQuantity={ratingQuantity}
      value={rating}
      onChange={setRating}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample InteractiveStarsSmall
export function InteractiveStarsSmall() {
  return (
    <Rating_Display
      type="Interactive"
      shape="Stars"
      size="Small"
      compact={false}
    />
  );
}

// @figmaExample DisplayStarsSmallWithQuantity
export function DisplayStarsSmallWithQuantity() {
  return (
    <Rating_Display
      type="Display"
      shape="Stars"
      size="Small"
      compact={false}
      ratingQuantity="1,160"
    />
  );
}

// @figmaExample InteractiveCirclesMedium
export function InteractiveCirclesMedium() {
  return (
    <Rating_Display
      type="Interactive"
      shape="Circles"
      size="Medium"
      compact={false}
    />
  );
}

// @figmaExample DisplayCirclesMediumCompact
export function DisplayCirclesMediumCompact() {
  return (
    <Rating_Display
      type="Display"
      shape="Circles"
      size="Medium"
      compact={true}
      ratingQuantity="2,543"
    />
  );
}

// @figmaExample InteractiveSquareLarge
export function InteractiveSquareLarge() {
  return (
    <Rating_Display
      type="Interactive"
      shape="Square"
      size="Large"
      compact={false}
    />
  );
}

// @figmaExample DisplaySquareXLarge
export function DisplaySquareXLarge() {
  return (
    <Rating_Display
      type="Display"
      shape="Square"
      size="XLarge"
      compact={false}
      ratingQuantity="892"
    />
  );
}

// @figmaExample InteractiveStarsXLarge
export function InteractiveStarsXLarge() {
  return (
    <Rating_Display
      type="Interactive"
      shape="Stars"
      size="XLarge"
      compact={false}
    />
  );
}

// @figmaExample DisplayStarsSmallCompact
export function DisplayStarsSmallCompact() {
  return (
    <Rating_Display
      type="Display"
      shape="Stars"
      size="Small"
      compact={true}
      ratingQuantity="5,421"
    />
  );
}
