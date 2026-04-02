import { useState } from "react";
import { 
  User, CheckCircle, Calendar, Paintbrush, Lock, BedDouble, Search,
  MoreHorizontal, Info, ArrowRightLeft, PlusCircle, LogOut, 
  LayoutGrid, X, Sparkles, Pencil
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
}

const statusConfig: Record<RoomStatus, { label: string; bg: string; border: string; text: string; lightBg: string }> = {
  occupied: { label: "Đang ở", bg: "bg-[#0EA5E9]", border: "border-[#0EA5E9]", text: "text-[#0EA5E9]", lightBg: "bg-[#0EA5E9]/10" },
  available: { label: "Phòng trống", bg: "bg-[#10B981]", border: "border-[#10B981]", text: "text-[#10B981]", lightBg: "bg-[#10B981]/10" },
  reserved: { label: "Đặt trước", bg: "bg-[#F59E0B]", border: "border-[#F59E0B]", text: "text-[#F59E0B]", lightBg: "bg-[#F59E0B]/10" },
};

const mockRooms: Room[] = [
  { number: "101", type: "Superior", status: "occupied", guest: "Nguyễn Văn An", dates: "03-30 → 04-02", price: "1.200.000", maxGuests: 2, floor: 1 },
  { number: "102", type: "Deluxe", status: "occupied", guest: "Trần Thị Bình", dates: "03-31 → 04-03", price: "1.800.000", maxGuests: 2, floor: 1, isDirty: true },
  { number: "103", type: "Suite", status: "occupied", guest: "Lê Hoàng Cường", dates: "04-01 → 04-04", price: "3.000.000", maxGuests: 4, floor: 1 },
  { number: "104", type: "VIP", status: "available", price: "5.000.000", maxGuests: 4, floor: 1 },
  { number: "105", type: "Standard", status: "available", price: "800.000", maxGuests: 2, floor: 1, isDirty: true },
  { number: "106", type: "Superior", status: "reserved", price: "1.200.000", maxGuests: 2, floor: 1 },
  { number: "107", type: "Deluxe", status: "available", price: "1.800.000", maxGuests: 3, floor: 1, isLocked: true },
  { number: "108", type: "Suite", status: "reserved", price: "3.000.000", maxGuests: 4, floor: 1, isLocked: true },
  { number: "201", type: "VIP", status: "occupied", guest: "Phạm Minh Đức", dates: "03-29 → 04-01", price: "5.000.000", maxGuests: 4, floor: 2 },
  { number: "202", type: "Standard", status: "occupied", guest: "Đặng Văn E", dates: "03-28 → 04-02", price: "800.000", maxGuests: 2, floor: 2, isDirty: true },
  { number: "203", type: "Superior", status: "available", price: "1.200.000", maxGuests: 2, floor: 2 },
  { number: "204", type: "Deluxe", status: "available", price: "1.800.000", maxGuests: 3, floor: 2 },
  { number: "205", type: "Suite", status: "reserved", price: "3.000.000", maxGuests: 4, floor: 2 },
];

const RoomCard = ({ room, onSelect }: { room: Room; onSelect: (id: string) => void }) => {
  const config = statusConfig[room.status];
  const isAvailable = room.status === "available";
  
  return (
    <div 
      onClick={() => onSelect(room.number)}
      className={cn(
        "rounded-xl shadow-sm flex flex-col h-[75px] active:scale-[0.98] transition-all cursor-pointer p-2.5 justify-between relative overflow-hidden",
        isAvailable ? "bg-white border-2 border-[#10B981]" : config.bg
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <span className={cn(
          "text-[15px] font-black uppercase tracking-tighter leading-none",
          isAvailable ? "text-[#10B981]" : "text-white"
        )}>
          {room.number}
        </span>
        
        <div className="min-w-0">
          {room.guest ? (
            <p className="text-[10px] font-black text-white/90 truncate leading-tight uppercase tracking-tighter">
              {room.guest}
            </p>
          ) : (
            <p className={cn(
              "text-[9px] font-black uppercase tracking-tighter truncate",
              isAvailable ? "text-[#10B981]/70" : "text-white/70"
            )}>
              {config.label}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const RoomMapPage = ({ onNavigate }: { onNavigate: (t: string, id?: string) => void }) => {
  const [activeFilter, setActiveFilter] = useState<RoomStatus | "all">("all");

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
      
      <div className="px-4 py-2 space-y-4">
        {/* Simplified Pill Filter Bar - No Search Icon */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
           {[
             { id: "all", label: "Tất cả", color: "border-slate-800 text-slate-800 bg-slate-800", count: getCount("all") },
             { id: "available", label: "Phòng trống", color: "border-[#10B981] text-[#10B981] bg-[#10B981]", count: getCount("available") },
             { id: "reserved", label: "Đặt trước", color: "border-[#F59E0B] text-[#F59E0B] bg-[#F59E0B]", count: getCount("reserved") },
             { id: "occupied", label: "Đang ở", color: "border-[#0EA5E9] text-[#0EA5E9] bg-[#0EA5E9]", count: getCount("occupied") },
           ].map((f) => {
             const isActive = activeFilter === f.id;
             return (
               <button
                 key={f.id}
                 onClick={() => setActiveFilter(f.id as any)}
                 className={cn(
                   "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter transition-all shrink-0 border shadow-sm",
                   isActive 
                     ? f.color + " text-white" 
                     : "bg-white border-slate-100 text-slate-500"
                 )}
               >
                 {f.label}
                 <span className={cn(
                   "min-w-[14px] h-3.5 rounded-full flex items-center justify-center px-1 text-[8px]",
                   isActive ? "bg-white/20" : "bg-slate-100"
                 )}>
                   {f.count}
                 </span>
               </button>
             );
           })}
        </div>

        {/* Floor Groups - Grid Layout */}
        <div className="space-y-6">
          {[1, 2].map((floor) => {
            const floorRooms = filteredRooms.filter(r => r.floor === floor);
            if (floorRooms.length === 0) return null;
            return (
              <div key={floor} className="space-y-3">
                <h3 className="text-[12px] font-black text-slate-800 uppercase tracking-widest px-1 flex items-center gap-2">
                   Tầng {floor}
                   <div className="h-[1px] bg-slate-100 flex-1" />
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {floorRooms.map((room) => (
                    <RoomCard key={room.number} room={room} onSelect={(id) => onNavigate("roomDetail", id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <button 
        onClick={() => onNavigate("registration")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-[80] transition-transform active:scale-90 border-4 border-white"
      >
        +
      </button>
    </div>
  );
};

export default RoomMapPage;
