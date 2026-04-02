import { Search, FileText } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "HD-001", guest: "Nguyễn Văn An", room: "P.101", amount: "3.600.000", date: "01/04/2024", status: "paid" },
  { id: "HD-002", guest: "Trần Thị Bình", room: "P.102", amount: "5.400.000", date: "02/04/2024", status: "pending" },
  { id: "HD-003", guest: "Lê Thị Mai", room: "P.205", amount: "2.400.000", date: "30/03/2024", status: "paid" },
  { id: "HD-004", guest: "John Smith", room: "P.202", amount: "15.000.000", date: "27/03/2024", status: "overdue" },
];

const statusMap = {
  paid: { label: "Đã thanh toán", color: "bg-success/10 text-success" },
  pending: { label: "Chờ thanh toán", color: "bg-warning/10 text-warning" },
  overdue: { label: "Quá hạn", color: "bg-cleaning/10 text-cleaning" },
};

const InvoicesPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-in fade-in duration-500 pb-24">
      <AppHeader title="Hóa đơn" icon={FileText} variant="white" />
      
      <div className="px-4 py-2 space-y-2">
        {/* Ultra-Compact Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 group-focus-within:text-[#1AB1A5] transition-colors" />
          <input className="w-full bg-white rounded-lg pl-8 pr-3 py-1.5 text-[10px] border border-slate-100 placeholder:text-slate-400 outline-none focus:ring-1 focus:ring-[#1AB1A5] shadow-sm"
            placeholder="Tìm hóa đơn..." />
        </div>

        {/* High-Density Card List */}
        <div className="space-y-2.5">
          {invoices.map((inv) => {
            const st = statusMap[inv.status as keyof typeof statusMap];
            return (
              <div key={inv.id} className="bg-white rounded-xl p-2 shadow-sm border border-slate-50 active:scale-[0.99] transition-transform">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-[#1AB1A5]" />
                    <span className="font-black text-[10px] text-slate-700">{inv.id}</span>
                  </div>
                  <span className={cn("text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter", st.color)}>{st.label}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-black text-[11px] text-slate-800 leading-tight">{inv.guest}</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5 leading-none">{inv.room} • {inv.date}</p>
                  </div>
                  <p className="text-xs font-black text-[#1AB1A5]">{inv.amount} <span className="text-[8px] opacity-60">VND</span></p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Circle FAB Button - Synchronized */}
      <button 
        onClick={() => {}}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[80] hover:scale-110 active:scale-95 transition-all"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default InvoicesPage;
