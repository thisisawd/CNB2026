import * as React from 'react';
import imgPlaceholderimage from "figma:asset/489dda1d390e546b9970a513193554b69673f286.png";

/**
 * A static or interactive placeholder image component that displays a pre-imported Figma asset.
 * Appears as a rectangular container (280px × 170px by default) with slightly rounded corners (2px radius).
 * The image fills the entire container using object-cover, maintaining its aspect ratio while covering the full area.
 * When an onClick handler is provided, the cursor changes to pointer to indicate interactivity.
 * 
 * Use this component when you need to display a placeholder image in your UI, such as for empty states,
 * loading states, or as temporary content. The component can optionally be made interactive for user clicks.
 */
export interface PlaceholderimageProps {
  className?: string; // Custom CSS classes to override the default container styling. Default dimensions are 280px wide by 170px tall with rounded corners. Providing this prop will completely replace the default styling.
  alt?: string; // Alternative text for the image for accessibility. Defaults to an empty string.
  onClick?: () => void; // Click handler function. When provided, makes the image interactive with a pointer cursor. When omitted, the image is non-interactive.
  onLoad?: () => void; // Callback function triggered when the image successfully loads.
  onError?: () => void; // Callback function triggered when the image fails to load.
}

// ---------------------- Main Component ----------------------

export function Placeholderimage({ 
  className, 
  alt = "",
  onClick,
  onLoad,
  onError
}: PlaceholderimageProps) {
  const isInteractive = !!onClick;
  
  return (
    <div 
      className={className || "h-[170px] overflow-clip relative rounded-[2px] w-[280px]"} 
      data-name="Placeholderimage"
      onClick={onClick}
      style={{ cursor: isInteractive ? 'pointer' : 'default' }}
    >
      <img 
        alt={alt} 
        className={`absolute inset-0 max-w-none object-cover rounded-[2px] size-full ${!isInteractive ? 'pointer-events-none' : ''}`}
        src={imgPlaceholderimage} 
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface PlaceholderimageProps_Display {
  alt?: string;
}

function Placeholderimage_Display({
  alt,
}: PlaceholderimageProps_Display) {
  return (
    <Placeholderimage
      alt={alt}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample ProductPreviewPlaceholder
export function ProductPreviewPlaceholder() {
  return (
    <Placeholderimage_Display
      alt="Product preview placeholder"
    />
  );
}

// @figmaExample EmptyStateIllustration
export function EmptyStateIllustration() {
  return (
    <Placeholderimage_Display
      alt="Empty state illustration"
    />
  );
}

// @figmaExample LoadingContentPlaceholder
export function LoadingContentPlaceholder() {
  return (
    <Placeholderimage_Display
      alt="Loading content placeholder"
    />
  );
}