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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5 mx-0">
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
            <div>
              <h1><b>A.G.I.O.T.A</b></h1>
              <h5 className="mt-3">Aqui você pode gerenciar suas operações de crédito de forma simples e organizada. Nosso sistema permite que você ofereça empréstimos a clientes, estabelecendo condições personalizadas como valor, número de parcelas, taxas de juros e datas de pagamento.

                Ao cadastrar seus empréstimos, você poderá acompanhar o status de cada operação, desde a solicitação até o pagamento completo. Além disso, é possível avaliar o perfil de cada cliente e ajustar suas ofertas de acordo com suas necessidades e histórico.

                Comece cadastrando seu primeiro empréstimo e aproveite as funcionalidades que vão facilitar sua gestão financeira!</h5>
            </div>
        ) : (
            <div>
              <div className="text-center text-2xl font-semibold mb-6">Acompanhe seus empréstimos!</div>
              <table className="table">
                <thead>
                <tr>
                  <th>Valor</th>
                  <th>Número de Parcelas</th>
                  <th>Dia do Pagamento</th>
                  <th>Data Inicial</th>
                  <th>Status</th>
                  <th>Desconto</th>
                  <th>Ações</th>
                  {/* Adicionando uma coluna para ações */}
                </tr>
                </thead>
                <tbody>
                {filteredBorrowings.map((borrowing) => (
                    <tr key={borrowing.id}>
                      <td>{borrowing.value}</td>
                      <td>{borrowing.numberInstallments}</td>
                      <td>{borrowing.payday}</td>
                      <td>{formatDate(borrowing.initialDate)}</td>
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
            </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListAgiotaBorrowings;
