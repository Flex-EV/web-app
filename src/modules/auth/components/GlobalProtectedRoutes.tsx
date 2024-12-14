import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { AppRoutes } from '@/routes/enum/Routes.enum';
import AuthService from '@/modules/auth/service/AuthService.ts';

interface GlobalProtectedRoutesProps {
  children: React.ReactNode;
}

export const GlobalProtectedRoutes: React.FC<GlobalProtectedRoutesProps> = ({
  children,
}) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authentication
  );

  const token = AuthService.getToken();

  const publicRoutes = [AppRoutes.LOGIN];

  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!isAuthenticated || !token) {
    return <Navigate to={AppRoutes.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
