import * as React from 'react';
import { ReactNode } from 'react';

/**
 * A decorative container component that creates a frosted glass/acrylic material effect with backdrop blur and layered gradients.
 * Appears as a fixed-size rectangular element (282px × 76px) with a semi-transparent white/blue gradient background, 30px backdrop blur, and a subtle white border overlay.
 * Creates a modern, glass-morphism aesthetic similar to Windows Acrylic or macOS vibrancy effects.
 * 
 * IMPORTANT: This component has fixed dimensions (282px wide, 76px tall) - it does not automatically resize to fit its container or content.
 * 
 * When to use:
 * - Creating frosted glass UI cards or panels
 * - Overlaying content on backgrounds where you want the background to show through with a blur effect
 * - Building modern, translucent UI elements with depth
 * - Implementing design systems that use acrylic/glass material effects
 */
export interface MaterialAcrylicProps {
  className?: string // Custom CSS class applied to the outer wrapper div. Use this to position or add additional styling to the component container.
  children?: ReactNode // Content to render inside the acrylic material container. Children are rendered within the blurred area.
  onClick?: () => void // Click handler function. When provided, the component becomes interactive with cursor pointer, ARIA role="button", keyboard support (Enter and Space keys), and tab navigation support.
}

// ---------------------- Main Component ----------------------

export function MaterialAcrylic({ 
  className,
  children,
  onClick 
}: MaterialAcrylicProps) {
  return (
    <div className={className || ""} data-name="Material acrylic">
      <div 
        className={`backdrop-blur-[30px] h-[76px] relative w-[282px] ${onClick ? 'cursor-pointer' : ''}`}
        data-name="Material=Acrylic" 
        style={{ backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(90deg, rgba(231, 236, 243, 0.7) 0%, rgba(231, 236, 243, 0.7) 100%)" }}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={onClick ? (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        } : undefined}
      >
        <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none" />
        <div className="size-full">
          {children}
        </div>
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface MaterialAcrylicProps_Display {
  children?: ReactNode
}

function MaterialAcrylic_Display({
  children,
}: MaterialAcrylicProps_Display) {
  return (
    <MaterialAcrylic>
      {children}
    </MaterialAcrylic>
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample EmptyAcrylic
export function EmptyAcrylic() {
  return (
    <MaterialAcrylic_Display />
  );
}

// @figmaExample FrostedGlassText
export function FrostedGlassText() {
  return (
    <MaterialAcrylic_Display>
      <div className="flex items-center justify-center h-full">
        <span className="text-sm font-medium text-gray-800">Frosted Glass</span>
      </div>
    </MaterialAcrylic_Display>
  );
}

// @figmaExample AcrylicMaterialLabel
export function AcrylicMaterialLabel() {
  return (
    <MaterialAcrylic_Display>
      <div className="flex flex-col items-center justify-center h-full gap-1">
        <div className="text-xs font-semibold text-blue-600">ACRYLIC</div>
        <div className="text-xs text-gray-600">Material Effect</div>
      </div>
    </MaterialAcrylic_Display>
  );
}

// @figmaExample AcrylicCardWithElements
export function AcrylicCardWithElements() {
  return (
    <MaterialAcrylic_Display>
      <div className="flex items-center justify-between h-full px-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
        <span className="text-sm font-medium text-gray-700">Card</span>
        <div className="w-6 h-6 rounded bg-gray-300" />
      </div>
    </MaterialAcrylic_Display>
  );
}

// @figmaExample GlassPanelWithDescription
export function GlassPanelWithDescription() {
  return (
    <MaterialAcrylic_Display>
      <div className="p-3 h-full flex flex-col justify-center">
        <div className="text-xs font-bold text-gray-800 mb-1">Glass Panel</div>
        <div className="text-xs text-gray-600">Backdrop blur effect with semi-transparent gradients</div>
      </div>
    </MaterialAcrylic_Display>
  );
}