import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/routes/enum/Routes.enum.ts';

export const useCustomNavigate = () => {
  const navigate = useNavigate();

  return {
    toDashboard: () => navigate(AppRoutes.DASHBOARD),

    toRiderDetails: (riderId: string) => {
      navigate(`${AppRoutes.RIDER_MANAGEMENT}/${riderId}`);
    },
  };
};
