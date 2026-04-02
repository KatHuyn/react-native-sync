import { useState } from "react";
import { ChevronLeft, Building2, Wallet, Clock, FileText, Hash, Info, User, Calendar, CreditCard, Banknote, CheckCircle2, AlertCircle, Receipt, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface CompanyDebtReportPageProps {
  onBack: () => void;
}

const mockCompanyDebts = [
  {
    id: "ctrip",
    name: "CTRIP",
    totalDebt: "21,595,907",
    remainingDebt: "21,595,907",
    items: [
      { id: "SI5060", room: "5060", arrival: "28/03/2026", departure: "30/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "1,189,352", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: false },
      { id: "SI5140", room: "5140", arrival: "28/03/2026", departure: "30/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "1,639,344", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: false },
      { id: "SI5199", room: "5199", arrival: "29/03/2026", departure: "30/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "562,530", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: false },
      { id: "SI5203", room: "5203", arrival: "28/03/2026", departure: "30/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "1,635,991", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: false },
      { id: "SI5253", room: "5253", arrival: "29/03/2026", departure: "30/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "644,502", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: false },
      { id: "SI5154", room: "5154", arrival: "27/03/2026", departure: "31/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "2,959,784", cashier: "Đoàn Nguyễn Quỳnh Như", date: "31/03/2026", isPaid: false },
      { id: "SI5155", room: "5155", arrival: "27/03/2026", departure: "31/03/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "3,114,744", cashier: "Đoàn Nguyễn Quỳnh Như", date: "31/03/2026", isPaid: false },
      { id: "SI5206", room: "5206", arrival: "28/03/2026", departure: "01/04/2026", note: "ĐÃ NHỜ LILY CÀ THẺ", amount: "5,042,108", cashier: "Đoàn Nguyễn Quỳnh Như", date: "01/04/2026", isPaid: false },
      { id: "SI5207", room: "5207", arrival: "28/03/2026", departure: "01/04/2026", note: "ĐÃ NHỜ LILY CT", amount: "3,682,490", cashier: "Đoàn Nguyễn Quỳnh Như", date: "01/04/2026", isPaid: false },
      { id: "SI5226", room: "5226", arrival: "31/03/2026", departure: "01/04/2026", note: "ĐÃ NHỜ LILY CT", amount: "562,530", cashier: "Đoàn Nguyễn Quỳnh Như", date: "01/04/2026", isPaid: false },
      { id: "SI5281", room: "5281", arrival: "31/03/2026", departure: "01/04/2026", note: "ĐÃ NHỜ LILY CT", amount: "562,530", cashier: "Đoàn Nguyễn Quỳnh Như", date: "01/04/2026", isPaid: false },
    ],
    payments: []
  },
  {
    id: "vanthong",
    name: "DL VẠN THÔNG",
    totalDebt: "4,160,000",
    remainingDebt: "0",
    items: [
      { id: "SI5097", room: "5097", arrival: "29/03/2026", departure: "30/03/2026", note: "Booking SI5097 tổng 1,040,000VNĐ - CTY VẠN THÔNG", amount: "1,040,000", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: true },
      { id: "SI5106", room: "5106", arrival: "29/03/2026", departure: "31/03/2026", note: "CTY TT SAU - MR TUẤN XÁC NHẬN", amount: "1,040,000", cashier: "Đoàn Nguyễn Quỳnh Như", date: "31/03/2026", isPaid: true },
      { id: "SI5115", room: "5115", arrival: "28/03/2026", departure: "01/04/2026", note: "CÔNG NỢ MR TUẤN", amount: "2,080,000", cashier: "Đoàn Nguyễn Quỳnh Như", date: "31/03/2026", isPaid: true },
    ],
    payments: [
      { date: "01/04/2026 07:18", method: "Bank transfer", note: "ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND", amount: "1,040,000", user: "Đoàn Nguyễn Quỳnh Như" },
      { date: "01/04/2026 07:22", method: "Bank transfer", note: "ĐÃ TTCK: 1,040,000VND THEO LỆNH CK: 7,280,000VND", amount: "1,040,000", user: "Đoàn Nguyễn Quỳnh Như" },
      { date: "01/04/2026 07:16", method: "Bank transfer", note: "ĐÃ TTCK: 2,080,000VND THEO LỆNH CK: 7,280,000VND", amount: "2,080,000", user: "Đoàn Nguyễn Quỳnh Như" }
    ]
  },
  {
    id: "novatrip",
    name: "NOVA TRIP",
    totalDebt: "697,500",
    remainingDebt: "0",
    items: [
      { id: "SI5263", room: "5263", arrival: "29/03/2026", departure: "30/03/2026", note: "Booking SI5263 tổng 697,500VNĐ", amount: "697,500", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: true },
    ],
    payments: [
      { date: "30/03/2026 16:34", method: "Bank transfer", note: "ĐÃ TTCK: 697,500VND", amount: "697,500", user: "Phan Thùy Thảo Ngân" }
    ]
  },
  {
    id: "laca",
    name: "La Cà Nha Trang",
    totalDebt: "775,000",
    remainingDebt: "775,000",
    items: [
      { id: "SI5118", room: "5118", arrival: "29/03/2026", departure: "30/03/2026", note: "Booking SI5118 tổng 775,000VNĐ", amount: "775,000", cashier: "Phan Thùy Thảo Ngân", date: "30/03/2026", isPaid: false },
    ],
    payments: []
  },
  {
    id: "agoda",
    name: "AGODA",
    totalDebt: "3,215,054",
    remainingDebt: "0",
    items: [
      { id: "SI5145", room: "5145", arrival: "28/03/2026", departure: "01/04/2026", note: "ĐỢI MS UYÊN CẤP MÃ CT", amount: "3,215,054", cashier: "Admin", date: "01/04/2026", isPaid: true },
    ],
    payments: [
      { date: "01/04/2026 13:41", method: "Credit Card", note: "ĐÃ CT GIÁ THU VỀ 2,572,042 VND TRONG LIÊN CT", amount: "3,215,054", user: "Nguyễn Thị Hải Yến" }
    ]
  },
  {
    id: "haha",
    name: "HAHA TRAVEL",
    totalDebt: "960,000",
    remainingDebt: "960,000",
    items: [
      { id: "SI5298", room: "5298", arrival: "01/04/2026", departure: "02/04/2026", note: "CÔNG NỢ MR ẨN", amount: "960,000", cashier: "Nguyễn Hồ Bảo Trân", date: "02/04/2026", isPaid: false },
    ],
    payments: []
  }
];

const CompanyDebtReportPage = ({ onBack }: CompanyDebtReportPageProps) => {
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanyDebts[0] | null>(null);

  // Totals from user request
  const grandTotal = "31,403,459";
  const grandRemaining = "23,330,905";

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
            <h1 className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Công nợ công ty</h1>
            <p className="text-[7px] font-bold text-slate-300">30/03/2026 ~ 05/04/2026</p>
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
        <div className="bg-slate-800 rounded-xl p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
               <Wallet className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-[6px] font-black text-white/50 uppercase tracking-widest leading-none mb-0.5">Tiền còn nợ</p>
              <h4 className="text-[11px] font-black leading-none text-amber-400 font-mono tracking-tighter">{grandRemaining}đ</h4>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[6px] font-black text-white/40 uppercase tracking-widest leading-none mb-0.5">Tổng phát sinh</p>
             <p className="text-[10px] font-bold text-white/80 leading-none font-mono tracking-tighter">{grandTotal}đ</p>
          </div>
        </div>
      </div>

      {/* Grid of Companies - 2 Columns */}
      <div className="p-3 grid grid-cols-2 gap-2">
        {mockCompanyDebts.map((company) => (
          <button 
            key={company.id} 
            onClick={() => setSelectedCompany(company)}
            className="bg-white rounded-xl border border-slate-100 p-2.5 flex flex-col shadow-sm active:scale-95 transition-all relative overflow-hidden h-[90px]"
          >
            {company.remainingDebt === "0" && (
              <div className="absolute top-0 right-0 p-1">
                <div className="bg-emerald-500 rounded-full w-1.5 h-1.5" />
              </div>
            )}
            
            <div className="flex items-center gap-1.5 mb-1.5">
               <Building2 className="w-3 h-3 text-[#1AB1A5]" />
               <span className="text-[9px] font-black text-slate-700 uppercase truncate text-left w-full">{company.name}</span>
            </div>

            <div className="space-y-1 mt-auto w-full">
               <div className="flex justify-between items-center bg-slate-50 px-1.5 py-1 rounded">
                  <span className="text-[6px] font-black text-slate-300 uppercase tracking-widest leading-none">Nợ:</span>
                  <span className={cn(
                    "text-[9px] font-black leading-none font-mono tracking-tighter",
                    company.remainingDebt !== "0" ? "text-amber-500" : "text-emerald-500"
                  )}>
                    {company.remainingDebt}đ
                  </span>
               </div>
               <p className="text-[7px] font-bold text-slate-400 text-right font-mono tracking-tighter">{company.totalDebt}đ</p>
            </div>
          </button>
        ))}
      </div>

      {/* Detail Sheet - Drawer from bottom */}
      <Sheet open={!!selectedCompany} onOpenChange={(open) => !open && setSelectedCompany(null)}>
        <SheetContent side="bottom" className="rounded-t-[1.5rem] p-0 border-t-0 shadow-2xl max-h-[95vh] overflow-y-auto max-w-md mx-auto left-0 right-0">
          {selectedCompany && (
            <div className="p-4 pt-8 space-y-4">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-200 rounded-full" />
              
              <SheetHeader className="text-left">
                <div className="flex items-center justify-between">
                  <div className="w-[80%]">
                    <SheetTitle className="text-base font-black text-slate-800 uppercase tracking-tighter leading-tight">
                      CÔNG NỢ {selectedCompany.name}
                    </SheetTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className={cn(
                        "px-1.5 py-0.5 rounded text-[8px] font-black border flex items-center gap-1",
                        selectedCompany.remainingDebt !== "0" ? "bg-amber-50 text-amber-500 border-amber-100" : "bg-emerald-50 text-emerald-500 border-emerald-100"
                      )}>
                         {selectedCompany.remainingDebt !== "0" ? <AlertCircle className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                         {selectedCompany.remainingDebt !== "0" ? `NỢ CÒN LẠI: ${selectedCompany.remainingDebt}đ` : "ĐÃ THANH TOÁN HẾT"}
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#1AB1A5]/10 rounded-xl flex items-center justify-center text-[#1AB1A5] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>
              </SheetHeader>

              {/* Debt Items List */}
              <div className="space-y-2">
                 <div className="flex items-center gap-1.5 text-[8px] font-black text-[#1AB1A5] uppercase tracking-widest pl-1">
                    <Receipt className="w-3.5 h-3.5" /> Khoản nợ chi tiết ({selectedCompany.items.length})
                 </div>
                 <div className="space-y-1.5">
                  {selectedCompany.items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-3 border border-slate-100 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-1.5">
                          <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-[#1AB1A5]">#{item.id}</span>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Phòng {item.room}</span>
                          </div>
                          <span className={cn(
                            "text-[10px] font-black font-mono tracking-tighter",
                            item.isPaid ? "text-emerald-500" : "text-amber-500"
                          )}>
                            {item.amount}đ
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                          <div className="space-y-0.5">
                            <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Ngày lưu trú</p>
                            <p className="text-[9px] font-bold text-slate-600 leading-none">{item.arrival} - {item.departure}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none">Thu ngân / Ngày</p>
                            <p className="text-[8px] font-bold text-slate-600 leading-none truncate">{item.cashier}</p>
                            <p className="text-[7px] font-bold text-slate-400 mt-0.5">{item.date}</p>
                          </div>
                          <div className="space-y-0.5 col-span-2 mt-1 bg-slate-50/50 p-1.5 rounded-lg border border-slate-100/50">
                            <p className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1 flex items-center gap-1">
                               <FileText className="w-2.5 h-2.5" /> Ghi chú
                            </p>
                            <p className="text-[9px] font-bold text-slate-500 italic leading-snug">"{item.note}"</p>
                          </div>
                        </div>
                    </div>
                  ))}
                 </div>
              </div>

              {/* Payment History List */}
              {selectedCompany.payments.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-[8px] font-black text-blue-500 uppercase tracking-widest pl-1 mt-2">
                      <CreditCard className="w-3.5 h-3.5" /> Lịch sử thanh toán
                  </div>
                  <div className="space-y-1.5">
                    {selectedCompany.payments.map((pay, idx) => (
                      <div key={idx} className="bg-blue-50/40 rounded-xl p-3 border border-blue-100 shadow-sm space-y-1.5">
                        <div className="flex items-center justify-between border-b border-blue-100/30 pb-1.5">
                            <div className="flex items-center gap-1">
                              <Banknote className="w-3 h-3 text-blue-500" />
                              <span className="text-[9px] font-black text-blue-600 uppercase tracking-tight">{pay.method}</span>
                            </div>
                            <span className="text-[10px] font-black text-blue-600 font-mono tracking-tighter">{pay.amount}đ</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[8px] font-bold text-blue-400">{pay.date}</span>
                              <span className="text-[8px] font-bold text-blue-600/60 uppercase">NV: {pay.user}</span>
                            </div>
                            <div className="bg-white/40 p-2 rounded-lg border border-blue-100/20">
                               <p className="text-[9px] font-bold text-blue-700/80 italic leading-snug">"{pay.note}"</p>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={() => setSelectedCompany(null)}
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

export default CompanyDebtReportPage;
