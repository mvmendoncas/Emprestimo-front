"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { listAgiotaBorrowings } from '@/app/api/agiota/rotas'; 
import ListAgiotaBorrowings from '@/app/agiota/listAgiotaBorrowings/page';

const AgiotaHome = () => {
  const router = useRouter();
  const [hasNewRequests, setHasNewRequests] = useState(false);
  const [hasCompletedBorrowings, setHasCompletedBorrowings] = useState(false); 

  useEffect(() => {
    const fetchBorrowings = async () => {
      try {
        const response = await listAgiotaBorrowings();
        const borrowings = response.data;

       
        const newRequests = borrowings.some(borrowing => borrowing.status === "SOLICITADO");

       
        const completedBorrowings = borrowings.some(borrowing => borrowing.status === "CONCLUIDO");

        setHasNewRequests(newRequests);
        setHasCompletedBorrowings(completedBorrowings);
      } catch (error) {
        console.error('Erro ao obter empréstimos:', error);
      }
    };

    fetchBorrowings();
  }, []);

  return (
    <div className="container mx-auto mt-10 p-6 text-center">

      
      {hasNewRequests && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-2">
          <p className="font-bold m-0">Você possui novas solicitações de empréstimo!</p>
        </div>
      )}

   
      {hasCompletedBorrowings && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-2">
          <p className="font-bold m-0">Você tem um empréstimo concluído! Por favor, avalie o cliente.</p>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <ListAgiotaBorrowings/>
      </div>
    </div>
  );
};

export default AgiotaHome;
