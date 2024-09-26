"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute'; 
import { currentUserAgiota, deleteAgiota } from '@/app/api/agiota/rotas';
import EditAgiota from '../edit/page';

const Configurations = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await currentUserAgiota();
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
        await deleteAgiota(userId);
        alert('Conta deletada com sucesso!');
        router.push('/'); 
      } catch (error) {
        console.error('Erro ao deletar a conta:', error);
        alert('Ocorreu um erro ao deletar a conta.');
      }
    }
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="mb-5">
        <EditAgiota/>
      </div>
    </ProtectedRoute>
  );
};

export default Configurations;
