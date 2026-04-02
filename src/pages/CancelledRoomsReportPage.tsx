import { useState } from "react";
import { Ban, ChevronLeft, Calendar, User, Building2, Clock, FileText, Hash, Info, MapPin, Receipt } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CancelledRoomsReportPageProps {
  onBack: () => void;
}

const mockCancelledRooms = [
  {
    regCode: "NVL2",
    regName: "VCI Travel",
    company: "VCI TRAVEL",
    regDate: "29/03/2026",
    status: "Đặt Phòng Đảm Bảo",
    room: "312",
    arrivalDate: "02/04/2026",
    departureDate: "03/04/2026",
    cancelDate: "31/03/2026",
    cancelTime: "09:57",
    user: "Tuấn Tú",
    reason: "giảm phòng",
    cancelDays: 2
  },
  {
    regCode: "NVL2",
    regName: "VCI Travel",
    company: "VCI TRAVEL",
    regDate: "29/03/2026",
    status: "Đặt Phòng Đảm Bảo",
    room: "101",
    arrivalDate: "02/04/2026",
    departureDate: "03/04/2026",
    cancelDate: "31/03/2026",
    cancelTime: "09:57",
    user: "Tuấn Tú",
    reason: "giảm phòng",
    cancelDays: 2
  },
  {
    regCode: "NVL2",
    regName: "VCI Travel",
    company: "VCI TRAVEL",
    regDate: "29/03/2026",
    status: "Đặt Phòng Đảm Bảo",
    room: "103",
    arrivalDate: "02/04/2026",
    departureDate: "03/04/2026",
    cancelDate: "31/03/2026",
    cancelTime: "09:57",
    user: "Tuấn Tú",
    reason: "giảm phòng",
    cancelDays: 2
  },
  {
    regCode: "NVL82",
    regName: "VCI GTRAVE GROUP 2",
    company: "VCI TRAVEL",
    regDate: "01/04/2026",
    status: "Đặt Phòng Đảm Bảo",
    room: "124",
    arrivalDate: "16/04/2026",
    departureDate: "17/04/2026",
    cancelDate: "01/04/2026",
    cancelTime: "10:46",
    user: "Tuấn Tú",
    reason: "GIẢM PHÒNG",
    cancelDays: 15
  }
];

