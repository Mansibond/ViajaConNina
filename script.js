// script.js

// Slider de fondo
const slides = document.querySelectorAll('.bg-slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

showSlide(current);

// Menú desplegable
const logoBtn = document.getElementById('logoB');
const menu = document.getElementById('menu');

logoBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!menu.contains(e.target) && !logoBtn.contains(e.target)) {
    menu.classList.remove('active');
  }
});



// Añadir iconos dinámicamente
document.querySelectorAll('#menu a').forEach(link => {
  const iconSrc = link.getAttribute('data-icon');
  const icon = document.createElement('img');
  icon.src = iconSrc;
  icon.classList.add('menu-icon');
  link.appendChild(icon);

  const showIcon = () => {
    link.querySelector('.menu-text').style.opacity = '0';
    icon.style.opacity = '1';
  };

  const hideIcon = () => {
    link.querySelector('.menu-text').style.opacity = '1';
    icon.style.opacity = '0';
  };

  link.addEventListener('mouseenter', showIcon);
  link.addEventListener('mouseleave', hideIcon);
  link.addEventListener('touchstart', showIcon);
  link.addEventListener('touchend', hideIcon);
});

//Para los botones del slider de ofertas
  const leftBtn = document.querySelector('.nav-button.left');
  const rightBtn = document.querySelector('.nav-button.right');

  leftBtn.addEventListener('click', () => {
    slider.scrollBy({ left: -320, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    slider.scrollBy({ left: 320, behavior: 'smooth' });
  });

//Desplazamiento automático horizontal
const slider = document.querySelector('.slider-container');

  let autoScroll = setInterval(() => {
    slider.scrollBy({ left: 320, behavior: 'smooth' });
  }, 3000);

  // Pausar al pasar el ratón
  slider.addEventListener('mouseenter', () => clearInterval(autoScroll));
  slider.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      slider.scrollBy({ left: 320, behavior: 'smooth' });
    }, 3000);
  });

// --- LÓGICA PARA EL PRICE RANGE SLIDER Y FILTRADO DE OFERTAS ---

// Esperamos a que todo el contenido del DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // Seleccionamos los elementos del DOM que vamos a usar
    const minSlider = document.getElementById('min-price-slider');
    const maxSlider = document.getElementById('max-price-slider');
    const minPriceDisplay = document.getElementById('min-price-display');
    const maxPriceDisplay = document.getElementById('max-price-display');
    
    // Seleccionamos todas las ofertas (los slides)
    // Es importante que el contenedor de las ofertas tenga la clase '.slider-container'
    const slides = document.querySelectorAll('.slider-container .slide');

    // Función que se encarga de filtrar las ofertas
    function filterOffers() {
        // Obtenemos los valores numéricos de los sliders
        let minPrice = parseInt(minSlider.value);
        let maxPrice = parseInt(maxSlider.value);

        // Lógica para que el slider de mínimo no supere al de máximo
        if (minPrice > maxPrice - 50) { // -50 para dar un pequeño margen
            minSlider.value = maxPrice - 50;
            minPrice = parseInt(minSlider.value);
        }

        // Lógica para que el slider de máximo no sea menor que el de mínimo
        if (maxPrice < minPrice + 50) {
            maxSlider.value = minPrice + 50;
            maxPrice = parseInt(maxSlider.value);
        }

        // Actualizamos los números que ve el usuario
        minPriceDisplay.textContent = minPrice;
        maxPriceDisplay.textContent = maxPrice;

        // Recorremos cada una de las ofertas para decidir si la mostramos o la ocultamos
        slides.forEach(slide => {
            // Obtenemos el precio de la oferta desde el atributo 'data-price'
            const offerPrice = parseInt(slide.dataset.price);

            // Comprobamos si el precio de la oferta está dentro del rango seleccionado
            if (offerPrice >= minPrice && offerPrice <= maxPrice) {
                slide.style.display = 'block'; // O 'flex', si usas flexbox para los slides
            } else {
                slide.style.display = 'none'; // La ocultamos si no está en el rango
            }
        });
    }

    // Añadimos "escuchadores" de eventos a los sliders.
    // Cada vez que el usuario mueva un manejador, se llamará a la función filterOffers.
    minSlider.addEventListener('input', filterOffers);
    maxSlider.addEventListener('input', filterOffers);

    // Llamamos a la función una vez al cargar la página para establecer el estado inicial
    filterOffers();
});