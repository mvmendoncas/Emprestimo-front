"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { listCustomerBorrowings } from '@/app/api/customer/rotas';

const BrrowingsInProgress = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listCustomerBorrowings();
        console.log(response);
        const borrowingsInProgress = response.data.filter(borrowing => borrowing.status === "ANDAMENTO");
        setBorrowings(borrowingsInProgress);
      } catch (error) {
        console.error('Erro ao obter a lista de empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const handleDetailsClick = (id) => {
    router.push(`/borrowing/${id}/installments`);  // Exemplo de rota para ver detalhes do empréstimo
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos em Andamento</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : borrowings.length === 0 ? (
          <p>Nenhum empréstimo em andamento encontrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Valor</th>
                <th>Número de Parcelas</th>
                <th>Dia do Pagamento</th>
                <th>Data Inicial</th>
                <th>Frequência</th>
                <th>Status</th>
                <th>Desconto</th>
                <th>Ações</th> {/* Nova coluna para o botão */}
              </tr>
            </thead>
            <tbody>
              {borrowings.map((borrowing) => (
                <tr key={borrowing.id}>
                  <td>{borrowing.id}</td>
                  <td>{borrowing.value}</td>
                  <td>{borrowing.numberInstallments}</td>
                  <td>{borrowing.payday}</td>
                  <td>{borrowing.initialDate}</td>
                  <td>{borrowing.frequency}</td>
                  <td>{borrowing.status}</td>
                  <td>{borrowing.discount}</td>
                  <td>
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handleDetailsClick(borrowing.id)}
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

export default BrrowingsInProgress;
