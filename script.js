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

