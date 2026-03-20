import { Search } from 'lucide-react';
import { memo } from 'react';
import waffleMenuImage from 'figma:asset/7af3d3ed39e7c0563d973982d0e69e655dce93ce.png';

interface WaffleMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaffleMenu = memo(function WaffleMenu({ isOpen, onClose }: WaffleMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="absolute top-12 left-0 z-50 bg-white shadow-lg rounded-md w-[440px] p-4">
        <img src={waffleMenuImage} alt="Microsoft 365 apps menu" className="w-full" />
      </div>
    </>
  );
});