"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { listAgiotaBorrowings } from '@/app/api/agiota/rotas';
import { evaluateCustomer } from '@/app/api/borrowing/rotas';

const ListAgiotaBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listAgiotaBorrowings();
        console.log(response);
        setBorrowings(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  // Função para enviar a avaliação
  const handleEvaluate = async (id) => {
    const note = prompt("Insira a nota para o cliente (de 1 a 5):");

    if (note && (note >= 1 && note <= 5)) {
      try {
        await evaluateCustomer(id, { note });
        alert(`Avaliação enviada com sucesso!`);

        // Atualizar o estado local para marcar o cliente como avaliado
        setBorrowings(prevBorrowings => 
          prevBorrowings.map(borrowing => 
            borrowing.id === id ? { ...borrowing, customerEvaluated: true } : borrowing
          )
        );
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        alert('Erro ao enviar avaliação.');
      }
    } else {
      alert('Nota inválida. Por favor, insira uma nota entre 1 e 5.');
    }
  };

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
                <th>Ações</th> {/* Adicionando uma coluna para ações */}
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
                  <td>
                    {/* Botão de avaliar cliente, aparece apenas se o status for CONCLUÍDO */}
                    {borrowing.status === "CONCLUIDO" && (
                      borrowing.customerEvaluated ? (
                        <button className="btn btn-secondary" disabled>
                          Cliente Avaliado
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEvaluate(borrowing.id)}
                        >
                          Avaliar Cliente
                        </button>
                      )
                    )}
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

export default ListAgiotaBorrowings;
