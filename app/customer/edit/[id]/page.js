"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import { createCustomer, editCustomer, loadCustomer } from "@/app/lib/customer/functions";

const EditCustomer = () => {
    const router = useRouter();
    const params = useParams();

    const [customerData, setCustomerData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
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
        const data = await loadCustomer(params.id);
        setFormData(data);
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
        const result = await editCustomer(formData);
        console.log('Success:', result);
        router.push('/customer/edit/' + formData.id);
      } catch (error) {
        console.error('Error:', error);
      }
    }
     
  
  return (
    <div className="container mt-5">
      <h2>Editar Informações do Cliente</h2>
      <form onSubmit={handleSubmit}>
        {[
           { label: 'Nome', name: 'name', value: formData.name },
           { label: 'CPF', name: 'cpf', value: formData.cpf },
           { label: 'Telefone', name: 'phone', value: formData.phone },
           { label: 'Rua', name: 'road', value: formData.adress.road },
           { label: 'Bairro', name: 'place', value: formData.adress.place },
           { label: 'Número', name: 'number', value: formData.adress.number },
           { label: 'Complemento', name: 'neighborhood', value: formData.adress.neighborhood },
           { label: 'Cidade', name: 'city', value: formData.adress.city },
           { label: 'Estado', name: 'state', value: formData.adress.state },
           { label: 'CEP', name: 'cep', value: formData.adress.cep },
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
              value={
                ['road', 'place', 'number', 'neighborhood', 'city', 'state', 'cep'].includes(name)
                  ? formData.adress[name]
                  : formData[name]
              }
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
  );
};

export default EditCustomer;
