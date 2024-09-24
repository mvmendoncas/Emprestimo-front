"use client";

import { useState, useEffect } from 'react';
import { listBorrowing } from '@/app/api/borrowing/rotas';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation'

const ListBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Função para buscar a lista de empréstimos
    const fetchBorrowings = async () => {
      try {
        const response = await listBorrowing();
        console.log(response)
        setBorrowings(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const handleRequestBorrowing = (borrowingId) => {
    router.push(`/borrowing/${borrowingId}/request`);
  };


  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota", "customer"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : borrowings.length === 0 ? (
          <p>Nenhum empréstimo encontrado.</p>
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
                {/* Inclua outros campos relevantes */}
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
                  <button
                      className="btn btn-primary"
                      onClick={() => handleRequestBorrowing(borrowing.id)}
                    >
                      Solicitar esse Empréstimo
                    </button>
                  {/* Inclua outros campos se necessário */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListBorrowings;
