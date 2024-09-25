"use client";

import { useRouter } from 'next/navigation';
import AgiotaHome from '../components/homeAgiota/page';

const agiotaPage = () => {
  const router = useRouter();

  return (
    <AgiotaHome/>
  );
};

export default agiotaPage;
