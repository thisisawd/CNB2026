import * as React from 'react';
import { useState } from 'react';

/**
 * A color selection component that displays an array of color swatches as clickable buttons.
 * Appears as a contained group of square color buttons arranged in either a grid or single row layout. 
 * Each swatch shows its color as a filled square, and the selected swatch displays a white checkmark icon with a black ring border.
 * 
 * The component can be used in controlled mode (pass selectedColor prop) or uncontrolled mode (manages its own selection state). 
 * When a swatch is clicked, it scales up slightly on hover and triggers the onColorSelect callback.
 * 
 * IMPORTANT: In Row layout, only the first 8 colors are displayed. Grid layout shows all provided colors (up to 32).
 */
export interface SwatchPickerProps {
  /** Custom CSS class for the container */
  className?: string;
  
  /** Arrangement of color swatches. "Grid" (default): Displays colors in a multi-row grid, shows all colors. "Row": Displays colors in a single horizontal row, shows only first 8 colors */
  layout?: 'Grid' | 'Row'; // default: 'Grid'
  
  /** Size of individual swatches. "ExtraSmall": 20px × 20px, "Small": 24px × 24px, "Medium (Default)": 28px × 28px (default), "Large": 32px × 32px */
  size?: 'ExtraSmall' | 'Small' | 'Medium (Default)' | 'Large'; // default: 'Medium (Default)'
  
  /** Gap between swatches. "Medium" (default): 4px gap, "Small": 2px gap */
  spacing?: 'Medium' | 'Small'; // default: 'Medium'
  
  /** Array of color hex codes to display (defaults to 32 instances of "#e3008c") */
  colors?: string[];
  
  /** The currently selected color (for controlled mode). If provided, component becomes controlled */
  selectedColor?: string;
  
  /** Callback fired when a swatch is clicked. Receives the color value and its index in the colors array */
  onColorSelect?: (color: string, index: number) => void;
}

// ---------------------- Main Component ----------------------

