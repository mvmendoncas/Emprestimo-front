"use client";

import { findBorrowing, requestBorrowing } from '@/app/api/borrowing/rotas';
import { currentUser } from '@/app/api/customer/rotas';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';


const Request = () => {
  const router = useRouter();
  const params = useParams();
  const [userId, setUserId] =  useState(null);

  const [formData, setFormData] = useState({
    value: '',
    numberInstallments: '',
    payday: '',
    initialDate: '',
    fees: '',
    status: '',
    discount: '',
  });

  useEffect(() => {
    const loadForm = async () => {
      try {
        const data = await findBorrowing(params.id);
        console.log("TESTE", data);
        setFormData({
          value: data.data.value,
          numberInstallments: data.data.numberInstallments,
          payday: data.data.payday,
          initialDate: new Date(data.data.initialDate).toLocaleDateString(), // Formata a data
          fees: data.data.fees, // Mapeia fees para exibir
          status: data.data.status,
          discount: data.data.discount,
        });
      } catch (error) {
        console.error('Erro ao buscar empréstimo:', error);
      }
    };

    loadForm();
  }, [params.id]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await currentUser();
        setUserId(id.data.id);
        console.log("Chegou aqui", id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };
  
    fetchUserId();
  }, []);
  
  const handleConfirm = async () => {
    const confirmed = window.confirm('Você deseja confirmar a solicitação deste empréstimo?');
    if (confirmed) {
      try {
        // Chama a função para fazer a requisição ao backend
        const response = await requestBorrowing(params.id);
        console.log("Solicitação de empréstimo confirmada:", response.data);

        // Exibe uma mensagem de sucesso
        alert('Solicitação de empréstimo confirmada com sucesso!');

      } catch (error) {
        console.error('Erro ao solicitar empréstimo:', error);
        alert('Ocorreu um erro ao confirmar a solicitação do empréstimo.');
      }
    }
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mt-5">
        <h2>Detalhes do Empréstimo</h2>
        <div className="card">
          <div className="card-body">
            <p><strong>Valor:</strong> {formData.value}</p>
            <p><strong>Número de Parcelas:</strong> {formData.numberInstallments}</p>
            <p><strong>Dia do Pagamento:</strong> {formData.payday}</p>
            <p><strong>Data Inicial:</strong> {formData.initialDate}</p>
            <p><strong>Taxas:</strong> {formData.fees}</p>
            <p><strong>Status:</strong> {formData.status}</p>
            <p><strong>Desconto:</strong> {formData.discount}</p>
          </div>
        </div>
        
        {/* Botão para confirmar a solicitação */}
        <div className="mt-3">
          <button className="btn btn-success" onClick={handleConfirm}>
            Confirmar Solicitação de Empréstimo
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Request;