"use client";

import { createAgiota } from '@/app/lib/agiota/functions';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { registerAgiota } from '@/app/api/agiota/rotas';
import style from './CreateAgiota.module.css'
import Link from "next/link";


const RegisterAgiota = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    username: '',
    email: '',
    password: '',
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

      registerAgiota(formData)
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
      <div className="container mt-10 mb-10 col-md-3">
          <h1 className={style.title}>A.G.I.O.T.A</h1>
          <div className={style.container}>
              <h3 className={style.subtitle}>AGIOTA</h3>
              <div className={style.link__login}>
                  <Link href="/">
                      Já tenho uma conta!
                  </Link>
              </div>
          </div>
          <div>
              <form onSubmit={handleSubmit}>
                  {[
                      {label: 'Nome Completo:', name: 'name', type: 'text', value: formData.name},
                      {label: 'Nome de Usuário:', name: 'username', type: 'text', value: formData.username},
                      {label: 'E-mail:', name: 'email', type: 'text', value: formData.email},
                      {label: 'Senha:', name: 'password', type: 'text', value: formData.password},
                      {label: 'CPF:', name: 'cpf', type: 'text', value: formData.cpf},
                      {label: 'Telefone:', name: 'phone', type: 'text', value: formData.phone},
                      {label: 'Rua:', name: 'adress.road', type: 'text', value: formData.adress.road},
                      {
                          label: 'Bairro:',
                          name: 'adress.neighborhood',
                          type: 'text',
                          value: formData.adress.neighborhood
                      },
                      {label: 'Cidade:', name: 'adress.city', type: 'text', value: formData.adress.city},
                      {label: 'Estado:', name: 'adress.state', type: 'text', value: formData.adress.state},
                      {label: 'CEP:', name: 'adress.cep', type: 'text', value: formData.adress.cep},
                      {label: 'Taxa:', name: 'fees', type: 'number', value: formData.fees},
                  ].map((input, index) => (
                      <div key={index} className="mb-3">
                          <label htmlFor={input.name} className="form-label">{input.label}</label>
                          <input
                              type={input.type}
                              className="form-control"
                              id={input.name}
                              name={input.name}
                              value={input.value}
                              onChange={handleChange}
                          />
                      </div>
                  ))}
                  <div>
                      <label className="form-label">Qual o seu método de cobrança?</label>
                      <select
                          className="form-control"
                          name="billingMethod"
                          value={formData.billingMethod}
                          onChange={handleChange}
                          required
                      >
                          <option value="0">Selecione uma opção</option>
                          <option value="weekly">Semanalmente</option>
                          <option value="monthly">Mensalmente</option>
                      </select>
                  </div>
                  <div className='mt-3'>
                      <button type="submit" className={style.save__button}>ENTRAR</button>
                  </div>
              </form>
          </div>
      </div>
  );
};

export default RegisterAgiota;