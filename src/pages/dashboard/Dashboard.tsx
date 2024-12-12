import Map from './components/Map';
import VehicleStatus from './components/VehicleStatus';
import FlexContainer from '@/ui/components/FlexContainer.tsx';

const Dashboard = () => {
  return (
    <FlexContainer fullHeight padding="large" className={'m-5 p-2'}>
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
