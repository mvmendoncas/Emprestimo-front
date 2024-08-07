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
        alert('Erro ao cadastrar agiota.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar agiota:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register Agiota</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input
            type="text"
            className="form-control"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rua</label>
          <input
            type="text"
            className="form-control"
            name="road"
            value={formData.road}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Place</label>
          <input
            type="text"
            className="form-control"
            name="place"
            value={formData.place}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número</label>
          <input
            type="text"
            className="form-control"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Bairro</label>
          <input
            type="text"
            className="form-control"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cidade</label>
          <input
            type="text"
            className="form-control"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <input
            type="text"
            className="form-control"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">CEP</label>
          <input
            type="text"
            className="form-control"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Taxa de Juros</label>
          <input
            type="number"
            className="form-control"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            required
          />
        </div>
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
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterAgiota;
