import * as React from 'react';
import { useState, useEffect } from 'react';
import { imgShimmerColor, imgShimmerColor1 } from './svg-fg0vp';

/**
 * A loading placeholder component that displays a shimmer animation effect to indicate content is being loaded.
 * Appears as a 132x132px square (or circle) with a light gray background (#e6e6e6) and an animated white shimmer effect that moves across it.
 * The shimmer cycles through 5 frames every 300ms to create a smooth left-to-right animation.
 * 
 * Use this component to improve perceived loading performance by showing users where content will appear.
 * Commonly used for profile pictures, images, text blocks, or any content that takes time to load.
 */
export interface SkeletonProps {
  className?: string; // Custom className to override default styles and sizing. If not provided, defaults to a 132x132px container with light gray background.
  animated?: boolean; // Controls whether the shimmer animation plays. Set to false for a static placeholder without animation. (default: true)
  frame?: "1" | "2" | "3" | "4" | "5"; // Manually control which animation frame to display. When provided, disables automatic frame cycling. Useful for testing or synchronized animations. Frames 1-5 represent different positions of the shimmer gradient from left to right.
  shape?: "Rectangle (default)" | "Circle"; // Determines the shape of the skeleton. "Rectangle (default)" has a 4px border radius, while "Circle" has a fully rounded 9999px border radius. IMPORTANT: Changes the visual appearance significantly - use "Circle" for avatars and profile pictures. (default: "Rectangle (default)")
}

// ---------------------- Main Component ----------------------

export function Skeleton({ className, animated = true, frame: controlledFrame, shape = "Rectangle (default)" }: SkeletonProps) {
  // Internal state for automatic animation
  const [internalFrame, setInternalFrame] = useState<"1" | "2" | "3" | "4" | "5">("1");
  
  // Use controlled frame if provided, otherwise use internal state
  const frame = controlledFrame || internalFrame;
  
  // Auto-cycle through frames when animated is true and no controlled frame is provided
  useEffect(() => {
    if (animated && !controlledFrame) {
      const frames: Array<"1" | "2" | "3" | "4" | "5"> = ["1", "2", "3", "4", "5"];
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % frames.length;
        setInternalFrame(frames[currentIndex]);
      }, 300); // Cycle every 300ms for smooth animation
      
      return () => clearInterval(interval);
    }
  }, [animated, controlledFrame]);
  
  const isCircleAndAnimatedAnd1 = shape === "Circle" && animated && frame === "1";
  const isRectangleDefaultAndAnimatedAnd2 = shape === "Rectangle (default)" && animated && frame === "2";
  const isRectangleDefaultAndAnimatedAnd3 = shape === "Rectangle (default)" && animated && frame === "3";
  const isRectangleDefaultAndAnimatedAnd4 = shape === "Rectangle (default)" && animated && frame === "4";
  const isRectangleDefaultAndAnimatedAnd5 = shape === "Rectangle (default)" && animated && frame === "5";
  const isRectangleDefaultAndNotAnimatedAnd1 = shape === "Rectangle (default)" && !animated && frame === "1";
  
  return (
    <div className={className || `bg-[#e6e6e6] overflow-clip relative size-[132px] ${isCircleAndAnimatedAnd1 ? "rounded-[9999px]" : "rounded-[4px]"}`}>
      <div className={`absolute content-stretch flex flex-col items-start overflow-clip ${isRectangleDefaultAndAnimatedAnd5 ? "bottom-0 left-full opacity-0 right-[-300%] top-0" : isRectangleDefaultAndAnimatedAnd4 ? "bottom-0 left-[-300%] opacity-0 right-full top-0" : isRectangleDefaultAndAnimatedAnd3 ? "inset-[0_0_0_-200%]" : isRectangleDefaultAndAnimatedAnd2 ? "inset-[0_-100%]" : isRectangleDefaultAndNotAnimatedAnd1 ? "inset-0" : "inset-[0_-200%_0_0]"}`} data-name="Shimmer">
        <div className={`absolute bg-[#fafafa] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0%_0%] mask-size-[100%_100%] ${isRectangleDefaultAndNotAnimatedAnd1 ? "rounded-[4px]" : ""}`} data-name="Shimmer color" style={isRectangleDefaultAndNotAnimatedAnd1 ? { maskImage: `url('${imgShimmerColor1}')` } : { maskImage: `url('${imgShimmerColor}')` }} />
      </div>
    </div>
  );
}

// ---------------------- Display Component ----------------------

interface SkeletonProps_Display {
  animated?: boolean;
  frame?: "1" | "2" | "3" | "4" | "5";
  shape?: "Rectangle (default)" | "Circle";
}

function Skeleton_Display({
  animated,
  frame,
  shape,
}: SkeletonProps_Display) {
  return (
    <Skeleton
      animated={animated}
      frame={frame}
      shape={shape}
    />
  );
}

// ---------------------- Figma Examples ----------------------

// @figmaExample DefaultAnimatedRectangleSkeleton
export function DefaultAnimatedRectangleSkeleton() {
  return <Skeleton_Display />;
}

// @figmaExample AnimatedCircleSkeletonForAvatars
export function AnimatedCircleSkeletonForAvatars() {
  return <Skeleton_Display shape="Circle" />;
}

// @figmaExample StaticRectangleSkeletonWithoutAnimation
export function StaticRectangleSkeletonWithoutAnimation() {
  return <Skeleton_Display animated={false} />;
}

// @figmaExample StaticCircleSkeletonWithoutAnimation
export function StaticCircleSkeletonWithoutAnimation() {
  return <Skeleton_Display shape="Circle" animated={false} />;
}

// @figmaExample RectangleSkeletonFrame1ShimmerAtStart
export function RectangleSkeletonFrame1ShimmerAtStart() {
  return <Skeleton_Display frame="1" />;
}

// @figmaExample RectangleSkeletonFrame3ShimmerAtMiddle
export function RectangleSkeletonFrame3ShimmerAtMiddle() {
  return <Skeleton_Display frame="3" />;
}

// @figmaExample RectangleSkeletonFrame5ShimmerAtEnd
export function RectangleSkeletonFrame5ShimmerAtEnd() {
  return <Skeleton_Display frame="5" />;
}

// @figmaExample CircleSkeletonFrame3
export function CircleSkeletonFrame3() {
  return <Skeleton_Display shape="Circle" frame="3" />;
}