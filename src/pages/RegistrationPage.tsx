import { useState } from "react";
import { User, Mail, Phone, Building, Search, X, Plus, Minus, Info } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegistrationPageProps {
  onBack: () => void;
}

const Counter = ({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) => (
  <div className="flex items-center justify-between py-2 border-b border-border last:border-0 grow">
    <span className="text-xs font-semibold">{label}</span>
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-primary border border-border"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-sm font-bold min-w-[1rem] text-center">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

const RegistrationPage = ({ onBack }: RegistrationPageProps) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [hasBreakfast, setHasBreakfast] = useState(true);

  return (
    <div className="min-h-screen bg-white pb-12 animate-in fade-in duration-500">
      {/* Unified AppHeader */}
      <AppHeader title="Đặt phòng mới" icon={Plus} variant="white" onAddRoom={onBack} />

      <div className="px-4 py-2 space-y-4">
        {/* Guest Info - 2 Columns per row (Optimized High Density) */}
        <div className="space-y-1.5">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <Label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Tên đăng ký</Label>
              <Input placeholder="Nhập tên..." className="h-8 text-[10px] bg-white rounded-lg border-slate-200" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</Label>
              <Input placeholder="Nhập email..." className="h-8 text-[10px] bg-white rounded-lg border-slate-200" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <Label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</Label>
              <Input placeholder="Số điện thoại..." className="h-8 text-[10px] bg-white rounded-lg border-slate-200" />
            </div>
            <div className="space-y-0.5">
              <Label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Công ty</Label>
              <Select><SelectTrigger className="h-8 text-[10px] bg-white rounded-lg"><SelectValue placeholder="Chọn công ty" /></SelectTrigger></Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-0.5">
              <Label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Thị trường</Label>
              <Select><SelectTrigger className="h-8 text-[10px] bg-white rounded-lg"><SelectValue placeholder="Thị trường" /></SelectTrigger></Select>
            </div>
            <div className="space-y-0.5">
              <Label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Nguồn khách</Label>
              <Select><SelectTrigger className="h-8 text-[10px] bg-white rounded-lg"><SelectValue placeholder="Nguồn khách" /></SelectTrigger></Select>
            </div>
          </div>
        </div>

        {/* Enhanced Room Table - Now including Em Bé column */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-[9px] font-black uppercase text-[#1AB1A5] tracking-widest">Danh sách phòng</h3>
             <button className="text-[8px] font-black text-[#1AB1A5] flex items-center gap-0.5 hover:underline">+ Thêm mới</button>
          </div>
          
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
             <table className="w-full text-left border-collapse min-w-[850px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                   <tr>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase">Loại phòng</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase">Ngày đến - đi</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase text-center">Trống</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase text-center">SL</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase">Loại giá</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase">Giá</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase text-center">N.Lớn</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase text-center">Trẻ em</th>
                      <th className="p-2 text-[8px] font-black text-slate-400 uppercase text-center">Em bé</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {["Đơn cơ bản", "Đôn Cao Cấp", "Luxury", "Luxury Extreme", "Double Room"].map((room, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                         <td className="p-2">
                            <span className="text-[9px] font-black text-slate-700">{room}</span>
                         </td>
                         <td className="p-2">
                            <div className="flex items-center gap-1">
                               <input type="text" defaultValue="01/04/2026" className="w-[66px] h-7 text-[8px] border border-slate-100 rounded px-1" />
                               <span className="text-slate-300">→</span>
                               <input type="text" defaultValue="02/04/2026" className="w-[66px] h-7 text-[8px] border border-slate-100 rounded px-1" />
                            </div>
                         </td>
                         <td className="p-2 text-center text-[9px] font-black text-emerald-600">12</td>
                         <td className="p-2">
                            <div className="flex items-center justify-center gap-1">
                               <button className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 text-[8px] font-black">-</button>
                               <span className="text-[9px] font-black">0</span>
                               <button className="w-5 h-5 rounded-full bg-[#1AB1A5] text-white text-[8px] font-black">+</button>
                            </div>
                         </td>
                         <td className="p-2">
                            <Select><SelectTrigger className="h-7 w-24 text-[8px] border-slate-100"><SelectValue placeholder="Chọn loại" /></SelectTrigger></Select>
                         </td>
                         <td className="p-2">
                            <div className="flex items-center gap-1">
                               <input type="text" defaultValue="0" className="w-20 h-7 text-[9px] font-black text-[#1AB1A5] border border-slate-100 rounded px-1" />
                               <span className="text-[7px] text-slate-400 font-black">VND</span>
                            </div>
                         </td>
                         <td className="p-2">
                            <div className="flex items-center justify-center gap-1">
                               <button className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 text-[8px] font-black">-</button>
                               <span className="text-[9px] font-black">0</span>
                               <button className="w-5 h-5 rounded-full bg-[#1AB1A5] text-white text-[8px] font-black">+</button>
                            </div>
                         </td>
                         <td className="p-2">
                            <div className="flex items-center justify-center gap-1">
                               <button className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 text-[8px] font-black">-</button>
                               <span className="text-[9px] font-black">0</span>
                               <button className="w-5 h-5 rounded-full bg-[#1AB1A5] text-white text-[8px] font-black">+</button>
                            </div>
                         </td>
                         <td className="p-2">
                            <div className="flex items-center justify-center gap-1">
                               <button className="w-5 h-5 rounded-full bg-slate-50 border border-slate-100 text-[8px] font-black">-</button>
                               <span className="text-[9px] font-black">0</span>
                               <button className="w-5 h-5 rounded-full bg-[#1AB1A5] text-white text-[8px] font-black">+</button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* Global Options - Full Width Compact */}
        <div className="bg-white rounded-xl p-2.5 border border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-50 text-orange-500 rounded flex items-center justify-center text-sm">🥐</div>
              <div>
                 <Label className="text-[9px] font-black text-slate-700">Tiêu chuẩn ăn sáng</Label>
                 <p className="text-[7px] text-slate-400 font-black uppercase mt-0.5">Áp dụng cho mọi phòng được chọn</p>
              </div>
           </div>
           <Switch className="scale-75 data-[state=checked]:bg-[#1AB1A5]" />
        </div>

        {/* Textarea Area */}
        <div className="space-y-1">
           <Label className="text-[7px] font-black text-slate-400 uppercase tracking-widest ml-1">Yêu cầu đặc biệt / Ghi chú</Label>
           <Textarea placeholder="Vd: Check-in sớm, trang trí nệm..." className="h-14 text-[9px] bg-white rounded-lg border-slate-200 resize-none px-2" />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 pb-6">
           <Button variant="outline" className="h-10 text-[10px] font-black rounded-xl border-slate-200 shadow-sm" onClick={onBack}>HỦY THAO TÁC</Button>
           <Button className="h-10 text-[10px] font-black rounded-xl bg-[#1AB1A5] hover:bg-[#15948a] shadow-sm" onClick={onBack}>HOÀN TẤT ĐẶT PHÒNG</Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
