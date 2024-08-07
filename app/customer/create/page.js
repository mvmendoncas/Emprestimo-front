"use client";

import Link from 'next/link';
import { useState } from 'react';

const RegisterCustomer = () => {
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone: '',
    road: '',
    place: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
    occupation: '',
    workplace: '',
    workPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      name: formData.name,
      cpf: formData.cpf,
      phone: formData.phone,
      adress: {
        road: formData.road,
        place: formData.place,
        number: formData.number,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        cep: formData.cep,
      },
      occupation: formData.occupation,
      workplace: formData.workplace,
      workPhone: formData.workPhone,
    };

    try {
      const response = await fetch('http://localhost:8080/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        alert('Cliente cadastrado com sucesso!');
        setFormData({
          name: '',
          cpf: '',
          phone: '',
          road: '',
          place: '',
          number: '',
          neighborhood: '',
          city: '',
          state: '',
          cep: '',
          occupation: '',
          workplace: '',
          workPhone: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar cliente: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      alert('Erro ao cadastrar cliente. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nome', name: 'name' },
          { label: 'CPF', name: 'cpf' },
          { label: 'Telefone', name: 'phone' },
          { label: 'Rua', name: 'road' },
          { label: 'Bairro', name: 'place' },
          { label: 'Número', name: 'number' },
          { label: 'Complemento', name: 'neighborhood' },
          { label: 'Cidade', name: 'city' },
          { label: 'Estado', name: 'state' },
          { label: 'CEP', name: 'cep' },
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
        <Link href="/customer">
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
        </Link>
      </form>
    </div>
  );
};

export default RegisterCustomer;
