interface CNBBackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
}

export function CNBBackgroundGradient({ children, className = '' }: CNBBackgroundGradientProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Background SVG with gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute inset-0 w-full h-full" 
          preserveAspectRatio="none"
          viewBox="0 0 1066 738" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 11.8889C0 5.32285 5.32282 0 11.8888 0H1054.11C1060.68 0 1066 5.32282 1066 11.8888V726.111C1066 732.677 1060.68 738 1054.11 738H11.8888C5.3228 738 0 732.677 0 726.111V11.8889Z" 
            fill="url(#paint0_linear_790_66065)" 
            fillOpacity="0.06"
          />
          <defs>
            <linearGradient 
              id="paint0_linear_790_66065" 
              x1="1682.78" 
              y1="1064.42" 
              x2="-405.246" 
              y2="345.425" 
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.0534492" stopColor="#F25022"/>
              <stop offset="0.349442" stopColor="#B442E2"/>
              <stop offset="0.423621" stopColor="#FFB900"/>
              <stop offset="0.536365" stopColor="#3AC0FD"/>
              <stop offset="0.799738" stopColor="#4132ED"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
