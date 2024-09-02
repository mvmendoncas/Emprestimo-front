'use server'


export async function createCustomer(formData) {
    try {
      const response = await fetch('http://localhost:8080/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
}


export async function loadCustomer(id) {
    const clienteData = await fetch ('http://localhost:8080/customer/' + id, { cache: 'no-store' });
    const cliente = await clienteData.json();
    return cliente;
}

export async function editCustomer(formData) {
  try {
      console.log("Dados enviados:", JSON.stringify(formData)); 
      const response = await fetch(`http://localhost:8080/customer/${formData.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          cache: 'no-store' 
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Erro na atualização do cliente:', error);
      throw error;
  }
}
