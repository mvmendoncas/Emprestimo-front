"use client";

import { getCurrentUserId, registerBorrowing } from '@/app/api/borrowing/rotas';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterBorrowing = () => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    value: '',
    numberInstallments: '',
    payday: '',
    initialDate: '',
    discount: '',
  });

  useEffect(() => {
   
    const fetchUserId = async () => {
      try {
        const id = await getCurrentUserId();
        setUserId(id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };
  
    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      registerBorrowing(formData)
        .then(
          (result) => {
            console.log('Success:', result);
            router.push('/agiota');
          }
        )
        .catch (
          (error) => {console.error('Error:', error); }
        );
  };

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
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default RegisterBorrowing;
