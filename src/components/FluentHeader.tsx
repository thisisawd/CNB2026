import { Grid3x3, Settings, HelpCircle, Bell, Mail } from "lucide-react";

export function FluentHeader() {
  return (
    <header className="bg-[#1a1a1a] text-white h-12 flex items-center px-4 justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Grid3x3 className="w-5 h-5" />
        </button>
        <span className="text-sm">Office 365</span>
      </div>
      
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded transition-colors relative">
          <Mail className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#0078d4] rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-white/10 rounded transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#d13438] rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 ml-2">
          <div className="w-8 h-8 bg-[#0078d4] rounded-full flex items-center justify-center text-xs relative">
            AG
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#92c353] rounded-full border-2 border-[#1a1a1a]"></span>
          </div>
          <span className="text-sm">Agnes Gustve</span>
        </div>
      </div>
    </header>
  );
}
