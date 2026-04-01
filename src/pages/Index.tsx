import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import OverviewPage from "./OverviewPage";
import CustomersPage from "./CustomersPage";
import RoomMapPage from "./RoomMapPage";
import PlanningPage from "./PlanningPage";
import InvoicesPage from "./InvoicesPage";

const pages: Record<string, React.ComponentType> = {
  overview: OverviewPage,
  customers: CustomersPage,
  rooms: RoomMapPage,
  planning: PlanningPage,
  invoices: InvoicesPage,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const Page = pages[activeTab];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-background relative">
      <Page />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
