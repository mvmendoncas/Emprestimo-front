"use client";

import { getCurrentUserId, registerBorrowing } from '@/app/api/borrowing/rotas';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { createBorrowing } from '@/app/lib/borrowing/functions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'


const RegisterBorrowing = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    value: '',
    numberInstallments: '',
    payday: '',
    initialDate: '',
    frequency: '',
    status: '',
    discount: '',
  });

  useEffect(() => {
    // Função assíncrona para obter o userId
    const fetchUserId = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);
        console.log("Chegou aqui", id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };
  
    fetchUserId();
  }, []);

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

  
        registerBorrowing(formData)
          .then(
            (result) => {
              console.log('Success:', result);
              router.push('/agiota')
            }
          )
          .catch (
            (error) => {console.error('Error:', error); }
          )
      }
      
    
  
  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>

    <div className="container mt-5">
      <h2>Cadastrar Empréstimo</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Valor', name: 'value', type: 'number' },
          { label: 'Número de Parcelas', name: 'numberInstallments', type: 'number' },
          { label: 'Dia do Pagamento', name: 'payday', type: 'number' },
          { label: 'Data Inicial', name: 'initialDate', type: 'date' },
          { label: 'Desconto', name: 'discount', type: 'number' },
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
    </ProtectedRoute>

  );
};

export default RegisterBorrowing;
