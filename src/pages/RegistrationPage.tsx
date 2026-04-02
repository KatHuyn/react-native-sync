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
  <div className="flex items-center justify-between py-1 border-b border-border last:border-0 grow">
    <span className="text-[10px] font-semibold">{label}</span>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-5 h-5 rounded-md bg-secondary flex items-center justify-center text-primary border border-border"
      >
        <Minus className="w-2.5 h-2.5" />
      </button>
      <span className="text-[11px] font-bold min-w-[0.8rem] text-center">{value}</span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-5 h-5 rounded-md bg-primary flex items-center justify-center text-primary-foreground"
      >
        <Plus className="w-2.5 h-2.5" />
      </button>
    </div>
  </div>
);

const RegistrationPage = ({ onBack }: RegistrationPageProps) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);

  const [rooms, setRooms] = useState([
    { id: 1, name: "Đơn cơ bản", count: 0, adults: 0, children: 0, babies: 0, price: 0, hasBreakfast: true },
    { id: 2, name: "Đôn Cao Cấp", count: 0, adults: 0, children: 0, babies: 0, price: 0, hasBreakfast: true },
    { id: 3, name: "Luxury", count: 0, adults: 0, children: 0, babies: 0, price: 0, hasBreakfast: true },
    { id: 4, name: "Luxury Extreme", count: 0, adults: 0, children: 0, babies: 0, price: 0, hasBreakfast: true },
    { id: 5, name: "Double Room", count: 0, adults: 0, children: 0, babies: 0, price: 0, hasBreakfast: true },
  ]);

  const updateRoom = (id: number, field: string, value: any) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  return (
    <div className="min-h-screen bg-white pb-12 animate-in fade-in duration-500">
      {/* Unified AppHeader */}
      <AppHeader title="Đặt phòng mới" icon={Plus} variant="white" onAddRoom={onBack} />

      <div className="px-4 py-2 space-y-4">
        {/* Guest Info - 2 Columns per row (Optimized High Density) */}
        <div className="space-y-1">
          <div className="grid grid-cols-2 gap-1.5">
            <div className="space-y-0">
              <Label className="text-[6px] font-black text-slate-400 uppercase tracking-tighter ml-1 leading-none">Tên đăng ký</Label>
              <Input placeholder="Nhập tên..." className="h-7 text-[9px] bg-white rounded-md border-slate-200 px-2" />
            </div>
            <div className="space-y-0">
              <Label className="text-[6px] font-black text-slate-400 uppercase tracking-tighter ml-1 leading-none">Email</Label>
              <Input placeholder="Nhập email..." className="h-7 text-[9px] bg-white rounded-md border-slate-200 px-2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="space-y-0">
              <Label className="text-[6px] font-black text-slate-400 uppercase tracking-tighter ml-1 leading-none">Số điện thoại</Label>
              <Input placeholder="Số điện thoại..." className="h-7 text-[9px] bg-white rounded-md border-slate-200 px-2" />
            </div>
            <div className="space-y-0">
              <Label className="text-[6px] font-black text-slate-400 uppercase tracking-tighter ml-1 leading-none">Công ty</Label>
              <Select><SelectTrigger className="h-7 text-[9px] bg-white rounded-md px-2"><SelectValue placeholder="Chọn công ty" /></SelectTrigger></Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <div className="space-y-0">
              <Label className="text-[6px] font-black text-slate-400 uppercase tracking-tighter ml-1 leading-none">Thị trường</Label>
              <Select><SelectTrigger className="h-7 text-[9px] bg-white rounded-md px-2"><SelectValue placeholder="Thị trường" /></SelectTrigger></Select>
            </div>
            <div className="space-y-0">
              <Label className="text-[6px] font-black text-slate-400 uppercase tracking-tighter ml-1 leading-none">Nguồn khách</Label>
              <Select><SelectTrigger className="h-7 text-[9px] bg-white rounded-md px-2"><SelectValue placeholder="Nguồn khách" /></SelectTrigger></Select>
            </div>
          </div>
        </div>

        {/* Enhanced Room Table - Now including Em Bé column */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
             <h3 className="text-[9px] font-black uppercase text-[#1AB1A5] tracking-widest">Danh sách phòng</h3>
             <button className="text-[8px] font-black text-[#1AB1A5] flex items-center gap-0.5 hover:underline">+ Thêm mới</button>
          </div>
          
          <div className="bg-white rounded-lg border border-slate-100 shadow-sm overflow-x-auto scrollbar-hide">
             <table className="w-full text-left border-collapse min-w-[700px]">
                <thead className="bg-slate-50 border-b border-slate-100">
                   <tr>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase">Loại phòng</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase">Ngày đến - đi</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase text-center">Trống</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase text-center">SL</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase">Giá</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase text-center">N.Lớn</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase text-center">Trẻ em</th>
                      <th className="p-1.5 text-[7px] font-black text-slate-400 uppercase text-center">Ăn sáng</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {rooms.map((room) => (
                      <tr key={room.id} className="hover:bg-slate-50/50 transition-colors">
                         <td className="p-1.5">
                            <span className="text-[8px] font-black text-slate-700 leading-none">{room.name}</span>
                         </td>
                         <td className="p-1.5">
                            <div className="flex items-center gap-1">
                               <input type="text" defaultValue="01/04/2026" className="w-[50px] h-6 text-[7px] border border-slate-100 rounded px-1" />
                               <span className="text-slate-300 text-[6px]">→</span>
                               <input type="text" defaultValue="02/04/2026" className="w-[50px] h-6 text-[7px] border border-slate-100 rounded px-1" />
                            </div>
                         </td>
                         <td className="p-1.5 text-center text-[8px] font-black text-emerald-600">12</td>
                         <td className="p-1.5">
                            <div className="flex items-center justify-center gap-0.5">
                               <button 
                                 onClick={() => updateRoom(room.id, "count", Math.max(0, room.count - 1))}
                                 className="w-4 h-4 rounded bg-slate-50 border border-slate-100 text-[9px] font-black flex items-center justify-center"
                               >
                                 -
                               </button>
                               <span className="text-[9px] font-black w-3 text-center">{room.count}</span>
                               <button 
                                 onClick={() => updateRoom(room.id, "count", room.count + 1)}
                                 className="w-4 h-4 rounded bg-[#1AB1A5] text-white text-[9px] font-black flex items-center justify-center"
                               >
                                 +
                               </button>
                            </div>
                         </td>
                         <td className="p-1.5">
                            <div className="flex items-center gap-0.5">
                               <input 
                                 type="text" 
                                 value={room.price} 
                                 onChange={(e) => {
                                   const val = e.target.value.replace(/[^0-9]/g, "");
                                   updateRoom(room.id, "price", val ? parseInt(val) : 0);
                                 }}
                                 className="w-16 h-6 text-[8px] font-black text-[#1AB1A5] border border-slate-100 rounded px-1" 
                               />
                               <span className="text-[6px] text-slate-400 font-black">VND</span>
                            </div>
                         </td>
                         <td className="p-1.5">
                            <div className="flex items-center justify-center gap-0.5">
                               <button 
                                 onClick={() => updateRoom(room.id, "adults", Math.max(0, room.adults - 1))}
                                 className="w-4 h-4 rounded bg-slate-50 border border-slate-100 text-[9px] font-black flex items-center justify-center"
                               >
                                 -
                               </button>
                               <span className="text-[9px] font-black w-3 text-center">{room.adults}</span>
                               <button 
                                 onClick={() => updateRoom(room.id, "adults", room.adults + 1)}
                                 className="w-4 h-4 rounded bg-[#1AB1A5] text-white text-[9px] font-black flex items-center justify-center"
                               >
                                 +
                               </button>
                            </div>
                         </td>
                         <td className="p-1.5">
                            <div className="flex items-center justify-center gap-0.5">
                               <button 
                                 onClick={() => updateRoom(room.id, "children", Math.max(0, room.children - 1))}
                                 className="w-4 h-4 rounded bg-slate-50 border border-slate-100 text-[9px] font-black flex items-center justify-center"
                               >
                                 -
                               </button>
                               <span className="text-[9px] font-black w-3 text-center">{room.children}</span>
                               <button 
                                 onClick={() => updateRoom(room.id, "children", room.children + 1)}
                                 className="w-4 h-4 rounded bg-[#1AB1A5] text-white text-[9px] font-black flex items-center justify-center"
                               >
                                 +
                               </button>
                            </div>
                         </td>
                         <td className="p-1.5 text-center">
                            <Switch 
                               checked={room.hasBreakfast} 
                               onCheckedChange={(checked) => updateRoom(room.id, "hasBreakfast", checked)}
                               className="scale-[0.4] data-[state=checked]:bg-[#1AB1A5]" 
                            />
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
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
