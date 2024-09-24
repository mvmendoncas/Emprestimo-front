// app/components/AgiotaHome.js (supondo o caminho)
"use client";

import { useRouter } from 'next/navigation';

const AgiotaHome = () => { // Nome com letra maiúscula
  const router = useRouter();

  return (
    <div className="container mx-auto mt-10 p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Página do Agiota!</h1>
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
          onClick={() => router.push('/agiota/stats')}
        >
          Estatísticas
        </button>
      </div>
    </div>
  );
};

export default AgiotaHome; // Exportação com o novo nome
