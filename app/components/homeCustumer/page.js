"use client";

import ListCustomerBorrowings from '@/app/customer/listCustomerBorrowings/page';
import { useRouter } from 'next/navigation';
import style from "./HomeCustomer.module.css";


const HomeCustumer = () => {
  const router = useRouter();

  return (
    <div className={style.container}>
      <div className="flex justify-center">

        <ListCustomerBorrowings/>
      </div>
    </div>
  );
};

export default HomeCustumer;
