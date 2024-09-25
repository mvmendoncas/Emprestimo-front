"use client";

import { currentUserCustomer, deleteCustomer } from '@/app/api/customer/rotas'; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute'; 

const Configurations = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await currentUserCustomer();
        setUserId(id.data.id);
        console.log("Chegou aqui", id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };
  
    fetchUserId();
  }, []);

  const handleDelete = async () => {
    const confirmed = window.confirm('Você tem certeza que deseja deletar a sua conta? Essa ação é irreversível.');
    
    if (confirmed) {
      try {
        await deleteCustomer(userId);  
        alert('Conta deletada com sucesso!');
        router.push('/');  
      } catch (error) {
        console.error('Erro ao deletar a conta:', error);
        alert('Ocorreu um erro ao deletar a conta.');
      }
    }
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mx-auto mt-10 p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Página do Cliente!</h1>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push(`/customer/edit/${userId}`)}
          >
            Editar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDelete}  
          >
            Deletar
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Configurations;
