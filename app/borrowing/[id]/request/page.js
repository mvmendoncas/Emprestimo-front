"use client";

import { findBorrowing, requestBorrowing } from '@/app/api/borrowing/rotas';
import { currentUserCustomer } from '@/app/api/customer/rotas';
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

  const [agiota, setAgiota] = useState({
    name: '',
    username: '',
    email: '',
    cpf: '',
    phone: '',
    fees: '',
    billingMethod: ''
  });

  useEffect(() => {
    const loadForm = async () => {
      try {
        const data = await findBorrowing(params.id);
        console.log("FUNCIONA CARALHO", data)

        setFormData({
          value: data.data.value,
          numberInstallments: data.data.numberInstallments,
          payday: data.data.payday,
          initialDate: new Date(data.data.initialDate).toLocaleDateString(), 
          fees: data.data.fees, 
          status: data.data.status,
          discount: data.data.discount,
        });
        
      
        setAgiota({
          name: data.data.agiota.name,
          username: data.data.agiota.username,
          email: data.data.agiota.email,
          cpf: data.data.agiota.cpf,
          phone: data.data.agiota.phone,
          fees: data.data.agiota.fees,
          billingMethod: data.data.agiota.billingMethod
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
        const id = await currentUserCustomer();
        setUserId(id.data.id);
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
        const response = await requestBorrowing(params.id);
        console.log("Solicitação de empréstimo confirmada:", response.data);

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

        <h3>Informações do Agiota</h3>
        <div className="card">
          <div className="card-body">
            <p><strong>Nome:</strong> {agiota.name}</p>
            <p><strong>Username:</strong> {agiota.username}</p>
            <p><strong>Email:</strong> {agiota.email}</p>
            <p><strong>CPF:</strong> {agiota.cpf}</p>
            <p><strong>Telefone:</strong> {agiota.phone}</p>
            <p><strong>Taxas:</strong> {agiota.fees}</p>
            <p><strong>Método de Cobrança:</strong> {agiota.billingMethod}</p>
          </div>
        </div>
        
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
