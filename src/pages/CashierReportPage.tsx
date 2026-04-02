import { useState } from "react";
import { ChevronLeft, Building2, User, Wallet, Info, MapPin, Receipt, CreditCard, Banknote, Landmark, Clock, FileText, CheckCircle2, AlertCircle, Hash, History, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CashierReportPageProps {
  onBack: () => void;
}

const mockTransactions = [
  // --- Restaurant / Nhà Hàng ---
  { 
    id: "SI-SHR", room: "008", guest: "Mr. SHR", amount: "355,000", method: "BT", category: "Nhà Hàng", 
    time: "16:05", ttCode: "20,964", hdCode: "19,087", staff: "NB0022", note: "ĐÃ CK 355.000VND 01.04.26 CA YẾN+NGÂN+NHƯ+THÀNH+TRÂN"
  },
  { 
    id: "SI-SHR", room: "008", guest: "Mr. SHR", amount: "52,000", method: "CA", category: "Nhà Hàng", 
    time: "09:04", ttCode: "20,937", hdCode: "19,064", staff: "NB0178", note: "Ca Ngân + Như bán TTTM 52,000 VND 01/04/2026"
  },
  { 
    id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CA", category: "Nhà Hàng", 
    time: "11:23", ttCode: "20,953", hdCode: "19,077", staff: "NB0023", note: "Cash"
  },
  { 
    id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CA", category: "Nhà Hàng", 
    time: "15:39", ttCode: "20,962", hdCode: "19,085", staff: "NB0028", note: "KHÁCH TTTM.88.000 VNĐ NGÀY 1/4/2026"
  },
  { 
    id: "SI-SB", room: "007", guest: "Mr. SB", amount: "77,000", method: "CA", category: "Nhà Hàng", 
    time: "17:09", ttCode: "20,965", hdCode: "19,088", staff: "NB0028", note: "KHÁCH TTTM.77.000 VNĐ NGÀY 1/4/2026"
  },
  { 
    id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CA", category: "Nhà Hàng", 
    time: "21:15", ttCode: "20,967", hdCode: "19,090", staff: "NB0028", note: "KHÁCH TTTM.88.000 VNĐ NGÀY 1/4/2026"
  },
  { 
    id: "SI-SB", room: "007", guest: "Mr. SB", amount: "154,000", method: "CD", category: "Nhà Hàng", 
    time: "15:53", ttCode: "20,963", hdCode: "19,086", staff: "NB0028", note: "KHÁCH TTCT.154.000 VNĐ NGÀY 1/4/2026 MÃ HOÁ ĐƠN 000761"
  },
  { 
    id: "SI-SB", room: "007", guest: "Mr. SB", amount: "88,000", method: "CD", category: "Nhà Hàng", 
    time: "18:27", ttCode: "20,966", hdCode: "19,089", staff: "NB0028", note: "KHÁCH TTCT .88.000 VNĐ NGÀY 1/4/2026 MÃ HOÁ ĐƠN 000762"
  },
  // --- Reception / Lễ Tân ---
  { 
    id: "SI5226", room: "NONE", guest: "Anastasiia Okhlopkova", amount: "562,530", method: "AC", category: "Lễ Tân", 
    time: "07:42", ttCode: "20,936", hdCode: "19,063", staff: "NB0178", note: "ĐÃ NHỜ LILY CT"
  },
  { 
    id: "SI5206", room: "NONE", guest: "VALERIIA EGOROVA", amount: "5,042,108", method: "AC", category: "Lễ Tân", 
    time: "11:03", ttCode: "20,949", hdCode: "19,073", staff: "NB0178", note: "ĐÃ NHỜ LILY CÀ THẺ"
  },
  { 
    id: "SI5145", room: "NONE", guest: "SEUNGYUN PARK", amount: "3,215,054", method: "AC", category: "Lễ Tân", 
    time: "11:38", ttCode: "20,961", hdCode: "19,079", staff: "admin", note: "ĐỢI MS UYÊN CẤP MÃ CT"
  },
  { 
    id: "SI5207", room: "NONE", guest: "EVGENII KOZHEMIAKIN", amount: "3,682,490", method: "AC", category: "Lễ Tân", 
    time: "11:51", ttCode: "20,956", hdCode: "19,080", staff: "NB0178", note: "ĐÃ NHỜ LILY CT"
  },
  { 
    id: "SI5281", room: "NONE", guest: "HONGKANG SHANG", amount: "562,530", method: "AC", category: "Lễ Tân", 
    time: "11:55", ttCode: "20,958", hdCode: "19,082", staff: "NB0178", note: "ĐÃ NHỜ LILY CT"
  },
  { 
    id: "SI5234", room: "NONE", guest: "CTY VAN THONG", amount: "1,040,000", method: "BT", category: "Lễ Tân", 
    time: "10:06", ttCode: "20,940", hdCode: "19,067", staff: "NB0178", note: "ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND 31/03/26"
  },
  { 
    id: "SI5210", room: "NONE", guest: "CTY VAN THONG", amount: "1,040,000", method: "BT", category: "Lễ Tân", 
    time: "10:51", ttCode: "20,942", hdCode: "19,069", staff: "NB0178", note: "ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND 31/03/26"
  },
  { 
    id: "SI5291", room: "902", guest: "Mr. YINGBING GAO", amount: "33,000", method: "CA", category: "Lễ Tân", 
    time: "10:56", ttCode: "20,945", hdCode: "19,061", staff: "NB0178", note: "TTTM 01 COCA 33,000 01/04/2026"
  },
  { 
    id: "SI5206", room: "1105", guest: "Mr. KOZHEMIAKIN EVGENII", amount: "44,000", method: "CA", category: "Lễ Tân", 
    time: "11:11", ttCode: "20,950", hdCode: "19,074", staff: "NB0178", note: "TTTM 01 BIA 44,000 VND 01/04/2026"
  },
  { 
    id: "SI5070", room: "NONE", guest: "BULAT RYBDYLOV", amount: "5,588,514", method: "CA", category: "Lễ Tân", 
    time: "14:07", ttCode: "NONE", hdCode: "NONE", staff: "NB0178", note: "ĐÃ TTTM 5.588.514VND 01.04.26"
  },
  { 
    id: "SI5309", room: "NONE", guest: "ORYNBASS AVOR", amount: "10,620,000", method: "CA", category: "Lễ Tân", 
    time: "21:22", ttCode: "NONE", hdCode: "NONE", staff: "NB0022", note: "ĐÃ TTTM 10.620.000VND 01/04/26"
  },
  { 
    id: "SI5291", room: "NONE", guest: "YINGBING GAO", amount: "936,321", method: "CD", category: "Lễ Tân", 
    time: "10:58", ttCode: "20,946", hdCode: "19,071", staff: "NB0178", note: "ĐÃ CT:777,177VND NO 000757"
  },
  { 
    id: "SI5151", room: "NONE", guest: "Kamaev Timur", amount: "6,670,350", method: "CD", category: "Lễ Tân", 
    time: "11:19", ttCode: "20,951", hdCode: "19,075", staff: "NB0178", note: "ĐÃ CT:6.670.350VND TRACE NO 000724 27.3.26"
  },
  { 
    id: "SI5290", room: "NONE", guest: "zongchao qiu", amount: "807,723", method: "CD", category: "Lễ Tân", 
    time: "12:37", ttCode: "20,960", hdCode: "19,084", staff: "NB0178", note: "ĐÃ CT GIÁ TV 646,178 VND TRONG LIÊN CT 3,218,220 01/04/2026 000760"
  },
];

const CashierReportPage = ({ onBack }: CashierReportPageProps) => {
  const [selectedTx, setSelectedTx] = useState<typeof mockTransactions[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState<"Nhà Hàng" | "Lễ Tân">("Lễ Tân");

  // Calculate dynamic totals for the summary cards
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

  const filteredTransactions = currentTransactions;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-slate-600" />
          </button>
          <div>
            <h1 className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Báo cáo thu ngân</h1>
            <p className="text-[7px] font-bold text-slate-300">01/04/2026 ~ 01/04/2026</p>
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

      {/* Hotel Address */}
      <div className="px-3 py-1.5 bg-white border-b border-slate-100">
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3 h-3 text-[#1AB1A5] mt-0.5 shrink-0" />
          <div className="flex flex-col">
            <p className="text-[8px] font-black text-slate-800 uppercase leading-none mb-0.5">Sandals Island</p>
            <p className="text-[7px] font-bold text-slate-400 leading-none">11 Biệt Thự, Phường Nha Trang, Khánh Hòa</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="px-3 pt-3 flex flex-col gap-2">
         <div className="bg-slate-800 rounded-xl p-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                 <Wallet className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[7px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">
                  Tổng thu ngân {activeCategory.toLowerCase()}
                </p>
                <h4 className="text-[11px] font-black leading-none uppercase tracking-tighter text-emerald-400">
                  {getGrandTotal()}đ
                </h4>
              </div>
            </div>
            <div className="text-right shrink-0">
               <div className="bg-white/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-white/50" />
                  <span className="text-[7px] font-bold text-white/30 truncate">00:00 ~ 23:59</span>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-2">
            {summaryData.map((item, idx) => (
              <div key={idx} className={cn("rounded-xl border p-2 flex items-center gap-2", item.bg, "border-slate-100/50")}>
                 <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <item.icon className={cn("w-3.5 h-3.5", item.color)} />
                 </div>
                 <div className="overflow-hidden">
                    <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">{item.label}</p>
                    <p className="text-[10px] font-black text-slate-800 leading-none truncate">{item.amount}đ</p>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Tab Switcher - Micro Size */}
      <div className="px-3 mt-3">
        <div className="bg-white p-0.5 rounded-lg border border-slate-100 flex items-center gap-0.5 shadow-sm max-w-[200px]">
          {(["Lễ Tân", "Nhà Hàng"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex-1 py-1 rounded-md text-[8px] font-black uppercase transition-all tracking-tight flex items-center justify-center gap-1.5",
                activeCategory === cat 
                  ? "bg-slate-900 text-white shadow-sm active:scale-95" 
                  : "text-slate-400 hover:bg-slate-50"
              )}
            >
              {cat === "Nhà Hàng" ? <Utensils className="w-2.5 h-2.5" /> : <Hash className="w-2.5 h-2.5" />}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Transactions */}
      <div className="px-3 mt-4 space-y-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                Giao dịch {activeCategory} ({filteredTransactions.length})
              </span>
            </div>
         </div>

         <div className="grid grid-cols-2 gap-2">
            {filteredTransactions.map((tx, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedTx(tx)}
                className="bg-white rounded-xl border border-slate-100 p-2 flex flex-col shadow-sm active:scale-[0.97] transition-all relative overflow-hidden"
              >
                <div className="text-[9px] font-black text-[#1AB1A5] bg-[#1AB1A5]/10 px-1.5 rounded-md mb-1 w-fit">
                   {tx.room !== "NONE" ? tx.room : "LẺ"}
                </div>

                <div className="text-[8px] font-black text-slate-400 uppercase line-clamp-1 leading-none w-full mt-0.5">
                   {tx.id}
                </div>

                <div className="text-[10px] font-black text-slate-700 leading-none mt-1.5 flex items-center justify-between">
                   <span>{tx.amount}đ</span>
                   <div className={cn(
                        "w-4 h-4 rounded-md flex items-center justify-center",
                        tx.method === "CA" ? "bg-emerald-50" : tx.method === "BT" ? "bg-blue-50" : tx.method === "AC" ? "bg-indigo-50" : "bg-amber-50"
                   )}>
                        {tx.method === "CA" ? <Banknote className="w-2.5 h-2.5 text-emerald-500" /> : 
                         tx.method === "BT" ? <Landmark className="w-2.5 h-2.5 text-blue-500" /> :
                         tx.method === "AC" ? <Building2 className="w-2.5 h-2.5 text-indigo-500" /> :
                         <CreditCard className="w-2.5 h-2.5 text-amber-500" />}
                   </div>
                </div>

                <div className="text-[6px] font-bold text-slate-300 uppercase leading-none mt-1 truncate w-full flex items-center gap-1">
                   {tx.category === "Nhà Hàng" ? <Utensils className="w-2 h-2" /> : <Hash className="w-2 h-2" />}
                   {tx.time}
                </div>
              </button>
            ))}
         </div>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selectedTx} onOpenChange={(open) => !open && setSelectedTx(null)}>
        <SheetContent side="bottom" className="rounded-t-[1.5rem] p-0 border-t-0 shadow-2xl max-h-[90vh] overflow-y-auto max-w-md mx-auto left-0 right-0">
          {selectedTx && (
            <div className="p-4 pt-8 space-y-4">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
              
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <SheetTitle className="text-base font-black text-slate-800 uppercase tracking-tighter leading-tight">
                      Giao dịch {selectedTx.amount}đ
                    </SheetTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={cn(
                        "px-1.5 py-0.5 rounded text-[8px] font-black border flex items-center gap-1 uppercase",
                        selectedTx.method === "CA" ? "bg-emerald-50 text-emerald-500 border-emerald-100" : 
                        selectedTx.method === "BT" ? "bg-blue-50 text-blue-500 border-blue-100" :
                        selectedTx.method === "AC" ? "bg-indigo-50 text-indigo-500 border-indigo-100" :
                        "bg-amber-50 text-amber-500 border-amber-100"
                      )}>
                         {selectedTx.method === "CA" ? "TIỀN MẶT" : selectedTx.method === "BT" ? "CHUYỂN KHOẢN" : selectedTx.method === "AC" ? "CÔNG NỢ" : "CÀ THẺ"}
                      </div>
                      <div className="px-1.5 py-0.5 bg-slate-50 text-slate-400 rounded text-[8px] font-bold border border-slate-100">
                        #{selectedTx.id}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1AB1A5]/10 rounded-xl flex items-center justify-center text-[#1AB1A5] shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                </div>
              </SheetHeader>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Specifics */}
                <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-3">
                   <div className="flex items-center gap-1.5 text-[8px] font-black text-[#1AB1A5] uppercase tracking-widest border-b border-slate-50 pb-1.5">
                      <Info className="w-3 h-3" /> Thông tin thanh toán
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-0.5">
                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Khách hàng</p>
                        <p className="text-[10px] font-black text-slate-800 leading-tight">{selectedTx.guest}</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Phòng</p>
                        <p className="text-[10px] font-black text-slate-800">{selectedTx.room !== "NONE" ? selectedTx.room : "-"}</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Mã TT / Mã HD</p>
                        <p className="text-[9px] font-bold text-slate-600">{selectedTx.ttCode} / {selectedTx.hdCode}</p>
                      </div>
                      <div className="space-y-0.5 text-right">
                        <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Nhân viên / Giờ</p>
                        <p className="text-[9px] font-bold text-slate-600">{selectedTx.staff} - {selectedTx.time}</p>
                      </div>
                   </div>
                </div>

                {/* Description */}
                <div className="bg-slate-50/50 rounded-xl p-3 border border-slate-100/50 shadow-sm space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100/50 pb-1.5">
                    <FileText className="w-3 h-3" /> Mô tả giao dịch
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 italic leading-relaxed">
                    "{selectedTx.note}"
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedTx(null)}
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

export default CashierReportPage;
