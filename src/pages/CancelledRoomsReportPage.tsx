import { ChevronLeft, Ban, MapPin } from "lucide-react";
import ReportTable, { Column } from "@/components/ReportTable";

interface CancelledRoomsReportPageProps {
  onBack: () => void;
}

interface CancelledRow {
  regCode: string;
  regName: string;
  company: string;
  regDate: string;
  status: string;
  room: string;
  arrivalDate: string;
  departureDate: string;
  cancelDate: string;
  cancelTime: string;
  user: string;
  reason: string;
  cancelDays: number;
}

const mockCancelledRooms: CancelledRow[] = [
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

const columns: Column<CancelledRow>[] = [
  {
    key: "regCode",
    label: "Mã ĐK",
    sticky: true,
    width: 65,
    minWidth: 65,
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
  {
    key: "regName",
    label: "Tên ĐK",
    minWidth: 100,
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
  { key: "arrivalDate", label: "Ngày đến", minWidth: 80 },
  { key: "departureDate", label: "Ngày đi", minWidth: 80 },
  {
    key: "cancelDate",
    label: "Ngày hủy",
    minWidth: 80,
    render: (val, row) => (
      <span className="text-[8px] font-bold text-rose-500">{row.cancelTime} - {val}</span>
    ),
  },
  {
    key: "cancelDays",
    label: "Số ngày",
    width: 55,
    minWidth: 55,
    align: "center",
    render: (val) => (
      <span className="text-[7px] font-black text-white bg-rose-500 px-1.5 py-0.5 rounded">-{val}N</span>
    ),
  },
  {
    key: "user",
    label: "Người hủy",
    minWidth: 75,
  },
  { key: "status", label: "Trạng thái", minWidth: 100 },
  {
    key: "reason",
    label: "Lý do",
    minWidth: 120,
    expandable: true,
    filterable: false,
    sortable: false,
  },
];

const CancelledRoomsReportPage = ({ onBack }: CancelledRoomsReportPageProps) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 py-1 flex items-center gap-2">
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

      <div className="px-2 py-1 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-2.5 h-2.5 text-[#1AB1A5] shrink-0" />
          <p className="text-[7px] font-bold text-slate-400 leading-none">Sandals Island · 11 Biệt Thự, Phường Nha Trang, Khánh Hòa</p>
        </div>
      </div>

      <div className="px-2 pt-2 pb-1">
        <div className="bg-slate-800 text-white rounded-lg p-2 flex items-center gap-2 shadow-sm">
          <Ban className="w-3.5 h-3.5 text-white/50" />
          <div>
            <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Tổng cộng</p>
            <h4 className="text-[10px] font-black leading-none uppercase tracking-tighter mt-0.5">{mockCancelledRooms.length} PHÒNG HỦY</h4>
          </div>
        </div>
      </div>

      <ReportTable
        columns={columns}
        data={mockCancelledRooms}
        rowKey={(row, i) => `${row.regCode}-${row.room}-${i}`}
      />
    </div>
  );
};

export default CancelledRoomsReportPage;
