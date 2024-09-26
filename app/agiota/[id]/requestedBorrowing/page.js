"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { acceptedRequest, denyRequest } from '@/app/api/agiota/rotas';
import { findBorrowing } from '@/app/api/borrowing/rotas';
import { reviewCustomer } from '@/app/api/customer/rotas';

const RequestedBorrowing = () => {
  const [borrowing, setBorrowing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [averageReview, setAverageReview] = useState(null); // Estado para armazenar a média de avaliações do cliente
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchBorrowingDetails = async () => {
      try {
        const response = await findBorrowing(params.id);
        setBorrowing(response.data);

        // Obter a média de avaliações do cliente
        const reviewData = await reviewCustomer(response.data.customer.id);
        setAverageReview(reviewData.data.nota); // Armazena a média de avaliações do cliente
      } catch (error) {
        console.error('Erro ao obter os detalhes do empréstimo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowingDetails();
  }, [params.id]);

  const handleAccept = async () => {
    const confirmed = window.confirm('Você tem certeza que deseja aceitar a solicitação deste empréstimo?');

    if (confirmed) {
      try {
        const response = await acceptedRequest(params.id);
        alert('Empréstimo aceito com sucesso!');
        router.push('/agiota/requests');
      } catch (error) {
        console.error('Erro ao aceitar o empréstimo:', error);
        alert('Erro ao aceitar a solicitação do empréstimo.');
      }
    }
  };

  const handleDeny = async () => {
    const confirmed = window.confirm('Você tem certeza que deseja recusar a solicitação deste empréstimo?');

    if (confirmed) {
      try {
        const response = await denyRequest(params.id);
        alert('Empréstimo recusado com sucesso!');
        router.push('/agiota/requests');
      } catch (error) {
        console.error('Erro ao recusar o empréstimo:', error);
        alert('Erro ao recusar a solicitação do empréstimo.');
      }
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!borrowing) {
    return <p>Empréstimo não encontrado.</p>;
  }

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Detalhes do Empréstimo</h2>
        <div className="card mb-3">
          <div className="card-body">
            <p><strong>Valor:</strong> {borrowing.value}</p>
            <p><strong>Número de Parcelas:</strong> {borrowing.numberInstallments}</p>
            <p><strong>Dia do Pagamento:</strong> {borrowing.payday}</p>
            <p><strong>Data Inicial:</strong> {new Date(borrowing.initialDate).toLocaleDateString()}</p>
            <p><strong>Frequência:</strong> {borrowing.frequency}</p>
            <p><strong>Desconto:</strong> {borrowing.discount}</p>
            <p><strong>Status:</strong> {borrowing.status}</p>
          </div>
        </div>

        <h3 className="mt-3">Informações do Cliente</h3>
        <div className="card mb-3">
          <div className="card-body">
            <p><strong>Nome:</strong> {borrowing.customer.name}</p>
            <p><strong>Email:</strong> {borrowing.customer.email}</p>
            <p><strong>CPF:</strong> {borrowing.customer.cpf}</p>
            <p><strong>Telefone:</strong> {borrowing.customer.phone}</p>
            <p><strong>Endereço:</strong> {borrowing.customer.adress.road}, {borrowing.customer.adress.number}, {borrowing.customer.adress.city}, {borrowing.customer.adress.state}, {borrowing.customer.adress.cep}</p>
            <p><strong>Ocupação:</strong> {borrowing.customer.occupation}</p>
            <p><strong>Local de Trabalho:</strong> {borrowing.customer.workplace}</p>
            <p><strong>Telefone do Trabalho:</strong> {borrowing.customer.workPhone}</p>
            {/* Exibe a média de avaliações do cliente */}
            {averageReview === 0 ? (
              <p><strong>Avaliações:</strong> Sem avaliações</p>
            ) : (
              <p><strong>Avaliações:</strong> {averageReview} </p>
            )}
          </div>
        </div>

        <div className="mt-3 mb-5">
          <button className="btn btn-success mr-2" onClick={handleAccept}>Aceitar</button>
          <button className="btn btn-danger" onClick={handleDeny}>Recusar</button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default RequestedBorrowing;
