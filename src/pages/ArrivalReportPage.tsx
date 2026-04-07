import { ChevronLeft, MapPin, Bed, Coffee } from "lucide-react";
import ReportTable, { Column } from "@/components/ReportTable";

interface ArrivalReportPageProps {
  onBack: () => void;
}

interface ArrivalRow {
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

const mockArrivals: ArrivalRow[] = [
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

const columns: Column<ArrivalRow>[] = [
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

const ArrivalReportPage = ({ onBack }: ArrivalReportPageProps) => {
  const totalArrivals = 9;

  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-0.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[9px] font-black text-slate-800 uppercase tracking-tight leading-none">Báo cáo phòng đến</h1>
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
      <div className="px-2 pt-2 pb-1">
        <div className="bg-slate-800 text-white rounded-lg p-2 flex items-center gap-2 shadow-sm">
          <Bed className="w-3.5 h-3.5 text-white/50" />
          <div>
            <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Tổng cộng</p>
            <h4 className="text-[10px] font-black leading-none uppercase tracking-tighter mt-0.5">{totalArrivals} PHÒNG ĐẾN</h4>
          </div>
        </div>
      </div>

      {/* Table */}
      <ReportTable
        columns={columns}
        data={mockArrivals}
        rowKey={(row, i) => `${row.id}-${row.room}-${i}`}
      />
    </div>
  );
};

export default ArrivalReportPage;
