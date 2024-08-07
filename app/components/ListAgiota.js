"use client";

import { useState, useEffect } from 'react';

const ListAgiotas = () => {
  const [agiotas, setAgiotas] = useState([]);

  useEffect(() => {
    const fetchAgiotas = async () => {
      try {
        const response = await fetch('http://localhost:8080/agiotas');
        const data = await response.json();
        setAgiotas(data);
      } catch (error) {
        console.error('Erro ao buscar agiotas:', error);
      }
    };

    fetchAgiotas();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Agiotas Cadastrados</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Taxa de Juros</th>
            <th>Método de Cobrança</th>
          </tr>
        </thead>
        <tbody>
          {agiotas.map((agiota) => (
            <tr key={agiota.id}>
              <td>{agiota.name}</td>
              <td>{agiota.cpf}</td>
              <td>{agiota.phone}</td>
              <td>
                {`${agiota.adress.road}, ${agiota.adress.place}, ${agiota.adress.number}, ${agiota.adress.neighborhood}, ${agiota.adress.city}, ${agiota.adress.state}, ${agiota.adress.cep}`}
              </td>
              <td>{agiota.fees}</td>
              <td>{agiota.billingMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListAgiotas;
