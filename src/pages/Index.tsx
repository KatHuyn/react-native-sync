import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import OverviewPage from "./OverviewPage";
import CustomersPage from "./CustomersPage";
import RoomMapPage from "./RoomMapPage";
import PlanningPage from "./PlanningPage";
import InvoicesPage from "./InvoicesPage";
import RegistrationPage from "./RegistrationPage";
import RoomDetailPage from "./RoomDetailPage";

const pages: Record<string, React.ComponentType<any>> = {
  overview: OverviewPage,
  customers: CustomersPage,
  rooms: RoomMapPage,
  planning: PlanningPage,
  invoices: InvoicesPage,
  registration: RegistrationPage,
  roomDetail: RoomDetailPage,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [prevTab, setPrevTab] = useState("overview");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleNavigate = (tab: string, id?: string) => {
    setPrevTab(activeTab);
    setActiveTab(tab);
    if (id) setSelectedId(id);
  };

  const Page = pages[activeTab];
  const isFullPage = ["registration", "roomDetail"].includes(activeTab);
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
