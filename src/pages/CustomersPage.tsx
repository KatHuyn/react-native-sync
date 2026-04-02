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
    dob: "12/05/1990",
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
      { id: "B1", room: "101", roomType: "Double Deluxe", checkIn: "30/03/2026", checkOut: "02/04/2026", price: "5.400.000đ", status: "active" },
      { id: "B7", room: "401", roomType: "Executive Suite", checkIn: "27/03/2026", checkOut: "30/03/2026", price: "6.000.000đ", status: "completed" },
    ]
  },
  { 
    id: "C002",
    name: "Trần Thị Bình", 
    room: "102", 
    roomType: "Deluxe",
    gender: "Nữ", 
    dob: "20/08/1992",
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
      { id: "B2", room: "102", roomType: "Deluxe", checkIn: "31/03/2026", checkOut: "03/04/2026", price: "5.400.000đ", status: "active" },
    ]
  },
  { 
    id: "C003", 
    name: "Lê Hoàng Cường", 
    room: "103", 
    roomType: "Suite",
    gender: "Nam", 
    dob: "15/01/1985",
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
      { id: "B3", room: "103", roomType: "Suite", checkIn: "01/04/2026", checkOut: "04/04/2026", price: "9.000.000đ", status: "active" },
      { id: "B5", room: "103", roomType: "Suite", checkIn: "15/03/2026", checkOut: "20/03/2026", price: "15.000.000đ", status: "completed" },
    ]
  },
  { 
    id: "C004", 
    name: "Phạm Minh Đức", 
    room: "201", 
    roomType: "VIP",
    gender: "Nam", 
    dob: "30/11/1988",
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
      { id: "B4", room: "201", roomType: "VIP", checkIn: "29/03/2026", checkOut: "01/04/2026", price: "15.000.000đ", status: "active" },
    ]
  },
  { 
    id: "C005", 
    name: "John Smith", 
    room: "202", 
    roomType: "Standard",
    gender: "Nam", 
    dob: "05/05/1975",
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
      { id: "B6", room: "202", roomType: "Standard", checkIn: "05/04/2026", checkOut: "07/04/2026", price: "2.400.000đ", status: "completed" },
    ]
  },
  { 
    id: "C006", 
    name: "Võ Văn Kiệt", 
    room: "301", 
    roomType: "Standard",
    gender: "Nam", 
    dob: "01/01/1980",
    idType: "CCCD", 
    idNumber: "079123456789", 
    nationality: "Việt Nam", 
    phone: "0988777666", 
    email: "kiet.vv@gmail.com", 
    address: "Quận 3, TP.HCM",
    status: "staying",
    bookingCount: 5,
    totalRoomRevenue: "45.0M",
    totalServiceRevenue: "8.2M",
    history: []
  },
  { 
    id: "C007", 
    name: "Lê Thị Hồng", 
    room: "302", 
    roomType: "Deluxe",
    gender: "Nữ", 
    dob: "14/02/1995",
    idType: "CCCD", 
    idNumber: "080195002233", 
    nationality: "Việt Nam", 
    phone: "0911222333", 
    email: "hong.lt@gmail.com", 
    address: "Đà Nẵng",
    status: "staying",
    bookingCount: 2,
    totalRoomRevenue: "12.0M",
    totalServiceRevenue: "1.5M",
    history: []
  },
  { 
    id: "C008", 
    name: "Phan Anh Tuấn", 
    room: "401", 
    roomType: "Suite",
    gender: "Nam", 
    dob: "10/10/1982",
    idType: "CCCD", 
    idNumber: "001082004455", 
    nationality: "Việt Nam", 
    phone: "0909090909", 
    email: "tuan.pa@gmail.com", 
    address: "Hà Nội",
    status: "checkout",
    bookingCount: 8,
    totalRoomRevenue: "120.0M",
    totalServiceRevenue: "25.0M",
    history: []
  },
  { 
    id: "C009", 
    name: "Đặng Thu Thảo", 
    room: "402", 
    roomType: "Standard",
    gender: "Nữ", 
    dob: "25/12/1996",
    idType: "CCCD", 
    idNumber: "072196007788", 
    nationality: "Việt Nam", 
    phone: "0333444555", 
    email: "thao.dt@gmail.com", 
    address: "Cần Thơ",
    status: "reserved",
    bookingCount: 1,
    totalRoomRevenue: "3.5M",
    totalServiceRevenue: "0.5M",
    history: []
  },
  { 
    id: "C010", 
    name: "Trương Mỹ Linh", 
    room: "501", 
    roomType: "VIP",
    gender: "Nữ", 
    dob: "08/03/1991",
    idType: "CCCD", 
    idNumber: "001091001122", 
    nationality: "Việt Nam", 
    phone: "0944555666", 
    email: "linh.tm@gmail.com", 
    address: "Quận 7, TP.HCM",
    status: "staying",
    bookingCount: 4,
    totalRoomRevenue: "60.0M",
    totalServiceRevenue: "12.0M",
    history: []
  },
  { 
    id: "C011", 
    name: "Bùi Tiến Dũng", 
    room: "203", 
    roomType: "Standard",
    gender: "Nam", 
    dob: "20/10/1997",
    idType: "CCCD", 
    idNumber: "034197005566", 
    nationality: "Việt Nam", 
    phone: "0966777888", 
    email: "dung.bt@gmail.com", 
    address: "Thanh Hóa",
    status: "checkout",
    bookingCount: 1,
    totalRoomRevenue: "2.1M",
    totalServiceRevenue: "0.2M",
    history: []
  },
  { 
    id: "C012", 
    name: "Michael Chang", 
    room: "105", 
    roomType: "Luxury",
    gender: "Nam", 
    dob: "15/07/1988",
    idType: "Passport", 
    idNumber: "HK998877", 
    nationality: "Hong Kong", 
    phone: "0901223344", 
    email: "m.chang@yahoo.com", 
    address: "Tsim Sha Tsui, HK",
    status: "staying",
    bookingCount: 2,
    totalRoomRevenue: "28.5M",
    totalServiceRevenue: "5.4M",
    history: []
  },
  { 
    id: "C013", 
    name: "Lê Quang Đại", 
    room: "204", 
    roomType: "Double",
    gender: "Nam", 
    dob: "22/11/1985",
    idType: "CCCD", 
    idNumber: "001085002233", 
    nationality: "Việt Nam", 
    phone: "0988777111", 
    email: "dai.lq@gmail.com", 
    address: "Hải Phòng",
    status: "staying",
    bookingCount: 1,
    totalRoomRevenue: "4.2M",
    totalServiceRevenue: "0.8M",
    history: []
  },
  { 
    id: "C014", 
    name: "Phạm Thúy Hạnh", 
    room: "305", 
    roomType: "VIP",
    gender: "Nữ", 
    dob: "12/01/1993",
    idType: "CCCD", 
    idNumber: "001093006677", 
    nationality: "Việt Nam", 
    phone: "0977888999", 
    email: "hanh.pt@gmail.com", 
    address: "Bắc Ninh",
    status: "staying",
    bookingCount: 3,
    totalRoomRevenue: "35.0M",
    totalServiceRevenue: "4.2M",
    history: []
  },
  { 
    id: "C015", 
    name: "Nguyễn Minh Khôi", 
    room: "206", 
    roomType: "Suite",
    gender: "Nam", 
    dob: "05/09/1987",
    idType: "CCCD", 
    idNumber: "001087009988", 
    nationality: "Việt Nam", 
    phone: "0908889990", 
    email: "khoi.nm@gmail.com", 
    address: "Hải Dương",
    status: "staying",
    bookingCount: 2,
    totalRoomRevenue: "18.5M",
    totalServiceRevenue: "3.2M",
    history: []
  },
];

