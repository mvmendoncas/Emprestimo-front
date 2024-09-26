"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import { currentUserAgiota, searchAgiota, editAgiota, deleteAgiota } from "@/app/api/agiota/rotas";
import ProtectedRoute from "@/app/components/ProtectedRoute";

const EditAgiota = () => {
  const router = useRouter();
  const params = useParams();
  const [userId, setUserId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: '',
    adress: {
      road: '',
      place: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      cep: ''
    },
    fees: '',
    billingMethod: '',
  });

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await currentUserAgiota();
        setUserId(id.data.id);
        console.log("Chegou aqui", id);
      } catch (error) {
        console.error('Erro ao obter o ID do usuário:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const { data } = await searchAgiota(userId);  
        setFormData({
          name: data.name || '',
          email: data.email || '',
          cpf: data.cpf || '',
          phone: data.phone || '',
          adress: {
            road: data.adress?.road || '',
            place: data.adress?.place || '',
            number: data.adress?.number || '',
            neighborhood: data.adress?.neighborhood || '',
            city: data.adress?.city || '',
            state: data.adress?.state || '',
            cep: data.adress?.cep || ''
          },
          fees: data.fees || '',
          billingMethod: data.billingMethod || '',
        });
      } catch (error) {
        console.error('Erro ao carregar as informações do agiota:', error);
      }
    };
    loadForm();
  }, [userId]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await editAgiota(userId, formData);  
      console.log('Agiota atualizado com sucesso');
      router.push('/agiota');  
    } catch (error) {
      console.error('Erro ao atualizar o agiota:', error);
    }
  };

  // Lógica para deletar conta
  const handleDelete = async () => {
    const confirmed = window.confirm('Você tem certeza que deseja deletar a sua conta? Essa ação é irreversível.');
    
    if (confirmed) {
      try {
        await deleteAgiota(userId);  
        alert('Conta deletada com sucesso!');
        router.push('/');  
      } catch (error) {
        console.error('Erro ao deletar a conta:', error);
        alert('Ocorreu um erro ao deletar a conta.');
      }
    }
  };

  return (
    <ProtectedRoute requiredRoles={["administrador", "agiota"]}>
      <div className="container mt-5">
        <h2>Editar Informações AAAAAAAAAAAAdo Agiota</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Nome', name: 'name', value: formData.name },
            { label: 'Email', name: 'email', value: formData.email },
            { label: 'CPF', name: 'cpf', value: formData.cpf },
            { label: 'Telefone', name: 'phone', value: formData.phone },
            { label: 'Rua', name: 'adress.road', value: formData.adress.road },
            { label: 'Bairro', name: 'adress.place', value: formData.adress.place },
            { label: 'Número', name: 'adress.number', value: formData.adress.number },
            { label: 'Complemento', name: 'adress.neighborhood', value: formData.adress.neighborhood },
            { label: 'Cidade', name: 'adress.city', value: formData.adress.city },
            { label: 'Estado', name: 'adress.state', value: formData.adress.state },
            { label: 'CEP', name: 'adress.cep', value: formData.adress.cep },
            { label: 'Taxa', name: 'fees', value: formData.fees, type: 'number' },
          ].map(({ label, name, value, type = 'text' }) => (
            <div className="mb-3" key={name}>
              <label className="form-label">{label}</label>
              <input
                type={type}
                className="form-control"
                name={name}
                value={value || ''}  
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Método de Cobrança</label>
            <select
              className="form-control"
              name="billingMethod"
              value={formData.billingMethod}
              onChange={handleChange}
              required
            >
              <option value="0">Selecione uma opção</option>
              <option value="weekly">Semanalmente</option>
              <option value="biweekly">Quinzenalmente</option>
              <option value="monthly">Mensalmente</option>
              <option value="quarterly">Trimestralmente</option>
            </select>
          </div>

          <div className="d-flex mb-5 justify-content-between">
            {/* Botão para salvar alterações */}
            <button type="submit" className="btn btn-primary">
              Salvar Alterações
            </button>

            {/* Botão para deletar conta */}
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Deletar Conta
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default EditAgiota;
