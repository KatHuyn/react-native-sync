import { useState } from "react";
import { ChevronLeft, Building2, User, Calendar, Info, MapPin, Bed, Users, Info as InfoIcon, Quote, Receipt, ListChecks, LogOut, Wallet, Clock, History } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface DepartureReportPageProps {
  onBack: () => void;
}

const mockDepartures = [
  // --- AGODA ---
  {
    id: "SI5256",
    room: "604",
    roomType: "SUI-TRIP",
    guest: "Mr. HEVERA TOMAS",
    company: "AGODA",
    arrivalDate: "30/03/2026 - 12:35",
    departureDate: "02/04/2026 - 12:00",
    nights: 3,
    pax: "2 / 0",
    price: "646,178",
    notes: "Benefits: Free WiFi, Welcome drink, Breakfast, Coffee & tea, Drinking water, Parking, Free fitness center access, Complimentary Breakfast. Remarks: TwinBeds. Anniversary Twin Room - Non-Smoking - Room With Breakfast GIA HẠN R604",
    request: "Anniversary Twin Room - Non-Smoking - Room With Breakfast"
  },
  // --- BOOKING.COM ---
  {
    id: "SI5186",
    room: "503",
    roomType: "SUI-TRIP",
    guest: "Ms. Rafeyeva Victoria",
    company: "BOOKING.COM",
    arrivalDate: "27/03/2026 - 15:13",
    departureDate: "02/04/2026 - 12:00",
    nights: 6,
    pax: "2 / 0",
    price: "936,360",
    notes: "Phòng Tiêu Chuẩn Cho 3 Người - General - Breakfast included: 2 adults. Standard Triple Studio - Room with breakfast. ĐÃ CT:5,711,796VND TRACE NO 000786",
    request: "Standard Triple Studio"
  },
  // --- CTRIP ---
  {
    id: "SI5208",
    room: "1504",
    roomType: "JR SUT D",
    guest: "Mr. ZVEREV ALEKSEI",
    company: "CTRIP",
    arrivalDate: "28/03/2026 - 14:10",
    departureDate: "02/04/2026 - 12:00",
    nights: 5,
    pax: "1 / 0",
    price: "909,889",
    notes: "The guest purchased a Trip.com entertainment package (this booking + 1 copy(ies)/room*1 room(s) Vietnam 4G eSIM-QR code-3 days-Daily - 5GB). The hotel does not need to provide tickets. Please charge VCC between 2026-03-28 - 2026-09-29. VCC Amount: VND 4,158,577.0",
    request: "Junior Suite Double - B2B_Breakfast"
  },
  {
    id: "SI5287",
    room: "1007",
    roomType: "DLX D",
    guest: "Mr. LÊ VĂN THUẬN",
    company: "CTRIP",
    arrivalDate: "31/03/2026 - 13:58",
    departureDate: "02/04/2026 - 12:00",
    nights: 2,
    pax: "1 / 0",
    price: "562,530",
    notes: "VCC Amount: VND 2,250,120.0, paid by Trip.com. Contact guest by system generated mail. This booking was made through Trip.com, a Ctrip Group brand.",
    request: "Deluxe Double - B2B_Breakfast"
  },
  {
    id: "SI5287",
    room: "1107",
    roomType: "DLX D",
    guest: "Mr. NGUYỄN HỒ THỊ TRÚC LY",
    company: "CTRIP",
    arrivalDate: "31/03/2026 - 13:58",
    departureDate: "02/04/2026 - 12:00",
    nights: 2,
    pax: "1 / 0",
    price: "562,530",
    notes: "VCC Amount: VND 2,250,120.0, paid by Trip.com. Contact guest by system generated mail. This booking was made through Trip.com, a Ctrip Group brand.",
    request: "Deluxe Double - B2B_Breakfast"
  },
  {
    id: "SI5288",
    room: "1203",
    roomType: "JR SUT D",
    guest: "Ms. Nina Nguyen",
    company: "CTRIP",
    arrivalDate: "31/03/2026 - 23:04",
    departureDate: "02/04/2026 - 12:00",
    nights: 2,
    pax: "2 / 0",
    price: "812,172",
    notes: "VCC Amount: VND 1,624,344.0, paid by Trip.com. Preferred language: English. This booking was made through Trip.com, a Ctrip Group brand.",
    request: "Junior Suite Double - B2B_Breakfast"
  },
  // --- DL VẠN THÔNG ---
  {
    id: "SI5282",
    room: "1202",
    roomType: "SUI D",
    guest: "Mr. WANG SONG",
    company: "DL VẠN THÔNG",
    arrivalDate: "31/03/2026 - 23:04",
    departureDate: "02/04/2026 - 12:00",
    nights: 2,
    pax: "1 / 0",
    price: "800,000",
    notes: "1 DBL. ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND 31/03/26",
    request: "NONE"
  },
  // --- HAHA TRAVEL ---
  {
    id: "SI5298",
    room: "1103",
    roomType: "JR SUI T",
    guest: "Mr. TRƯƠNG THÀNH PHƯƠNG",
    company: "HAHA TRAVEL",
    arrivalDate: "01/04/2026 - 18:04",
    departureDate: "02/04/2026 - 08:37",
    nights: 1,
    pax: "1 / 0",
    price: "800,000",
    notes: "LONG ẨN ; 01 TWIN + 1 DOUBLE. CÔNG TY THANH TOÁN - KHÔNG THU TIỀN KHÁCH",
    request: "NONE"
  },
  {
    id: "SI5298",
    room: "1105",
    roomType: "QUEEN",
    guest: "Mr. VÕ QUỐC SỬ",
    company: "HAHA TRAVEL",
    arrivalDate: "01/04/2026 - 18:04",
    departureDate: "02/04/2026 - 07:16",
    nights: 1,
    pax: "1 / 0",
    price: "800,000",
    notes: "LONG ẨN ; 01 TWIN + 1 DOUBLE. CÔNG TY THANH TOÁN - KHÔNG THU TIỀN KHÁCH",
    request: "NONE"
  },
  // --- NỘI BỘ ---
  {
    id: "SI5266",
    room: "1603",
    roomType: "JR SUT D",
    guest: "Ms. HUỲNH THỊ THU HƯƠNG",
    company: "NỘI BỘ",
    arrivalDate: "31/03/2026 - 14:14",
    departureDate: "02/04/2026 - 12:00",
    nights: 2,
    pax: "1 / 0",
    price: "0",
    notes: "MS HƯƠNG KHẢO SÁT SPA ISLAND. FOC",
    request: "NONE"
  },
  {
    id: "SI5266",
    room: "1604",
    roomType: "JR SUT D",
    guest: "Mr. NGUYỄN THÀNH ĐẠT",
    company: "NỘI BỘ",
    arrivalDate: "31/03/2026 - 14:14",
    departureDate: "02/04/2026 - 12:00",
    nights: 2,
    pax: "1 / 0",
    price: "0",
    notes: "MS HƯƠNG KHẢO SÁT SPA ISLAND. FOC",
    request: "NONE"
  }
];

