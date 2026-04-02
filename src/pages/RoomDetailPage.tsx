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
      {/* Header - Ultra Compact */}
      <div className="bg-[#00B4D8] text-white px-4 pt-8 pb-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 -ml-1 rounded-full hover:bg-white/10">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-black tracking-tighter uppercase">Phòng {roomData.number}</h2>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/40 overflow-hidden shrink-0">
          <img src="https://i.pravatar.cc/150?u=manager" alt="avatar" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        {/* Room Info - Header Only */}
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100 flex items-center justify-between">
           <div>
              <h3 className="text-sm font-black text-slate-800 leading-tight">Phòng {roomData.number}</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter leading-none mt-0.5">{roomData.type}</p>
           </div>
           <span className="bg-[#FFA24E] text-white text-[8px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-tighter">
             {roomData.status}
           </span>
        </div>

        {/* Guest Info - No Icon */}
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-50 space-y-1.5">
           <span className="text-[8px] font-black text-cyan-700/60 uppercase tracking-widest">Khách hàng</span>
           <div>
              <p className="text-[12px] font-black text-slate-800 leading-none">{roomData.guest}</p>
              <p className="text-[9px] font-black text-slate-400 mt-1 leading-none">{roomData.phone}</p>
           </div>
        </div>

        {/* Time Info - No Icon */}
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-50 space-y-2">
           <span className="text-[8px] font-black text-cyan-700/60 uppercase tracking-widest">Thời gian</span>
           <div className="flex items-center justify-between">
              <div>
                 <p className="text-[7.5px] font-black text-slate-300 uppercase leading-none mb-1">Check-in</p>
                 <p className="text-[11px] font-black text-slate-800 leading-none">{roomData.checkIn}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-50" />
              <div className="text-right">
                 <p className="text-[7.5px] font-black text-slate-300 uppercase leading-none mb-1">Check-out</p>
                 <p className="text-[11px] font-black text-slate-800 leading-none">{roomData.checkOut}</p>
              </div>
           </div>
        </div>

        {/* Payment Details - No Icons */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-50 space-y-3">
           <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Thanh toán</h4>
           
           <div className="space-y-3">
              {/* Room Fee */}
              <div className="flex items-center justify-between border-b border-dashed border-slate-50 pb-2">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Tiền phòng (2đ)</p>
                 <p className="text-[11px] font-black text-slate-800">{roomData.payment.roomFee.amount}</p>
              </div>

              {/* Service Fee */}
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Dịch vụ</p>
                    <p className="text-[11px] font-black text-slate-800">{roomData.payment.services.total}</p>
                 </div>
                 <div className="pl-3 border-l border-slate-50 space-y-1">
                    {roomData.payment.services.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-[8.5px] font-black text-slate-400 uppercase tracking-tighter">
                         <span>{item.name}</span>
                         <span>{item.price}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Deposit */}
              <div className="flex items-center justify-between">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Đặt cọc</p>
                 <p className="text-[11px] font-black text-cyan-600">{roomData.payment.deposit}</p>
              </div>
           </div>

           {/* Total Calculation - High Density */}
           <div className="bg-slate-50 rounded-lg p-2.5 flex items-center justify-between border border-slate-100">
              <div className="space-y-0.5">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Tổng cần thanh toán</p>
                 <p className="text-base font-black text-slate-900 leading-none">{roomData.payment.totalToPay}</p>
              </div>
              <span className="bg-red-50 text-red-500 text-[8px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter border border-red-100">
                 {roomData.payment.paymentStatus}
              </span>
           </div>
        </div>

        {/* Utility Buttons - No Icons */}
        <div className="flex gap-2">
           <button className="flex-1 bg-slate-100 text-slate-600 font-black py-2 rounded-xl text-[10px] flex items-center justify-center transition-transform active:scale-95 border border-slate-200 uppercase tracking-tighter">
              Gắn phòng
           </button>
           <button className="flex-1 bg-slate-100 text-slate-600 font-black py-2 rounded-xl text-[10px] flex items-center justify-center transition-transform active:scale-95 border border-slate-200 uppercase tracking-tighter">
              Giao phòng
           </button>
        </div>

        {/* Primary Action - No Icon */}
        <button className="w-full bg-[#00B4D8] text-white font-black py-3 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200 transition-all active:scale-[0.98] mb-8">
           <span className="text-[12px] font-black tracking-widest uppercase">XÁC NHẬN THANH TOÁN</span>
        </button>
      </div>
    </div>
  );
};

export default RoomDetailPage;
