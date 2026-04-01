import { User, CheckCircle, Calendar, Paintbrush, Wrench, ChevronDown } from "lucide-react";
import AppHeader from "@/components/AppHeader";

type RoomStatus = "occupied" | "available" | "reserved" | "cleaning" | "maintenance";

interface Room {
  number: string;
  type: string;
  status: RoomStatus;
  guest?: string;
  dates?: string;
  price: string;
  maxGuests: number;
}

const rooms: Room[] = [
  { number: "101", type: "Superior", status: "occupied", guest: "Nguyễn Văn An", dates: "29/03 - 01/04", price: "1.200.000", maxGuests: 2 },
  { number: "102", type: "Deluxe", status: "occupied", guest: "Trần Thị Bình", dates: "30/03 - 02/04", price: "1.800.000", maxGuests: 2 },
  { number: "104", type: "VIP", status: "available", price: "5.000.000", maxGuests: 4 },
  { number: "106", type: "Superior", status: "reserved", price: "1.200.000", maxGuests: 2 },
  { number: "107", type: "Deluxe", status: "cleaning", price: "1.800.000", maxGuests: 3 },
  { number: "108", type: "Suite", status: "maintenance", price: "3.000.000", maxGuests: 4 },
];

const statusConfig: Record<RoomStatus, { label: string; bg: string; textColor: string; icon: React.ElementType }> = {
  occupied: { label: "Đang ở", bg: "bg-occupied", textColor: "text-primary-foreground", icon: User },
  available: { label: "TRỐNG", bg: "bg-available", textColor: "text-primary-foreground", icon: CheckCircle },
  reserved: { label: "ĐÃ ĐẶT", bg: "bg-reserved", textColor: "text-primary-foreground", icon: Calendar },
  cleaning: { label: "CẦN DỌN", bg: "bg-cleaning", textColor: "text-primary-foreground", icon: Paintbrush },
  maintenance: { label: "BẢO TRÌ", bg: "bg-maintenance", textColor: "text-primary-foreground", icon: Wrench },
};

const filters = ["Tất cả", "Trống", "Đang ở", "Đã đặt"];

const RoomCard = ({ room }: { room: Room }) => {
  const config = statusConfig[room.status];
  const Icon = config.icon;
  return (
    <div className="bg-card rounded-xl shadow-sm overflow-hidden">
      <div className={`${config.bg} ${config.textColor} px-3 py-2.5 flex items-center justify-between`}>
        <span className="font-bold text-sm">{room.number} {room.type}</span>
        <Icon className="w-4 h-4" />
      </div>
      <div className="p-3">
        {room.guest ? (
          <>
            <p className="font-semibold text-sm">{room.guest}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">📅 {room.dates}</p>
          </>
        ) : (
          <>
            <p className={`text-xs font-bold ${room.status === "available" ? "text-available" : room.status === "cleaning" ? "text-cleaning" : "text-muted-foreground"}`}>
              {config.label}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">👥 Tối đa {room.maxGuests} khách</p>
          </>
        )}
        <p className="text-xs font-semibold text-primary mt-2">{room.price} VND/đêm</p>
      </div>
    </div>
  );
};

const RoomMapPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="Sơ đồ phòng" />
      <div className="px-4 py-4 space-y-3 pb-24">
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {filters.map((f, i) => (
            <button key={f} className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground"
            }`}>{f}</button>
          ))}
        </div>
        {/* Dropdowns */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-between bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-foreground">
            Tất cả tầng <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex-1 flex items-center justify-between bg-card border border-border rounded-xl px-3 py-2.5 text-sm text-foreground">
            Tất cả loại phòng <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
        {/* Room Grid */}
        <div className="grid grid-cols-2 gap-3">
          {rooms.map((room) => (
            <RoomCard key={room.number} room={room} />
          ))}
        </div>
      </div>
      <button className="fixed bottom-24 right-4 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center text-2xl font-light z-40">
        +
      </button>
    </div>
  );
};

export default RoomMapPage;