const DepartureReportPage = ({ onBack }: DepartureReportPageProps) => {
  const [selectedDeparture, setSelectedDeparture] = useState<typeof mockDepartures[0] | null>(null);

  const totalDepartures = 14; 

  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-0.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[9px] font-black text-slate-800 uppercase tracking-tight leading-none">Báo cáo phòng đi</h1>
            <p className="text-[6px] font-bold text-slate-300 leading-none mt-0.5">02/04/2026 · Admin</p>
          </div>
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
          <LogOut className="w-3.5 h-3.5 text-white/50" />
          <div>
            <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Tổng cộng</p>
            <h4 className="text-[10px] font-black leading-none uppercase tracking-tighter mt-0.5">{totalDepartures} PHÒNG ĐI</h4>
          </div>
        </div>
      </div>

      {/* Grid of Departures - 4 Columns */}
      <div className="p-2 grid grid-cols-4 gap-1">
        {mockDepartures.map((item, index) => (
          <button 
            key={index} 
            onClick={() => setSelectedDeparture(item)}
            className="bg-white rounded-md border border-slate-100 p-1 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all h-12"
          >
            <div className="text-[8px] font-black text-[#1AB1A5] bg-[#1AB1A5]/10 px-1 rounded w-full truncate leading-none">
              {item.room}
            </div>
            <div className="text-[7px] font-black text-slate-400 uppercase leading-none w-full mt-0.5">
              {item.id}
            </div>
            <div className="text-[5px] font-bold text-slate-300 uppercase leading-none mt-0.5 truncate w-full">
              {item.company}
            </div>
            <div className="text-[6px] font-black text-slate-400 uppercase leading-none mt-auto">
              {item.nights}N
            </div>
          </button>
        ))}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedDeparture} onOpenChange={(open) => !open && setSelectedDeparture(null)}>
        <SheetContent side="bottom" className="rounded-t-[1.5rem] p-0 border-t-0 shadow-2xl max-h-[95vh] overflow-y-auto max-w-md mx-auto left-0 right-0">
          {selectedDeparture && (
            <div className="p-4 pt-8 space-y-4">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
              
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <SheetTitle className="text-base font-black text-slate-800 uppercase tracking-tighter leading-tight">
                      Phòng {selectedDeparture.room} - {selectedDeparture.guest}
                    </SheetTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="px-1.5 py-0.5 bg-[#1AB1A5]/10 text-[#1AB1A5] rounded text-[8px] font-black border border-[#1AB1A5]/20 flex items-center gap-1 uppercase">
                         <Building2 className="w-2.5 h-2.5" /> {selectedDeparture.company}
                      </div>
                      <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded text-[8px] font-bold border border-slate-100 uppercase">
                        #{selectedDeparture.id}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1AB1A5]/10 rounded-xl flex items-center justify-center text-[#1AB1A5] shrink-0">
                    <LogOut className="w-5 h-5" />
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
                      <p className="text-[10px] font-black text-slate-800">{selectedDeparture.roomType}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Giá phòng</p>
                      <p className="text-[10px] font-black text-[#1AB1A5]">{selectedDeparture.price}đ</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Số khách</p>
                      <p className="text-[10px] font-black text-slate-800 flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" /> {selectedDeparture.pax}
                      </p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Số đêm</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedDeparture.nights} Đêm</p>
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
                      <p className="text-[9px] font-bold text-slate-700">{selectedDeparture.arrivalDate}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Ngày Đi</p>
                      <p className="text-[9px] font-bold text-slate-700">{selectedDeparture.departureDate}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Requests & Notes */}
                {selectedDeparture.request !== "NONE" && (
                  <div className="bg-amber-50/30 rounded-xl p-3 border border-amber-100/50 shadow-sm space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[8px] font-black text-amber-500 uppercase tracking-widest border-b border-amber-100/30 pb-1.5">
                      <ListChecks className="w-3 h-3" /> Yêu cầu đặc biệt
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">
                      {selectedDeparture.request}
                    </p>
                  </div>
                )}

                <div className="bg-blue-50/20 rounded-xl p-3 border border-blue-100/30 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/20 pb-1.5">
                    <Quote className="w-3 h-3 rotate-180" /> Ghi chú quan trọng
                  </div>
                  <div className="bg-white/60 p-2.5 rounded-lg border border-blue-100/20">
                    <p className="text-[9px] font-bold text-slate-600 italic leading-relaxed">
                      "{selectedDeparture.notes}"
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedDeparture(null)}
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

export default DepartureReportPage;
