"use client";


import { useState, useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import { editAgiota, loadAgiota } from "@/app/lib/agiota/functions";

const EditAgiota = () => {
    const router = useRouter();
    const params = useParams();

    const [agiotaData, setAgiotaData] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
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
        const loadForm = async () => {
          const data = await loadAgiota(params.id);
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
            const result = await editAgiota(formData);
            console.log('Success:', result);
            router.push('/agiota/edit/' + formData.id);
          } catch (error) {
            console.error('Error:', error);
          }
        }

        return (
            <div className="container mt-5">
                <h2>Editar Agiota</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: 'Nome', name: 'name', value: formData.name },
                        { label: 'CPF', name: 'cpf', value: formData.cpf },
                        { label: 'Telefone', name: 'phone', value: formData.phone },
                        { label: 'Rua', name: 'road', value: formData.adress.road },
                        { label: 'Bairro', name: 'neighborhood', value: formData.adress.neighborhood },
                        { label: 'Número', name: 'number', value: formData.adress.number },
                        { label: 'Cidade', name: 'city', value: formData.adress.city },
                        { label: 'Estado', name: 'state', value: formData.adress.state },
                        { label: 'CEP', name: 'cep', value: formData.adress.cep },
                        { label: 'Taxas', name: 'fees', value: formData.fees, type: 'number' },
                    ].map(({ label, name, value, type = 'text' }) => (
                        <div className="mb-3" key={name}>
                            <label className="form-label">{label}</label>
                            <input
                                type={type}
                                className="form-control"
                                name={name}
                                value={
                                    ['road', 'neighborhood', 'number', 'city', 'state', 'cep'].includes(name)
                                        ? formData.adress[name]
                                        : formData[name]
                                }
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ))}
                    <div className="mb-3">
                        <label className="form-label">Método de cobrança</label>
                        <select
                            className="form-control"
                            name="billingMethod"
                            value={formData.billingMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a method</option>
                            <option value="weekly">Semanalmente</option>
                            <option value="monthly">Mensalmente</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Salvar</button>
                </form>
            </div>
        );
    };
    
    export default EditAgiota;