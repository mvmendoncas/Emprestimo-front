"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listAgiotaBorrowings } from '@/app/api/agiota/rotas'; // Importe a função para listar empréstimos

const AgiotaHome = () => {
  const router = useRouter();
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const [hasCompletedBorrowings, setHasCompletedBorrowings] = useState(false); // Estado para empréstimos concluídos

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listAgiotaBorrowings();
        const borrowings = response.data;

        // Verifica se há novas solicitações de empréstimo
        const newRequests = borrowings.some(borrowing => borrowing.status === "SOLICITADO");

        // Verifica se há empréstimos concluídos
        const completedBorrowings = borrowings.some(borrowing => borrowing.status === "CONCLUIDO");

        setHasNewRequests(newRequests);
        setHasCompletedBorrowings(completedBorrowings);
      } catch (error) {
        console.error('Erro ao obter empréstimos:', error);
      }
    };

    fetchBorrowings();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Página do Agiota!</h1>

      {/* Mensagem se houver novas solicitações de empréstimo */}
      {hasNewRequests && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Você possui novas solicitações de empréstimo!</p>
        </div>
      )}

      {/* Mensagem se houver empréstimos concluídos */}
      {hasCompletedBorrowings && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p className="font-bold">Você tem um empréstimo concluído! Por favor, avalie o cliente.</p>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/borrowing/create')}
        >
          Criar Empréstimo
        </button>

        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/agiota/customers')}
        >
          Meus Clientes
        </button>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/agiota/requests')}
        >
          Solicitações
        </button>

        <button
          className="bg-green-500 hover:bg-black-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push('/agiota/listAgiotaBorrowings')}
        >
          Meus Empréstimos
        </button>
      </div>
    </div>
  );
};

export default AgiotaHome;
