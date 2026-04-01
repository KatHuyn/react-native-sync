import { LayoutGrid, Users, Grid3X3, CalendarDays, FileText } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Tổng quan", icon: LayoutGrid },
  { id: "customers", label: "Khách hàng", icon: Users },
  { id: "rooms", label: "Sơ đồ phòng", icon: Grid3X3 },
  { id: "planning", label: "Kế hoạch", icon: CalendarDays },
  { id: "invoices", label: "Hóa đơn", icon: FileText },
];

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 max-w-md mx-auto">
      <div className="flex items-center justify-around py-1.5 pb-[env(safe-area-inset-bottom,8px)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[60px] ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
