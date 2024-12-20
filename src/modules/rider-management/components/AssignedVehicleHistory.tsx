import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Car, Calendar, ArrowLeft } from 'lucide-react';
import FlexContainer from '@/modules/ui/components/FlexContainer';
import FlexButton from '@/modules/ui/components/FlexButton';
import FlexLoader from '@/modules/ui/components/FlexLoader';
import { useCustomNavigate } from '@/routes/util/routing';

interface VehicleAssignment {
  id: string;
  vehicleId: string;
  registrationNumber: string;
  model: string;
  assignedAt: Date;
  returnedAt: Date | null;
  status: 'active' | 'returned' | 'damaged';
}

const VehicleHistory = () => {
  const { riderId } = useParams();
  const navigate = useCustomNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<VehicleAssignment[]>([]);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setHistory([
        {
          id: '1',
          vehicleId: 'v1',
          registrationNumber: 'MH02AB1234',
          model: 'Honda Activa',
          assignedAt: new Date('2024-01-01'),
          returnedAt: new Date('2024-02-01'),
          status: 'returned',
        },
        {
          id: '2',
          vehicleId: 'v2',
          registrationNumber: 'MH02CD5678',
          model: 'TVS Jupiter',
          assignedAt: new Date('2024-02-02'),
          returnedAt: null,
          status: 'active',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, [riderId]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: VehicleAssignment['status']) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      returned: 'bg-gray-100 text-gray-800',
      damaged: 'bg-red-100 text-red-800',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return <FlexLoader />;
  }

  return (
    <FlexContainer
      title="Vehicle Assignment History"
      fullHeight
      padding="large"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <FlexButton
            text="Back to Details"
            variant="outline"
            icon={<ArrowLeft size={18} />}
            onClick={() => navigate.toRiderDetails(riderId || '')}
          />
          <FlexButton
            text="Assign New Vehicle"
            variant="primary"
            icon={<Car size={18} />}
            onClick={() => navigate.toAssignVehicle(riderId || '')}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg">
          <div className="grid gap-6 p-6">
            {history.map((assignment) => (
              <div
                key={assignment.id}
                className="border rounded-lg p-4 hover:border-green-500 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Car className="text-green-600" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {assignment.model}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {assignment.registrationNumber}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(assignment.status)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Assigned Date</p>
                      <p className="font-medium">
                        {formatDate(assignment.assignedAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Return Date</p>
                      <p className="font-medium">
                        {assignment.returnedAt
                          ? formatDate(assignment.returnedAt)
                          : 'Currently Assigned'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FlexContainer>
  );
};

export default VehicleHistory;
