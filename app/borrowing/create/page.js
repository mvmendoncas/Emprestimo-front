"use client";

import { useState } from 'react';

const RegisterBorrowing = () => {
  const [formData, setFormData] = useState({
    fees: '',
    value: '',
    numberInstallments: '',
    payday: '',
    initialDate: '',
    frequency: '',
    status: '',
    discount: '',
    customerId: '',
    agiotaId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const borrowingData = {
      fees: parseFloat(formData.fees),
      value: parseFloat(formData.value),
      numberInstallments: parseInt(formData.numberInstallments),
      payday: parseInt(formData.payday),
      initialDate: new Date(formData.initialDate),
      frequency: formData.frequency,
      status: formData.status,
      discount: parseFloat(formData.discount),
      customer: { id: parseInt(formData.customerId) },
      agiota: { id: parseInt(formData.agiotaId) },
    };

    try {
      const response = await fetch('http://localhost:8080/borrowing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(borrowingData),
      });

      if (response.ok) {
        alert('Empréstimo cadastrado com sucesso!');
        setFormData({
          fees: '',
          value: '',
          numberInstallments: '',
          payday: '',
          initialDate: '',
          frequency: '',
          status: '',
          discount: '',
          customerId: '',
          agiotaId: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar empréstimo: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao cadastrar empréstimo:', error);
      alert('Erro ao cadastrar empréstimo. Por favor, tente novamente.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Cadastrar Empréstimo</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Taxa de Juros', name: 'fees', type: 'number' },
          { label: 'Valor', name: 'value', type: 'number' },
          { label: 'Número de Parcelas', name: 'numberInstallments', type: 'number' },
          { label: 'Dia do Pagamento', name: 'payday', type: 'number' },
          { label: 'Data Inicial', name: 'initialDate', type: 'date' },
          { label: 'Desconto', name: 'discount', type: 'number' },
          { label: 'ID do Cliente', name: 'customerId', type: 'number' },
          { label: 'ID do Agiota', name: 'agiotaId', type: 'number' },
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
          <label className="form-label">Frequência</label>
          <select
            className="form-control"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a frequência</option>
            <option value="WEEKLY">Semanal</option>
            <option value="MONTHLY">Mensal</option>
            <option value="YEARLY">Anual</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-control"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o status</option>
            <option value="PENDING">Pendente</option>
            <option value="PAID">Pago</option>
            <option value="CANCELED">Cancelado</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default RegisterBorrowing;
