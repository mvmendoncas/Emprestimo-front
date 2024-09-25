"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation'
import { listAgiotaBorrowings } from '@/app/api/agiota/rotas';

const ListAgiotaBorrowings = () => {
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const fetchBorrowings = async () => {
          try {
            const response = await listAgiotaBorrowings();
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
 
  const filteredBorrowings = borrowings.filter(borrowing => borrowing.status !== "SOLICITADO");

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
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
              </tr>
            </thead>
            <tbody>
              {filteredBorrowings.map((borrowing) => (
                <tr key={borrowing.id}>
                  <td>{borrowing.id}</td>
                  <td>{borrowing.value}</td>
                  <td>{borrowing.numberInstallments}</td>
                  <td>{borrowing.payday}</td>
                  <td>{borrowing.initialDate}</td>
                  <td>{borrowing.frequency}</td>
                  <td>{borrowing.status}</td>
                  <td>{borrowing.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListAgiotaBorrowings;