import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { 
  ChevronDown, Building, BarChart3, ChevronLeft, ChevronRight, 
  Calendar, Search, Plus, ListFilter, HelpCircle, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  format, 
  addDays, 
  isWeekend, 
  isToday as isDateToday,
  differenceInDays,
  eachDayOfInterval,
  isSameDay,
  startOfDay
} from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "sonner";
import AppHeader from "@/components/AppHeader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as UICalendar } from "@/components/ui/calendar";

interface Booking {
  id: string;
  guest: string;
  roomType: string;
  startDate: Date;
  endDate: Date;
  color: string;
  roomNumber: string;
  price?: number;
  note?: string;
}

const initialRooms = [
  { number: "101", type: "Đơn cơ bản", floor: "Tầng 1" },
  { number: "102", type: "Đơn Cao Cấp", floor: "Tầng 1" },
  { number: "111", type: "Luxury", floor: "Tầng 2" },
  { number: "201", type: "Đơn cơ bản", floor: "Tầng 2" },
  { number: "202", type: "VIP", floor: "Tầng 2" },
  { number: "301", type: "Deluxe", floor: "Tầng 3" },
  { number: "302", type: "Standard", floor: "Tầng 3" },
  { number: "401", type: "Standard", floor: "Tầng 4" },
];

const referenceDate = startOfDay(new Date(2026, 3, 2)); // Today is April 2, 2026

const initialBookings: Booking[] = [
  { id: "1", guest: "Bảo Việt", roomType: "Đơn cơ bản", startDate: new Date(2026, 2, 31), endDate: new Date(2026, 3, 3), color: "bg-[#1AB1A5]", roomNumber: "101", price: 1300000, note: "Khách quen" },
  { id: "2", guest: "AB", roomType: "Đơn cơ bản", startDate: new Date(2026, 3, 4), endDate: new Date(2026, 3, 6), color: "bg-[#2196F3]", roomNumber: "101", price: 900000, note: "" },
  { id: "3", guest: "Testing", roomType: "Đơn cơ bản", startDate: new Date(2026, 3, 9), endDate: new Date(2026, 3, 11), color: "bg-[#2196F3]", roomNumber: "201", price: 800000, note: "Test booking" },
];

// ===== Interaction mode type =====
type InteractionMode = 
  | null
  | { type: 'resize'; bookingId: string; side: 'start' | 'end'; originalBooking: Booking }
  | { type: 'drag'; bookingId: string; originalBooking: Booking };

