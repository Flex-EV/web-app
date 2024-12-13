import Map from '../components/Map.tsx';
import VehicleStatus from '../components/VehicleStatus.tsx';
import FlexContainer from '@/modules/ui/components/FlexContainer.tsx';

const Dashboard = () => {
  return (
    <FlexContainer title="Dashboard" fullHeight padding="large">
      <div className="flex-grow z-10">
        <Map />
      </div>

      <div className="mt-3">
        <VehicleStatus />
      </div>
    </FlexContainer>
  );
};

export default Dashboard;
