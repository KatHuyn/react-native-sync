import { Search, FileText } from "lucide-react";
import AppHeader from "@/components/AppHeader";

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
    <div className="min-h-screen bg-background">
      <AppHeader title="Hóa đơn" />
      <div className="px-4 py-4 space-y-3 pb-24">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm border border-border placeholder:text-muted-foreground"
            placeholder="Tìm hóa đơn..." />
        </div>
        {invoices.map((inv) => {
          const st = statusMap[inv.status as keyof typeof statusMap];
          return (
            <div key={inv.id} className="bg-card rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm">{inv.id}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${st.color}`}>{st.label}</span>
              </div>
              <p className="font-semibold">{inv.guest}</p>
              <p className="text-xs text-muted-foreground">{inv.room} • {inv.date}</p>
              <p className="text-lg font-bold text-primary mt-2">{inv.amount} VND</p>
            </div>
          );
        })}
      </div>
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-2xl font-light z-40">
        +
      </button>
    </div>
  );
};

export default InvoicesPage;
