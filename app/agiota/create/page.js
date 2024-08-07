"use client";

import { useState } from 'react';

const RegisterAgiota = () => {
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
    fees: '',
    billingMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const agiotaData = {
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
      fees: parseFloat(formData.fees),
      billingMethod: formData.billingMethod,
    };

    try {
      const response = await fetch('http://localhost:8080/agiota', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(agiotaData),
      });

      if (response.ok) {
        alert('Agiota cadastrado com sucesso!');
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
          fees: '',
          billingMethod: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar agiota: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar agiota:', error);
      alert('Erro ao cadastrar agiota. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Agiota</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Nome', name: 'name' },
          { label: 'CPF', name: 'cpf' },
          { label: 'Telefone', name: 'phone' },
          { label: 'Rua', name: 'road' },
          { label: 'Place', name: 'place' },
          { label: 'Número', name: 'number' },
          { label: 'Bairro', name: 'neighborhood' },
          { label: 'Cidade', name: 'city' },
          { label: 'Estado', name: 'state' },
          { label: 'CEP', name: 'cep' },
          { label: 'Taxa de Juros', name: 'fees', type: 'number' },
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
        <div className="mb-3">
          <label className="form-label">Método de cobrança</label>
          <select
            className="form-control"
            name="billingMethod"
            value={formData.billingMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select a method</option>
            <option value="weekly">Semanalmente</option>
            <option value="monthly">Mensalmente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterAgiota;
