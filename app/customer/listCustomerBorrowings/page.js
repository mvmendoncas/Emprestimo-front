"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { listCustomerBorrowings } from '@/app/api/customer/rotas'; 
import { evaluateAgiota, findBorrowing } from '@/app/api/borrowing/rotas';

const ListCustomerBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [evaluatedStatus, setEvaluatedStatus] = useState({}); // Armazena o status de avaliação do agiota
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listCustomerBorrowings();
        setBorrowings(response.data);

        // Verifica se o agiota foi avaliado para cada empréstimo
        response.data.forEach(async (borrowing) => {
          const data = await findBorrowing(borrowing.id);
          const isAgiotaEvaluated = data.data.listaAvaliacoes.some(
            (avaliacao) => avaliacao.avaliado === "AGIOTA"
          );
          setEvaluatedStatus(prevState => ({
            ...prevState,
            [borrowing.id]: isAgiotaEvaluated,
          }));
        });
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
        await evaluateAgiota(id, { note });
        alert('Avaliação enviada com sucesso!');

        // Atualizar o estado local para marcar o agiota como avaliado
        setEvaluatedStatus(prevState => ({
          ...prevState,
          [id]: true,
        }));
      } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        alert('Erro ao enviar avaliação.');
      }
    } else {
      alert('Nota inválida. Por favor, insira uma nota entre 1 e 5.');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mt-5 mx-0">
        {loading ? (
          <p>Carregando...</p>
        ) : borrowings.length === 0 ? (
          <div>
            <h1><b>A.G.I.O.T.A</b></h1>
            <h5 className="mt-3">Aqui você pode solicitar empréstimos de maneira rápida e prática!</h5>
          </div>
        ) : (
          <div>
            <div className="text-center text-2xl font-semibold mb-6">Acompanhe seus empréstimos!</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {borrowings.map((borrowing) => (
                <Link href={`/borrowing/${borrowing.id}/installments`} className="text-black no-underline" key={borrowing.id}>
                  <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform hover:scale-105 transition duration-300">
                    <p className="mb-1"><strong>Valor:</strong> R${borrowing.value}</p>
                    <p className="mb-1"><strong>Parcelas:</strong> {borrowing.numberInstallments}</p>
                    <p className="mb-1"><strong>Dia do Pagamento:</strong> {borrowing.payday}</p>
                    <p className="mb-1"><strong>Data Inicial:</strong> {formatDate(borrowing.initialDate)}</p>
                    <p className="mb-1"><strong>Status:</strong> {borrowing.status}</p>
                    <p className="mb-1"><strong>Desconto:</strong> R${borrowing.discount}</p>
                    
                    {/* Verificar se o agiota foi avaliado */}
                    {borrowing.status === "CONCLUIDO" && (
                      evaluatedStatus[borrowing.id] ? (
                        <button className="btn btn-secondary" disabled>
                          Agiota Avaliado
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEvaluate(borrowing.id)}
                        >
                          Avaliar Agiota
                        </button>
                      )
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListCustomerBorrowings;
