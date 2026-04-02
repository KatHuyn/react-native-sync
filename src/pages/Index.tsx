import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import OverviewPage from "./OverviewPage";
import CustomersPage from "./CustomersPage";
import RoomMapPage from "./RoomMapPage";
import PlanningPage from "./PlanningPage";
import ReportsPage from "./ReportsPage";
import RegistrationPage from "./RegistrationPage";
import RoomDetailPage from "./RoomDetailPage";
import CancelledRoomsReportPage from "./CancelledRoomsReportPage";
import CompanyDebtReportPage from "./CompanyDebtReportPage";
import ArrivalReportPage from "./ArrivalReportPage";
import CashierReportPage from "./CashierReportPage";
import DepartureReportPage from "./DepartureReportPage";
import InHouseReportPage from "./InHouseReportPage";

const pages: Record<string, React.ComponentType<any>> = {
  overview: OverviewPage,
  customers: CustomersPage,
  rooms: RoomMapPage,
  planning: PlanningPage,
  reports: ReportsPage,
  registration: RegistrationPage,
  roomDetail: RoomDetailPage,
  cancelledRoomsReport: CancelledRoomsReportPage,
  companyDebtReport: CompanyDebtReportPage,
  arrivalReport: ArrivalReportPage,
  cashierReport: CashierReportPage,
  departureReport: DepartureReportPage,
  inHouseReport: InHouseReportPage,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [prevTab, setPrevTab] = useState("overview");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleNavigate = (tab: string, id?: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    if (id) setSelectedId(id);
  };

  const Page = pages[activeTab];
  const isFullPage = ["registration", "roomDetail", "cancelledRoomsReport", "companyDebtReport", "arrivalReport", "cashierReport", "departureReport", "inHouseReport"].includes(activeTab);
  const showNav = !isFullPage;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative overflow-x-hidden">
      <Page 
        onNavigate={handleNavigate} 
        onBack={() => setActiveTab(prevTab)} 
        selectedId={selectedId}
      />
      {showNav && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
    </div>
  );
};

export default Index;
