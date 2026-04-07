import { ChevronLeft, MapPin, LogOut } from "lucide-react";
import ReportTable, { Column } from "@/components/ReportTable";

interface DepartureReportPageProps {
  onBack: () => void;
}

interface DepartureRow {
  id: string;
  room: string;
  roomType: string;
  guest: string;
  company: string;
  arrivalDate: string;
  departureDate: string;
  nights: number;
  pax: string;
  price: string;
  notes: string;
  request: string;
}

const mockDepartures: DepartureRow[] = [
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

const columns: Column<DepartureRow>[] = [
  {
    key: "id",
    label: "Mã ĐK",
    sticky: true,
    width: 70,
    minWidth: 70,
    render: (val) => (
      <span className="text-[8px] font-black text-[#1AB1A5]">{val}</span>
    ),
  },
  {
    key: "room",
    label: "Phòng",
    width: 52,
    minWidth: 52,
    render: (val) => (
      <span className="text-[8px] font-black text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{val}</span>
    ),
  },
  { key: "roomType", label: "Loại", minWidth: 72 },
  {
    key: "guest",
    label: "Khách",
    minWidth: 110,
    render: (val) => (
      <span className="text-[8px] font-black text-slate-700">{val}</span>
    ),
  },
  {
    key: "company",
    label: "Công ty",
    minWidth: 80,
    render: (val) => (
      <span className="text-[7px] font-black text-white bg-slate-600 px-1.5 py-0.5 rounded uppercase">{val}</span>
    ),
  },
  { key: "arrivalDate", label: "Ngày đến", minWidth: 110 },
  { key: "departureDate", label: "Ngày đi", minWidth: 110 },
  {
    key: "nights",
    label: "Đêm",
    width: 45,
    minWidth: 45,
    align: "center",
    render: (val) => (
      <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">{val}N</span>
    ),
  },
  { key: "pax", label: "Khách", width: 50, minWidth: 50, align: "center" },
  {
    key: "price",
    label: "Giá",
    minWidth: 80,
    align: "right",
    render: (val) => (
      <span className="text-[8px] font-black text-emerald-600">{val}đ</span>
    ),
  },
  {
    key: "notes",
    label: "Ghi chú",
    minWidth: 140,
    expandable: true,
    filterable: false,
    sortable: false,
  },
  {
    key: "request",
    label: "Yêu cầu",
    minWidth: 120,
    expandable: true,
    filterable: false,
    sortable: false,
  },
];

const DepartureReportPage = ({ onBack }: DepartureReportPageProps) => {
  const totalDepartures = 14;

  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 py-1 flex items-center justify-between">
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

      <div className="px-2 py-1 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-2.5 h-2.5 text-[#1AB1A5] shrink-0" />
          <p className="text-[7px] font-bold text-slate-400 leading-none">Sandals Island · 11 Biệt Thự, Phường Nha Trang, Khánh Hòa</p>
        </div>
      </div>

      <div className="px-2 pt-2 pb-1">
        <div className="bg-slate-800 text-white rounded-lg p-2 flex items-center gap-2 shadow-sm">
          <LogOut className="w-3.5 h-3.5 text-white/50" />
          <div>
            <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Tổng cộng</p>
            <h4 className="text-[10px] font-black leading-none uppercase tracking-tighter mt-0.5">{totalDepartures} PHÒNG ĐI</h4>
          </div>
        </div>
      </div>

      <ReportTable
        columns={columns}
        data={mockDepartures}
        rowKey={(row, i) => `${row.id}-${row.room}-${i}`}
      />
    </div>
  );
};

export default DepartureReportPage;
