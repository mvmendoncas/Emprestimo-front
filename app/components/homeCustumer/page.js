"use client";

import ListCustomerBorrowings from '@/app/customer/listCustomerBorrowings/page';
import { useRouter } from 'next/navigation';


const HomeCustumer = () => {
  const router = useRouter();

  return (
    <div className="container mx-auto mt-10 p-6 text-center ">
      <div className="flex justify-center space-x-4">

        <ListCustomerBorrowings/>
      </div>
    </div>
  );
};

export default HomeCustumer;
