"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation';
import { searchCustomer, editCustomer } from "@/app/api/customer/rotas";
import ProtectedRoute from '@/app/components/ProtectedRoute'; // Certifique-se de importar o ProtectedRoute

const EditCustomer = () => {
    const router = useRouter();
    const params = useParams();

    const [formData, setFormData] = useState({
      name: '',
      email: '',
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

    useEffect(() => {
      const loadForm = async () => {
        try {
          const { data } = await searchCustomer(params.id);  // Supondo que searchCustomer retorna os dados do cliente
          
          // Atualize o estado com os dados recebidos
          setFormData({
            name: data.name || '',
            email: data.email || '',
            cpf: data.cpf || '',
            phone: data.phone || '',
            occupation: data.occupation || '',
            workplace: data.workplace || '',
            workPhone: data.workPhone || '',
            adress: {
              road: data.adress?.road || '',
              place: data.adress?.place || '',
              number: data.adress?.number || '',
              neighborhood: data.adress?.neighborhood || '',
              city: data.adress?.city || '',
              state: data.adress?.state || '',
              cep: data.adress?.cep || ''
            }
          });
        } catch (error) {
          console.error('Erro ao carregar as informações do cliente:', error);
        }
      };
      loadForm();
    }, [params.id]);
        
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
        await editCustomer(params.id, formData);  // Passe o ID do cliente e os dados atualizados
        console.log('Cliente atualizado com sucesso');
        router.push('/customer');  // Redireciona para a lista de clientes ou outra página após edição
      } catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
      }
    };
     
    return (
      <ProtectedRoute requiredRoles={["administrador", "customer"]}>
        <div className="container mt-5">
          <h2>Editar Informações do Cliente</h2>
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
              { label: 'Profissão', name: 'occupation', value: formData.occupation },
              { label: 'Local de Trabalho', name: 'workplace', value: formData.workplace },
              { label: 'Telefone do Trabalho', name: 'workPhone', value: formData.workPhone },
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
            <button type="submit" className="btn btn-primary">
              Salvar Alterações
            </button>
          </form>
        </div>
      </ProtectedRoute>
    );
};

export default EditCustomer;
