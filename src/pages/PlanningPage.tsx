import { ChevronDown, Building, BarChart3 } from "lucide-react";
import AppHeader from "@/components/AppHeader";

interface Booking {
  guest: string;
  roomType: string;
  startDay: number;
  endDay: number;
  color: string;
}

const rooms = [
  { number: "101", type: "STD" },
  { number: "102", type: "DLX" },
  { number: "201", type: "SUI" },
  { number: "202", type: "VIP" },
  { number: "301", type: "DLX" },
  { number: "302", type: "STD" },
  { number: "401", type: "STD" },
];

const bookings: Booking[] = [
  { guest: "Nguyễn Văn An", roomType: "Standard", startDay: 24, endDay: 25, color: "bg-primary" },
  { guest: "Trần Thị Bình", roomType: "Deluxe", startDay: 24, endDay: 26, color: "bg-primary" },
  { guest: "Lê Hoàng Cường", roomType: "Suite", startDay: 25, endDay: 27, color: "bg-primary" },
  { guest: "John Smith", roomType: "VIP", startDay: 24, endDay: 27, color: "bg-reserved" },
];

const days = [
  { label: "HÔM NAY", day: 24, weekday: "" },
  { label: "TH 6", day: 25, weekday: "" },
  { label: "TH 7", day: 26, weekday: "" },
  { label: "CN", day: 27, weekday: "", isWeekend: true },
  { label: "TH", day: 28, weekday: "" },
];

const PlanningPage = () => {
  const getBookingForRoom = (roomNum: string) => {
    const idx = rooms.findIndex(r => r.number === roomNum);
    if (idx < bookings.length) return bookings[idx];
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="PHS247" />
      <div className="px-4 py-4 pb-24">
        {/* Filters */}
        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          <button className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-sm whitespace-nowrap">
            📅 Ngày/Tháng <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-sm whitespace-nowrap">
            🏨 Tất cả loại <ChevronDown className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2 text-sm whitespace-nowrap">
            🏷️ Tầng
          </button>
        </div>

        {/* Timeline Header */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="min-w-[500px]">
            <div className="flex">
              <div className="w-16 shrink-0" />
              {days.map((d) => (
                <div key={d.day} className={`flex-1 text-center py-2 ${d.day === 24 ? "bg-primary/10 rounded-t-lg" : ""}`}>
                  <p className={`text-[10px] font-medium ${d.day === 24 ? "text-primary" : "text-muted-foreground"}`}>{d.label}</p>
                  <p className={`text-lg font-bold ${d.isWeekend ? "text-cleaning" : "text-foreground"}`}>{d.day}</p>
                </div>
              ))}
            </div>

            {/* Rows */}
            {rooms.map((room) => {
              const booking = getBookingForRoom(room.number);
              return (
                <div key={room.number} className="flex border-t border-border">
                  <div className="w-16 shrink-0 py-3 pr-2">
                    <p className="font-bold text-sm">{room.number}</p>
                    <p className="text-[10px] font-medium text-primary">{room.type}</p>
                  </div>
                  <div className="flex-1 relative h-16 flex items-center">
                    {booking && (
                      <div
                        className={`${booking.color} text-primary-foreground rounded-lg px-3 py-1.5 absolute`}
                        style={{
                          left: `${((booking.startDay - 24) / 5) * 100}%`,
                          width: `${((booking.endDay - booking.startDay) / 5) * 100}%`,
                        }}
                      >
                        <p className="text-xs font-semibold truncate">{booking.guest}</p>
                        <p className="text-[10px] opacity-80">{booking.roomType} • {booking.startDay} - {booking.endDay}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Phòng trống</span>
            </div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-xs text-primary font-medium">(+2 Today)</p>
          </div>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-reserved" />
              <span className="text-xs font-medium text-muted-foreground uppercase">Công suất</span>
            </div>
            <p className="text-3xl font-bold">84%</p>
            <p className="text-xs text-cleaning font-medium">(-5% vs LY)</p>
          </div>
        </div>
      </div>
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-2xl font-light z-40">
        +
      </button>
    </div>
  );
};

export default PlanningPage;
