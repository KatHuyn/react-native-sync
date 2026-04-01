import { useState, useEffect } from "react";
import { CheckCircle, Building, ArrowDownLeft, ArrowUpRight, TrendingUp, Search, Calendar as CalendarIcon } from "lucide-react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { DateRange } from "react-day-picker";

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
  const [occupancyFilter, setOccupancyFilter] = useState("NGÀY");
  const [revenueFilter, setRevenueFilter] = useState("NGÀY");
  const [revenueType, setRevenueType] = useState("REAL"); // "REAL" or "EXPECTED"
  const [recentTab, setRecentTab] = useState("BOOKING"); // "BOOKING" or "PAYMENT"
  
  const [activeSegment, setActiveSegment] = useState<{ label: string; value: number } | null>(null);
  const [selectedRevBar, setSelectedRevBar] = useState<{ label: string; value: number } | null>(null);
  
  const [singleDate, setSingleDate] = useState<Date>(new Date());
  const [occDate, setOccDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  
  const [revDate, setRevDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });

  useEffect(() => {
    setSelectedRevBar(null);
  }, [revenueFilter, revenueType]);

  const FilterButtons = ({ active, onChange }: { active: string; onChange: (v: string) => void }) => (
    <div className="flex bg-secondary rounded-full p-0.5">
      {["NGÀY", "THÁNG", "NĂM"].map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={cn(
            "text-xs px-3 py-1 rounded-full transition-all",
            active === f ? "bg-primary text-primary-foreground font-semibold shadow-sm" : "text-muted-foreground"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );

  const DatePicker = ({ date, setDate }: { date: Date; setDate: (d: Date) => void }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start text-left font-normal mt-2 h-8 text-[11px] bg-accent/50 border-none",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {date ? format(date, "dd MMMM, y") : <span>Chọn ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => d && setDate(d)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  const DateRangePicker = ({ range, setRange }: { range: DateRange | undefined; setRange: (r: DateRange | undefined) => void }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start text-left font-normal mt-2 h-8 text-[11px] bg-accent/50 border-none",
            !range && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, "dd/MM")} - {format(range.to, "dd/MM/y")}
              </>
            ) : (
              format(range.from, "dd/MM/y")
            )
          ) : (
            <span>Chọn giai đoạn</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );

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
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-base">Công suất phòng</h3>
            <FilterButtons active={occupancyFilter} onChange={setOccupancyFilter} />
          </div>
          
          {occupancyFilter === "NGÀY" && (
            <DatePicker date={singleDate} setDate={setSingleDate} />
          )}
          {occupancyFilter === "THÁNG" && (
            <DateRangePicker range={occDate} setRange={setOccDate} />
          )}

          {(() => {
            const occupancyDataMap: Record<string, { data: { label: string; value: number; color: string; bg: string }[]; prev: number }> = {
              "NGÀY": {
                data: [
                  { label: "Đang ở", value: 28, color: "hsl(var(--occupied))", bg: "bg-occupied" },
                  { label: "Trống", value: 12, color: "hsl(var(--available))", bg: "bg-available" },
                  { label: "Đã đặt", value: 6, color: "hsl(var(--reserved))", bg: "bg-reserved" },
                  { label: "Cần dọn", value: 4, color: "hsl(var(--cleaning))", bg: "bg-cleaning" },
                  { label: "Bảo trì", value: 2, color: "hsl(var(--maintenance))", bg: "bg-maintenance" },
                ],
                prev: 63.5,
              },
              "THÁNG": {
                data: [
                  { label: "Đang ở", value: 1020, color: "hsl(var(--occupied))", bg: "bg-occupied" },
                  { label: "Trống", value: 310, color: "hsl(var(--available))", bg: "bg-available" },
                  { label: "Đã đặt", value: 150, color: "hsl(var(--reserved))", bg: "bg-reserved" },
                  { label: "Cần dọn", value: 55, color: "hsl(var(--cleaning))", bg: "bg-cleaning" },
                  { label: "Bảo trì", value: 25, color: "hsl(var(--maintenance))", bg: "bg-maintenance" },
                ],
                prev: 62.8,
              },
              "NĂM": {
                data: [
                  { label: "Đang ở", value: 12400, color: "hsl(var(--occupied))", bg: "bg-occupied" },
                  { label: "Trống", value: 3800, color: "hsl(var(--available))", bg: "bg-available" },
                  { label: "Đã đặt", value: 1800, color: "hsl(var(--reserved))", bg: "bg-reserved" },
                  { label: "Cần dọn", value: 650, color: "hsl(var(--cleaning))", bg: "bg-cleaning" },
                  { label: "Bảo trì", value: 330, color: "hsl(var(--maintenance))", bg: "bg-maintenance" },
                ],
                prev: 67.2,
              },
            };

            const config = occupancyDataMap[occupancyFilter as keyof typeof occupancyDataMap] || occupancyDataMap["NGÀY"];
            const data = config.data;
            const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
            const occupiedAndReserved = (data.find(d => d.label === "Đang ở")?.value || 0) + (data.find(d => d.label === "Đã đặt")?.value || 0);
            const occupancyPercentage = Math.round((occupiedAndReserved / totalValue) * 100);
            const growth = (occupancyPercentage - config.prev).toFixed(1);
            
            const circumference = 2 * Math.PI * 50;
            let currentOffset = 0;

            return (
              <>
                <div className="flex justify-center my-6">
                  <div className="relative w-44 h-44">
                    <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                      {data.map((item, index) => {
                        const segmentLength = (item.value / totalValue) * circumference;
                        const strokeDashOffset = -currentOffset;
                        currentOffset += segmentLength;

                        return (
                          <circle
                            key={index}
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke={item.color}
                            strokeWidth="10"
                            strokeDasharray={`${segmentLength} ${circumference}`}
                            strokeDashoffset={strokeDashOffset}
                            strokeLinecap="round"
                            className="transition-all duration-300 cursor-pointer hover:stroke-[12px]"
                            onClick={() => setActiveSegment(
                              activeSegment?.label === item.label ? null : { label: item.label, value: item.value }
                            )}
                          />
                        );
                      })}
                    </svg>
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
                      onClick={() => setActiveSegment(null)}
                    >
                      {activeSegment ? (
                        <>
                          <span className="text-2xl font-extrabold">{activeSegment.value.toLocaleString()}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-medium">{activeSegment.label}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-bold">{occupancyPercentage}%</span>
                          <span className={cn(
                            "text-xs flex items-center gap-0.5 font-bold mt-0.5",
                            Number(growth) >= 0 ? "text-emerald-700" : "text-destructive"
                          )}>
                            <TrendingUp className="w-3 h-3" /> {Number(growth) >= 0 ? "+" : ""}{growth}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                  {data.map((item) => (
                    <div 
                      key={item.label} 
                      className={cn(
                        "flex items-center gap-2 text-xs transition-colors p-1 rounded-lg",
                        activeSegment?.label === item.label ? "bg-accent/50 text-foreground" : "text-muted-foreground"
                      )}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.bg}`} />
                      <span className="truncate">{item.label}</span>
                      <span className="font-semibold ml-auto">({item.value.toLocaleString()})</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        {/* Revenue */}
        <div className="bg-card rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">Doanh thu</h3>
            <FilterButtons active={revenueFilter} onChange={setRevenueFilter} />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <button 
              onClick={() => setRevenueType("REAL")}
              className={cn(
                "text-[10px] font-bold px-3 py-1 rounded-lg border transition-all",
                revenueType === "REAL" ? "bg-[#1AB1A5]/10 border-[#1AB1A5] text-[#1AB1A5]" : "bg-secondary/50 border-transparent text-muted-foreground"
              )}
            >
              THẬT
            </button>
            <button 
              onClick={() => setRevenueType("EXPECTED")}
              className={cn(
                "text-[10px] font-bold px-3 py-1 rounded-lg border transition-all",
                revenueType === "EXPECTED" ? "bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6]" : "bg-secondary/50 border-transparent text-muted-foreground"
              )}
            >
              DỰ KIẾN
            </button>
          </div>
          
          {revenueFilter === "THÁNG" && (
            <div className="mb-4">
              <DateRangePicker range={revDate} setRange={setRevDate} />
            </div>
          )}

          {(() => {
            const isReal = revenueType === "REAL";
            const themeColor = isReal ? "#1AB1A5" : "#8B5CF6";
            
            const revenueDataMap: Record<string, { total: string; growth: string; comparison: string; bars: { label: string; value: number; active: boolean; isFuture?: boolean; isSecondary?: boolean }[] }> = {
              "NGÀY": {
                total: isReal ? "12.450k" : "65.800k",
                growth: isReal ? "+8.5%" : "+12.0%",
                comparison: isReal ? "so với trung bình tháng" : "tổng dự báo 7 ngày tới",
                bars: isReal 
                  ? [
                      { label: "Trung bình ngày", value: 10800, active: false, isSecondary: true },
                      { label: "Hôm nay (22/05)", value: 12450, active: true },
                    ]
                  : [
                      { label: "T5, 23/05", value: 8200, active: false },
                      { label: "T6, 24/05", value: 9500, active: false },
                      { label: "T7, 25/05", value: 14800, active: true },
                      { label: "CN, 26/05", value: 12200, active: false },
                      { label: "T2, 27/05", value: 7100, active: false },
                      { label: "T3, 28/05", value: 6800, active: false },
                      { label: "T4, 29/05", value: 7200, active: false },
                    ]
              },
              "THÁNG": {
                total: isReal ? "385.200k" : "185.400k",
                growth: isReal ? "+12.2%" : "+18.5%",
                comparison: isReal ? "so với tháng trước" : "dự kiến tuần tới & tháng sau",
                bars: isReal
                  ? [
                      { label: "Tuần 1", value: 85000, active: false },
                      { label: "Tuần 2", value: 112000, active: false },
                      { label: "Tuần 3", value: 78000, active: false },
                      { label: "Tuần 4", value: 110200, active: true },
                    ]
                  : [
                      { label: "Tuần 5", value: 45000, active: true },
                      { label: "Tháng tới", value: 140400, active: false, isFuture: true },
                    ]
              },
              "NĂM": {
                total: isReal ? "1.450.000k" : "11.300.000k",
                growth: isReal ? "+15.5%" : "+22.0%",
                comparison: isReal ? "so với năm 2025" : "ước tính chiến lược 2 năm tới",
                bars: isReal 
                  ? [
                      { label: "2024", value: 2850000, active: false },
                      { label: "2025", value: 3420000, active: false },
                      { label: "2026", value: 1450000, active: true },
                    ]
                  : [
                      { label: "2027", value: 5200000, active: false },
                      { label: "2028", value: 6100000, active: false },
                    ]
              }
            };

            const config = revenueDataMap[revenueFilter as keyof typeof revenueDataMap] || revenueDataMap["NGÀY"];
            const maxVal = Math.max(...config.bars.map(b => b.value));
            
            const displayTotal = selectedRevBar ? `${(selectedRevBar.value / 1000).toFixed(3)}k` : config.total;
            const displayLabel = selectedRevBar ? selectedRevBar.label : (isReal 
              ? (revenueFilter === "NGÀY" ? "Hiệu suất hôm nay" : revenueFilter === "NĂM" ? "Tăng trưởng liên năm" : "Kết quả tháng này")
              : (revenueFilter === "NGÀY" ? "Kế hoạch 7 ngày tới" : revenueFilter === "NĂM" ? "Tầm nhìn dài hạn" : "Dòng tiền sắp tới")
            );

            return (
              <>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                  {displayLabel}
                </p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl font-extrabold" style={{ color: themeColor }}>
                    {displayTotal.split('k')[0]}
                  </span>
                  <span className="text-sm text-muted-foreground font-bold">k VND</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" style={{ color: isReal ? "#047857" : themeColor }} />
                  <span className="text-xs font-bold" style={{ color: isReal ? "#047857" : themeColor }}>{config.growth}</span>
                  <span className="text-xs text-muted-foreground">{config.comparison}</span>
                </div>
                
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60 mt-10 mb-6 font-primary">
                  {isReal ? "Phân tích doanh thu" : "Dự báo kế hoạch"} theo {revenueFilter === "NGÀY" ? (isReal ? "hiệu suất" : "ngày") : revenueFilter === "THÁNG" ? "tuần" : "năm"}
                </p>

                <div className="relative">
                  {/* Goal Line */}
                  <div className="absolute top-[30%] w-full border-t border-dashed border-primary/20 z-0 flex items-center justify-end">
                    <span className="text-[8px] text-primary/30 mr-1 -mt-3 font-bold uppercase tracking-tighter">Budget Goal</span>
                  </div>

                  <div className={cn(
                    "relative flex items-end h-40 gap-2 z-10",
                    revenueFilter === "NĂM" ? "gap-4" : (revenueFilter === "NGÀY" && !isReal ? "gap-1" : "gap-3")
                  )}>
                    {config.bars.map((bar, i) => {
                      const height = (bar.value / maxVal) * 100;
                      const isSelected = selectedRevBar?.label === bar.label;
                      const isActive = bar.active;

                      return (
                        <div 
                          key={i} 
                          className="flex-1 h-full flex flex-col items-center justify-end gap-2 group cursor-pointer"
                          onClick={() => setSelectedRevBar(isSelected ? null : { label: bar.label, value: bar.value })}
                        >
                          <div className="relative w-full flex items-end justify-center h-full">
                            <div 
                              className={cn(
                                "rounded-t-sm transition-all duration-500",
                                isSelected ? "" : (bar.isSecondary ? "bg-slate-200" : "bg-slate-100"),
                                revenueFilter === "NGÀY" ? (isReal ? "w-14" : "w-full") : (revenueFilter === "THÁNG" ? "w-12" : "w-16"),
                                isSelected && "ring-2 ring-offset-2 z-20",
                                !isReal && "border-2 border-dashed"
                              )} 
                              style={{ 
                                height: `${height}%`,
                                minHeight: "6px",
                                backgroundColor: isSelected ? themeColor : undefined,
                                borderColor: !isReal ? (isSelected ? themeColor : `${themeColor}44`) : undefined,
                                opacity: !isReal && !isSelected ? 0.3 : 1,
                                boxShadow: isSelected ? `0 -4px 12px ${themeColor}44` : "none"
                              }}
                            />
                            {isActive && (
                              <div className="absolute -top-4 w-1.5 h-1.5 rounded-full animate-pulse z-30" style={{ backgroundColor: themeColor }} />
                            )}
                          </div>
                          <span className={cn(
                            "text-[8px] transition-all uppercase text-center leading-tight h-6",
                            isActive ? "font-extrabold" : "font-bold",
                            isActive || isSelected ? "scale-110" : "text-muted-foreground"
                          )} style={{ color: (isActive || isSelected) ? themeColor : undefined }}>
                            {bar.label.split(',')[0]}<br/>{bar.label.split(',')[1] || ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-base">Thao tác gần đây</h3>
          </div>

          {/* New Activity Tabs */}
          <div className="flex border-b border-border mb-4">
            <button 
              onClick={() => setRecentTab("BOOKING")}
              className={cn(
                "flex-1 py-2 text-xs font-bold transition-all border-b-2",
                recentTab === "BOOKING" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              )}
            >
              ĐẶT PHÒNG
            </button>
            <button 
              onClick={() => setRecentTab("PAYMENT")}
              className={cn(
                "flex-1 py-2 text-xs font-bold transition-all border-b-2",
                recentTab === "PAYMENT" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
              )}
            >
              THANH TOÁN
            </button>
          </div>

          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm border border-border placeholder:text-muted-foreground"
              placeholder={recentTab === "BOOKING" ? "Tìm mã booking, tên khách..." : "Tìm mã hóa đơn, mã phòng..."} />
          </div>

          <div className="bg-card rounded-xl px-4 shadow-sm pb-2">
            {recentTab === "BOOKING" ? (
              <>
                <ActivityItem icon="🔑" title="Check-in: P.204" subtitle="Nguyễn Văn A" code="Mã: #BK9921 • Tiền mặt" time="10:45 AM" status="SUCCESS" statusColor="bg-success/10 text-success" />
                <ActivityItem icon="🏨" title="New booking: P.105" subtitle="Booking ID: #PHS8821" code="Mã: #BK8821 • Chuyển khoản" time="09:12 AM" status="PENDING" statusColor="bg-warning/10 text-warning" />
                <ActivityItem icon="🧹" title="Cleaning: P.302" subtitle="Nhân viên: Trần Thị B" code="Mã: N/A • Phụ phí: 0đ" time="08:30 AM" status="DONE" statusColor="bg-muted text-muted-foreground" />
              </>
            ) : (
              <>
                <ActivityItem icon="💰" title="Thanh toán Checkout: P.402" subtitle="Lê Thị C" code="HĐ: #INV-2044 • 1.250.000đ" time="11:30 AM" status="PAID" statusColor="bg-success/10 text-success" />
                <ActivityItem icon="💳" title="Đặt cọc: P.108" subtitle="Phạm Văn D" code="Mã: #BK1102 • 500.000đ" time="10:15 AM" status="SUCCESS" statusColor="bg-success/10 text-success" />
                <ActivityItem icon="🔄" title="Hoàn tiền: P.205" subtitle="Hoàng Văn E" code="HĐ: #INV-1992 • 200.000đ" time="08:50 AM" status="REFUND" statusColor="bg-destructive/10 text-destructive" />
              </>
            )}
            
            <button className="w-full py-3 text-xs font-bold text-primary border-t border-border mt-2">
              XEM THÊM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