const CustomerDetailView = ({ customer, onBack }: { customer: CustomerData; onBack: () => void }) => {
  return (
    <div className="absolute inset-0 z-[60] bg-[#F7F9FC] flex flex-col animate-in fade-in slide-in-from-right duration-300">
      {/* Cyan Header - Miniaturized */}
      <div className="bg-[#00B4D8] text-white px-4 pt-8 pb-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 -ml-1 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black leading-tight">{customer.name}</h2>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-[8px] bg-white/20 px-1.5 py-0.5 rounded font-black uppercase tracking-tighter">ĐANG Ở</span>
            </div>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/40 overflow-hidden shadow-sm shrink-0">
          <img src={`https://i.pravatar.cc/150?u=${customer.id}`} alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-3">
        {/* Info Card - Micro-Tile */}
        <div className="bg-white rounded-xl p-3 shadow-sm space-y-2.5">
           {[
             { icon: UserIcon, label: "GIỚI TÍNH", value: customer.gender, color: "bg-cyan-50 text-cyan-600" },
             { icon: Calendar, label: "NGÀY SINH", value: customer.dob, color: "bg-blue-50 text-blue-600" },
             { icon: CreditCard, label: "CCCD", value: customer.idNumber, color: "bg-indigo-50 text-indigo-600" },
             { icon: Phone, label: "ĐIỆN THOẠI", value: customer.phone, color: "bg-teal-50 text-teal-600", highlighted: true },
             { icon: Mail, label: "EMAIL", value: customer.email, color: "bg-sky-50 text-sky-600" },
             { icon: Globe, label: "QUỐC TỊCH", value: customer.nationality, color: "bg-cyan-50 text-cyan-600" },
             { icon: MapPin, label: "ĐỊA CHỈ", value: customer.address, color: "bg-blue-50 text-blue-600" },
           ].map((item, i) => (
             <div key={i} className="flex gap-2.5 items-center">
                <div className={cn("w-6 h-6 rounded flex items-center justify-center shrink-0 border border-slate-50", item.color)}>
                  <item.icon className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                   <p className="text-[7.5px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-0.5">{item.label}</p>
                   <p className={cn("text-[11px] font-black text-[#334155] leading-tight truncate", item.highlighted && "text-cyan-700 underline")}>{item.value}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Metrics Row - High Density */}
        <div className="grid grid-cols-3 gap-1.5">
           <div className="bg-[#F1F5F9] rounded-xl p-2 text-center border border-slate-100 shadow-sm">
              <p className="text-[7.5px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Lượt đặt</p>
              <p className="text-base font-black text-slate-800 leading-none">{customer.bookingCount}</p>
           </div>
           <div className="bg-[#EDF6F9] rounded-xl p-2 text-center border border-cyan-100 shadow-sm">
              <p className="text-[7.5px] font-black text-cyan-700/60 uppercase tracking-tighter leading-none mb-1">Phòng</p>
              <p className="text-base font-black text-[#0077B6] leading-none">{customer.totalRoomRevenue}</p>
           </div>
           <div className="bg-[#FFF8F0] rounded-xl p-2 text-center border border-orange-100 shadow-sm">
              <p className="text-[7.5px] font-black text-orange-700/60 uppercase tracking-tighter leading-none mb-1">Dịch vụ</p>
              <p className="text-base font-black text-[#A54729] leading-none">{customer.totalServiceRevenue}</p>
           </div>
        </div>

        {/* History List - Miniaturized */}
        <div className="space-y-2 pb-8">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[11px] font-black text-[#1E293B] uppercase tracking-tight">
                Lịch sử Booking & Dịch vụ
              </h3>
              <button className="text-[9px] font-black text-cyan-600 uppercase">Tất cả</button>
           </div>

           {customer.history.map((trip) => (
             <div key={trip.id} className="bg-white rounded-xl p-2.5 shadow-sm border-l-4 border-cyan-500 space-y-2">
                <div className="flex items-start justify-between">
                   <div>
                      <p className="text-[7.5px] font-bold text-slate-400 uppercase tracking-tighter leading-none mb-1.5">Mã: {trip.id} | Phòng: {trip.room}</p>
                      <div className="flex items-center gap-2">
                         <div className="text-center">
                            <p className="text-[6.5px] font-black text-slate-300 uppercase leading-none mb-0.5">IN</p>
                            <p className="text-[10px] font-black leading-none">{trip.checkIn}</p>
                         </div>
                         <ArrowRight className="w-3 h-3 text-slate-200" />
                         <div className="text-center">
                            <p className="text-[6.5px] font-black text-slate-300 uppercase leading-none mb-0.5">OUT</p>
                            <p className="text-[10px] font-black leading-none">{trip.checkOut}</p>
                         </div>
                      </div>
                   </div>
                   <span className={cn(
                     "text-[7px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter",
                     trip.status === "active" ? "bg-[#1AB1A5] text-white" : "bg-slate-100 text-slate-400"
                   )}>
                     {trip.status === "active" ? "Check-in" : "Check-out"}
                   </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                   <p className="text-[8px] font-bold text-slate-400">{trip.roomType}</p>
                   <p className="text-[11px] font-black text-cyan-700">{trip.price}</p>
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
        <div className="px-2 py-1 flex gap-1">
          <div className="relative flex-1 group">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-slate-400 group-focus-within:text-[#1AB1A5] transition-colors" />
            <input 
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full bg-white border border-slate-100 rounded-md pl-6 pr-1.5 py-0.5 text-[9px] text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium shadow-sm"
            />
          </div>
          <button className="p-1 bg-white border border-slate-100 rounded-md text-slate-400 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <SlidersHorizontal className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Ultra High-Density 2-Column Grid */}
        <div className="flex-1 px-2 grid grid-cols-2 gap-1.5 pb-32">
          {customers.map((c, i) => (
            <div key={i} className="bg-white rounded-lg p-2 shadow-sm border border-slate-100 relative group active:scale-[0.99] transition-transform flex flex-col justify-between min-h-[90px]">
              <div className="flex items-start justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-slate-50 rounded flex items-center justify-center text-slate-400 border border-slate-100 shrink-0">
                     <UserIcon className="w-2.5 h-2.5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[8px] font-black text-slate-800 truncate leading-none mb-0.5">{c.name}</h3>
                    <div className="flex gap-1 mt-0.5">
                      <span className="text-[5.5px] font-black bg-[#1AB1A5]/10 text-[#1AB1A5] px-1 py-0.5 rounded uppercase leading-none">P.{c.room}</span>
                      <span className="text-[5.5px] font-black bg-slate-100 text-slate-500 px-1 py-0.5 rounded uppercase leading-none">{c.gender}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-1 mb-2">
                <div className="flex flex-col">
                  <span className="text-[5.5px] font-bold text-slate-400 uppercase tracking-tighter leading-none whitespace-nowrap overflow-hidden mb-0.5">ID: {c.idNumber}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={cn(
                    "w-1 h-1 rounded-full",
                    c.status === "staying" ? "bg-[#1AB1A5]" : "bg-amber-400"
                  )} />
                  <span className={cn(
                    "text-[6px] font-black uppercase leading-none",
                    c.status === "staying" ? "text-[#1AB1A5]" : "text-amber-500"
                  )}>
                    {c.status === "staying" ? "Đang ở" : c.status === "reserved" ? "Đặt trước" : "Đã trả"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 mt-auto">
                <button 
                  onClick={() => setSelectedCustomer(c)}
                  className="bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold rounded py-1 text-[6.5px] transition-colors border border-slate-100"
                >
                  Hồ sơ
                </button>
                <button className="bg-[#1AB1A5]/10 text-[#1AB1A5] hover:bg-[#1AB1A5]/20 font-bold rounded py-1 text-[6.5px] transition-colors border border-[#1AB1A5]/20">
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
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[80] hover:scale-110 active:scale-95 transition-all border-4 border-white"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default CustomersPage;
