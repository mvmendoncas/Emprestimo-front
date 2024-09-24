"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const Request = () => {
  const router = useRouter();
  const params = useParams();

  const [formData, setFormData] = useState({
    value: '',
    numberInstallments: '',
    payday: '',
    initialDate: '',
    frequency: '',
    status: '',
    discount: '',
  });

  return (
    <div>
      ola mundo
    </div>
  );
};

export default Request;
