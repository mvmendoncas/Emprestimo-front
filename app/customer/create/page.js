"use client";

import Link from 'next/link';
import { useState } from 'react';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation'
import { registerCustomer } from '@/app/api/customer/rotas';
import style from './CreateCustomer.module.css'

const RegisterCustomer = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
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
    console.log('Dados do formulário:', formData);
    registerCustomer(formData)
      .then(
        (result) => {
          console.log('Success:', result);
          router.push('/components/welcome')
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
          <h3 className={style.subtitle}>CLIENTE</h3>
          <div className={style.link__login}>
            <Link href="/">
              Já tenho uma conta!
            </Link>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {[
            {label: 'Nome Completo:', name: 'name'},
            {label: 'Nome de Usuário:', name: 'username'},
            {label: 'E-mail:', name: 'email'},
            {label: 'Senha:', name: 'password'},
            {label: 'CPF:', name: 'cpf'},
            {label: 'Telefone:', name: 'phone'},
            {label: 'Rua:', name: 'adress.road'},
            {label: 'Bairro:', name: 'adress.place'},
            {label: 'Número:', name: 'adress.number'},
            {label: 'Complemento:', name: 'adress.neighborhood'},
            {label: 'Cidade:', name: 'adress.city'},
            {label: 'Estado:', name: 'adress.state'},
            {label: 'CEP:', name: 'adress.cep'},
            {label: 'Profissão:', name: 'occupation'},
            {label: 'Local de Trabalho:', name: 'workplace'},
            {label: 'Telefone do Trabalho:', name: 'workPhone'},
          ].map(({label, name, type = 'text'}) => (
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
          <div className="mt-3">
            <button type="submit" className={style.save__button}>ENTRAR</button>
          </div>
        </form>
      </div>
  );
};

export default RegisterCustomer;
