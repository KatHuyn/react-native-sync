import { useState } from "react";
import { ChevronDown, Building, BarChart3, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  guest: string;
  roomType: string;
  startDay: number;
  endDay: number;
  color: string;
  roomNumber: string;
}

const initialRooms = [
  { number: "101", type: "STD" },
  { number: "102", type: "DLX" },
  { number: "201", type: "SUI" },
  { number: "202", type: "VIP" },
  { number: "301", type: "DLX" },
  { number: "302", type: "STD" },
  { number: "401", type: "STD" },
];

const initialBookings: Booking[] = [
  { id: "1", guest: "Nguyễn Văn An", roomType: "Standard", startDay: 24, endDay: 25, color: "bg-primary", roomNumber: "101" },
  { id: "2", guest: "Trần Thị Bình", roomType: "Deluxe", startDay: 24, endDay: 26, color: "bg-primary", roomNumber: "102" },
  { id: "3", guest: "Lê Hoàng Cường", roomType: "Suite", startDay: 25, endDay: 27, color: "bg-primary", roomNumber: "201" },
  { id: "4", guest: "John Smith", roomType: "VIP", startDay: 24, endDay: 27, color: "bg-orange-500", roomNumber: "202" },
];

const days = [
  { label: "HÔM NAY", day: 24, weekday: "" },
  { label: "TH 6", day: 25, weekday: "" },
  { label: "TH 7", day: 26, weekday: "" },
  { label: "CN", day: 27, weekday: "", isWeekend: true },
  { label: "TH 2", day: 28, weekday: "" },
];

const PlanningPage = ({ onNavigate }: { onNavigate: (t: string) => void }) => {
  const [activeBookings, setActiveBookings] = useState<Booking[]>(initialBookings);
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData("bookingId", id);
  };

  const onDrop = (e: React.DragEvent, targetRoom: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("bookingId");
    setActiveBookings(prev => 
      prev.map(b => b.id === id ? { ...b, roomNumber: targetRoom } : b)
    );
    setDraggedId(null);
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32 animate-in fade-in duration-500">
      <AppHeader title="Kế hoạch phòng" icon={Calendar} variant="white" />
      
      <div className="px-4 py-2">
        {/* Ultra-Compact Control */}
        <div className="flex items-center justify-between mb-2 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-1.5">
            <button className="p-1 px-1.5 hover:bg-slate-50 rounded-md border border-slate-100"><ChevronLeft className="w-3.5 h-3.5 text-slate-400"/></button>
            <span className="text-[9px] font-black uppercase text-slate-500">T4-TH3</span>
            <button className="p-1 px-1.5 hover:bg-slate-50 rounded-md border border-slate-100"><ChevronRight className="w-3.5 h-3.5 text-slate-400"/></button>
          </div>
          <button className="flex items-center gap-1 bg-[#1AB1A5]/10 text-[#1AB1A5] px-2 py-1 rounded-lg text-[8px] font-black uppercase">
             Lọc <ChevronDown className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Timeline Table - Ultra-Density */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="min-w-[500px]">
              {/* Header Rows */}
              <div className="flex bg-slate-50/50 border-b border-slate-100">
                <div className="w-14 shrink-0 p-2 flex flex-col justify-center border-r border-slate-100">
                   <p className="text-[7px] font-black text-slate-400 uppercase">Phòng</p>
                </div>
                {days.map((d) => (
                  <div key={d.day} className={cn(
                    "flex-1 text-center py-2 border-r border-slate-100 last:border-0",
                    d.day === 24 && "bg-[#1AB1A5]/5"
                  )}>
                    <p className={cn("text-[7px] font-black tracking-tighter", d.day === 24 ? "text-[#1AB1A5]" : "text-slate-400")}>{d.label}</p>
                    <p className={cn("text-xs font-black mt-0.5", d.isWeekend ? "text-red-500" : "text-slate-700")}>{d.day}</p>
                  </div>
                ))}
              </div>

              {/* Rows - Ultra Dense h-10 */}
              <div className="divide-y divide-slate-100">
                {initialRooms.map((room) => {
                  const bookingList = activeBookings.filter(b => b.roomNumber === room.number);
                  return (
                    <div 
                      key={room.number} 
                      className="flex h-10 transition-colors hover:bg-slate-50/50"
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => onDrop(e, room.number)}
                    >
                      <div className="w-14 shrink-0 p-1 flex flex-col justify-center border-r border-slate-100 bg-slate-50/10">
                        <p className="font-black text-[10px] text-slate-800">{room.number}</p>
                        <p className="text-[7px] font-black text-[#1AB1A5] uppercase opacity-60">{room.type}</p>
                      </div>
                      <div className="flex-1 relative flex items-center">
                        {bookingList.map((booking) => (
                          <div
                            key={booking.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, booking.id)}
                            className={cn(
                              booking.color,
                              "text-white rounded-md px-1 py-0.5 absolute shadow-sm cursor-move select-none transition-transform active:scale-95 z-10 border border-white/20 h-6 flex flex-col justify-center",
                              draggedId === booking.id && "opacity-50 scale-105"
                            )}
                            style={{
                              left: `${((booking.startDay - 24) / 5) * 100}%`,
                              width: `${((booking.endDay - booking.startDay + 1) / 5) * 100}%`,
                              margin: '0 1px'
                            }}
                          >
                            <p className="text-[8px] font-black truncate leading-tight">{booking.guest}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend / Metrics - Ultra Compact */}
        <div className="grid grid-cols-2 gap-2 mt-2">
           <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-emerald-800">
                 <Building className="w-3 h-3" />
                 <span className="text-[8px] font-black uppercase">Trống</span>
              </div>
              <p className="text-xl font-black text-emerald-600">12</p>
           </div>
           <div className="bg-sky-50 border border-sky-100 rounded-xl p-2.5 flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-sky-800">
                 <BarChart3 className="w-3 h-3" />
                 <span className="text-[8px] font-black uppercase">C.Suất</span>
              </div>
              <p className="text-xl font-black text-[#1AB1A5]">84%</p>
           </div>
        </div>
      </div>

      {/* Circle FAB Button - Synchronized */}
      <button 
        onClick={() => onNavigate("registration")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[80] hover:scale-110 active:scale-95 transition-all"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default PlanningPage;
