"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { acceptedRequest, listAgiotaBorrowings, denyRequest } from '@/app/api/agiota/rotas';

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

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos Solicitados</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
          <p>Nenhum empréstimo encontrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Valor</th>
                <th>Informações do Solicitante</th>
                <th>Número de Parcelas</th>
                <th>Dia do Pagamento</th>
                <th>Data Inicial</th>
                <th>Frequência</th>
                <th>Status</th>
                <th>Desconto</th>
                <th>Ações</th> 
              </tr>
            </thead>
            <tbody>
              {filteredBorrowings.map((borrowing) => (
                <tr key={borrowing.id}>
                  <td>{borrowing.value}</td>
                  <td>
                   
                  </td>
                  <td>{borrowing.numberInstallments}</td>
                  <td>{borrowing.payday}</td>
                  <td>{borrowing.initialDate}</td>
                  <td>{borrowing.frequency}</td>
                  <td>{borrowing.status}</td>
                  <td>{borrowing.discount}</td>
                  <td>
                    <button 
                      className="btn btn-info" 
                      onClick={() => router.push(`/agiota/${borrowing.id}/requestedBorrowing`)}
                    >
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListBorrowingsRequested;
