


export async function createCustomer(formData) {
  try {
    const response = await fetch('http://localhost:8081/customer/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Inclua o token de autenticação
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Tente obter a mensagem de erro do servidor
      let errorMessage = `Error: ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (e) {
        // A resposta não é um JSON válido
        console.error('Erro ao analisar a resposta do servidor:', e);
      }
      throw new Error(errorMessage);
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
