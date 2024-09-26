"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { acceptedRequest, listAgiotaBorrowings, denyRequest } from '@/app/api/agiota/rotas';

const ListBorrowingsRequested = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listAgiotaBorrowings();
        console.log(response);
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

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
          <p>Nenhum empréstimo encontrado.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Valor</th>
                <th>Número de Parcelas</th>
                <th>Dia do Pagamento</th>
                <th>Data Inicial</th>
                <th>Frequência</th>
                <th>Status</th>
                <th>Desconto</th>
                <th>Ações</th> {/* Nova coluna para os botões de ações */}
              </tr>
            </thead>
            <tbody>
              {filteredBorrowings.map((borrowing) => (
                <tr key={borrowing.id}>
                  <td>{borrowing.id}</td>
                  <td>{borrowing.value}</td>
                  <td>{borrowing.numberInstallments}</td>
                  <td>{borrowing.payday}</td>
                  <td>{borrowing.initialDate}</td>
                  <td>{borrowing.frequency}</td>
                  <td>{borrowing.status}</td>
                  <td>{borrowing.discount}</td>
                  <td>
                    {/* Botão de aceitar */}
                    <button className="btn btn-success" onClick={() => handleAccept(borrowing.id)}>
                      Aceitar
                    </button>
                    {/* Botão de recusar */}
                    <button className="btn btn-danger ml-2" onClick={() => handleDeny(borrowing.id)}>
                      Recusar
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
