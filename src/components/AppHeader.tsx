import { Bell, ChevronDown, LayoutGrid, Sun, LogOut, Plus, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  title: string;
  icon?: any;
  onAddRoom?: () => void;
  branch?: string;
  className?: string;
}

const AppHeader = ({ 
  title, 
  icon: Icon = LayoutGrid, 
  onAddRoom, 
  branch = "Chi nhánh Hà Nội",
  variant = "white",
  className 
}: AppHeaderProps & { variant?: "white" | "cyan" }) => {
  // Always use white variant for consistency per user request, 
  // but keeping 'isCyan' logic for internal flexibility if ever needed
  const isCyan = variant === "cyan" && false; 

  return (
    <header className={cn(
      "px-2 pt-2 pb-1 shadow-sm transition-all duration-300",
      "bg-white text-slate-800 border-b border-slate-200",
      className
    )}>
      <div className="flex items-center justify-between">
        {/* Left: Sidebar Icon + Page Title - Ultra Compact */}
        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-50 rounded-md border border-slate-100">
             <Icon className="w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-black tracking-tighter text-slate-800 leading-none">{title}</h1>
            <div className="flex items-center gap-0.5 text-[7px] font-black text-slate-400 uppercase tracking-tighter mt-0.5 opacity-60">
              {branch} <ChevronDown className="w-1.5 h-1.5" />
            </div>
          </div>
        </div>

        {/* Right: Actions Cluster - Minimalist */}
        <div className="flex items-center gap-1">
          <button className="p-1 rounded-lg hover:bg-slate-50 transition-colors">
            <Sun className="w-3 h-3 text-slate-400" />
          </button>
          <button className="relative p-1 rounded-lg hover:bg-slate-50 transition-colors">
             <Bell className="w-3 h-3 text-slate-400" />
             <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#1AB1A5] rounded-full border border-white" />
          </button>
          
          <div className="flex items-center gap-1 pl-1 ml-1 border-l border-slate-100">
             <div className="w-5 h-5 rounded-md bg-[#1AB1A5]/10 flex items-center justify-center text-[#1AB1A5]">
                <User className="w-3 h-3" />
             </div>
          </div>

          <button className="p-1 rounded-lg hover:bg-red-50 transition-colors">
            <LogOut className="w-3 h-3 text-red-300" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