const CancelledRoomsReportPage = ({ onBack }: CancelledRoomsReportPageProps) => {
  const [selectedRoom, setSelectedRoom] = useState<typeof mockCancelledRooms[0] | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-3 py-1 flex items-center gap-2">
        <button 
          onClick={onBack}
          className="p-0.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-[9px] font-black text-slate-800 uppercase tracking-tight leading-none">Báo cáo phòng hủy</h1>
          <p className="text-[6px] font-bold text-slate-300 leading-none mt-0.5">01/01/2026 ~ 31/12/2026 · Admin</p>
        </div>
      </header>

      {/* Hotel Address */}
      <div className="px-2 py-1 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-2.5 h-2.5 text-[#1AB1A5] shrink-0" />
          <p className="text-[7px] font-bold text-slate-400 leading-none">Sandals Island · 11 Biệt Thự, Phường Nha Trang, Khánh Hòa</p>
        </div>
      </div>

      {/* Summary Row */}
      <div className="px-2 pt-2">
        <div className="bg-slate-800 text-white rounded-lg p-2 flex items-center gap-2 shadow-sm">
          <Ban className="w-3.5 h-3.5 text-white/50" />
          <div>
            <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Tổng cộng</p>
            <h4 className="text-[10px] font-black leading-none uppercase tracking-tighter mt-0.5">{mockCancelledRooms.length} PHÒNG HỦY</h4>
          </div>
        </div>
      </div>

      {/* Grid - 4 Columns */}
      <div className="p-2 grid grid-cols-4 gap-1">
        {mockCancelledRooms.map((item, index) => (
          <button 
            key={index} 
            onClick={() => setSelectedRoom(item)}
            className="bg-white rounded-md border border-slate-100 p-1 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all h-12"
          >
            <div className="text-[8px] font-black text-[#1AB1A5] bg-[#1AB1A5]/10 px-1 rounded w-full truncate leading-none">
              {item.room}
            </div>
            <div className="text-[7px] font-black text-slate-400 uppercase leading-none w-full mt-0.5">
              {item.regCode}
            </div>
            <div className="text-[6px] font-black text-rose-500 uppercase leading-none mt-auto">
              -{item.cancelDays}N
            </div>
          </button>
        ))}
      </div>

      {/* Detail Sheet - Drawer from bottom */}
      <Sheet open={!!selectedRoom} onOpenChange={(open) => !open && setSelectedRoom(null)}>
        <SheetContent side="bottom" className="rounded-t-[1.5rem] p-0 border-t-0 shadow-2xl max-h-[90vh] overflow-y-auto max-w-md mx-auto left-0 right-0">
          {selectedRoom && (
            <div className="p-4 pt-8 space-y-3">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
              
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <SheetTitle className="text-base font-black text-slate-800 uppercase tracking-tighter">
                      Phòng {selectedRoom.room}
                    </SheetTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="px-1.5 py-0.5 bg-rose-50 text-rose-500 rounded text-[8px] font-black border border-rose-100 flex items-center gap-1">
                        <Ban className="w-2.5 h-2.5" /> ĐÃ HỦY
                      </div>
                      <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded text-[8px] font-bold border border-slate-100">
                        #{selectedRoom.regCode}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1AB1A5]/10 rounded-xl flex items-center justify-center text-[#1AB1A5]">
                    <Info className="w-5 h-5" />
                  </div>
                </div>
              </SheetHeader>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Section: Guest Info */}
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-[#1AB1A5] uppercase tracking-widest border-b border-slate-50 pb-1.5">
                    <User className="w-3 h-3" /> Đăng ký
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Khách hàng</p>
                      <p className="text-[10px] font-black text-slate-800 truncate">{selectedRoom.regName}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Công ty</p>
                      <p className="text-[10px] font-black text-slate-800 truncate">{selectedRoom.company}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Trạng thái</p>
                      <p className="text-[10px] font-black text-[#1AB1A5] truncate">{selectedRoom.status}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Mã ĐK</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedRoom.regCode}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Timeline */}
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-[#1AB1A5] uppercase tracking-widest border-b border-slate-50 pb-1.5">
                    <Calendar className="w-3 h-3" /> Lịch trình
                  </div>
                  <div className="grid grid-cols-2 gap-2 relative">
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Ngày Đến</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedRoom.arrivalDate}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Ngày Đi</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedRoom.departureDate}</p>
                    </div>
                    <div className="space-y-0.5 col-span-2">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest">Đăng Ký Gốc</p>
                      <p className="text-[9px] font-bold text-slate-500">{selectedRoom.regDate}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Cancellation Details */}
                <div className="bg-rose-50/20 rounded-xl p-3 border border-rose-100/50 shadow-sm space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-rose-500 uppercase tracking-widest border-b border-rose-100/30 pb-1.5">
                    <Clock className="w-3 h-3" /> Hủy đơn
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-rose-300 uppercase tracking-widest">Khi nào</p>
                      <p className="text-[9px] font-black text-slate-800">{selectedRoom.cancelTime} - {selectedRoom.cancelDate}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-rose-300 uppercase tracking-widest">Người hủy</p>
                      <p className="text-[9px] font-black text-slate-800">{selectedRoom.user}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-rose-300 uppercase tracking-widest">Số ngày</p>
                      <div className="bg-rose-500 text-white px-1.5 py-0.5 rounded text-[8px] font-black">
                        -{selectedRoom.cancelDays} NGÀY
                      </div>
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-rose-100/30">
                    <p className="text-[7px] font-black text-rose-300 uppercase tracking-widest mb-1">Lý Do</p>
                    <div className="bg-white/80 p-2 rounded-lg border border-rose-100/20 italic text-[9px] font-bold text-slate-600 line-clamp-2">
                      "{selectedRoom.reason}"
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedRoom(null)}
                className="w-full h-11 bg-slate-900 text-white rounded-xl font-black text-xs active:scale-[0.97] transition-all shadow-lg shadow-slate-200 mt-2"
              >
                ĐÓNG CHI TIẾT
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CancelledRoomsReportPage;
