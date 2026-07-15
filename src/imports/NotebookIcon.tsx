import { useIconSet } from '../components/IconSetContext';

interface NotebookIconProps {
  color?: string;
  className?: string;
}

export default function NotebookIcon({ color, className = "size-full" }: NotebookIconProps) {
  const { classNotebookIcon } = useIconSet();
  return (
    <div className={`relative ${className}`} data-name="Notebook icon">
      <img src={classNotebookIcon} alt="Notebook" className="block size-full object-contain" />
    </div>
  );
}