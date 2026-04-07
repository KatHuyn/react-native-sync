import { useState } from "react";
import { ChevronLeft, MapPin, Wallet, Banknote, Landmark, CreditCard, Building2, Hash, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import ReportTable, { Column } from "@/components/ReportTable";

interface CashierReportPageProps {
  onBack: () => void;
}

interface CashierRow {
  id: string;
  room: string;
  guest: string;
  amount: string;
  method: string;
  category: string;
  time: string;
  ttCode: string;
  hdCode: string;
  staff: string;
  note: string;
}

const mockTransactions: CashierRow[] = [
  { id: "SI-SHR", room: "008", guest: "Mr. SHR", amount: "355,000", method: "BT", category: "Nhà Hàng", time: "16:05", ttCode: "20,964", hdCode: "19,087", staff: "NB0022", note: "ĐÃ CK 355.000VND 01.04.26 CA YẾN+NGÂN+NHƯ+THÀNH+TRÂN" },
  { id: "SI-SHR", room: "008", guest: "Mr. SHR", amount: "52,000", method: "CA", category: "Nhà Hàng", time: "09:04", ttCode: "20,937", hdCode: "19,064", staff: "NB0178", note: "Ca Ngân + Như bán TTTM 52,000 VND 01/04/2026" },
  { id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CA", category: "Nhà Hàng", time: "11:23", ttCode: "20,953", hdCode: "19,077", staff: "NB0023", note: "Cash" },
  { id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CA", category: "Nhà Hàng", time: "15:39", ttCode: "20,962", hdCode: "19,085", staff: "NB0028", note: "KHÁCH TTTM.88.000 VNĐ NGÀY 1/4/2026" },
  { id: "SI-SB", room: "007", guest: "Mr. SB", amount: "77,000", method: "CA", category: "Nhà Hàng", time: "17:09", ttCode: "20,965", hdCode: "19,088", staff: "NB0028", note: "KHÁCH TTTM.77.000 VNĐ NGÀY 1/4/2026" },
  { id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CA", category: "Nhà Hàng", time: "21:15", ttCode: "20,967", hdCode: "19,090", staff: "NB0028", note: "KHÁCH TTTM.88.000 VNĐ NGÀY 1/4/2026" },
  { id: "SI-SB", room: "007", guest: "Mr. SB", amount: "154,000", method: "CD", category: "Nhà Hàng", time: "15:53", ttCode: "20,963", hdCode: "19,086", staff: "NB0028", note: "KHÁCH TTCT.154.000 VNĐ NGÀY 1/4/2026 MÃ HOÁ ĐƠN 000761" },
  { id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CD", category: "Nhà Hàng", time: "18:27", ttCode: "20,966", hdCode: "19,089", staff: "NB0028", note: "KHÁCH TTCT .88.000 VNĐ NGÀY 1/4/2026 MÃ HOÁ ĐƠN 000762" },
  { id: "SI5226", room: "NONE", guest: "Anastasiia Okhlopkova", amount: "562,530", method: "AC", category: "Lễ Tân", time: "07:42", ttCode: "20,936", hdCode: "19,063", staff: "NB0178", note: "ĐÃ NHỜ LILY CT" },
  { id: "SI5206", room: "NONE", guest: "VALERIIA EGOROVA", amount: "5,042,108", method: "AC", category: "Lễ Tân", time: "11:03", ttCode: "20,949", hdCode: "19,073", staff: "NB0178", note: "ĐÃ NHỜ LILY CÀ THẺ" },
  { id: "SI5145", room: "NONE", guest: "SEUNGYUN PARK", amount: "3,215,054", method: "AC", category: "Lễ Tân", time: "11:38", ttCode: "20,961", hdCode: "19,079", staff: "admin", note: "ĐỢI MS UYÊN CẤP MÃ CT" },
  { id: "SI5207", room: "NONE", guest: "EVGENII KOZHEMIAKIN", amount: "3,682,490", method: "AC", category: "Lễ Tân", time: "11:51", ttCode: "20,956", hdCode: "19,080", staff: "NB0178", note: "ĐÃ NHỜ LILY CT" },
  { id: "SI5281", room: "NONE", guest: "HONGKANG SHANG", amount: "562,530", method: "AC", category: "Lễ Tân", time: "11:55", ttCode: "20,958", hdCode: "19,082", staff: "NB0178", note: "ĐÃ NHỜ LILY CT" },
  { id: "SI5234", room: "NONE", guest: "CTY VAN THONG", amount: "1,040,000", method: "BT", category: "Lễ Tân", time: "10:06", ttCode: "20,940", hdCode: "19,067", staff: "NB0178", note: "ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND 31/03/26" },
  { id: "SI5210", room: "NONE", guest: "CTY VAN THONG", amount: "1,040,000", method: "BT", category: "Lễ Tân", time: "10:51", ttCode: "20,942", hdCode: "19,069", staff: "NB0178", note: "ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND 31/03/26" },
  { id: "SI5291", room: "902", guest: "Mr. YINGBING GAO", amount: "33,000", method: "CA", category: "Lễ Tân", time: "10:56", ttCode: "20,945", hdCode: "19,061", staff: "NB0178", note: "TTTM 01 COCA 33,000 01/04/2026" },
  { id: "SI5206", room: "1105", guest: "Mr. KOZHEMIAKIN EVGENII", amount: "44,000", method: "CA", category: "Lễ Tân", time: "11:11", ttCode: "20,950", hdCode: "19,074", staff: "NB0178", note: "TTTM 01 BIA 44,000 VND 01/04/2026" },
  { id: "SI5070", room: "NONE", guest: "BULAT RYBDYLOV", amount: "5,588,514", method: "CA", category: "Lễ Tân", time: "14:07", ttCode: "NONE", hdCode: "NONE", staff: "NB0178", note: "ĐÃ TTTM 5.588.514VND 01.04.26" },
  { id: "SI5309", room: "NONE", guest: "ORYNBASS AVOR", amount: "10,620,000", method: "CA", category: "Lễ Tân", time: "21:22", ttCode: "NONE", hdCode: "NONE", staff: "NB0022", note: "ĐÃ TTTM 10.620.000VND 01/04/26" },
  { id: "SI5291", room: "NONE", guest: "YINGBING GAO", amount: "936,321", method: "CD", category: "Lễ Tân", time: "10:58", ttCode: "20,946", hdCode: "19,071", staff: "NB0178", note: "ĐÃ CT:777,177VND NO 000757" },
  { id: "SI5151", room: "NONE", guest: "Kamaev Timur", amount: "6,670,350", method: "CD", category: "Lễ Tân", time: "11:19", ttCode: "20,951", hdCode: "19,075", staff: "NB0178", note: "ĐÃ CT:6.670.350VND TRACE NO 000724 27.3.26" },
  { id: "SI5290", room: "NONE", guest: "zongchao qiu", amount: "807,723", method: "CD", category: "Lễ Tân", time: "12:37", ttCode: "20,960", hdCode: "19,084", staff: "NB0178", note: "ĐÃ CT GIÁ TV 646,178 VND TRONG LIÊN CT 3,218,220 01/04/2026 000760" },
];

const MethodBadge = ({ method }: { method: string }) => {
  const config: Record<string, { label: string; icon: any; color: string; bg: string }> = {
    CA: { label: "TM", icon: Banknote, color: "text-emerald-600", bg: "bg-emerald-50" },
    BT: { label: "CK", icon: Landmark, color: "text-blue-600", bg: "bg-blue-50" },
    CD: { label: "CT", icon: CreditCard, color: "text-amber-600", bg: "bg-amber-50" },
    AC: { label: "CN", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
  };
  const c = config[method] || config.CA;
  const Icon = c.icon;
  return (
    <span className={cn("inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[7px] font-black uppercase", c.bg, c.color)}>
      <Icon className="w-2.5 h-2.5" />
      {c.label}
    </span>
  );
};

const columns: Column<CashierRow>[] = [
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
    width: 50,
    minWidth: 50,
    render: (val) => (
      <span className="text-[8px] font-black text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">
        {val !== "NONE" ? val : "LẺ"}
      </span>
    ),
  },
  {
    key: "guest",
    label: "Khách",
    minWidth: 110,
    render: (val) => (
      <span className="text-[8px] font-black text-slate-700">{val}</span>
    ),
  },
  {
    key: "amount",
    label: "Số tiền",
    minWidth: 80,
    align: "right",
    render: (val) => (
      <span className="text-[8px] font-black text-emerald-600">{val}đ</span>
    ),
  },
  {
    key: "method",
    label: "HTTT",
    width: 55,
    minWidth: 55,
    align: "center",
    render: (val) => <MethodBadge method={val} />,
  },
  {
    key: "time",
    label: "Giờ",
    width: 45,
    minWidth: 45,
    align: "center",
  },
  { key: "ttCode", label: "Mã TT", minWidth: 60, align: "center" },
  { key: "hdCode", label: "Mã HD", minWidth: 60, align: "center" },
  { key: "staff", label: "NV", minWidth: 60 },
  {
    key: "note",
    label: "Ghi chú",
    minWidth: 140,
    expandable: true,
    filterable: false,
    sortable: false,
  },
];

const CashierReportPage = ({ onBack }: CashierReportPageProps) => {
  const [activeCategory, setActiveCategory] = useState<"Nhà Hàng" | "Lễ Tân">("Lễ Tân");

  const currentTransactions = mockTransactions.filter(tx => tx.category === activeCategory);

  const getMethodTotal = (method: string) => {
    return currentTransactions
      .filter(tx => tx.method === method)
      .reduce((sum, tx) => sum + parseInt(tx.amount.replace(/,/g, '')), 0)
      .toLocaleString();
  };

  const getGrandTotal = () => {
    return currentTransactions
      .reduce((sum, tx) => sum + parseInt(tx.amount.replace(/,/g, '')), 0)
      .toLocaleString();
  };

  const summaryData = [
    { label: "TIỀN MẶT", amount: getMethodTotal("CA"), icon: Banknote, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "CHUYỂN KHOẢN", amount: getMethodTotal("BT"), icon: Landmark, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "CÀ THẺ", amount: getMethodTotal("CD"), icon: CreditCard, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "CÔNG NỢ", amount: getMethodTotal("AC"), icon: Building2, color: "text-indigo-500", bg: "bg-indigo-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-16 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-0.5 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-3.5 h-3.5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[9px] font-black text-slate-800 uppercase tracking-tight leading-none">Báo cáo thu ngân</h1>
            <p className="text-[6px] font-bold text-slate-300 leading-none mt-0.5">01/04/2026 · Admin</p>
          </div>
        </div>
        <div className="bg-white p-0.5 rounded-md border border-slate-100 flex items-center gap-0.5 shadow-sm">
          {(["Lễ Tân", "Nhà Hàng"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-2 py-0.5 rounded text-[7px] font-black uppercase transition-all tracking-tight flex items-center gap-1",
                activeCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-400"
              )}
            >
              {cat === "Nhà Hàng" ? <Utensils className="w-2 h-2" /> : <Hash className="w-2 h-2" />}
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="px-2 py-1 bg-white border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-2.5 h-2.5 text-[#1AB1A5] shrink-0" />
          <p className="text-[7px] font-bold text-slate-400 leading-none">Sandals Island · 11 Biệt Thự, Phường Nha Trang, Khánh Hòa</p>
        </div>
      </div>

      {/* Compact Summary */}
      <div className="px-2 pt-2 pb-1">
        <div className="bg-slate-800 rounded-lg p-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-white/50" />
            <div>
              <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none">Tổng {activeCategory.toLowerCase()}</p>
              <h4 className="text-[10px] font-black leading-none tracking-tighter text-emerald-400 mt-0.5">{getGrandTotal()}đ</h4>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {summaryData.map((item, idx) => (
              <div key={idx} className={cn("rounded-md px-1.5 py-1 flex flex-col items-center", item.bg)}>
                <item.icon className={cn("w-2.5 h-2.5 mb-0.5", item.color)} />
                <p className="text-[6px] font-black text-slate-600 leading-none">{item.amount.length > 5 ? item.amount.slice(0, -4) + 'K' : item.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReportTable
        columns={columns}
        data={currentTransactions}
        rowKey={(row, i) => `${row.id}-${row.room}-${row.time}-${i}`}
      />
    </div>
  );
};

export default CashierReportPage;
