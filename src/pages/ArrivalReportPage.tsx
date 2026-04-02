import { useState } from "react";
import { ChevronLeft, Building2, User, Calendar, Info, MapPin, Bed, Users, Info as InfoIcon, Quote, Receipt, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ArrivalReportPageProps {
  onBack: () => void;
}

const mockArrivals = [
  {
    id: "SI5315",
    room: "1203",
    roomType: "JR SUT - D",
    guest: "Nina Nguyen",
    company: "AGODA",
    arrivalDate: "02/04/2026 - 14:00",
    departureDate: "04/04/2026 - 12:00",
    nights: 2,
    pax: "2 / 0",
    price: "811,614",
    notes: "Benefits: Free WiFi, Welcome drink, Breakfast, Coffee & tea, Drinking water, Parking, Free fitness center access, Complimentary Breakfast",
    request: "Junior Deluxe - Room With Breakfast"
  },
  {
    id: "SI4757",
    room: "1001",
    roomType: "SUI - T",
    guest: "Evgenii Snetkov",
    company: "CTRIP",
    arrivalDate: "02/04/2026 - 14:00",
    departureDate: "14/04/2026 - 12:00",
    nights: 12,
    pax: "2 / 0",
    price: "644,502",
    notes: "Can you provide a room with one large bed? A balcony is a must, and the highest floor possible. Thank you. Please charge VCC between 2026-04-02 00:00:00 - 2026-10-11 00:00:00(local time).",
    request: "Suite Twin Room - B2B_Breakfast"
  },
  {
    id: "SI5268",
    room: "902",
    roomType: "SUI - TRIP",
    guest: "Thi Thanh Thuy Nguyen",
    company: "CTRIP",
    arrivalDate: "02/04/2026 - 14:00",
    departureDate: "06/04/2026 - 12:00",
    nights: 4,
    pax: "3 / 0",
    price: "771,186",
    notes: "Please charge VCC between 2026-04-02 00:00:00 - 2026-10-03 00:00:00(local time). Quiet room preferred; Near elevator; VCC Amount: VND 3,084,744.0",
    request: "Suite Triple Room - B2B_Breakfast"
  },
  {
    id: "SI5316",
    room: "1504",
    roomType: "JR SUT - D",
    guest: "Alexey Zverev",
    company: "CTRIP",
    arrivalDate: "02/04/2026 - 14:00",
    departureDate: "03/04/2026 - 12:00",
    nights: 1,
    pax: "2 / 0",
    price: "812,172",
    notes: "The guest purchased a Trip.com entertainment package (this booking + 1 copy(ies)/room * 1 room(s) Vietnam 4G eSIM-QR code-3 days-Daily - 5GB). The hotel does not need to provide tickets.",
    request: "Junior Suite Double - B2B_Breakfast"
  },
  {
    id: "SI5197",
    room: "1005",
    roomType: "QUEEN",
    guest: "Mr. Guest 1",
    company: "Let's Book",
    arrivalDate: "02/04/2026 - 14:00",
    departureDate: "04/04/2026 - 12:00",
    nights: 2,
    pax: "2 / 0",
    price: "775,000",
    notes: "LONG AN : 01 DOUBLE. CÔNG TY THANH TOÁN - SALE THANH VÕ",
    request: "NONE"
  },
  {
    id: "SI5032",
    room: "1104",
    roomType: "JR SUT - D",
    guest: "Mr. Guest 1",
    company: "NỘI BỘ",
    arrivalDate: "02/04/2026 - 14:00",
    departureDate: "03/04/2026 - 12:00",
    nights: 1,
    pax: "2 / 0",
    price: "0",
    notes: "MS. HÂN 1 DBL 1605 WELCOME CHỈNH CHU PHÒNG SẠCH. MS. NGỌC + TRÂN 1 TWN. MS. THANH : 1 DBL",
    request: "PKD CÔNG TÁC"
  }
];

const ArrivalReportPage = ({ onBack }: ArrivalReportPageProps) => {
  const [selectedArrival, setSelectedArrival] = useState<typeof mockArrivals[0] | null>(null);

  const totalArrivals = 9; // Based on screenshot total

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Báo cáo phòng đến</h1>
            <p className="text-[7px] font-bold text-slate-300">02/04/2026 ~ 02/04/2026</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 justify-end">
            <User className="w-2.5 h-2.5 text-slate-400" />
            <span className="text-[8px] font-black text-slate-500 uppercase">Admin</span>
          </div>
          <span className="text-[7px] font-bold text-slate-300">02/04/2026</span>
        </div>
      </header>

      {/* Hotel Address - Mini */}
      <div className="px-3 py-1.5 bg-white border-b border-slate-100">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3 h-3 text-[#1AB1A5] mt-0.5 shrink-0" />
          <div>
            <p className="text-[8px] font-black text-slate-800 uppercase leading-tight">Sandals Island</p>
            <p className="text-[7px] font-bold text-slate-400 leading-tight">11 Biệt Thự, Phường Nha Trang, Tỉnh Khánh Hòa</p>
          </div>
        </div>
      </div>

      {/* Summary Row */}
      <div className="px-3 pt-3">
        <div className="bg-slate-800 text-white rounded-xl p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
               <Bed className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[7px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">Tổng cộng</p>
              <h4 className="text-[11px] font-black leading-none uppercase tracking-tighter">{totalArrivals} PHÒNG ĐẾN</h4>
            </div>
          </div>
          <div className="text-right shrink-0">
             {/* No helper text as requested previously */}
          </div>
        </div>
      </div>

      {/* Grid of Arrivals - 4 Columns */}
      <div className="p-2 grid grid-cols-4 gap-1">
        {mockArrivals.map((arrival, index) => (
          <button 
            key={index} 
            onClick={() => setSelectedArrival(arrival)}
            className="bg-white rounded-md border border-slate-100 p-1.5 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all h-16"
          >
            <div className="text-[9px] font-black text-[#1AB1A5] bg-[#1AB1A5]/10 px-1 rounded mb-0.5 w-full truncate">
              {arrival.room}
            </div>
            <div className="text-[8px] font-black text-slate-400 uppercase line-clamp-1 leading-none w-full mt-0.5">
              {arrival.id}
            </div>
            <div className="text-[6px] font-bold text-slate-300 uppercase leading-none mt-1 truncate w-full">
              {arrival.company}
            </div>
            <div className="mt-auto text-[6px] font-black text-slate-400 uppercase leading-none">
              {arrival.nights}N
            </div>
          </button>
        ))}
      </div>

      {/* Detail Sheet - Drawer from bottom */}
      <Sheet open={!!selectedArrival} onOpenChange={(open) => !open && setSelectedArrival(null)}>
        <SheetContent side="bottom" className="rounded-t-[1.5rem] p-0 border-t-0 shadow-2xl max-h-[95vh] overflow-y-auto max-w-md mx-auto left-0 right-0">
          {selectedArrival && (
            <div className="p-4 pt-8 space-y-4">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
              
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <SheetTitle className="text-base font-black text-slate-800 uppercase tracking-tighter leading-tight">
                      Phòng {selectedArrival.room} - {selectedArrival.guest}
                    </SheetTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="px-1.5 py-0.5 bg-[#1AB1A5]/10 text-[#1AB1A5] rounded text-[8px] font-black border border-[#1AB1A5]/20 flex items-center gap-1 uppercase">
                         <Building2 className="w-2.5 h-2.5" /> {selectedArrival.company}
                      </div>
                      <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded text-[8px] font-bold border border-slate-100 uppercase">
                        #{selectedArrival.id}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1AB1A5]/10 rounded-xl flex items-center justify-center text-[#1AB1A5] shrink-0">
                    <Bed className="w-5 h-5" />
                  </div>
                </div>
              </SheetHeader>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Section: Booking Details */}
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-[#1AB1A5] uppercase tracking-widest border-b border-slate-50 pb-1.5">
                    <InfoIcon className="w-3 h-3" /> Chi tiết đặt phòng
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Loại phòng</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedArrival.roomType}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Giá phòng</p>
                      <p className="text-[10px] font-black text-[#1AB1A5]">{selectedArrival.price}đ</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Số khách</p>
                      <p className="text-[10px] font-black text-slate-800 flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" /> {selectedArrival.pax}
                      </p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Số đêm</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedArrival.nights} Đêm</p>
                    </div>
                  </div>
                </div>

                {/* Section: Timeline */}
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-[#1AB1A5] uppercase tracking-widest border-b border-slate-50 pb-1.5">
                    <Calendar className="w-3 h-3" /> Thời gian lưu trú
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Ngày Đến</p>
                      <p className="text-[9px] font-bold text-slate-700">{selectedArrival.arrivalDate}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Ngày Đi</p>
                      <p className="text-[9px] font-bold text-slate-700">{selectedArrival.departureDate}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Requests & Notes - The Heavy Part */}
                {selectedArrival.request !== "NONE" && (
                  <div className="bg-amber-50/30 rounded-xl p-3 border border-amber-100/50 shadow-sm space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[8px] font-black text-amber-500 uppercase tracking-widest border-b border-amber-100/30 pb-1.5">
                      <ListChecks className="w-3 h-3" /> Yêu cầu đặc biệt
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">
                      {selectedArrival.request}
                    </p>
                  </div>
                )}

                <div className="bg-blue-50/20 rounded-xl p-3 border border-blue-100/30 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/20 pb-1.5">
                    <Quote className="w-3 h-3 rotate-180" /> Ghi chú quan trọng
                  </div>
                  <div className="bg-white/60 p-2.5 rounded-lg border border-blue-100/20">
                    <p className="text-[9px] font-bold text-slate-600 italic leading-relaxed">
                      "{selectedArrival.notes}"
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedArrival(null)}
                className="w-full h-11 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-[0.97] transition-all shadow-lg shadow-slate-200 mt-2"
              >
                QUAY LẠI DANH SÁCH
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ArrivalReportPage;
