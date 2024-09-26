"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { listAgiotaBorrowings } from '@/app/api/agiota/rotas';

const ListAgiotaBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    adress: {
      road: '',
      place: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: ''
    },
    fees: '',
    billingMethod: '',
  });

  useEffect(() => {
    const loadForm = async () => {
      try {
        const { data } = await searchAgiota(params.id);  
        setFormData({
          name: data.name || '',
          email: data.email || '',
          cpf: data.cpf || '',
          phone: data.phone || '',
          occupation: data.occupation || '',
          workplace: data.workplace || '',
          workPhone: data.workPhone || '',
          adress: {
            road: data.adress?.road || '',
            place: data.adress?.place || '',
            number: data.adress?.number || '',
            neighborhood: data.adress?.neighborhood || '',
            city: data.adress?.city || '',
            state: data.adress?.state || '',
            cep: data.adress?.cep || ''
          },
          fees: data.fees || '',
          billingMethod: data.billingMethod || '',
        });
      } catch (error) {
        console.error('Erro ao carregar as informações do cliente:', error);
      }
    };
    loadForm();
  }, [params.id]);

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

  const filteredBorrowings = borrowings.filter(borrowing => borrowing.status === "CONCLUIDO");

 
  const handleViewDetails = (id) => {
    router.push(`/borrowing/${id}/details`);
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Lista de Empréstimos Concluídos</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : filteredBorrowings.length === 0 ? (
          <p>Nenhum empréstimo concluído encontrado.</p>
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
                <th>Ações</th> 
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
                    
                    <button
                      className="btn btn-info"
                      onClick={() => handleViewDetails(borrowing.id)}
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

export default ListAgiotaBorrowings;
