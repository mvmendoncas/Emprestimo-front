"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { listCustomerBorrowings } from '@/app/api/customer/rotas'; // Importe a função evaluateAgiota
import { evaluateAgiota } from '@/app/api/borrowing/rotas';

const ListCustomerBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listCustomerBorrowings();
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

  // Função para avaliar o agiota
  const handleEvaluate = async (id) => {
    const note = prompt("Insira a nota para o agiota (de 1 a 5):");

    if (note && (note >= 1 && note <= 5)) {
      try {
        const response = await evaluateAgiota(id, { note });
        alert(`Avaliação enviada com sucesso: ${response.data}`);
        
        // Atualizar o estado para remover o botão de avaliar
        setBorrowings((prevBorrowings) =>
          prevBorrowings.map((borrowing) =>
            borrowing.id === id ? { ...borrowing, status: "AGIOTA_AVALIADO" } : borrowing
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

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mt-5">
        {loading ? (
          <p>Carregando...</p>
        ) : borrowings.length === 0 ? (
            <div>
              <h1><b>A.G.I.O.T.A</b></h1>
              <h5 className="mt-3">Aqui você pode solicitar empréstimos de maneira rápida e prática! Se precisa de um apoio financeiro,
                estamos prontos para ajudar. Com condições flexíveis e ajustadas às suas necessidades, você poderá
                solicitar um empréstimo diretamente com o agiota e acompanhar todo o processo de forma segura e
                transparente. Solicite seu primeiro empréstimo!</h5>
            </div>
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
                <th>Ações</th> {/* Coluna para o botão de ações */}
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
                    {/* Mostrar o botão Avaliar Agiota apenas se o empréstimo estiver CONCLUÍDO */}
                    {borrowing.status === "CONCLUIDO" && (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEvaluate(borrowing.id)}
                      >
                        Avaliar Agiota
                      </button>
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

export default ListCustomerBorrowings;
