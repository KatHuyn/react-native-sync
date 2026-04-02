import { useState } from "react";
import { 
  User, CheckCircle, Calendar, Paintbrush, Lock, BedDouble, Search,
  MoreHorizontal, Info, ArrowRightLeft, PlusCircle, LogOut, 
  LayoutGrid, X
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

type RoomStatus = "occupied" | "available" | "reserved";

interface Room {
  number: string;
  type: string;
  status: RoomStatus;
  guest?: string;
  dates?: string;
  price: string;
  maxGuests: number;
  floor: number;
  isDirty?: boolean;
  isLocked?: boolean;
  hasExtraBed?: boolean;
}

const statusConfig: Record<RoomStatus, { label: string; bg: string; textColor: string }> = {
  occupied: { label: "Đang ở", bg: "bg-[#0EA5E9]", textColor: "text-white" },
  available: { label: "Phòng trống", bg: "bg-[#10B981]", textColor: "text-white" },
  reserved: { label: "Đặt trước", bg: "bg-[#F59E0B]", textColor: "text-white" },
};

const statusFilters: { key: RoomStatus | "all"; label: string; color: string; activeColor: string }[] = [
  { key: "all", label: "Tất cả", color: "border-slate-200 text-slate-600", activeColor: "bg-slate-700 text-white border-slate-700" },
  { key: "available", label: "Phòng trống", color: "border-emerald-200 text-emerald-700", activeColor: "bg-emerald-500 text-white border-emerald-500" },
  { key: "reserved", label: "Đặt trước", color: "border-amber-200 text-amber-700", activeColor: "bg-amber-500 text-white border-amber-500" },
  { key: "occupied", label: "Đang ở", color: "border-sky-200 text-sky-700", activeColor: "bg-sky-500 text-white border-sky-500" },
];

const mockRooms: Room[] = [
  // Tầng 1
  { number: "101", type: "Superior", status: "occupied", guest: "Nguyễn Văn An", dates: "03-30 → 04-02", price: "1.200.000", maxGuests: 2, floor: 1 },
  { number: "102", type: "Deluxe", status: "occupied", guest: "Trần Thị Bình", dates: "03-31 → 04-03", price: "1.800.000", maxGuests: 2, floor: 1, isDirty: true },
  { number: "103", type: "Suite", status: "occupied", guest: "Lê Hoàng Cường", dates: "04-01 → 04-04", price: "3.000.000", maxGuests: 4, floor: 1, hasExtraBed: true },
  { number: "104", type: "VIP", status: "available", price: "5.000.000", maxGuests: 4, floor: 1 },
  { number: "105", type: "Standard", status: "available", price: "800.000", maxGuests: 2, floor: 1, isDirty: true },
  { number: "106", type: "Superior", status: "reserved", price: "1.200.000", maxGuests: 2, floor: 1 },
  { number: "107", type: "Deluxe", status: "available", price: "1.800.000", maxGuests: 3, floor: 1, isLocked: true },
  { number: "108", type: "Suite", status: "reserved", price: "3.000.000", maxGuests: 4, floor: 1, isLocked: true },
  // Tầng 2
  { number: "201", type: "VIP", status: "occupied", guest: "Phạm Minh Đức", dates: "03-29 → 04-01", price: "5.000.000", maxGuests: 4, floor: 2, hasExtraBed: true },
  { number: "202", type: "Standard", status: "occupied", guest: "Đặng Văn E", dates: "03-28 → 04-02", price: "800.000", maxGuests: 2, floor: 2, isDirty: true },
  { number: "203", type: "Superior", status: "available", price: "1.200.000", maxGuests: 2, floor: 2 },
  { number: "204", type: "Deluxe", status: "available", price: "1.800.000", maxGuests: 3, floor: 2 },
  { number: "205", type: "Suite", status: "reserved", price: "3.000.000", maxGuests: 4, floor: 2, hasExtraBed: true },
];

// ===== Condition Icons on room cards =====
const ConditionBadges = ({ room }: { room: Room }) => {
  const badges = [];
  if (room.isDirty) badges.push({ icon: Paintbrush, color: "text-rose-500 bg-rose-50", tip: "Bẩn" });
  if (room.isLocked) badges.push({ icon: Lock, color: "text-slate-500 bg-slate-100", tip: "Khóa" });
  if (room.hasExtraBed) badges.push({ icon: BedDouble, color: "text-indigo-500 bg-indigo-50", tip: "Giường phụ" });
  
  if (badges.length === 0) return null;
  
  return (
    <div className="flex items-center gap-1">
      {badges.map((b, i) => (
        <span key={i} className={cn("w-4 h-4 rounded flex items-center justify-center", b.color)} title={b.tip}>
          <b.icon className="w-2.5 h-2.5" />
        </span>
      ))}
    </div>
  );
};

// ===== Room Card =====
const RoomCard = ({ room, onSelect }: { room: Room; onSelect: (id: string) => void }) => {
  const config = statusConfig[room.status];
  
  return (
    <div 
      onClick={() => onSelect(room.number)}
      className="bg-white rounded-lg shadow-sm overflow-hidden border border-slate-100 active:scale-[0.97] transition-all cursor-pointer"
    >
      <div className={cn(config.bg, config.textColor, "px-2 py-1.5 flex items-center justify-between")}>
        <span className="font-black text-[11px] tracking-tight truncate leading-none">{room.number} {room.type}</span>
        <div className="flex items-center gap-1">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="p-0.5 hover:bg-white/20 rounded-md transition-colors"
                >
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 rounded-lg shadow-xl border-slate-200 p-1">
                {room.status === "occupied" ? (
                  <>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Info className="w-3.5 h-3.5 mr-2 text-slate-400" /> Thông tin</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><ArrowRightLeft className="w-3.5 h-3.5 mr-2 text-slate-400" /> Chuyển phòng</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><PlusCircle className="w-3.5 h-3.5 mr-2 text-slate-400" /> Thêm dịch vụ</DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium text-red-500"><LogOut className="w-3.5 h-3.5 mr-2" /> Trả phòng</DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Paintbrush className="w-3.5 h-3.5 mr-2 text-rose-400" /> Phòng bẩn</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Sẵn sàng</DropdownMenuItem>
                  </>
                ) : room.status === "available" ? (
                  <>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><User className="w-3.5 h-3.5 mr-2 text-sky-400" /> Nhận phòng nhanh</DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Paintbrush className="w-3.5 h-3.5 mr-2 text-rose-400" /> Phòng bẩn</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Sẵn sàng</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Lock className="w-3.5 h-3.5 mr-2 text-slate-400" /> Phòng khóa</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Info className="w-3.5 h-3.5 mr-2 text-slate-400" /> Thông tin</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><ArrowRightLeft className="w-3.5 h-3.5 mr-2 text-slate-400" /> Chuyển phòng</DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Paintbrush className="w-3.5 h-3.5 mr-2 text-rose-400" /> Phòng bẩn</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><CheckCircle className="w-3.5 h-3.5 mr-2 text-emerald-400" /> Sẵn sàng</DropdownMenuItem>
                    <DropdownMenuItem className="text-[11px] py-1.5 font-medium"><Lock className="w-3.5 h-3.5 mr-2 text-slate-400" /> Phòng khóa</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
           </DropdownMenu>
        </div>
      </div>
      
      <div className="p-2.5 h-[76px] flex flex-col justify-between">
        {room.guest ? (
          <div className="space-y-1.5">
            <p className="font-bold text-[11px] text-slate-800 truncate leading-tight">{room.guest}</p>
            <p className="text-[8px] text-slate-500 font-bold flex items-center gap-1 leading-tight">
               <Calendar className="w-2 h-2 shrink-0" /> {room.dates}
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <p className={cn("text-[9px] font-black uppercase tracking-tight leading-tight", 
              room.status === "available" ? "text-emerald-500" : "text-amber-600"
            )}>
              {config.label}
            </p>
            <p className="text-[8px] text-slate-400 font-bold leading-tight">👤 Tối đa {room.maxGuests}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-1.5">
            <p className="text-[9px] font-black text-cyan-600 leading-none">{room.price}</p>
            <span className="text-[7px] text-slate-400 font-bold uppercase leading-none">VND</span>
          </div>
          <ConditionBadges room={room} />
        </div>
      </div>
    </div>
  );
};

// ===== Main Page =====
const RoomMapPage = ({ onNavigate }: { onNavigate: (t: string, id?: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState<RoomStatus | "all">("all");
  const [showLegend, setShowLegend] = useState(false);

  const filteredRooms = activeFilter === "all" 
    ? mockRooms 
    : mockRooms.filter(r => r.status === activeFilter);

  const getCount = (status: RoomStatus | "all") => {
    if (status === "all") return mockRooms.length;
    return mockRooms.filter(r => r.status === status).length;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <AppHeader title="Sơ đồ phòng" icon={LayoutGrid} variant="white" />
      
      <div className="px-4 py-2 space-y-3">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl p-2.5 shadow-sm border border-slate-100">
          <div className="flex items-center gap-1.5">
            {/* Search icon */}
            <button className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
              <Search className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Status filters */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide flex-1">
              {statusFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold whitespace-nowrap transition-all active:scale-95 border",
                    activeFilter === f.key ? f.activeColor : f.color
                  )}
                >
                  {f.label}
                  <span className={cn(
                    "text-[8px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-1",
                    activeFilter === f.key ? "bg-white/25" : "bg-slate-100"
                  )}>
                    {getCount(f.key)}
                  </span>
                </button>
              ))}
            </div>

            {/* Legend button */}
            <button 
              onClick={() => setShowLegend(!showLegend)}
              className={cn(
                "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all",
                showLegend 
                  ? "bg-cyan-500 border-cyan-500 text-white" 
                  : "bg-slate-50 border-slate-100 text-slate-400"
              )}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Legend Panel (toggle) */}
          {showLegend && (
            <div className="mt-2 pt-2 border-t border-slate-100 animate-in fade-in slide-in-from-top-1 duration-200">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Tình trạng phòng</p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-rose-50 flex items-center justify-center">
                    <Paintbrush className="w-3 h-3 text-rose-500" />
                  </span>
                  <span className="text-[9px] font-semibold text-slate-600">Phòng bẩn</span>
                  <span className="text-[8px] font-black text-rose-500 bg-rose-50 rounded-full px-1.5 py-0.5">
                    {mockRooms.filter(r => r.isDirty).length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center">
                    <Lock className="w-3 h-3 text-slate-500" />
                  </span>
                  <span className="text-[9px] font-semibold text-slate-600">Phòng khóa</span>
                  <span className="text-[8px] font-black text-slate-500 bg-slate-100 rounded-full px-1.5 py-0.5">
                    {mockRooms.filter(r => r.isLocked).length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-indigo-50 flex items-center justify-center">
                    <BedDouble className="w-3 h-3 text-indigo-500" />
                  </span>
                  <span className="text-[9px] font-semibold text-slate-600">Giường phụ</span>
                  <span className="text-[8px] font-black text-indigo-500 bg-indigo-50 rounded-full px-1.5 py-0.5">
                    {mockRooms.filter(r => r.hasExtraBed).length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floor Groups */}
        <div className="space-y-4">
          {[1, 2].map((floor) => {
            const floorRooms = filteredRooms.filter(r => r.floor === floor);
            if (floorRooms.length === 0) return null;
            return (
              <div key={floor} className="space-y-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tầng {floor}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {floorRooms.map((room) => (
                    <RoomCard key={room.number} room={room} onSelect={(id) => onNavigate("roomDetail", id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Circle FAB Button - Final Unified Version */}
      <button 
        onClick={() => onNavigate("registration")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[80] hover:scale-110 active:scale-95 transition-all border-4 border-white"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default RoomMapPage;
