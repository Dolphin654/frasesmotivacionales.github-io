const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');

// Función para obtener una frase aleatoria de la API
async function fetchRandomQuote() {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error("Error al obtener la frase");
    const data = await response.json();
    return {
      quote: data.quote,
      author: data.author
    };
  } catch (error) {
    console.error("Error fetching quote:", error);
    return {
      quote: "La paz viene de dentro. No la busques fuera.",
      author: "Buddha"
    };
  }
}

// Función para mostrar una nueva frase con animación
async function showNewQuote() {
  // Quitar clases para animación de salida
  quoteElement.classList.remove('show');
  authorElement.classList.remove('show');
  
  // Esperar a que complete la animación de salida
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Obtener nueva frase de la API
  const {quote, author} = await fetchRandomQuote();
  
  // Actualizar el contenido
  quoteElement.textContent = quote;
  authorElement.textContent = author;
  
  // Añadir clases para animación de entrada
  quoteElement.classList.add('show');
  authorElement.classList.add('show');
}

// Mostrar la primera frase al cargar la página
window.addEventListener('load', async () => {
  await showNewQuote();
  // Cambiar frase automáticamente cada 10 segundos
  setInterval(showNewQuote, 20000);
});

// Cambiar frase con la barra espaciadora (opcional)
document.addEventListener('keydown', async (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    await showNewQuote();
  }
});