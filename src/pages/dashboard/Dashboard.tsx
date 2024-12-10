import Map from './components/Map';
import VehicleStatus from './components/VehicleStatus';

const Dashboard = () => {
  return (
    <section className="flex flex-col h-full p-7 gap-5">
      <div className="flex-grow border border-gray-500 rounded-xl overflow-hidden shadow-lg">
        <Map />
      </div>
      <div className="mt-6">
        <VehicleStatus />
      </div>
    </section>
  );
};

export default Dashboard;
