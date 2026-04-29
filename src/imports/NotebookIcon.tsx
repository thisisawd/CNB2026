import cnbIcon from '../assets/CNB_PNG_FINAL.png';

interface NotebookIconProps {
  color?: string;
  className?: string;
}

export default function NotebookIcon({ color, className = "size-full" }: NotebookIconProps) {
  return (
    <div className={`relative ${className}`} data-name="Notebook icon">
      <img src={cnbIcon} alt="Notebook" className="block size-full object-contain" />
    </div>
  );
}