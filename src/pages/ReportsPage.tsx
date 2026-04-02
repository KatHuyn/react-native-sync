import { BarChart3, ChevronRight, Ban, Building2, CalendarDays, LogOut, Bed, Wallet } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { cn } from "@/lib/utils";

const reportCategories = [
  { 
    id: "cancelled", 
    label: "BÁO CÁO PHÒNG HỦY", 
    icon: Ban, 
    color: "text-rose-500", 
    bg: "bg-rose-50",
    description: "Danh sách các phòng đã hủy đặt"
  },
  { 
    id: "debt", 
    label: "BÁO CÁO CÔNG NỢ CÔNG TY", 
    icon: Building2, 
    color: "text-amber-500", 
    bg: "bg-amber-50",
    description: "Theo dõi công nợ các đối tác công ty"
  },
  { 
    id: "arriving", 
    label: "BÁO CÁO PHÒNG ĐẾN", 
    icon: CalendarDays, 
    color: "text-emerald-500", 
    bg: "bg-emerald-50",
    description: "Danh sách khách dự kiến đến trong ngày"
  },
  { 
    id: "departing", 
    label: "BÁO CÁO PHÒNG ĐI", 
    icon: LogOut, 
    color: "text-blue-500", 
    bg: "bg-blue-50",
    description: "Danh sách khách dự kiến trả phòng"
  },
  { 
    id: "in-house", 
    label: "BÁO CÁO PHÒNG Ở", 
    icon: Bed, 
    color: "text-indigo-500", 
    bg: "bg-indigo-50",
    description: "Thống kê các phòng đang có khách ở"
  },
  { 
    id: "cashier", 
    label: "BÁO CÁO THU NGÂN LỄ TÂN", 
    icon: Wallet, 
    color: "text-violet-500", 
    bg: "bg-violet-50",
    description: "Tổng hợp doanh thu thu ngân theo ca"
  },
];

interface ReportsPageProps {
  onNavigate: (tab: string) => void;
}

const ReportsPage = ({ onNavigate }: ReportsPageProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-in fade-in duration-500 pb-24">
      <AppHeader title="Báo cáo" icon={BarChart3} variant="white" />
      
      <div className="px-4 py-4 space-y-3">
        <div className="grid grid-cols-1 gap-3">
          {reportCategories.map((report) => (
            <button 
              key={report.id}
              onClick={() => {
                if (report.id === "cancelled") {
                  onNavigate("cancelledRoomsReport");
                } else if (report.id === "debt") {
                  onNavigate("companyDebtReport");
                } else if (report.id === "arriving") {
                  onNavigate("arrivalReport");
                } else if (report.id === "cashier") {
                  onNavigate("cashierReport");
                } else if (report.id === "departing") {
                  onNavigate("departureReport");
                } else if (report.id === "in-house") {
                  onNavigate("inHouseReport");
                }
              }}
              className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex items-center justify-between active:scale-[0.98] transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", report.bg)}>
                  <report.icon className={cn("w-5 h-5", report.color)} />
                </div>
                <div>
                  <h3 className="font-black text-[11px] text-slate-800 leading-tight uppercase tracking-tight">
                    {report.label}
                  </h3>
                  <p className="text-[9px] text-slate-400 font-bold mt-0.5 leading-none">
                    {report.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
