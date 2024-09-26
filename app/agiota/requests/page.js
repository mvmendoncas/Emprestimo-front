"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { acceptedRequest, listAgiotaBorrowings, denyRequest } from '@/app/api/agiota/rotas';
import Link from "next/link";

const ListBorrowingsRequested = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listAgiotaBorrowings();
        setBorrowings(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de empréstimos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowings();
  }, []);

  const filteredBorrowings = borrowings.filter(borrowing => borrowing.status === "SOLICITADO");

  // Função que lida com a aceitação do empréstimo
  const handleAccept = async (id) => {
    const confirmed = window.confirm('Você tem certeza que deseja aceitar a solicitação deste empréstimo?');

    if (confirmed) {
      try {
        const response = await acceptedRequest(id);
        console.log(`Empréstimo ${id} aceito com sucesso:`, response.data);
        alert(`Empréstimo ${id} foi aceito com sucesso!`);
        setBorrowings(borrowings.filter(borrowing => borrowing.id !== id));
      } catch (error) {
        console.error('Erro ao aceitar o empréstimo:', error);
        alert('Ocorreu um erro ao aceitar a solicitação do empréstimo.');
      }
    }
  };

  // Função que lida com a recusa do empréstimo
  const handleDeny = async (id) => {
    const confirmed = window.confirm('Você tem certeza que deseja recusar a solicitação deste empréstimo?');

    if (confirmed) {
      try {
        const response = await denyRequest(id);
        console.log(`Empréstimo ${id} recusado com sucesso:`, response.data);
        alert(`Empréstimo ${id} foi recusado com sucesso!`);
        setBorrowings(borrowings.filter(borrowing => borrowing.id !== id));
      } catch (error) {
        console.error('Erro ao recusar o empréstimo:', error);
        alert('Ocorreu um erro ao recusar a solicitação do empréstimo.');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos Solicitados</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
            <div className="text-center">
              <h2>Solicitações</h2>
              <h5 className="mt-3">Aqui é onde voce pode acompanhar as suas solicitações de empréstimos! Nenhum cliente fez uma solicitação para seu perfil ainda.</h5>
            </div>
        ) : (

            <div>
              <div className="text-center text-2xl font-semibold mb-6">Acompanhe suas solicitações!</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBorrowings.map((borrowing) => (
                    <div key={borrowing.id}
                         className="bg-white shadow-md rounded-lg p-6">
                      <h2 className="text-xl font-bold mb-2">Empréstimo ID: {borrowing.id}</h2>
                      <p className="mb-1"><strong>Valor:</strong> R${borrowing.value}</p>
                      <p className="mb-1"><strong>Parcelas:</strong> {borrowing.numberInstallments}</p>
                      <p className="mb-1"><strong>Dia do Pagamento:</strong> {borrowing.payday}</p>
                      <p className="mb-1"><strong>Data Inicial:</strong> {formatDate(borrowing.initialDate)}</p>
                      <p className="mb-1"><strong>Frequência:</strong> {borrowing.frequency}</p>
                      <p className="mb-1"><strong>Status:</strong> {borrowing.status}</p>
                      <p className="mb-1"><strong>Desconto:</strong> R${borrowing.discount}</p>
                      <button className="btn btn-success" onClick={() => handleAccept(borrowing.id)}>
                        Aceitar
                      </button>
                      {/* Botão de recusar */}
                      <button className="btn btn-danger ml-2" onClick={() => handleDeny(borrowing.id)}>
                        Recusar
                      </button>
                    </div>
                ))}
              </div>
            </div>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Valor</th>
                <th>Informações do Solicitante</th>
                <th>Número de Parcelas</th>
                <th>Dia do Pagamento</th>
                <th>Data Inicial</th>
                <th>Frequência</th>
                <th>Status</th>
                <th>Desconto</th>
                <th>Ações</th> 
              </tr>
            </thead>
            <tbody>
              {filteredBorrowings.map((borrowing) => (
                <tr key={borrowing.id}>
                  <td>{borrowing.id}</td>
                  <td>{borrowing.value}</td>
                  <td>
                   
                  </td>
                  <td>{borrowing.numberInstallments}</td>
                  <td>{borrowing.payday}</td>
                  <td>{borrowing.initialDate}</td>
                  <td>{borrowing.frequency}</td>
                  <td>{borrowing.status}</td>
                  <td>{borrowing.discount}</td>
                  <td>
                    <button 
                      className="btn btn-info" 
                      onClick={() => router.push(`/agiota/${borrowing.id}/requestedBorrowing`)}
                    >
                      Ver Detalhes
                    </button>
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

export default ListBorrowingsRequested;
