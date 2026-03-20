import svgPaths from "./svg-ovcqq03uvh";

interface NotebookIconProps {
  color?: string;
  className?: string;
}

export default function NotebookIcon({ color = "#029DD4", className = "size-full" }: NotebookIconProps) {
  return (
    <div className={`relative ${className}`} data-name="Notebook icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Notebook icon">
          <path d={svgPaths.p22cd5f80} fill={color} id="Vector" />
        </g>
      </svg>
    </div>
  );
}