const PlanningPage = ({ onNavigate }: { onNavigate: (t: string) => void }) => {
  const [activeBookings, setActiveBookings] = useState<Booking[]>(initialBookings);
  const [popoverOpenId, setPopoverOpenId] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<"type" | "floor" | "none">("type");
  
  // Single interaction state - much simpler
  const [interaction, setInteraction] = useState<InteractionMode>(null);
  const [ghostPreview, setGhostPreview] = useState<{ roomNumber: string; startDate: Date; endDate: Date; isValid: boolean } | null>(null);
  
  const gridRef = useRef<HTMLDivElement>(null);
  const longPressRef = useRef<NodeJS.Timeout | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const interactionRef = useRef<InteractionMode>(null);
  const bookingsRef = useRef(activeBookings);
  const ghostRef = useRef(ghostPreview);

  // Keep refs in sync
  useEffect(() => { interactionRef.current = interaction; }, [interaction]);
  useEffect(() => { bookingsRef.current = activeBookings; }, [activeBookings]);
  useEffect(() => { ghostRef.current = ghostPreview; }, [ghostPreview]);

  // Date Range
  const [startDate, setStartDate] = useState<Date>(new Date(2026, 2, 30));
  const [endDate, setEndDate] = useState<Date>(new Date(2026, 3, 12));
  
  const days = useMemo(() => {
    try {
      const intervalStart = startOfDay(startDate);
      const intervalEnd = startOfDay(endDate);
      const actualEnd = intervalEnd < intervalStart ? addDays(intervalStart, 13) : intervalEnd;
      
      return eachDayOfInterval({ start: intervalStart, end: actualEnd }).map(date => {
        const dayName = format(date, "EEEEEE", { locale: vi }).toUpperCase();
        return {
          date,
          dayName,
          dateLabel: format(date, "dd/MM"),
          isWeekend: isWeekend(date),
          isToday: isSameDay(date, referenceDate)
        };
      });
    } catch (e) {
      console.error("Invalid date range", e);
      return [];
    }
  }, [startDate, endDate]);
  
  const groupedRooms = useMemo(() => {
    if (groupBy === "none") return { "Phòng": initialRooms };
    
    const groups: Record<string, typeof initialRooms> = {};
    initialRooms.forEach(room => {
      const key = groupBy === "type" ? room.type : room.floor;
      const displayKey = key; // Simplified for high-density UI
      if (!groups[displayKey]) groups[displayKey] = [];
      groups[displayKey].push(room);
    });
    return groups;
  }, [groupBy]);

  // ===== Helpers =====
  const isSlotAvailable = useCallback((id: string, room: string, start: Date, end: Date) => {
    return !bookingsRef.current.some(b => 
      b.id !== id && 
      b.roomNumber === room && 
      start < b.endDate && end > b.startDate
    );
  }, []);

  const getDayIndexFromPointer = useCallback((clientX: number): number => {
    if (!gridRef.current) return -1;
    const gridRect = gridRef.current.getBoundingClientRect();
    const scrollLeft = gridRef.current.scrollLeft;
    const scrollWidth = gridRef.current.scrollWidth;
    const timelineWidth = scrollWidth - 80;
    const cellWidth = timelineWidth / days.length;
    const x = (clientX - gridRect.left) + scrollLeft - 80;
    return Math.round(x / cellWidth);
  }, [days.length]);

  const getRoomFromPointer = useCallback((clientX: number, clientY: number): string | null => {
    const el = document.elementFromPoint(clientX, clientY);
    const row = el?.closest('[data-room-row]');
    return row?.getAttribute('data-room-row') || null;
  }, []);

  // ===== Core pointer handlers (using refs for latest state) =====
  const onPointerMoveGlobal = useCallback((e: PointerEvent) => {
    const mode = interactionRef.current;
    if (!mode) {
      // Check if we should cancel long press due to movement
      if (longPressRef.current && startPosRef.current) {
        const dx = e.clientX - startPosRef.current.x;
        const dy = e.clientY - startPosRef.current.y;
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          clearTimeout(longPressRef.current);
          longPressRef.current = null;
        }
      }
      return;
    }

    e.preventDefault();
    const dayIndex = getDayIndexFromPointer(e.clientX);
    if (dayIndex < 0 || dayIndex >= days.length) return;

    if (mode.type === 'resize') {
      const orig = mode.originalBooking;
      let newStart = orig.startDate;
      let newEnd = orig.endDate;
      const targetDate = days[dayIndex].date;

      if (mode.side === 'start') {
        if (targetDate >= orig.endDate) return;
        newStart = targetDate;
      } else {
        const endTarget = addDays(targetDate, 1);
        if (endTarget <= orig.startDate) return;
        newEnd = endTarget;
      }

      const isValid = isSlotAvailable(orig.id, orig.roomNumber, newStart, newEnd);
      setGhostPreview({ roomNumber: orig.roomNumber, startDate: newStart, endDate: newEnd, isValid });
    }

    if (mode.type === 'drag') {
      const orig = mode.originalBooking;
      const targetRoom = getRoomFromPointer(e.clientX, e.clientY) || orig.roomNumber;
      const duration = differenceInDays(orig.endDate, orig.startDate);
      const clampedIndex = Math.max(0, Math.min(dayIndex, days.length - 1));
      const newStart = days[clampedIndex].date;
      const newEnd = addDays(newStart, duration);
      const isValid = isSlotAvailable(orig.id, targetRoom, newStart, newEnd);
      setGhostPreview({ roomNumber: targetRoom, startDate: newStart, endDate: newEnd, isValid });
    }
  }, [days, getDayIndexFromPointer, getRoomFromPointer, isSlotAvailable]);

  const onPointerUpGlobal = useCallback(() => {
    // Clear long press timer
    if (longPressRef.current) {
      clearTimeout(longPressRef.current);
      longPressRef.current = null;
    }
    startPosRef.current = null;

    const mode = interactionRef.current;
    const ghost = ghostRef.current;

    if (mode && ghost && ghost.isValid) {
      const bookingId = mode.bookingId;
      setActiveBookings(prev => prev.map(b => 
        b.id === bookingId
          ? { ...b, roomNumber: ghost.roomNumber, startDate: ghost.startDate, endDate: ghost.endDate }
          : b
      ));
      toast.success("Cập nhật thành công!", {
        icon: <CheckCircle2 className="w-4 h-4 text-white" />,
        className: "bg-[#1AB1A5] text-white border-0 py-2 px-3 text-[10px]"
      });
    }

    setInteraction(null);
    setGhostPreview(null);
  }, []);

  // Attach global listeners once
  useEffect(() => {
    window.addEventListener('pointermove', onPointerMoveGlobal);
    window.addEventListener('pointerup', onPointerUpGlobal);
    window.addEventListener('pointercancel', onPointerUpGlobal);
    return () => {
      window.removeEventListener('pointermove', onPointerMoveGlobal);
      window.removeEventListener('pointerup', onPointerUpGlobal);
      window.removeEventListener('pointercancel', onPointerUpGlobal);
    };
  }, [onPointerMoveGlobal, onPointerUpGlobal]);

  // ===== Start interactions (from booking bars) =====
  const startResize = (bookingId: string, side: 'start' | 'end', e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (popoverOpenId) return;
    
    const booking = activeBookings.find(b => b.id === bookingId);
    if (!booking) return;

    startPosRef.current = { x: e.clientX, y: e.clientY };
    
    longPressRef.current = setTimeout(() => {
      const mode: InteractionMode = { type: 'resize', bookingId, side, originalBooking: { ...booking } };
      setInteraction(mode);
      setGhostPreview({ roomNumber: booking.roomNumber, startDate: booking.startDate, endDate: booking.endDate, isValid: true });
      if (navigator.vibrate) navigator.vibrate(30);
    }, 300);
  };

  const startDrag = (bookingId: string, e: React.PointerEvent) => {
    if (popoverOpenId) return;

    const booking = activeBookings.find(b => b.id === bookingId);
    if (!booking) return;

    startPosRef.current = { x: e.clientX, y: e.clientY };

    longPressRef.current = setTimeout(() => {
      const mode: InteractionMode = { type: 'drag', bookingId, originalBooking: { ...booking } };
      setInteraction(mode);
      setGhostPreview({ roomNumber: booking.roomNumber, startDate: booking.startDate, endDate: booking.endDate, isValid: true });
      if (navigator.vibrate) navigator.vibrate(30);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-32 flex flex-col animate-in fade-in duration-500 overflow-x-hidden">
      <AppHeader title="Kế hoạch phòng" icon={Calendar} variant="white" />
      
      <div className="flex-1 flex flex-col pt-2">
        <div className="bg-[#EEE] border-y border-slate-200 p-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
           <div className="flex bg-white rounded border border-slate-300 px-1 py-0 items-center shrink-0">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="px-1 py-0.5 text-[8px] text-slate-600 hover:bg-slate-50 rounded transition-colors outline-none font-black tracking-tighter">
                    {format(startDate, "dd/MM/yy")}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <UICalendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span className="mx-0.5 text-slate-300 text-[8px]">→</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="px-1 py-0.5 text-[8px] text-slate-600 hover:bg-slate-50 rounded transition-colors outline-none font-black tracking-tighter">
                    {format(endDate, "dd/MM/yy")}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <UICalendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
           </div>
           
           <button className="bg-white border border-slate-300 px-2 py-0.5 rounded text-[9px] font-black uppercase text-slate-700 hover:bg-slate-50 transition-colors shrink-0 tracking-tighter">Xem</button>
           
           <div className="flex bg-white rounded border border-slate-300 overflow-hidden shrink-0">
              <button className="px-1.5 py-0.5 text-[8.5px] font-black uppercase text-slate-700 hover:bg-slate-50 border-r border-slate-200 tracking-tighter">Ngày</button>
              <button className="px-1.5 py-0.5 text-[8.5px] font-black uppercase bg-[#1AB1A5] text-white tracking-tighter">Tháng</button>
           </div>

           <div className="flex bg-white rounded border border-slate-300 overflow-hidden shrink-0">
              <button 
                onClick={() => setGroupBy("type")}
                className={cn(
                  "px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-tighter border-r border-slate-200 transition-colors",
                  groupBy === "type" ? "bg-[#1AB1A5] text-white" : "text-slate-700 hover:bg-slate-50"
                )}
              >
                Loại
              </button>
              <button 
                onClick={() => setGroupBy("floor")}
                className={cn(
                  "px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-tighter border-r border-slate-200 transition-colors",
                  groupBy === "floor" ? "bg-[#1AB1A5] text-white" : "text-slate-700 hover:bg-slate-50"
                )}
              >
                Tầng
              </button>
              <button 
                onClick={() => setGroupBy("none")}
                className={cn(
                  "px-1.5 py-0.5 text-[8.5px] font-black uppercase tracking-tighter transition-colors",
                  groupBy === "none" ? "bg-[#1AB1A5] text-white" : "text-slate-700 hover:bg-slate-50"
                )}
              >
                Phòng
              </button>
           </div>
        </div>

        {/* Current Month Active Indicator */}
        <div className="flex items-center justify-between py-2 px-4 bg-white border-b border-slate-100">
           <h3 className="text-[14px] font-black text-slate-800 uppercase tracking-normal">
              {format(startDate, "MMMM", { locale: vi })} {format(startDate, "yyyy")}
           </h3>
           <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronLeft className="w-4 h-4 text-slate-400"/></button>
              <button className="p-1 hover:bg-slate-100 rounded-md"><ChevronRight className="w-4 h-4 text-slate-400"/></button>
           </div>
        </div>

        {/* Timeline Grid Content */}
        <div ref={gridRef} className="flex-1 bg-white overflow-x-auto scrollbar-thin relative group">
           <div className="min-w-[700px] flex flex-col h-full">
              {/* Table Header */}
              <div className="flex sticky top-0 z-30">
                 <div className="w-20 shrink-0 bg-[#F9F9F9] border-r border-b border-slate-200" />
                 {days.map((d) => (
                   <div key={d.date.toISOString()} className={cn(
                     "flex-1 flex flex-col items-center justify-center py-0.5 border-r border-b border-slate-200 text-[8px] font-black leading-none",
                     d.isWeekend && !d.isToday && "bg-[#FFEBCC] text-slate-700",
                     d.isToday && "bg-[#FF9800] text-white",
                     !d.isWeekend && !d.isToday && "bg-[#EEE] text-slate-600"
                   )}>
                     <span>{d.dayName}</span>
                     <span>{d.dateLabel}</span>
                   </div>
                 ))}
              </div>

              {/* Room Rows by Group */}
              <div className="flex-1 divide-y divide-slate-100 min-h-[60vh]">
                 {Object.entries(groupedRooms).map(([groupName, rooms]) => (
                   <div key={groupName} className="flex flex-col">
                      {groupBy !== "none" && (
                        <div className="flex h-4 bg-[#FFA24E]">
                           <div className="w-20 shrink-0 flex items-center px-2 bg-[#FFA24E] border-r border-white/20 sticky left-0 z-20">
                              <span className="text-[7px] font-black text-white uppercase tracking-tight whitespace-nowrap">{groupName}</span>
                           </div>
                           <div className="flex-1 border-b border-white/10" />
                        </div>
                      )}
                      {rooms.map((room) => {
                        const bookingList = activeBookings.filter(b => b.roomNumber === room.number);
                        return (
                          <div key={room.number} className="flex h-8 bg-white" data-room-row={room.number}>
                             <div className="w-20 shrink-0 flex items-center px-1 border-r border-slate-200 bg-[#F9F9F9] sticky left-0 z-20" data-room-row={room.number}>
                                <span className="text-[9px] font-black text-slate-800 w-6 tracking-normal">{room.number}</span>
                                <span className="text-[7px] text-slate-500 truncate leading-none uppercase font-bold tracking-normal">{room.type}</span>
                             </div>
                             <div className="flex-1 flex relative">
                                {days.map((d) => (
                                  <div 
                                    key={d.date.toISOString()} 
                                    className="flex-1 border-r border-slate-50 h-full hover:bg-slate-50 transition-colors"
                                  />
                                ))}

                                {/* Ghost Preview */}
                                {ghostPreview && ghostPreview.roomNumber === room.number && (
                                  <div 
                                    className={cn(
                                      "absolute h-5 top-1.5 rounded-sm border-2 border-dashed z-50 pointer-events-none flex items-center px-1 overflow-hidden",
                                      ghostPreview.isValid 
                                        ? "bg-emerald-400/25 border-emerald-500" 
                                        : "bg-rose-500/25 border-rose-500"
                                    )}
                                    style={{
                                      left: `calc(${(differenceInDays(ghostPreview.startDate, startDate) / days.length) * 100}% + 1px)`,
                                      width: `calc(${(differenceInDays(ghostPreview.endDate, ghostPreview.startDate) / days.length) * 100}% - 2px)`
                                    }}
                                  >
                                     <span className={cn(
                                       "text-[6px] font-black uppercase whitespace-nowrap",
                                       ghostPreview.isValid ? "text-emerald-700" : "text-rose-600"
                                     )}>
                                       {ghostPreview.isValid 
                                         ? differenceInDays(ghostPreview.endDate, ghostPreview.startDate) + " ngày"
                                         : "Đã có khách"}
                                     </span>
                                  </div>
                                )}
                                
                                {/* Booking Bars */}
                                {bookingList.map((booking) => {
                                  const startDiff = differenceInDays(booking.startDate, startDate);
                                  const duration = differenceInDays(booking.endDate, booking.startDate);
                                  
                                  if (startDiff + duration < 0 || startDiff >= days.length) return null;
                                  
                                  const leftPercent = (startDiff / days.length) * 100;
                                  const widthPercent = (duration / days.length) * 100;
                                  const isActive = interaction?.bookingId === booking.id;

                                  return (
                                    <Popover 
                                      key={booking.id} 
                                      open={popoverOpenId === booking.id && !interaction} 
                                      onOpenChange={(open) => {
                                        if (!interaction) {
                                          setPopoverOpenId(open ? booking.id : null);
                                        }
                                      }}
                                    >
                                      <PopoverTrigger asChild>
                                        <div
                                          onPointerDown={(e) => startDrag(booking.id, e)}
                                          className={cn(
                                            booking.color,
                                            "absolute h-5 top-1.5 rounded-sm shadow-sm border border-white/20 px-1 cursor-pointer z-10 flex items-center group/bar select-none",
                                            isActive && "ring-2 ring-white/60 shadow-lg z-30",
                                          )}
                                          style={{
                                            left: `calc(${leftPercent}% + 1px)`,
                                            width: `calc(${widthPercent}% - 2px)`,
                                            touchAction: 'none'
                                          }}
                                        >
                                           {/* Left Resize Handle */}
                                           <div 
                                             className="absolute left-0 top-0 bottom-0 w-4 cursor-ew-resize z-20 flex items-center justify-start"
                                             onPointerDown={(e) => startResize(booking.id, 'start', e)}
                                           >
                                             <div className="w-1 h-3 bg-white/50 rounded-full ml-0.5" />
                                           </div>
                                           
                                           <span className="text-[7px] font-black text-white truncate drop-shadow-sm tracking-normal flex-1 text-center pointer-events-none">
                                             {booking.guest}
                                           </span>

                                           {/* Right Resize Handle */}
                                           <div 
                                             className="absolute right-0 top-0 bottom-0 w-4 cursor-ew-resize z-20 flex items-center justify-end"
                                             onPointerDown={(e) => startResize(booking.id, 'end', e)}
                                           >
                                             <div className="w-1 h-3 bg-white/50 rounded-full mr-0.5" />
                                           </div>
                                        </div>
                                      </PopoverTrigger>
                                      <PopoverContent className="w-56 p-0 overflow-hidden border-slate-200 shadow-xl rounded-lg" align="start">
                                         <div className="bg-white text-[10px]">
                                            <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 flex justify-between items-center">
                                               <span className="font-black text-slate-400 uppercase tracking-widest text-[8px]">Chi tiết đặt phòng</span>
                                               <span className="font-bold text-[#1AB1A5]">#{booking.id}</span>
                                            </div>
                                            <div className="p-3 space-y-2">
                                               <div className="flex justify-between">
                                                  <span className="text-slate-400">Khách hàng:</span>
                                                  <span className="font-bold text-slate-800">{booking.guest}</span>
                                               </div>
                                               <div className="flex justify-between">
                                                  <span className="text-slate-400">Phòng:</span>
                                                  <span className="font-bold text-slate-800">{booking.roomNumber} - {booking.roomType}</span>
                                               </div>
                                               <div className="flex justify-between">
                                                  <span className="text-slate-400">Ngày đến:</span>
                                                  <span className="font-bold text-slate-800">{format(booking.startDate, "dd/MM/yyyy")}</span>
                                               </div>
                                               <div className="flex justify-between">
                                                  <span className="text-slate-400">Ngày đi:</span>
                                                  <span className="font-bold text-slate-800">{format(booking.endDate, "dd/MM/yyyy")}</span>
                                               </div>
                                               <div className="flex justify-between border-t border-slate-50 pt-2">
                                                  <span className="text-slate-400">Giá phòng:</span>
                                                  <span className="font-black text-[#1AB1A5]">{booking.price?.toLocaleString()} VND</span>
                                               </div>
                                               {booking.note && (
                                                  <div className="bg-slate-50 p-2 rounded text-[9px] text-slate-500 italic mt-2 border-l-2 border-slate-200">
                                                     "{booking.note}"
                                                  </div>
                                               )}
                                            </div>
                                            <div className="grid grid-cols-2 border-t border-slate-100">
                                               <button className="py-2 text-slate-500 hover:bg-slate-50 font-bold border-r border-slate-100 transition-colors">Sửa</button>
                                               <button className="py-2 text-rose-500 hover:bg-rose-50 font-bold transition-colors">Hủy</button>
                                            </div>
                                         </div>
                                      </PopoverContent>
                                    </Popover>
                                  );
                                })}
                             </div>
                          </div>
                        );
                      })}
                   </div>
                 ))}
              </div>

              {/* Sticky Summary Footer */}
              <div className="sticky bottom-0 left-0 right-0 bg-[#F9F9F9] border-t border-slate-300 z-40 shadow-[0_-2px_6px_rgba(0,0,0,0.05)]">
                 <div className="flex">
                    <div className="w-20 shrink-0 bg-[#1AB1A5] text-white p-0.5 flex flex-col justify-center sticky left-0 z-50 overflow-hidden">
                       <span className="text-[7px] font-black uppercase leading-none tracking-normal">P. Đang đặt</span>
                    </div>
                    {days.map((d, i) => (
                      <div key={i} className="flex-1 border-r border-slate-200 p-0.5 flex justify-center items-center text-[8px] font-bold text-slate-700">
                         {i % 4 === 1 ? "25%" : i % 4 === 2 ? "25%" : i % 4 === 3 ? "25%" : "0%"}
                      </div>
                    ))}
                 </div>
                 <div className="flex">
                    <div className="w-20 shrink-0 bg-[#1AB1A5] text-white p-0.5 flex flex-col justify-center border-t border-white/10 sticky left-0 z-50 overflow-hidden">
                       <span className="text-[7px] font-black uppercase leading-none tracking-normal">P. Trống</span>
                    </div>
                    {days.map((d, i) => (
                      <div key={i} className="flex-1 border-r border-slate-200 p-0.5 flex justify-center items-center text-[8px] font-black text-slate-800">
                         {i % 4 === 1 ? "3" : i % 4 === 2 ? "3" : i % 4 === 3 ? "3" : "4"}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      <button 
        onClick={() => onNavigate("registration")}
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#1AB1A5] text-white rounded-full shadow-[0_12px_40px_rgba(26,177,165,0.4)] flex items-center justify-center text-3xl font-light z-[100] hover:scale-110 active:scale-95 transition-all border-4 border-white"
      >
        <span>+</span>
      </button>
    </div>
  );
};

export default PlanningPage;
