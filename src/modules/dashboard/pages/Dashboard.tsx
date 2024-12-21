import VehicleStatus from '../components/VehicleStatus.tsx';
import FlexContainer from '@/modules/ui/components/FlexContainer.tsx';
import GoogleMap from '@/modules/dashboard/components/GoogleMap.tsx';

const Dashboard = () => {
  return (
    <FlexContainer title="Dashboard" fullHeight padding="large">
      <div className="flex-grow z-10">
        <GoogleMap />
      </div>

      <div className="mt-3">
        <VehicleStatus />
      </div>
    </FlexContainer>
  );
};

export default Dashboard;
