import Header from "@/ui/components/Header";
import Map from "./components/Map";
import VehicleStatus from "./components/VehicleStatus";

const Dashboard = () => {
  return (
    <section className="flex flex-col h-screen p-7 ml-5 gap-5">
      <Header />
      <div className="flex-grow border border-neutral-500/50">
        <Map />
      </div>
      <VehicleStatus />
    </section>
  );
};

export default Dashboard;
