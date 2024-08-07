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
      <h2>List of Agiotas</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>CPF</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Fees</th>
            <th>Billing Method</th>
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
