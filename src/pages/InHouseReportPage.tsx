import { useState } from "react";
import { ChevronLeft, Building2, User, Calendar, Info, MapPin, Bed, Users, Info as InfoIcon, Quote, Receipt, ListChecks, LogOut, Wallet, Clock, History, Coffee, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface InHouseReportPageProps {
  onBack: () => void;
}

const mockInHouse = [
  // --- AGODA (8) ---
  { id: "SI4991", room: "1802", roomType: "SUI - D", guest: "Mr. Eduard Nurullin", company: "AGODA", arrivalDate: "27/03/2026", departureDate: "06/04/2026", nights: 10, pax: "2 / 0", breakfast: true, notes: "Agoda - 1708954913", request: "NONE" },
  { id: "SI5105", room: "801", roomType: "SUI - TRIP", guest: "Mr. LEE HYO SUNG", company: "AGODA", arrivalDate: "25/03/2026", departureDate: "03/04/2026", nights: 9, pax: "1 / 0", breakfast: true, notes: "Agoda - 1710582592", request: "NONE" },
  { id: "SI5105", room: "802", roomType: "SUI - TRIP", guest: "Ms. YUN GWIOK", company: "AGODA", arrivalDate: "25/03/2026", departureDate: "03/04/2026", nights: 9, pax: "1 / 0", breakfast: true, notes: "Agoda - 1710582592", request: "NONE" },
  { id: "SI5157", room: "1807", roomType: "DLX - D", guest: "Mr. Aleksandr Mikhailov", company: "AGODA", arrivalDate: "29/03/2026", departureDate: "06/04/2026", nights: 8, pax: "1 / 0", breakfast: true, notes: "Agoda - 1711439507", request: "NONE" },
  { id: "SI5161", room: "1607", roomType: "DLX - D", guest: "Ms. SONG GILSEOB", company: "AGODA", arrivalDate: "01/04/2026", departureDate: "03/04/2026", nights: 2, pax: "2 / 0", breakfast: true, notes: "Agoda - 1711480868", request: "NONE" },
  { id: "SI5162", room: "1101", roomType: "SUI - TRIP", guest: "Mr. SONG DUSEOB", company: "AGODA", arrivalDate: "01/04/2026", departureDate: "03/04/2026", nights: 2, pax: "3 / 0", breakfast: true, notes: "Agoda - 1711481204", request: "NONE" },
  { id: "SI5256", room: "604", roomType: "SUI - TRIP", guest: "Mr. HEVERA TOMAS", company: "AGODA", arrivalDate: "30/03/2026", departureDate: "02/04/2026", nights: 3, pax: "2 / 0", breakfast: true, notes: "Agoda - 1712737140", request: "NONE" },
  { id: "SI5312", room: "1702", roomType: "SUI - D", guest: "Mr. ZHAO YANG", company: "AGODA", arrivalDate: "01/04/2026", departureDate: "03/04/2026", nights: 2, pax: "1 / 0", breakfast: true, notes: "Agoda - 1713876894", request: "NONE" },

  // --- BOOKING.COM (7) ---
  { id: "SI4358", room: "1102", roomType: "SUI - TRIP", guest: "Mr. EVGENII KARPOV", company: "BOOKING.COM", arrivalDate: "29/03/2026", departureDate: "08/04/2026", nights: 10, pax: "3 / 0", breakfast: true, notes: "Booking.com - 5296807009", request: "NONE" },
  { id: "SI4936", room: "803", roomType: "JR SUI - T", guest: "Ms. IVASHINA OLGA", company: "BOOKING.COM", arrivalDate: "26/03/2026", departureDate: "06/04/2026", nights: 11, pax: "1 / 0", breakfast: true, notes: "Booking.com - 5124885267", request: "NONE" },
  { id: "SI5070", room: "1106", roomType: "PRE TRIP", guest: "Ms. RYBDYLOVA AY", company: "BOOKING.COM", arrivalDate: "01/04/2026", departureDate: "04/04/2026", nights: 3, pax: "1 / 2", breakfast: false, notes: "Booking.com - 5531990809", request: "NONE" },
  { id: "SI5070", room: "807", roomType: "DLX - T", guest: "Mr. RYBDYLOV BULAT", company: "BOOKING.COM", arrivalDate: "01/04/2026", departureDate: "04/04/2026", nights: 3, pax: "1 / 1", breakfast: false, notes: "Booking.com - 5531990809", request: "NONE" },
  { id: "SI5108", room: "1703", roomType: "JR SUT D", guest: "Mr. Fakhreddine Lachi", company: "BOOKING.COM", arrivalDate: "29/03/2026", departureDate: "04/04/2026", nights: 6, pax: "2 / 0", breakfast: true, notes: "Booking.com - 6694489761", request: "NONE" },
  { id: "SI5186", room: "503", roomType: "SUI - TRIP", guest: "Ms. Rafeyeva Victoria", company: "BOOKING.COM", arrivalDate: "27/03/2026", departureDate: "02/04/2026", nights: 6, pax: "2 / 0", breakfast: true, notes: "Booking.com - 6423435584", request: "NONE" },
  { id: "SI5261", room: "1006", roomType: "PRE TRIP", guest: "Mr. PLETENETSKIY SERGEY", company: "BOOKING.COM", arrivalDate: "30/03/2026", departureDate: "03/04/2026", nights: 4, pax: "3 / 0", breakfast: true, notes: "Booking.com - 6221007280", request: "NONE" },

  // --- OTHERS ---
  { id: "SI5125", room: "1002", roomType: "SUI - T", guest: "Mr. LI JIANMIN", company: "KHANG THÁI", arrivalDate: "30/03/2026", departureDate: "04/04/2026", nights: 5, pax: "2 / 0", breakfast: true, notes: "CÔNG TY TNHH KHANG THÁI VIETNAM TRAVEL", request: "NONE" },

  // --- CTRIP (13) ---
  { id: "SI5102", room: "1503", roomType: "JR SUT D", guest: "Mr. CHARNIAK YURY", company: "CTRIP", arrivalDate: "26/03/2026", departureDate: "26/04/2026", nights: 31, pax: "1 / 0", breakfast: true, notes: "Trip.Com - 1539363110661505", request: "NONE" },
  { id: "SI5156", room: "1801", roomType: "SUI - D", guest: "Mr. Kirill Filippov", company: "CTRIP", arrivalDate: "29/03/2026", departureDate: "06/04/2026", nights: 8, pax: "2 / 0", breakfast: true, notes: "Trip.Com - 1688896760929677", request: "NONE" },
  { id: "SI5202", room: "805", roomType: "QUEEN", guest: "Mr. VLADIMIR ROGOZA", company: "CTRIP", arrivalDate: "31/03/2026", departureDate: "08/04/2026", nights: 8, pax: "2 / 0", breakfast: true, notes: "Trip.Com - 1539363232531003", request: "NONE" },
  { id: "SI5208", room: "1504", roomType: "JR SUT D", guest: "Mr. ZVEREV ALEKSEI", company: "CTRIP", arrivalDate: "28/03/2026", departureDate: "02/04/2026", nights: 5, pax: "1 / 0", breakfast: true, notes: "Trip.Com - 1539363233722405", request: "NONE" },
  { id: "SI5231", room: "703", roomType: "SUI - T", guest: "Mr. ANDREI SUBBOTIN", company: "CTRIP", arrivalDate: "29/03/2026", departureDate: "05/04/2026", nights: 7, pax: "1 / 0", breakfast: true, notes: "Trip.Com - 1539363247709172", request: "NONE" },
  { id: "SI5239", room: "701", roomType: "SUI - TRIP", guest: "Mr. zoran nastovski", company: "CTRIP", arrivalDate: "30/03/2026", departureDate: "06/04/2026", nights: 7, pax: "3 / 0", breakfast: true, notes: "Trip.Com - 1128146900811754", request: "NONE" },
  { id: "SI5239", room: "702", roomType: "SUI - TRIP", guest: "Ms. NASTOVSKA VIOLETA", company: "CTRIP", arrivalDate: "30/03/2026", departureDate: "06/04/2026", nights: 7, pax: "2 / 0", breakfast: true, notes: "Trip.Com - 1128146900811754", request: "NONE" },
  { id: "SI5249", room: "1004", roomType: "JR SUT D", guest: "Ms. Irina Sterligova", company: "CTRIP", arrivalDate: "01/04/2026", departureDate: "05/04/2026", nights: 4, pax: "2 / 0", breakfast: true, notes: "Trip.Com - 1539363266415723", request: "NONE" },
  { id: "SI5270", room: "901", roomType: "SUI - TRIP", guest: "Ms. Natalia Starodubtseva", company: "CTRIP", arrivalDate: "31/03/2026", departureDate: "06/04/2026", nights: 6, pax: "3 / 0", breakfast: true, notes: "Trip.Com - 1539363331394781", request: "NONE" },
  { id: "SI5287", room: "1007", roomType: "DLX - D", guest: "Mr. LÊ VĂN THUẬN", company: "CTRIP", arrivalDate: "31/03/2026", departureDate: "02/04/2026", nights: 2, pax: "1 / 0", breakfast: true, notes: "Trip.Com - 1658110602700484", request: "NONE" },
  { id: "SI5287", room: "1107", roomType: "DLX - D", guest: "Mr. NGUYỄN HỒ THỊ TRÚC LY", company: "CTRIP", arrivalDate: "31/03/2026", departureDate: "02/04/2026", nights: 2, pax: "1 / 0", breakfast: true, notes: "Trip.Com - 1658110602700484", request: "NONE" },
  { id: "SI5288", room: "1203", roomType: "JR SUT D", guest: "Ms. Nina Nguyen", company: "CTRIP", arrivalDate: "31/03/2026", departureDate: "02/04/2026", nights: 2, pax: "2 / 0", breakfast: true, notes: "Trip.Com - 1658110602705098", request: "NONE" },
  { id: "SI5303", room: "1507", roomType: "DLX - D", guest: "Mr. SHANG HONGKANG", company: "CTRIP", arrivalDate: "01/04/2026", departureDate: "03/04/2026", nights: 2, pax: "1 / 0", breakfast: true, notes: "Trip.Com - 1128147002027903", request: "NONE" },

  // --- MKP SHIPPING (10) ---
  { id: "SI4783", room: "1205", roomType: "QUEEN", guest: "Mr. IRIGI COLACO", company: "MKP SHIPPING", arrivalDate: "14/03/2026", departureDate: "16/04/2026", nights: 33, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "1206", roomType: "PRE - D", guest: "Mr. GAGANDEEP SINGH", company: "MKP SHIPPING", arrivalDate: "14/03/2026", departureDate: "16/04/2026", nights: 33, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "1506", roomType: "PRE - D", guest: "Mr. MICIANIEC PAWEL LEON", company: "MKP SHIPPING", arrivalDate: "14/03/2026", departureDate: "16/04/2026", nights: 33, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "1606", roomType: "PRE - D", guest: "Mr. VIEGAS ROHIT FRANCISCO", company: "MKP SHIPPING", arrivalDate: "01/04/2026", departureDate: "16/04/2026", nights: 15, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "1706", roomType: "PRE - D", guest: "Mr. KOTIKULAM THAYATH", company: "MKP SHIPPING", arrivalDate: "01/04/2026", departureDate: "16/04/2026", nights: 15, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "1803", roomType: "JR SUT D", guest: "Mr. PATL KEVALKUMAR", company: "MKP SHIPPING", arrivalDate: "28/03/2026", departureDate: "16/04/2026", nights: 19, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "1806", roomType: "PRE - D", guest: "Mr. KONDRASHOV ARTEM", company: "MKP SHIPPING", arrivalDate: "01/04/2026", departureDate: "16/04/2026", nights: 15, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "605", roomType: "QUEEN", guest: "Mr. LAVANIA VIDHU", company: "MKP SHIPPING", arrivalDate: "01/04/2026", departureDate: "16/04/2026", nights: 15, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "904", roomType: "JR SUT D", guest: "Mr. SAMANT YATIN SURESH", company: "MKP SHIPPING", arrivalDate: "01/04/2026", departureDate: "16/04/2026", nights: 15, pax: "1 / 0", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },
  { id: "SI4783", room: "905", roomType: "QUEEN", guest: "Mr. KANJIRAMKUZHACKAL SUKUMARAN", company: "MKP SHIPPING", arrivalDate: "14/03/2026", departureDate: "16/04/2026", nights: 33, pax: "2 / 1", breakfast: true, notes: "MKP SHIPPING CO.,LTD", request: "NONE" },

  // --- WALK-IN (2) ---
  { id: "SI4621", room: "1204", roomType: "JR SUT D", guest: "Mr. Erwin Segmüller", company: "WALK-IN", arrivalDate: "17/03/2026", departureDate: "27/04/2026", nights: 41, pax: "2 / 0", breakfast: true, notes: "Guest with Dung", request: "NONE" },
  { id: "SI4822", room: "1602", roomType: "SUI - D", guest: "Ms. GAPONENKO ALEKSANDRA", company: "WALK-IN", arrivalDate: "10/03/2026", departureDate: "03/04/2026", nights: 24, pax: "2 / 0", breakfast: true, notes: "MR KHAIRULLIN VADIM", request: "NONE" },
  
  // --- NỘI BỘ (2) ---
  { id: "SI5266", room: "1603", roomType: "JR SUT D", guest: "Ms. HUỲNH THỊ THU HƯƠNG", company: "NỘI BỘ", arrivalDate: "31/03/2026", departureDate: "02/04/2026", nights: 2, pax: "1 / 0", breakfast: true, notes: "MS HƯƠNG SPA", request: "NONE" },
  { id: "SI5266", room: "1604", roomType: "JR SUT D", guest: "Mr. NGUYỄN THÀNH ĐẠT", company: "NỘI BỘ", arrivalDate: "31/03/2026", departureDate: "02/04/2026", nights: 2, pax: "1 / 0", breakfast: true, notes: "MS HƯƠNG SPA", request: "NONE" },
];

const InHouseReportPage = ({ onBack }: InHouseReportPageProps) => {
  const [selectedInHouse, setSelectedInHouse] = useState<typeof mockInHouse[0] | null>(null);

  const totalInHouseRegs = 46; 
  const totalInHouseRooms = 46; 
  const totalInHousePax = "70 / 4"; 

  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-0.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[9px] font-black text-slate-800 uppercase tracking-tight leading-none">Báo cáo phòng đang ở</h1>
            <p className="text-[6px] font-bold text-slate-300 leading-none mt-0.5">02/04/2026 · Admin</p>
          </div>
        </div>
        <div className="bg-white/80 px-1.5 py-0.5 rounded-md border border-slate-100 flex items-center gap-1">
          <Users className="w-2.5 h-2.5 text-slate-400" />
          <span className="text-[7px] font-black text-slate-500">{totalInHousePax}</span>
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
          <History className="w-3.5 h-3.5 text-white/50" />
          <div>
            <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Phòng đang ở</p>
            <h4 className="text-[10px] font-black leading-none uppercase tracking-tighter mt-0.5">{totalInHouseRooms} PHÒNG</h4>
          </div>
        </div>
      </div>

      {/* Grid of In-House - 5 Columns for max density */}
      <div className="p-1.5 grid grid-cols-5 gap-0.5">
        {mockInHouse.map((item, index) => (
          <button 
            key={index} 
            onClick={() => setSelectedInHouse(item)}
            className="bg-white rounded border border-slate-100 p-1 flex flex-col items-center justify-center text-center shadow-sm active:scale-95 transition-all h-12 relative overflow-hidden"
          >
            {item.breakfast && (
               <div className="absolute top-0.5 right-0.5">
                  <Coffee className="w-2 h-2 text-emerald-500" />
               </div>
            )}
            <div className="text-[7px] font-black text-[#1AB1A5] leading-none">
              {item.room}
            </div>
            <div className="text-[6px] font-black text-slate-400 uppercase leading-none mt-0.5">
              {item.id}
            </div>
            <div className="text-[5px] font-bold text-slate-300 uppercase leading-none mt-0.5 truncate w-full">
              {item.company}
            </div>
            <div className="text-[5px] font-black text-slate-400 leading-none mt-auto">
              {item.nights}N
            </div>
          </button>
        ))}
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedInHouse} onOpenChange={(open) => !open && setSelectedInHouse(null)}>
        <SheetContent side="bottom" className="rounded-t-[1.5rem] p-0 border-t-0 shadow-2xl max-h-[95vh] overflow-y-auto max-w-md mx-auto left-0 right-0">
          {selectedInHouse && (
            <div className="p-4 pt-8 space-y-4">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
              
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <SheetTitle className="text-base font-black text-slate-800 uppercase tracking-tighter leading-tight">
                      Phòng {selectedInHouse.room} - {selectedInHouse.guest}
                    </SheetTitle>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="px-1.5 py-0.5 bg-[#1AB1A5]/10 text-[#1AB1A5] rounded text-[8px] font-black border border-[#1AB1A5]/20 flex items-center gap-1 uppercase">
                         <Building2 className="w-2.5 h-2.5" /> {selectedInHouse.company}
                      </div>
                      {selectedInHouse.breakfast && (
                         <div className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-black border border-emerald-100 flex items-center gap-1 uppercase">
                            <Utensils className="w-2.5 h-2.5" /> Ăn Sáng
                         </div>
                      )}
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
                      <p className="text-[10px] font-black text-slate-800">{selectedInHouse.roomType}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Mã đăng ký</p>
                      <p className="text-[10px] font-black text-[#1AB1A5]">#{selectedInHouse.id}</p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Số khách</p>
                      <p className="text-[10px] font-black text-slate-800 flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" /> {selectedInHouse.pax}
                      </p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Số đêm</p>
                      <p className="text-[10px] font-black text-slate-800">{selectedInHouse.nights} Đêm</p>
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
                      <p className="text-[9px] font-bold text-slate-700">{selectedInHouse.arrivalDate}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Ngày Đi Dự Kiến</p>
                      <p className="text-[9px] font-bold text-slate-700">{selectedInHouse.departureDate}</p>
                    </div>
                  </div>
                </div>

                {/* Section: Requests & Notes */}
                {selectedInHouse.request !== "NONE" && (
                  <div className="bg-amber-50/30 rounded-xl p-3 border border-amber-100/50 shadow-sm space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[8px] font-black text-amber-500 uppercase tracking-widest border-b border-amber-100/30 pb-1.5">
                      <ListChecks className="w-3 h-3" /> Yêu cầu đặc biệt
                    </div>
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">
                      {selectedInHouse.request}
                    </p>
                  </div>
                )}

                <div className="bg-blue-50/20 rounded-xl p-3 border border-blue-100/30 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-blue-500 uppercase tracking-widest border-b border-blue-100/20 pb-1.5">
                    <Quote className="w-3 h-3 rotate-180" /> Ghi chú quan trọng
                  </div>
                  <div className="bg-white/60 p-2.5 rounded-lg border border-blue-100/20">
                    <p className="text-[9px] font-bold text-slate-600 italic leading-relaxed">
                      "{selectedInHouse.notes}"
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedInHouse(null)}
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

export default InHouseReportPage;
