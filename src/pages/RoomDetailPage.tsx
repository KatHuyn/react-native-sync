import { 
  ChevronLeft, Bell, User as UserIcon, Calendar, Clock, 
  ArrowRight, CreditCard, PlusCircle, Link as LinkIcon, 
  Key, CheckCircle2, MoreHorizontal, LayoutGrid
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RoomDetailProps {
  onBack: () => void;
  selectedId: string | null;
}

const RoomDetailPage = ({ onBack, selectedId }: RoomDetailProps) => {
  // Mock data matching Figure 3
  const roomData = {
    number: selectedId || "101",
    type: "Standard Double Room",
    status: "ĐANG Ở",
    guest: "Nguyễn Văn An",
    phone: "+84 901 234 567",
    checkIn: "14:00, 24/05",
    checkOut: "12:00, 26/05",
    payment: {
      roomFee: {
        label: "Tiền phòng (2 đêm)",
        amount: "2.400.000đ"
      },
      services: {
        total: "350.000đ",
        items: [
          { name: "Minibar (2x Pepsi)", price: "40.000đ" },
          { name: "Giặt ủi", price: "310.000đ" }
        ]
      },
      deposit: "-500.000đ",
      totalToPay: "2.250.000đ",
      paymentStatus: "Chưa thanh toán"
    }
  };

  return (
    <div className="absolute inset-0 z-[60] bg-[#F7F9FC] flex flex-col animate-in fade-in slide-in-from-right duration-300">
      {/* Header matching Figure 3 */}
      <div className="bg-[#00B4D8] text-white px-4 pt-12 pb-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">Digital Concierge</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-full border-2 border-white/50 overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=manager" alt="avatar" className="w-full h-full object-cover" />
          </div>
          <div className="relative">
             <Bell className="w-6 h-6" />
             <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#00B4D8]" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {/* Room Header Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-cyan-50 rounded-[18px] flex items-center justify-center">
                 <div className="w-8 h-8 bg-cyan-600 rounded-sm relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                 </div>
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-800">Phòng {roomData.number}</h3>
                 <p className="text-[11px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">{roomData.type}</p>
              </div>
           </div>
           <span className="bg-[#F59E0B] text-white text-[10px] font-black px-3 py-1 rounded-md shadow-sm">
             {roomData.status}
           </span>
        </div>

        {/* Guest Info Section */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-50 space-y-4">
           <div className="flex items-center gap-2 text-cyan-700">
              <UserIcon className="w-4 h-4 fill-cyan-700/20" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Khách hàng</span>
           </div>
           <div>
              <p className="text-lg font-black text-slate-800">{roomData.guest}</p>
              <p className="text-sm font-bold text-slate-400 mt-0.5">{roomData.phone}</p>
           </div>
        </div>

        {/* Time Info Section */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-50 space-y-6">
           <div className="flex items-center gap-2 text-cyan-700">
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Thời gian</span>
           </div>
           <div className="flex items-center justify-between">
              <div>
                 <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Check-in</p>
                 <p className="text-base font-black text-slate-800">{roomData.checkIn}</p>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-200" />
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Check-out</p>
                 <p className="text-base font-black text-slate-800">{roomData.checkOut}</p>
              </div>
           </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-50 space-y-6">
           <h4 className="text-lg font-black text-slate-800">Chi tiết thanh toán</h4>
           
           <div className="space-y-5">
              {/* Room Fee */}
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <LayoutGrid className="w-5 h-5 text-slate-500" />
                 </div>
                 <div className="flex-1 flex items-center justify-between border-b border-dashed border-slate-200 pb-4">
                    <p className="text-sm font-bold text-slate-600">{roomData.payment.roomFee.label}</p>
                    <p className="text-base font-black text-slate-800">{roomData.payment.roomFee.amount}</p>
                 </div>
              </div>

              {/* Service Fee */}
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                    <PlusCircle className="w-5 h-5 text-slate-500 fill-slate-500/10" />
                 </div>
                 <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                       <p className="text-sm font-bold text-slate-600">Dịch vụ thêm</p>
                       <p className="text-base font-black text-slate-800">{roomData.payment.services.total}</p>
                    </div>
                    <div className="pl-4 border-l-2 border-slate-100 space-y-2">
                       {roomData.payment.services.items.map((item, idx) => (
                         <div key={idx} className="flex justify-between text-[11px] font-bold text-slate-400">
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Deposit */}
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-cyan-600" />
                 </div>
                 <div className="flex-1 flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-600">Đã đặt cọc</p>
                    <p className="text-base font-black text-cyan-600">{roomData.payment.deposit}</p>
                 </div>
              </div>
           </div>

           {/* Total Calculation Card */}
           <div className="bg-slate-50 rounded-[20px] p-5 space-y-3 border border-slate-100">
              <div className="flex items-start justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tổng cần thanh toán</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">{roomData.payment.totalToPay}</p>
                 </div>
                 <span className="bg-red-100 text-red-600 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase shadow-sm">
                    {roomData.payment.paymentStatus}
                 </span>
              </div>
           </div>
        </div>

        {/* Utility Buttons Row */}
        <div className="flex gap-3 pt-3">
           <button className="flex-1 bg-slate-200 text-slate-700 font-black py-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-transform active:scale-95">
              <LinkIcon className="w-4 h-4" /> Gắn phòng
           </button>
           <button className="flex-1 bg-slate-200 text-slate-700 font-black py-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-transform active:scale-95">
              <Key className="w-4 h-4" /> Giao phòng
           </button>
        </div>

        {/* Primary Action Button */}
        <button className="w-full bg-[#00B4D8] text-white font-black py-5 rounded-[22px] flex items-center justify-center gap-3 shadow-lg shadow-cyan-200 transition-all hover:bg-[#0096C7] active:scale-[0.98] mt-4 mb-10">
           <CheckCircle2 className="w-6 h-6" />
           <span className="text-base tracking-wide uppercase">XÁC NHẬN THANH TOÁN</span>
        </button>
      </div>
    </div>
  );
};

export default RoomDetailPage;
