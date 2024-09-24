
'use-service'
export async function createBorrowing(formData) {
  try {

    const { authToken: { access_token }, authTokenExpiresIn } = data;
    const response = await fetch('http://localhost:8081/borrowing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Inclua o token de autenticação
        'Authorization': `Bearer ${access_token}`,
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

