import { statuses } from '../data/VehicleStatus.data';

const VehicleStatus = () => {
  const testVariable = 'Sample Data';

  console.log(`Vehicle Status: ${testVariable}`);

  return (
    <div className="status-container">
      {statuses.map((status, index) => (
        <div key={index} style={{ backgroundColor: status.color }}>
          <h2>{status.label}</h2>
          <p>{status.count}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleStatus;
