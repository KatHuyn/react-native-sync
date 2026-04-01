import { useState } from "react";
import { 
  User, CheckCircle, Calendar, Paintbrush, Wrench, ChevronDown, 
  MoreHorizontal, Info, ArrowRightLeft, PlusCircle, LogOut, 
  Trash2, Sparkles, LayoutGrid, Sun, Bell, Settings, Plus
} from "lucide-react";
import AppHeader from "@/components/AppHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type RoomStatus = "occupied" | "available" | "reserved" | "cleaning" | "maintenance";

interface Room {
  number: string;
  type: string;
  status: RoomStatus;
  guest?: string;
  dates?: string;
  price: string;
  maxGuests: number;
  floor: number;
}

const statusConfig: Record<RoomStatus, { label: string; bg: string; textColor: string; dot: string; icon: any }> = {
  occupied: { label: "Đang ở", bg: "bg-[#0EA5E9]", textColor: "text-white", dot: "bg-white", icon: User },
  available: { label: "Trống", bg: "bg-[#10B981]", textColor: "text-white", dot: "bg-white", icon: CheckCircle },
  reserved: { label: "Đã đặt", bg: "bg-[#F59E0B]", textColor: "text-white", dot: "bg-white", icon: Calendar },
  cleaning: { label: "Cần dọn", bg: "bg-[#F97316]", textColor: "text-white", dot: "bg-white", icon: Paintbrush },
  maintenance: { label: "Bảo trì", bg: "bg-[#94A3B8]", textColor: "text-white", dot: "bg-white", icon: Wrench },
};

const mockRooms: Room[] = [
  // Tầng 1
  { number: "101", type: "Superior", status: "occupied", guest: "Nguyễn Văn An", dates: "03-30 → 04-02", price: "1.200.000", maxGuests: 2, floor: 1 },
  { number: "102", type: "Deluxe", status: "occupied", guest: "Trần Thị Bình", dates: "03-31 → 04-03", price: "1.800.000", maxGuests: 2, floor: 1 },
  { number: "103", type: "Suite", status: "occupied", guest: "Lê Hoàng Cường", dates: "04-01 → 04-04", price: "3.000.000", maxGuests: 4, floor: 1 },
  { number: "104", type: "VIP", status: "available", price: "5.000.000", maxGuests: 4, floor: 1 },
  { number: "105", type: "Standard", status: "available", price: "800.000", maxGuests: 2, floor: 1 },
  { number: "106", type: "Superior", status: "reserved", price: "1.200.000", maxGuests: 2, floor: 1 },
  { number: "107", type: "Deluxe", status: "cleaning", price: "1.800.000", maxGuests: 3, floor: 1 },
  { number: "108", type: "Suite", status: "maintenance", price: "3.000.000", maxGuests: 4, floor: 1 },
  // Tầng 2
  { number: "201", type: "VIP", status: "occupied", guest: "Phạm Minh Đức", dates: "03-29 → 04-01", price: "5.000.000", maxGuests: 4, floor: 2 },
  { number: "202", type: "Standard", status: "occupied", price: "800.000", maxGuests: 2, floor: 2 },
  { number: "203", type: "Superior", status: "occupied", price: "1.200.000", maxGuests: 2, floor: 2 },
  { number: "204", type: "Deluxe", status: "available", price: "1.800.000", maxGuests: 3, floor: 2 },
  { number: "205", type: "Suite", status: "available", price: "3.000.000", maxGuests: 4, floor: 2 },
];

const FilterBadge = ({ label, active, dotColor }: { label: string; active?: boolean; dotColor?: string }) => (
  <button className={cn(
    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all active:scale-95",
    active ? "bg-cyan-500 text-white shadow-sm shadow-cyan-200" : "bg-white border border-slate-200 text-slate-500"
  )}>
    {dotColor && <span className={cn("w-2 h-2 rounded-full", dotColor, active && "bg-white")} />}
    {label}
  </button>
);

const RoomCard = ({ room, onSelect }: { room: Room; onSelect: (id: string) => void }) => {
  const config = statusConfig[room.status];
  
  return (
    <div 
      onClick={() => onSelect(room.number)}
      className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden border border-slate-100 active:scale-[0.97] transition-all cursor-pointer"
    >
      <div className={cn(config.bg, config.textColor, "px-3 py-2 flex items-center justify-between")}>
        <span className="font-black text-xs tracking-tight">{room.number} {room.type}</span>
        <div className="flex items-center gap-2">
           {room.status === "occupied" && <config.icon className="w-3 h-3 opacity-80" />}
           {room.status === "reserved" && <config.icon className="w-3 h-3 opacity-80" />}
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-slate-200">
                <DropdownMenuItem><Info className="w-4 h-4 mr-2" /> Chi tiết</DropdownMenuItem>
                <DropdownMenuItem><ArrowRightLeft className="w-4 h-4 mr-2" /> Chuyển phòng</DropdownMenuItem>
                <DropdownMenuItem><PlusCircle className="w-4 h-4 mr-2" /> Dịch vụ</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500"><LogOut className="w-4 h-4 mr-2" /> Trả phòng</DropdownMenuItem>
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>
      
      <div className="p-3 h-[84px] flex flex-col justify-between">
        {room.guest ? (
          <div className="space-y-0.5">
            <p className="font-bold text-xs text-slate-800 truncate">{room.guest}</p>
            <p className="text-[9px] text-slate-500 font-bold flex items-center gap-1 opacity-70">
               <Calendar className="w-2.5 h-2.5" /> {room.dates}
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            <p className={cn("text-[10px] font-black uppercase tracking-widest", 
              room.status === "available" ? "text-emerald-500" : 
              room.status === "cleaning" ? "text-orange-500" : "text-slate-400"
            )}>
              {config.label}
            </p>
            <p className="text-[9px] text-slate-400 font-bold">👥 Tối đa {room.maxGuests} khách</p>
          </div>
        )}
        
        <div className="flex items-center gap-1 pt-1 border-t border-slate-50 mt-auto">
           <p className="text-[10px] font-black text-cyan-600">{room.price}</p>
           <span className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter">VND/đêm</span>
        </div>
      </div>
    </div>
  );
};

const RoomMapPage = ({ onNavigate }: { onNavigate: (t: string, id?: string) => void }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <AppHeader title="Sơ đồ phòng" icon={LayoutGrid} variant="white" />
      
      <div className="px-4 py-2 space-y-3">
        {/* Ultra-Compact Filters */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 space-y-1.5">
           <div className="flex items-center gap-2">
              <span className="text-[7px] font-black text-slate-400 uppercase w-8 shrink-0">Trạng:</span>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                 <FilterBadge label="Tất cả" active />
                 {["Trống", "Đang ở", "Đã đặt", "Cần dọn"].map(s => <FilterBadge key={s} label={s} />)}
              </div>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[7px] font-black text-slate-400 uppercase w-8 shrink-0">Tầng:</span>
              <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                 <FilterBadge label="Tất cả" active />
                 {[1,2,3,4,5].map(f => <FilterBadge key={f} label={f.toString()} />)}
              </div>
           </div>
        </div>

        {/* Floor Groups - Ultra Dense */}
        <div className="space-y-4">
          {[1, 2].map((floor) => (
            <div key={floor} className="space-y-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tầng {floor}</h3>
              <div className="grid grid-cols-2 gap-2">
                {mockRooms.filter(r => r.floor === floor).map((room) => (
                  <RoomCard key={room.number} room={room} onSelect={(id) => onNavigate("roomDetail", id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Circle FAB for nhanh Room Registration */}
      <button 
        onClick={() => onNavigate("registration")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[80] hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default RoomMapPage;
