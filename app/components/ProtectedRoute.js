// src/components/ProtectedRoute.js
"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const router = useRouter();
  const { isAuthenticated, roles } = useSelector((state) => ({
    isAuthenticated: state.userLogin.isAuthenticated,
    roles: state.userLogin.roles,
  }));

  // Se o estado de autenticação ainda não foi determinado, não renderiza nada
  if (isAuthenticated === undefined) {
    return null;
  }

  console.log('ProtectedRoute: isAuthenticated =', isAuthenticated);
  console.log('ProtectedRoute roles =', roles);

  if (!isAuthenticated) {
    console.log('Usuário não autenticado. Redirecionando para /login');
    router.push('/');
    return null;
  }

  if (requiredRoles.length > 0 && !requiredRoles.some(role => roles.includes(role))) {
    console.log('Usuário não possui as roles necessárias. Redirecionando para /unauthorized');
    router.push('/unauthorized');
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
