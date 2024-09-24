// src/components/HomePage.js
"use client";

import React from 'react';
import HomeCustumer from '../components/homeCustumer/page';
import AgiotaHome from '../components/homeAgiota/page';
import ProtectedRoute from '../components/ProtectedRoute';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { isAuthenticated, roles } = useSelector((state) => ({
        isAuthenticated: state.userLogin.isAuthenticated,
        roles: state.userLogin.roles,
    }));
    
    console.log('Estado de Autenticação:', isAuthenticated);
    console.log('Roles do Usuário:', roles);

    if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-4xl font-bold mb-4">Bem-vindo!</h1>
                <p className="mb-4">Por favor, faça login para continuar.</p>
            </div>
        );
    }

    return (
        <div>
            {(roles.includes('administrador') || roles.includes('agiota')) ? (
                <ProtectedRoute requiredRoles={['administrador', 'agiota']}>
                    <AgiotaHome />
                </ProtectedRoute>
            ) : (
                <ProtectedRoute requiredRoles={['default-roles-agiota']}>
                    <HomeCustumer />
                </ProtectedRoute>
            )}
        </div>
    );
};

export default HomePage;
