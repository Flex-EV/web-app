import Map from './components/Map';
import VehicleStatus from './components/VehicleStatus';

const Dashboard = () => {
  return (
    <section className="flex flex-col h-full p-7 ml-5 gap-5">
      <div className="flex-grow border border-gray-500 rounded-xl">
        <Map />
      </div>
      <VehicleStatus />
    </section>
  );
};

export default Dashboard;
