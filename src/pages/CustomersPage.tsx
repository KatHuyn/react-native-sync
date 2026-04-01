import { useState } from "react";
import { 
  Search, SlidersHorizontal, User as UserIcon, Phone, Mail, Globe, 
  CreditCard, MapPin, Calendar, ChevronLeft, ArrowRight, Star,
  DollarSign, Package, History, Users
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { cn } from "@/lib/utils";

interface TripHistory {
  id: string;
  room: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  price: string;
  status: "completed" | "active";
}

interface CustomerData {
  id: string;
  name: string;
  room: string;
  roomType: string;
  gender: string;
  dob: string;
  idType: string;
  idNumber: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  status: "staying" | "reserved" | "checkout";
  bookingCount: number;
  totalRoomRevenue: string;
  totalServiceRevenue: string;
  history: TripHistory[];
}

const customers: CustomerData[] = [
  { 
    id: "C001",
    name: "Nguyễn Văn An", 
    room: "101", 
    roomType: "Double Deluxe",
    gender: "Nam", 
    dob: "1990-05-12",
    idType: "CCCD", 
    idNumber: "001234567890", 
    nationality: "Việt Nam", 
    phone: "0901234567", 
    email: "an.nv@gmail.com", 
    address: "123 Trần Hưng Đạo, Q.1, TP.HCM",
    status: "staying",
    bookingCount: 2,
    totalRoomRevenue: "11.4M",
    totalServiceRevenue: "2.4M",
    history: [
      { id: "B1", room: "101", roomType: "Double Deluxe", checkIn: "2026-03-30", checkOut: "2026-04-02", price: "5.400.000đ", status: "active" },
      { id: "B7", room: "401", roomType: "Executive Suite", checkIn: "2026-03-27", checkOut: "2026-03-30", price: "6.000.000đ", status: "completed" },
    ]
  },
  { 
    id: "C002",
    name: "Trần Thị Bình", 
    room: "102", 
    roomType: "Deluxe",
    gender: "Nữ", 
    dob: "1992-08-20",
    idType: "CCCD", 
    idNumber: "001092003841", 
    nationality: "Việt Nam", 
    phone: "0345678901", 
    email: "binh.tt@yahoo.com", 
    address: "45 Lê Lợi, TP. Huế",
    status: "staying",
    bookingCount: 1,
    totalRoomRevenue: "5.4M",
    totalServiceRevenue: "0.8M",
    history: [
      { id: "B2", room: "102", roomType: "Deluxe", checkIn: "2026-03-31", checkOut: "2026-04-03", price: "5.400.000đ", status: "active" },
    ]
  },
  { 
    id: "C003", 
    name: "Lê Hoàng Cường", 
    room: "103", 
    roomType: "Suite",
    gender: "Nam", 
    dob: "1985-01-15",
    idType: "Passport", 
    idNumber: "B1234567", 
    nationality: "Việt Nam", 
    phone: "0912333444", 
    email: "cuong.lh@gmail.com", 
    address: "789 Nguyễn Huệ, Q.1, TP.HCM",
    status: "staying",
    bookingCount: 3,
    totalRoomRevenue: "24.0M",
    totalServiceRevenue: "4.5M",
    history: [
      { id: "B3", room: "103", roomType: "Suite", checkIn: "2026-04-01", checkOut: "2026-04-04", price: "9.000.000đ", status: "active" },
      { id: "B5", room: "103", roomType: "Suite", checkIn: "2026-03-15", checkOut: "2026-03-20", price: "15.000.000đ", status: "completed" },
    ]
  },
  { 
    id: "C004", 
    name: "Phạm Minh Đức", 
    room: "201", 
    roomType: "VIP",
    gender: "Nam", 
    dob: "1988-11-30",
    idType: "CCCD", 
    idNumber: "0234567890", 
    nationality: "Việt Nam", 
    phone: "0901020304", 
    email: "duc.pm@outlook.com", 
    address: "Cầu Giấy, Hà Nội",
    status: "staying",
    bookingCount: 1,
    totalRoomRevenue: "15.0M",
    totalServiceRevenue: "1.2M",
    history: [
      { id: "B4", room: "201", roomType: "VIP", checkIn: "2026-03-29", checkOut: "2026-04-01", price: "15.000.000đ", status: "active" },
    ]
  },
  { 
    id: "C005", 
    name: "John Smith", 
    room: "202", 
    roomType: "Standard",
    gender: "Nam", 
    dob: "1975-05-05",
    idType: "Passport", 
    idNumber: "G12345678", 
    nationality: "USA", 
    phone: "0123456789", 
    email: "john.smith@gmail.com", 
    address: "California, USA",
    status: "reserved",
    bookingCount: 1,
    totalRoomRevenue: "2.4M",
    totalServiceRevenue: "0.2M",
    history: [
      { id: "B6", room: "202", roomType: "Standard", checkIn: "2026-04-05", checkOut: "2026-04-07", price: "2.400.000đ", status: "completed" },
    ]
  },
];

const CustomerDetailView = ({ customer, onBack }: { customer: CustomerData; onBack: () => void }) => {
  return (
    <div className="absolute inset-0 z-[60] bg-[#F7F9FC] flex flex-col animate-in fade-in slide-in-from-right duration-300">
      {/* Cyan Header */}
      <div className="bg-[#00B4D8] text-white px-4 pt-12 pb-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-xl font-bold leading-tight">{customer.name}</h2>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-[10px] bg-[#48CAE4] px-2 py-0.5 rounded-md font-extrabold uppercase">ĐANG Ở</span>
            </div>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shadow-md">
          <img src="https://i.pravatar.cc/150?u=an" alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm space-y-5">
           {[
             { icon: UserIcon, label: "GIỚI TÍNH", value: customer.gender, color: "bg-cyan-50 text-cyan-600" },
             { icon: Calendar, label: "NGÀY SINH", value: customer.dob, color: "bg-blue-50 text-blue-600" },
             { icon: CreditCard, label: "CCCD", value: customer.idNumber, color: "bg-indigo-50 text-indigo-600" },
             { icon: Phone, label: "ĐIỆN THOẠI", value: customer.phone, color: "bg-teal-50 text-teal-600", highlighted: true },
             { icon: Mail, label: "EMAIL", value: customer.email, color: "bg-sky-50 text-sky-600" },
             { icon: Globe, label: "QUỐC TỊCH", value: customer.nationality, color: "bg-cyan-50 text-cyan-600" },
             { icon: MapPin, label: "ĐỊA CHỈ", value: customer.address, color: "bg-blue-50 text-blue-600" },
           ].map((item, i) => (
             <div key={i} className="flex gap-4 items-center">
                <div className={cn("w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm", item.color)}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-60 tracking-wider font-mono">{item.label}</p>
                   <p className={cn("text-base font-bold text-[#334155]", item.highlighted && "text-cyan-700 underline")}>{item.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-3">
           <div className="bg-[#F1F5F9] rounded-[20px] p-4 text-center border border-[#E2E8F0]">
              <p className="text-[9px] font-black text-muted-foreground uppercase">Lượt đặt</p>
              <p className="text-2xl font-black text-slate-800 mt-1">{customer.bookingCount}</p>
           </div>
           <div className="bg-[#EDF6F9] rounded-[20px] p-4 text-center border border-[#D1E9F0]">
              <p className="text-[9px] font-black text-muted-foreground uppercase text-cyan-700/60">Phòng</p>
              <p className="text-2xl font-black text-[#0077B6] mt-1">{customer.totalRoomRevenue}</p>
           </div>
           <div className="bg-[#FFF8F0] rounded-[20px] p-4 text-center border border-[#FFEDD5]">
              <p className="text-[9px] font-black text-muted-foreground uppercase text-orange-700/60">Dịch vụ</p>
              <p className="text-2xl font-black text-[#A54729] mt-1">{customer.totalServiceRevenue}</p>
           </div>
        </div>

        {/* History List */}
        <div className="space-y-4 pb-12">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-lg font-black text-[#1E293B] flex items-center gap-2">
                Lịch sử Booking & Dịch vụ
              </h3>
              <button className="text-xs font-bold text-cyan-600">Tất cả</button>
           </div>

           {customer.history.map((trip) => (
             <div key={trip.id} className="bg-white rounded-[22px] p-5 shadow-sm border-l-[6px] border-cyan-500 space-y-4">
                <div className="flex items-start justify-between">
                   <div>
                      <p className="text-[10px] font-bold text-muted-foreground opacity-70 italic tracking-tighter">Mã: {trip.id} | Phòng: {trip.room}</p>
                      <div className="flex items-center gap-3 mt-2">
                         <div className="text-center">
                            <p className="text-[9px] font-black opacity-50 uppercase">CHECK-IN</p>
                            <p className="text-sm font-black">{trip.checkIn}</p>
                         </div>
                         <ArrowRight className="w-4 h-4 text-muted-foreground opacity-30" />
                         <div className="text-center">
                            <p className="text-[9px] font-black opacity-50 uppercase">CHECK-OUT</p>
                            <p className="text-sm font-black">{trip.checkOut}</p>
                         </div>
                      </div>
                   </div>
                   <span className={cn(
                     "text-[9px] font-bold px-3 py-1 rounded-full uppercase shadow-inner",
                     trip.status === "active" ? "bg-cyan-500 text-white" : "bg-slate-200 text-slate-500"
                   )}>
                     {trip.status === "active" ? "Đã nhận phòng" : "Đã trả phòng"}
                   </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <p className="text-xs font-bold text-slate-500">Chi tiết 3 đêm • {trip.roomType}</p>
                   <p className="text-base font-black text-cyan-700">{trip.price}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const CustomersPage = ({ onNavigate }: { onNavigate: (t: string) => void }) => {
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(null);

  if (selectedCustomer) {
    return <CustomerDetailView customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-in fade-in duration-500">
      <AppHeader title="Khách hàng" icon={Users} variant="white" />
      
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Ultra-Compact Search Section */}
        <div className="px-4 py-2 flex gap-1.5">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 group-focus-within:text-[#1AB1A5] transition-colors" />
            <input 
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-[11px] text-slate-800 placeholder:text-slate-400 focus:ring-1 focus:ring-[#1AB1A5] outline-none font-medium shadow-sm"
            />
          </div>
          <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ultra High-Density 2-Column Grid */}
        <div className="flex-1 px-4 grid grid-cols-2 gap-2 pb-32">
          {customers.map((c, i) => (
            <div key={i} className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100 relative group active:scale-[0.99] transition-transform flex flex-col justify-between">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                     <UserIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[10px] font-black text-slate-800 truncate leading-none">{c.name}</h3>
                    <div className="flex gap-0.5 mt-1">
                      <span className="text-[7px] font-black bg-[#1AB1A5]/10 text-[#1AB1A5] px-1 py-0.5 rounded uppercase">P.{c.room}</span>
                      <span className="text-[7px] font-black bg-slate-100 text-slate-500 px-1 py-0.5 rounded uppercase">{c.gender}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-2.5">
                <div className="flex flex-col">
                  <span className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">ID: {c.idNumber}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#1AB1A5]" />
                  <span className="text-[8px] font-bold text-[#1AB1A5] uppercase">Đang ở</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mt-auto">
                <button 
                  onClick={() => setSelectedCustomer(c)}
                  className="bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold rounded-lg py-1.5 text-[8px] transition-colors border border-slate-100"
                >
                  Hồ sơ
                </button>
                <button className="bg-[#1AB1A5]/10 text-[#1AB1A5] hover:bg-[#1AB1A5]/20 font-bold rounded-lg py-1.5 text-[8px] transition-colors border border-[#1AB1A5]/20">
                  GD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circle FAB Button - Final Unified Version */}
      <button 
        onClick={() => onNavigate("registration")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[80] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default CustomersPage;