export function SwatchPicker({ 
  className, 
  layout = "Grid", 
  size = "Medium (Default)", 
  spacing = "Medium",
  colors = Array(32).fill("#e3008c"),
  selectedColor: controlledSelectedColor,
  onColorSelect
}: SwatchPickerProps) {
  const [internalSelectedColor, setInternalSelectedColor] = useState<string | null>(null);
  
  const selectedColor = controlledSelectedColor !== undefined ? controlledSelectedColor : internalSelectedColor;
  
  const handleSwatchClick = (color: string, index: number) => {
    if (controlledSelectedColor === undefined) {
      setInternalSelectedColor(color);
    }
    onColorSelect?.(color, index);
  };
  
  const isExtraSmallAndGridAndMedium = size === "ExtraSmall" && layout === "Grid" && spacing === "Medium";
  const isLargeAndGridAndMedium = size === "Large" && layout === "Grid" && spacing === "Medium";
  const isMediumDefaultAndGridAndMedium = size === "Medium (Default)" && layout === "Grid" && spacing === "Medium";
  const isMediumDefaultAndGridAndSmall = size === "Medium (Default)" && layout === "Grid" && spacing === "Small";
  const isMediumDefaultAndRowAndMedium = size === "Medium (Default)" && layout === "Row" && spacing === "Medium";
  const isSmallAndGridAndMedium = size === "Small" && layout === "Grid" && spacing === "Medium";
  
  const renderSwatch = (color: string, index: number) => {
    const isSelected = selectedColor === color;
    return (
      <button
        key={index}
        type="button"
        onClick={() => handleSwatchClick(color, index)}
        className={`relative shrink-0 cursor-pointer transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
          isLargeAndGridAndMedium ? "size-[32px]" : isSmallAndGridAndMedium ? "size-[24px]" : isExtraSmallAndGridAndMedium ? "size-[20px]" : "size-[28px]"
        } ${isSelected ? 'ring-2 ring-black ring-offset-2' : ''}`}
        data-name="Swatch"
        aria-label={`Select color ${color}`}
        aria-pressed={isSelected}
      >
        <div className="absolute inset-0" style={{ backgroundColor: color }} data-name="ColorSwatch" />
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-1/2 h-1/2 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </button>
    );
  };
  
  return (
    <div className={className || `relative ${isMediumDefaultAndRowAndMedium ? "" : isMediumDefaultAndGridAndSmall ? "w-[258px]" : isLargeAndGridAndMedium ? "w-[304px]" : isSmallAndGridAndMedium ? "w-[240px]" : isExtraSmallAndGridAndMedium ? "w-[208px]" : "w-[272px]"}`}>
      <div className={`content-start flex flex-wrap items-start p-[10px] relative ${isMediumDefaultAndRowAndMedium ? "gap-[4px]" : isMediumDefaultAndGridAndSmall ? "gap-[2px] w-full" : "gap-[4px] w-full"}`}>
        {colors.slice(0, 8).map((color, index) => renderSwatch(color, index))}
        {(isMediumDefaultAndGridAndMedium || isExtraSmallAndGridAndMedium || isSmallAndGridAndMedium || isLargeAndGridAndMedium || isMediumDefaultAndGridAndSmall) && (
          colors.slice(8).map((color, index) => renderSwatch(color, index + 8))
        )}
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SwatchPickerProps_Display {
  layout?: 'Grid' | 'Row';
  size?: 'ExtraSmall' | 'Small' | 'Medium (Default)' | 'Large';
  spacing?: 'Medium' | 'Small';
  colors?: string[];
}

function SwatchPicker_Display({
  layout,
  size,
  spacing,
  colors,
}: SwatchPickerProps_Display) {
  const [selectedColor, setSelectedColor] = React.useState<string | undefined>(colors?.[0]);

  return (
    <SwatchPicker
      layout={layout}
      size={size}
      spacing={spacing}
      colors={colors}
      selectedColor={selectedColor}
      onColorSelect={(color) => setSelectedColor(color)}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample RainbowGridMedium
export function RainbowGridMedium() {
  return (
    <SwatchPicker_Display
      layout="Grid"
      size="Medium (Default)"
      spacing="Medium"
      colors={['#FF0000', '#FF6B00', '#FFD700', '#32CD32', '#00CED1', '#1E90FF', '#8A2BE2', '#FF1493', '#FF4500', '#FFA500', '#FFFF00', '#7FFF00', '#00FA9A', '#00BFFF', '#9370DB', '#FF69B4']}
    />
  );
}

// @figmaExample PurplePinkRowLarge
export function PurplePinkRowLarge() {
  return (
    <SwatchPicker_Display
      layout="Row"
      size="Large"
      spacing="Medium"
      colors={['#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688']}
    />
  );
}

// @figmaExample GrayscaleGridSmall
export function GrayscaleGridSmall() {
  return (
    <SwatchPicker_Display
      layout="Grid"
      size="Small"
      spacing="Small"
      colors={['#000000', '#424242', '#616161', '#757575', '#9E9E9E', '#BDBDBD', '#E0E0E0', '#EEEEEE', '#F5F5F5', '#FAFAFA', '#FFFFFF', '#FFFFFF']}
    />
  );
}

// @figmaExample ColorfulCompactRow
export function ColorfulCompactRow() {
  return (
    <SwatchPicker_Display
      layout="Row"
      size="ExtraSmall"
      spacing="Small"
      colors={['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50']}
    />
  );
}

// @figmaExample EarthTonesGridLarge
export function EarthTonesGridLarge() {
  return (
    <SwatchPicker_Display
      layout="Grid"
      size="Large"
      spacing="Medium"
      colors={['#8B4513', '#D2691E', '#CD853F', '#DEB887', '#F4A460', '#DAA520', '#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347', '#FF4500']}
    />
  );
}

// @figmaExample BlueGradientRow
export function BlueGradientRow() {
  return (
    <SwatchPicker_Display
      layout="Row"
      size="Medium (Default)"
      spacing="Small"
      colors={['#1A237E', '#283593', '#303F9F', '#3949AB', '#3F51B5', '#5C6BC0', '#7986CB', '#9FA8DA']}
    />
  );
}

// @figmaExample PastelColorsGridExtraSmall
export function PastelColorsGridExtraSmall() {
  return (
    <SwatchPicker_Display
      layout="Grid"
      size="ExtraSmall"
      spacing="Medium"
      colors={['#FFEBEE', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E8EAF6', '#E3F2FD', '#E1F5FE', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F1F8E9', '#F9FBE7', '#FFFDE7', '#FFF8E1', '#FFF3E0', '#FBE9E7']}
    />
  );
}

// @figmaExample TealShadesGridSmall
export function TealShadesGridSmall() {
  return (
    <SwatchPicker_Display
      layout="Grid"
      size="Small"
      spacing="Medium"
      colors={['#004D40', '#00695C', '#00796B', '#00897B', '#009688', '#26A69A', '#4DB6AC', '#80CBC4']}
    />
  );
}