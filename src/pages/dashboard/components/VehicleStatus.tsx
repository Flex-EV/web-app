import { statuses } from '../data/VehicleStatus.data';

const VehicleStatus = () => {
  const variableDeta = 'fafaf';
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {statuses.map((status, index) => (
        <div
          key={index}
          className={`${status.color} p-6 rounded-lg text-white shadow-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">{status.label}</h3>
          <p className="text-4xl font-bold"> {status.count} </p>
        </div>
      ))}
    </div>
  );
};

export default VehicleStatus;
