import { memo } from 'react';

export const Footer = memo(function Footer() {
  return (
    <footer className="h-10 bg-[#2b2b2b] text-gray-400 flex items-center justify-end px-6 gap-6 text-xs">
      <a href="#" className="hover:text-white transition-colors">Privacy and Cookies</a>
      <a href="#" className="hover:text-white transition-colors">Legal</a>
      <a href="#" className="hover:text-white transition-colors">Trademarks</a>
      <span>© 2025 Microsoft</span>
    </footer>
  );
});