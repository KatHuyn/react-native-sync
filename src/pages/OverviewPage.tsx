import { CheckCircle, Building, ArrowDownLeft, ArrowUpRight, TrendingUp, Search } from "lucide-react";
import AppHeader from "@/components/AppHeader";

const StatCard = ({ icon: Icon, value, label, badgeText, badgeColor }: {
  icon: React.ElementType; value: string | number; label: string; badgeText: string; badgeColor: string;
}) => (
  <div className="bg-card rounded-xl p-4 flex flex-col gap-1 shadow-sm">
    <div className="flex items-center justify-between">
      <Icon className="w-5 h-5 text-muted-foreground" />
      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}>{badgeText}</span>
    </div>
    <span className="text-2xl font-bold">{value}</span>
    <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
  </div>
);

const ActivityItem = ({ icon, title, subtitle, code, time, status, statusColor }: {
  icon: string; title: string; subtitle: string; code: string; time: string; status: string; statusColor: string;
}) => (
  <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-lg shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-sm">{title}</p>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      <p className="text-xs text-muted-foreground">{code}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{time}</p>
    </div>
    <span className={`text-[10px] font-bold px-2 py-1 rounded-md shrink-0 ${statusColor}`}>{status}</span>
  </div>
);

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader title="PHS247" />
      <div className="px-4 py-5 space-y-6 pb-24">
        {/* Title */}
        <div>
          <h2 className="text-xl font-bold">Tổng quan hôm nay</h2>
          <p className="text-sm text-muted-foreground">Thứ Hai, 22 tháng 5, 2024</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard icon={CheckCircle} value={12} label="Phòng sẵn sàng" badgeText="Trống" badgeColor="bg-accent text-accent-foreground" />
          <StatCard icon={Building} value={28} label="Phòng có khách" badgeText="Đang ở" badgeColor="bg-primary/10 text-primary" />
          <StatCard icon={ArrowDownLeft} value="05" label="Lượt check-in" badgeText="Sắp đến" badgeColor="bg-accent text-accent-foreground" />
          <StatCard icon={ArrowUpRight} value="08" label="Lượt check-out" badgeText="Sắp đi" badgeColor="bg-primary/10 text-primary" />
        </div>

        {/* Occupancy */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base">Công suất phòng</h3>
            <div className="flex bg-secondary rounded-full p-0.5">
              <button className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">NGÀY</button>
              <button className="text-xs text-muted-foreground px-3 py-1">THÁNG</button>
              <button className="text-xs text-muted-foreground px-3 py-1">NĂM</button>
            </div>
          </div>
          <div className="flex justify-center my-4">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="12" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--primary))" strokeWidth="12"
                  strokeDasharray={`${0.72 * 314} ${0.28 * 314}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">72%</span>
                <span className="text-xs text-success flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +1.5%
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {[
              { color: "bg-occupied", label: "Đang ở (28)" },
              { color: "bg-available", label: "Trống (12)" },
              { color: "bg-reserved", label: "Đã đặt (6)" },
              { color: "bg-cleaning", label: "Cần dọn (4)" },
              { color: "bg-maintenance", label: "Bảo trì (2)" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-base">Doanh thu</h3>
            <div className="flex bg-secondary rounded-full p-0.5">
              <button className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">NGÀY</button>
              <button className="text-xs text-muted-foreground px-3 py-1">THÁNG</button>
              <button className="text-xs text-muted-foreground px-3 py-1">NĂM</button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Hôm nay</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-bold text-primary">12.450k</span>
            <span className="text-sm text-muted-foreground">VND</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-success" />
            <span className="text-xs text-success font-medium">+8.5%</span>
            <span className="text-xs text-muted-foreground">so với hôm qua</span>
          </div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-4 mb-2">Doanh thu theo ngày</p>
          {/* Simple bar chart placeholder */}
          <div className="flex items-end gap-2 h-16">
            {[40, 55, 70, 50, 80, 65, 90].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-primary/20 rounded-t" style={{ height: `${h}%` }}>
                  <div className="w-full bg-primary rounded-t h-full" />
                </div>
                <span className="text-[9px] text-muted-foreground">T{i + 2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">Thao tác gần đây</h3>
            <button className="text-xs font-semibold text-primary">XEM TẤT CẢ</button>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm border border-border placeholder:text-muted-foreground"
              placeholder="Tìm mã booking, tên khách..." />
          </div>
          <div className="bg-card rounded-xl px-4 shadow-sm">
            <ActivityItem icon="🔑" title="Check-in: P.204" subtitle="Nguyễn Văn A" code="Mã: #BK9921 • Tiền mặt" time="10:45 AM" status="SUCCESS" statusColor="bg-success/10 text-success" />
            <ActivityItem icon="🏨" title="New booking: P.105" subtitle="Booking ID: #PHS8821" code="Mã: #BK8821 • Chuyển khoản" time="09:12 AM" status="PENDING" statusColor="bg-warning/10 text-warning" />
            <ActivityItem icon="🧹" title="Cleaning: P.302" subtitle="Nhân viên: Trần Thị B" code="Mã: N/A • Phụ phí: 0đ" time="08:30 AM" status="DONE" statusColor="bg-muted text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
