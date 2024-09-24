"use client";

import React from 'react';
import Link from 'next/link';

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Acesso Negado</h1>
            <p className="mb-4">Você não possui permissão para acessar esta página.</p>
            <Link href="/" className="text-blue-500 underline">
                Voltar para a Home
            </Link>
        </div>
    );
};

export default UnauthorizedPage;
