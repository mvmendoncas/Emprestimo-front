"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { acceptedRequest, listAgiotaBorrowings, denyRequest } from '@/app/api/agiota/rotas';
import Link from "next/link";

const ListBorrowingsRequested = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listAgiotaBorrowings();
        setBorrowings(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const filteredBorrowings = borrowings.filter(borrowing => borrowing.status === "SOLICITADO");

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); 
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
            <div>
              <div className="text-center text-2xl font-semibold mb-6">Acompanhe suas solicitações de empréstimo!</div>
              <p>Voce ainda nao recebeu nenhuma solicitação de empréstimo.</p>
            </div>
        ) : (
            <div>
              <div className="text-center text-2xl font-semibold mb-6">Acompanhe suas solicitações de empréstimo!</div>

              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredBorrowings.map((borrowing) => (
                        <div key={borrowing.id}
                             className="bg-white shadow-md rounded-lg p-6">
                          <p className="mb-1"><strong>Valor:</strong> R${borrowing.value}</p>
                          <p className="mb-1"><strong>Parcelas:</strong> {borrowing.numberInstallments}</p>
                          <p className="mb-1"><strong>Dia do Pagamento:</strong> {borrowing.payday}</p>
                          <p className="mb-1"><strong>Data Inicial:</strong> {formatDate(borrowing.initialDate)}</p>
                          <p className="mb-1"><strong>Frequência:</strong> {borrowing.frequency}</p>
                          <p className="mb-1"><strong>Status:</strong> {borrowing.status}</p>
                          <p className="mb-1"><strong>Desconto:</strong> R${borrowing.discount}</p>
                          <button
                              className="btn btn-info"
                              onClick={() => router.push(`/agiota/${borrowing.id}/requestedBorrowing`)}
                          >
                            Ver Detalhes
                          </button>
                        </div>
                  ))}
                </div>
              </div>
            </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListBorrowingsRequested;
