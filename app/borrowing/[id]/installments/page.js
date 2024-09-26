"use client";

import { findBorrowing, viewInstallments, payInstallment } from '@/app/api/borrowing/rotas';
import { currentUserCustomer } from '@/app/api/customer/rotas';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const Installments = () => {
  const router = useRouter();
  const params = useParams();
  const [userId, setUserId] = useState(null);
  const [installments, setInstallments] = useState([]);
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
        setFormData({
          value: data.data.value,
          numberInstallments: data.data.numberInstallments,
          payday: data.data.payday,
          initialDate: new Date(data.data.initialDate).toLocaleDateString(),
          fees: data.data.fees,
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
        const id = await currentUserCustomer();
        setUserId(id.data.id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };
  
    fetchUserId();
  }, []);

  
  useEffect(() => {
    const loadInstallments = async () => {
      try {
        const response = await viewInstallments(params.id);
        setInstallments(response.data);
      } catch (error) {
        console.error('Erro ao buscar as parcelas:', error);
      }
    };

    loadInstallments();
  }, [params.id]);

 
  const handlePayment = async (installmentId, installmentValue) => {
    const confirmed = window.confirm('Você tem certeza que deseja efetuar o pagamento desta parcela?');
    if (confirmed) {
      try {
        const response = await payInstallment(params.id, installmentId); 
        if (response.status === 200) {
          alert(`Pagamento da parcela ${installmentId} realizado com sucesso!`);
        
          const updatedInstallments = installments.map(installment => 
            installment.id === installmentId ? { ...installment, status: true } : installment
          );
          setInstallments(updatedInstallments);
        }
      } catch (error) {
        console.error('Erro ao processar o pagamento:', error);
        alert('Ocorreu um erro ao processar o pagamento.');
      }
    }
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mt-5">
        <h2>Detalhes do Empréstimo</h2>
        <div className="card mb-3">
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

        <h2>Parcelas</h2>
        {installments.length === 0 ? (
          <p>Nenhuma parcela encontrada.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Data de Pagamento</th>
                <th>Status</th>
                <th>Valor</th>
                <th>Ações</th> {/* Coluna para o botão */}
              </tr>
            </thead>
            <tbody>
              {installments.map((installment) => (
                <tr key={installment.id}>
                  <td>{new Date(installment.paymentDate).toLocaleDateString()}</td>
                  <td>{installment.status ? "Pago" : "Pendente"}</td>
                  <td>{installment.value.toFixed(2)}</td>
                  <td>
                    {!installment.status && (
                      <button
                        className="btn btn-success"
                        onClick={() => handlePayment(installment.id, installment.value)}
                      >
                        Efetuar Pagamento
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

export default Installments;

