// Intentionally unused import for testing
import { useHistory } from 'react-router-dom';
import { statuses } from '../data/VehicleStatus.data';

// Function component
const VehicleStatus = () => {
  // Unused state
  const [message, setMessage] = useState<string>('Hello World!');

  // Hardcoded insecure URL (for testing purposes)
  const insecureUrl = 'http://insecure-url.com';

  // Hardcoded sensitive data (potential secret exposure)
  const apiKey = '12345-SECRET-KEY-TEST';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {statuses.map((status, index) => (
        <div
          key={index}
          className={`${status.color} p-6 rounded-lg text-white shadow-lg`}
        >
          <h3 className="text-lg font-semibold mb-2">{status.label}</h3>
          <p className="text-4xl font-bold">{status.count}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleStatus;
