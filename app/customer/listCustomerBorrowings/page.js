"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { listCustomerBorrowings } from '@/app/api/customer/rotas';
import Link from "next/link";

const ListCustomerBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listCustomerBorrowings();
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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formato dd/mm/yyyy
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "customer"]}>
      <div className="container mt-5 mx-0">
        {loading ? (
          <p>Carregando...</p>
        ) : borrowings.length === 0 ? (
            <div>
              <h1><b>A.G.I.O.T.A</b></h1>
              <h5 className="mt-3">Aqui você pode solicitar empréstimos de maneira rápida e prática! Se precisa de um apoio financeiro,
                estamos prontos para ajudar. Com condições flexíveis e ajustadas às suas necessidades, você poderá
                solicitar um empréstimo diretamente com o agiota e acompanhar todo o processo de forma segura e
                transparente. Solicite seu primeiro empréstimo!</h5>

            </div>
        ) : (
            <div>
              <div className="text-center text-2xl font-semibold mb-6">Acompanhe seus empréstimos!</div>
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {borrowings.map((borrowing) => (
                      <Link href={`/borrowing/${borrowing.id}/installments`} className="text-black no-underline">
                        <div key={borrowing.id}
                             className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transform hover:scale-105 transition duration-300">
                          <h2 className="text-xl font-bold mb-2">Empréstimo ID: {borrowing.id}</h2>
                          <p className="mb-1"><strong>Valor:</strong> R${borrowing.value}</p>
                          <p className="mb-1"><strong>Parcelas:</strong> {borrowing.numberInstallments}</p>
                          <p className="mb-1"><strong>Dia do Pagamento:</strong> {borrowing.payday}</p>
                          <p className="mb-1"><strong>Data Inicial:</strong> {formatDate(borrowing.initialDate)}</p>
                          <p className="mb-1"><strong>Frequência:</strong> {borrowing.frequency}</p>
                          <p className="mb-1"><strong>Status:</strong> {borrowing.status}</p>
                          <p className="mb-1"><strong>Desconto:</strong> R${borrowing.discount}</p>
                        </div>
                      </Link>
                  ))}
                </div>
              </div>
            </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ListCustomerBorrowings;
