"use client";

import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import { createCustomer } from '@/app/lib/customer/functions';

const RegisterCustomer = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    occupation: '',
    workplace: '',
    workPhone: '',
    adress: {
      road: '',
      place: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');

    if (child) {
      setFormData((prevState) => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    createCustomer(formData)
      .then(
        (result) => {
          console.log('Success:', result);
          router.push('/customer')
        }
      )
      .catch (
        (error) => {console.error('Error:', error); }
      )
  } 
  
  return (
    <div className="container mt-5">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nome', name: 'name' },
          { label: 'CPF', name: 'cpf' },
          { label: 'Telefone', name: 'phone' },
          { label: 'Rua', name: 'adress.road' },
          { label: 'Bairro', name: 'adress.place' },
          { label: 'Número', name: 'adress.number' },
          { label: 'Complemento', name: 'adress.neighborhood' },
          { label: 'Cidade', name: 'adress.city' },
          { label: 'Estado', name: 'adress.state' },
          { label: 'CEP', name: 'adress.cep' },
          { label: 'Profissão', name: 'occupation' },
          { label: 'Local de Trabalho', name: 'workplace' },
          { label: 'Telefone do Trabalho', name: 'workPhone' },
        ].map(({ label, name, type = 'text' }) => (
          <div className="mb-3" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              className="form-control"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
       <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
      </form>
    </div>
  );
};

export default RegisterCustomer;
