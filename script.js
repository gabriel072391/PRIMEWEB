// ========================
// Templates Data
// ========================

const templates = {
  smartphone: {
    name: 'Loja de Smartphones',
    images: [
      { src: 'img/smartphone-hero.jpg', alt: 'Smartphone Store - Hero' },
      { src: 'img/smartphone-products.jpg', alt: 'Smartphone Store - Produtos' },
      { src: 'img/smartphone-categories.jpg', alt: 'Smartphone Store - Categorias' }
    ]
  },
  law: {
    name: 'Site de Advocacia',
    images: [
      { src: 'img/law-hero.jpg', alt: 'Advocacia - Hero' },
      { src: 'img/law-hero-alt.jpg', alt: 'Advocacia - Perfil' },
      { src: 'img/law-services.jpg', alt: 'Advocacia - Serviços' },
      { src: 'img/law-testimonials.jpg', alt: 'Advocacia - Depoimentos' }
    ]
  },
  fitness: {
    name: 'Academia & Fitness',
    images: [
      { src: 'img/fitness-hero.jpg', alt: 'Academia - Hero' },
      { src: 'img/fitness-about.jpg', alt: 'Academia - Sobre' },
      { src: 'img/fitness-classes.jpg', alt: 'Academia - Aulas' },
      { src: 'img/fitness-pricing.jpg', alt: 'Academia - Planos' },
      { src: 'img/fitness-contact.jpg', alt: 'Academia - Contato' }
    ]
  },
  delivery: {
    name: 'Loja de Delivery',
    images: [
      { src: 'img/delivery-hero.png', alt: 'Delivery - Cardápio' },
      { src: 'img/delivery-cart.png', alt: 'Delivery - Carrinho' }
    ]
  },
  fashion: {
    name: 'Loja de Roupas',
    images: [
      { src: 'img/fashion-hero.png', alt: 'Loja de Roupas - Hero' },
      { src: 'img/fashion-products.png', alt: 'Loja de Roupas - Produtos' },
      { src: 'img/fashion-contact.png', alt: 'Loja de Roupas - Contato' }
    ]
  },
  car: {
    name: 'Revenda Automotiva',
    images: [
      { src: 'img/car-hero.jpg', alt: 'Revenda - Hero' },
      { src: 'img/car-catalog.jpg', alt: 'Revenda - Catálogo' },
      { src: 'img/car-contact.jpg', alt: 'Revenda - Contato' }
    ]
  }
};

// ========================
// Modal State
// ========================

let currentTemplate = null;
let currentImageIndex = 0;

// ========================
// Header Scroll Effect
// ========================

window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ========================
// Mobile Menu
// ========================

const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMobile.classList.toggle('active');
});

function closeMobileMenu() {
  menuToggle.classList.remove('active');
  navMobile.classList.remove('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header') && navMobile.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ========================
// Modal Functions
// ========================

function openModal(templateKey) {
  const template = templates[templateKey];
  if (!template || template.images.length === 0) return;

  currentTemplate = templateKey;
  currentImageIndex = 0;
  
  const modal = document.getElementById('templateModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  
  modalTitle.textContent = template.name;
  modalImage.src = template.images[0].src;
  modalImage.alt = template.images[0].alt;
  
  updateModalNavigation();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('templateModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  currentTemplate = null;
  currentImageIndex = 0;
}

function nextImage() {
  if (!currentTemplate) return;
  
  const template = templates[currentTemplate];
  currentImageIndex = (currentImageIndex + 1) % template.images.length;
  updateModalImage();
}

function prevImage() {
  if (!currentTemplate) return;
  
  const template = templates[currentTemplate];
  currentImageIndex = (currentImageIndex - 1 + template.images.length) % template.images.length;
  updateModalImage();
}

function updateModalImage() {
  if (!currentTemplate) return;
  
  const template = templates[currentTemplate];
  const image = template.images[currentImageIndex];
  const modalImage = document.getElementById('modalImage');
  
  modalImage.src = image.src;
  modalImage.alt = image.alt;
  
  updateModalNavigation();
}

function updateModalNavigation() {
  if (!currentTemplate) return;
  
  const template = templates[currentTemplate];
  const imageInfo = document.getElementById('imageInfo');
  const imageDots = document.getElementById('imageDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Update text info
  imageInfo.textContent = `${currentImageIndex + 1} / ${template.images.length}`;
  
  // Show/hide navigation buttons
  if (template.images.length > 1) {
    prevBtn.style.display = 'flex';
    nextBtn.style.display = 'flex';
  } else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
  }
  
  // Update dots
  imageDots.innerHTML = '';
  for (let i = 0; i < template.images.length; i++) {
    const dot = document.createElement('button');
    dot.className = `image-dot ${i === currentImageIndex ? 'active' : ''}`;
    dot.onclick = () => {
      currentImageIndex = i;
      updateModalImage();
    };
    imageDots.appendChild(dot);
  }
}

// Close modal when clicking outside
document.getElementById('templateModal').addEventListener('click', (e) => {
  if (e.target.id === 'templateModal') {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Navigate images with arrow keys
document.addEventListener('keydown', (e) => {
  if (!currentTemplate) return;
  
  if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
});

// ========================
// Contact Form
// ========================

function handleContactSubmit(event) {
  event.preventDefault();
  
  const serviceSelect = document.getElementById('service');
  const messageTextarea = document.getElementById('message');
  
  const service = serviceSelect.value;
  const message = messageTextarea.value;
  
  if (!service || !message) {
    alert('Por favor, preencha todos os campos');
    return;
  }
  
  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de criar meu site com a PrimeWeb Studios.\n\nServiço: ${service}\n\nMensagem: ${message}`
  );
  
  window.open(`https://wa.me/5553999666606?text=${whatsappMessage}`, '_blank');
  
  // Reset form
  event.target.reset();
}

// ========================
// Footer Copyright Year
// ========================

document.getElementById('copyright').textContent = 
  `${new Date().getFullYear()} PrimeWeb Studios. Todos os direitos reservados.`;

// ========================
// Smooth Scroll Fix
// ========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '#home') return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Header height
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================
// Scroll Animation Observer
// ========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add scroll animation to various elements
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.plan-card, .template-card, .section-header').forEach(el => {
    el.classList.add('scroll-animate');
    scrollObserver.observe(el);
  });
});
