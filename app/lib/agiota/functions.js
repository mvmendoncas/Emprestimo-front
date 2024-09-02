'use server'

export async function createAgiota(formData) {
    try {
      const response = await fetch('http://localhost:8080/agiota', {
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

export async function loadAgiota(id) {
    const agiotaData = await fetch ('http://localhost:8080/agiota/' + id, { cache: 'no-store' });
    const agiota = await agiotaData.json();
    return agiota;
}

export async function editAgiota(formData) {
  try {
      console.log("Dados enviados:", JSON.stringify(formData)); 
      const response = await fetch(`http://localhost:8080/agiota/${formData.id}`, {
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
      console.error('Erro na atualização do agiota:', error);
      throw error;
  }
}