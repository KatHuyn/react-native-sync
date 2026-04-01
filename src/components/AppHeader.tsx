import { Bell, ChevronDown } from "lucide-react";

interface AppHeaderProps {
  title: string;
  branch?: string;
}

const AppHeader = ({ title, branch = "CN Sài Gòn" }: AppHeaderProps) => {
  return (
    <header className="bg-primary text-primary-foreground px-4 pt-[env(safe-area-inset-top,12px)] pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center overflow-hidden">
            <span className="text-sm font-bold">PHS</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight">{title}</h1>
            <button className="flex items-center gap-1 text-primary-foreground/80 text-xs">
              {branch} <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-cleaning text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
