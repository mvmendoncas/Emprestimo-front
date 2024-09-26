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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota", "customer"]}>
      <div className="container mt-5">
        {loading ? (
          <p>Carregando...</p>
        ) : borrowings.length === 0 ? (
            <div>
              <h2>Solicite um novo empréstimo!</h2>
              <p>Nenhum agiota cadastrou os seus empréstimos ainda! Aguarde novos cadastros.</p>
            </div>
        ) : (
            <div>
            <h2>Solicite um novo empréstimo!</h2>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {borrowings.map((borrowing) => (
                      <div key={borrowing.id}
                           className="bg-white shadow-md rounded-lg p-6">
                        <p className="mb-1"><strong>Valor:</strong> R${borrowing.value}</p>
                        <p className="mb-1"><strong>Parcelas:</strong> {borrowing.numberInstallments}</p>
                        <p className="mb-1"><strong>Dia do Pagamento:</strong> {borrowing.payday}</p>
                        <p className="mb-1"><strong>Data Inicial:</strong> {formatDate(borrowing.initialDate)}</p>
                        <p className="mb-1"><strong>Status:</strong> {borrowing.status}</p>
                        <p className="mb-1"><strong>Desconto:</strong> R${borrowing.discount}</p>
                        <button
                            className="btn btn-primary mt-3 hover:shadow-lg transform hover:scale-100 transition duration-300"
                            onClick={() => handleRequestBorrowing(borrowing.id)}
                        >
                          Solicitar esse Empréstimo
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

export default ListBorrowings;
