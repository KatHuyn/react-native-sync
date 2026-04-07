import { useState } from "react";
import { ChevronLeft, Building2, Wallet, MapPin, User, AlertCircle, CheckCircle2, CreditCard, Banknote, FileText, Receipt, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ReportTable, { Column } from "@/components/ReportTable";

interface CompanyDebtReportPageProps {
  onBack: () => void;
}

interface DebtItem {
  id: string;
  room: string;
  arrival: string;
  departure: string;
  note: string;
  amount: string;
  cashier: string;
  date: string;
  isPaid: boolean;
}

interface PaymentItem {
  date: string;
  method: string;
  note: string;
  amount: string;
  user: string;
}

interface CompanyDebtRow {
  id: string;
  name: string;
  totalDebt: string;
  remainingDebt: string;
  items: DebtItem[];
  payments: PaymentItem[];
}

const mockCompanyDebts: CompanyDebtRow[] = [
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
    payments: [
      { date: "02/04/2026 09:15", method: "Credit Card", note: "Thanh toán cọc đợt 1 - VCC", amount: "10,000,000", user: "Phan Thùy Thảo Ngân" },
      { date: "02/04/2026 14:30", method: "Bank transfer", note: "Thanh toán phần còn lại - Chuyển khoản Vietcombank", amount: "11,595,907", user: "Đoàn Nguyễn Quỳnh Như" }
    ]
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

const companyColumns: Column<CompanyDebtRow>[] = [
  {
    key: "name",
    label: "Công ty",
    sticky: true,
    width: 140,
    minWidth: 140,
    render: (val, row, expanded) => (
      <div className="flex items-center gap-1.5">
        <div className="w-4 flex items-center justify-center shrink-0">
          {expanded ? (
            <ChevronDown className="w-3.5 h-3.5 text-[#1AB1A5]" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          )}
        </div>
        <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="text-[8px] font-black text-slate-700 uppercase truncate">
            {val}
          </span>
          {row.remainingDebt === "0" && (
            <div className="flex items-center gap-0.5">
              <CheckCircle2 className="w-2 h-2 text-emerald-500 shrink-0" />
              <span className="text-[6px] font-bold text-emerald-500 uppercase tracking-tighter">Hoàn tất</span>
            </div>
          )}
        </div>
      </div>
    ),
  },
  {
    key: "totalDebt",
    label: "Tổng nợ",
    minWidth: 85,
    align: "right",
    render: (val) => (
      <span className="text-[8px] font-bold text-slate-500">{val}đ</span>
    ),
  },
  {
    key: "remainingDebt",
    label: "Còn lại",
    minWidth: 85,
    align: "right",
    render: (val) => (
      <span className={cn(
        "text-[8px] font-black",
        val !== "0" ? "text-amber-500" : "text-emerald-500"
      )}>
        {val}đ
      </span>
    ),
  },
  {
    key: "items",
    label: "Bookings",
    width: 60,
    minWidth: 60,
    align: "center",
    sortable: false,
    filterable: false,
    render: (val) => (
      <span className="text-[8px] font-black text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
        {(val as DebtItem[]).length}
      </span>
    ),
  },
  {
    key: "payments",
    label: "Đã thanh toán",
    minWidth: 95,
    align: "right",
    sortable: false,
    filterable: false,
    render: (val) => {
      const payments = val as PaymentItem[];
      const totalPaid = payments.reduce(
        (sum, p) => sum + parseInt(p.amount.replace(/,/g, "")),
        0
      );
      return payments.length > 0 ? (
        <div className="text-right">
          <span className="text-[8px] font-black text-emerald-600">{totalPaid.toLocaleString()}đ</span>
          <span className="text-[6px] font-bold text-slate-300 block">({payments.length} lần)</span>
        </div>
      ) : (
        <span className="text-[7px] font-bold text-slate-300 italic">Chưa TT</span>
      );
    },
  },
];

const CompanyDebtReportPage = ({ onBack }: CompanyDebtReportPageProps) => {
  const grandTotal = "31,403,459";
  const grandRemaining = "23,330,905";

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between">
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

      {/* Hotel Address */}
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
      <div className="px-3 pt-3 pb-1">
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

      {/* Company Table with Expandable Details */}
      <ReportTable
        columns={companyColumns}
        data={mockCompanyDebts}
        rowKey={(row) => row.id}
        expandedContent={(row) => (
          <div className="px-3 py-2 space-y-3">
            {/* Debt items sub-table */}
            <div>
              <div className="flex items-center gap-1.5 text-[7px] font-black text-[#1AB1A5] uppercase tracking-widest mb-1.5">
                <Receipt className="w-3 h-3" /> Khoản nợ ({row.items.length})
              </div>
              <div className="bg-white rounded-lg border border-slate-100 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="px-2 py-1 text-[6px] font-black text-slate-400 uppercase tracking-wider text-left">Mã</th>
                      <th className="px-2 py-1 text-[6px] font-black text-slate-400 uppercase tracking-wider text-left">Lưu trú</th>
                      <th className="px-2 py-1 text-[6px] font-black text-slate-400 uppercase tracking-wider text-right">Số tiền</th>
                      <th className="px-2 py-1 text-[6px] font-black text-slate-400 uppercase tracking-wider text-left">Thu ngân</th>
                      <th className="px-2 py-1 text-[6px] font-black text-slate-400 uppercase tracking-wider text-left">Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.items.map((item, idx) => (
                      <tr key={idx} className={cn("border-t border-slate-50", idx % 2 === 1 && "bg-slate-50/30")}>
                        <td className="px-2 py-1">
                          <span className="text-[7px] font-black text-[#1AB1A5]">#{item.id}</span>
                        </td>
                        <td className="px-2 py-1">
                          <span className="text-[7px] font-bold text-slate-500">{item.arrival} → {item.departure}</span>
                        </td>
                        <td className="px-2 py-1 text-right">
                          <span className={cn(
                            "text-[7px] font-black",
                            item.isPaid ? "text-emerald-500" : "text-amber-500"
                          )}>
                            {item.amount}đ
                          </span>
                        </td>
                        <td className="px-2 py-1">
                          <span className="text-[6px] font-bold text-slate-400 truncate block max-w-[80px]">{item.cashier}</span>
                        </td>
                        <td className="px-2 py-1">
                          <span className="text-[6px] font-bold text-slate-400 italic truncate block max-w-[100px]">{item.note}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment history - Bill style */}
            {row.payments.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[7px] font-black text-blue-500 uppercase tracking-widest mb-1.5">
                  <CreditCard className="w-3 h-3" /> Chi tiết thanh toán ({row.payments.length} lần)
                </div>
                <div className="bg-white rounded-lg border border-blue-100 overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-blue-50">
                        <th className="px-1.5 py-1 text-[6px] font-black text-blue-400 uppercase tracking-wider text-center w-6">#</th>
                        <th className="px-1.5 py-1 text-[6px] font-black text-blue-400 uppercase tracking-wider text-left">Ngày giờ</th>
                        <th className="px-1.5 py-1 text-[6px] font-black text-blue-400 uppercase tracking-wider text-left">Hình thức</th>
                        <th className="px-1.5 py-1 text-[6px] font-black text-blue-400 uppercase tracking-wider text-right">Số tiền</th>
                        <th className="px-1.5 py-1 text-[6px] font-black text-blue-400 uppercase tracking-wider text-left">NV thu</th>
                        <th className="px-1.5 py-1 text-[6px] font-black text-blue-400 uppercase tracking-wider text-left">Nội dung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {row.payments.map((pay, idx) => (
                        <tr key={idx} className={cn("border-t border-blue-50", idx % 2 === 1 && "bg-blue-50/20")}>
                          <td className="px-1.5 py-1.5 text-center">
                            <span className="text-[7px] font-black text-blue-400">{idx + 1}</span>
                          </td>
                          <td className="px-1.5 py-1.5">
                            <span className="text-[7px] font-bold text-slate-700 whitespace-nowrap">{pay.date}</span>
                          </td>
                          <td className="px-1.5 py-1.5">
                            <span className="inline-flex items-center gap-0.5 text-[6px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase whitespace-nowrap">
                              <Banknote className="w-2 h-2" />
                              {pay.method}
                            </span>
                          </td>
                          <td className="px-1.5 py-1.5 text-right">
                            <span className="text-[8px] font-black text-emerald-600 whitespace-nowrap">{pay.amount}đ</span>
                          </td>
                          <td className="px-1.5 py-1.5">
                            <span className="text-[6px] font-bold text-slate-500 truncate block max-w-[80px]">{pay.user}</span>
                          </td>
                          <td className="px-1.5 py-1.5">
                            <span className="text-[6px] font-bold text-slate-400 italic leading-tight block">{pay.note}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-blue-200 bg-blue-50/50">
                        <td colSpan={3} className="px-1.5 py-1.5 text-right">
                          <span className="text-[7px] font-black text-blue-500 uppercase tracking-widest">Tổng đã TT:</span>
                        </td>
                        <td className="px-1.5 py-1.5 text-right">
                          <span className="text-[8px] font-black text-emerald-600">
                            {row.payments.reduce((sum, p) => sum + parseInt(p.amount.replace(/,/g, "")), 0).toLocaleString()}đ
                          </span>
                        </td>
                        <td colSpan={2}></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default CompanyDebtReportPage;
