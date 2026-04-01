import { Search, SlidersHorizontal } from "lucide-react";
import AppHeader from "@/components/AppHeader";

interface CustomerData {
  name: string;
  room: string;
  gender: string;
  idType: string;
  idNumber: string;
  nationality: string;
  phone: string;
  email: string;
  status: "staying" | "reserved" | "checkout";
  actionLabel: string;
}

const customers: CustomerData[] = [
  { name: "Nguyễn Văn An", room: "PHÒNG 101", gender: "NAM", idType: "CCCD", idNumber: "001092003841", nationality: "Việt Nam", phone: "0987 654 321", email: "an.nv@gmail.com", status: "staying", actionLabel: "Giao dịch" },
  { name: "Lê Thị Mai", room: "PHÒNG 205", gender: "NỮ", idType: "Passport", idNumber: "B1234567", nationality: "Hàn Quốc", phone: "0912 333 444", email: "mai.le@korea.com", status: "reserved", actionLabel: "Nhận phòng" },
  { name: "Trần Minh Quân", room: "PHÒNG 104", gender: "NAM", idType: "CCCD", idNumber: "0123456789", nationality: "Việt Nam", phone: "0901 020 304", email: "quan.tm@outlook.com", status: "staying", actionLabel: "Giao dịch" },
];

const statusConfig = {
  staying: { label: "Đang ở", dotColor: "bg-available" },
  reserved: { label: "Đặt trước", dotColor: "bg-reserved" },
  checkout: { label: "Đã trả", dotColor: "bg-maintenance" },
};

const actionColors = {
  "Giao dịch": "bg-primary text-primary-foreground",
  "Nhận phòng": "bg-reserved text-primary-foreground",
};

const CustomerCard = ({ customer }: { customer: CustomerData }) => {
  const status = statusConfig[customer.status];
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm border-l-4 border-primary/30">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold">{customer.name}</h3>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${status.dotColor}`} />
          <span className="text-xs font-medium text-primary">{status.label}</span>
        </div>
      </div>
      <div className="flex gap-2 mb-3">
        <span className="text-[10px] font-semibold bg-accent text-accent-foreground px-2 py-0.5 rounded-md">{customer.room}</span>
        <span className="text-[10px] font-semibold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">{customer.gender}</span>
      </div>
      <div className="grid grid-cols-2 gap-y-2 mb-4">
        <div>
          <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Số giấy tờ</p>
          <p className="text-sm font-medium">{customer.idNumber} ({customer.idType})</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Quốc tịch</p>
          <p className="text-sm font-medium">{customer.nationality}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Số điện thoại</p>
          <p className="text-sm font-medium">{customer.phone}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Email</p>
          <p className="text-sm font-medium">{customer.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 border border-border rounded-xl py-2.5 text-sm font-semibold text-foreground">Chi tiết</button>
        <button className={`flex-1 rounded-xl py-2.5 text-sm font-semibold ${actionColors[customer.actionLabel as keyof typeof actionColors] || "bg-primary text-primary-foreground"}`}>
          {customer.actionLabel}
        </button>
      </div>
    </div>
  );
};

const CustomersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Khách hàng" branch="Chi nhánh Hà Nội" />
      <div className="px-4 py-4 space-y-3 pb-24">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm border border-border placeholder:text-muted-foreground"
              placeholder="Tìm kiếm tên, số điện thoại..." />
          </div>
          <button className="bg-card border border-border rounded-xl px-3 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        {customers.map((c, i) => (
          <CustomerCard key={i} customer={c} />
        ))}
      </div>
      {/* FAB */}
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-2xl font-light z-40">
        +
      </button>
    </div>
  );
};

export default CustomersPage;
