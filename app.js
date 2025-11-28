/*
  PrimeWeb Studios — Funcionalidades
  Arquivo: app.js
  Tecnologias: JavaScript vanilla
  Recursos: scroll suave, modal genérico, validação do formulário, partículas em canvas, micro-interações e geração dinâmica de link do WhatsApp.
*/

(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Configurações WhatsApp
  const WHATSAPP_NUMBER = '5553999666606'; // Número informado
  const WHATSAPP_MESSAGE_BASE = 'Olá! Gostaria de criar meu site com a PrimeWeb Studios.';

  // Util: encode
  const enc = encodeURIComponent;

  // Atualiza ano no footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu responsivo
  const navToggle = document.querySelector('.nav-toggle');
  const mainNavUl = document.querySelector('.main-nav ul');
  if (navToggle && mainNavUl) {
    navToggle.addEventListener('click', () => {
      const shown = mainNavUl.style.display === 'flex';
      mainNavUl.style.display = shown ? 'none' : 'flex';
      navToggle.setAttribute('aria-expanded', (!shown).toString());
    });
  }

  // Fallback de logo: se a imagem falhar, esconder apenas a imagem e manter o texto
  const logoImg = document.querySelector('.logo-img');
  if (logoImg) {
    logoImg.addEventListener('error', () => {
      logoImg.style.display = 'none';
    });
    logoImg.addEventListener('load', () => {
      logoImg.style.display = 'inline';
    });
  }

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  // Aparição progressiva (IntersectionObserver)
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('appear'));
  }

  // Modal genérico reutilizável
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = modal ? modal.querySelector('.modal-body') : null;
  const modalCta = document.getElementById('modal-cta');

  function openModal({ title = 'Detalhes', html = '', showCta = false, ctaText = 'Quero este modelo', onCta = null }) {
    if (!modal || !modalBody || !modalTitle) return;
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    if (modalCta) {
      modalCta.hidden = !showCta;
      modalCta.textContent = ctaText;
      modalCta.onclick = onCta || null;
    }
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    // Foco acessível
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
    // Fechar com Esc
    const escHandler = (ev) => { if (ev.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', escHandler, { once: true });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target.matches('[data-close-modal]')) closeModal();
    });
  }

  // Botões "Ver modelo"
  const templateButtons = document.querySelectorAll('.open-template');
  templateButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-template');
      const imgUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='%230f1c47'/><stop offset='1' stop-color='%230c183d'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><text x='50%' y='50%' fill='%237AEAFF' font-size='42' font-family='Arial' dominant-baseline='middle' text-anchor='middle'>Modelo%20${id}%20Preview</text></svg>`;
      openModal({
        title: `Modelo ${id}`,
        html: `<img src="${imgUrl}" alt="Visual do Modelo ${id}" />`,
        showCta: true,
        ctaText: 'Quero este modelo',
        onCta: () => {
          closeModal();
          const contato = document.getElementById('contato');
          contato && contato.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        }
      });
    });
  });

  // Geração de link WhatsApp nos botões rápidos
  function buildWhatsLink(number, message) {
    const n = (number || WHATSAPP_NUMBER).replace(/\D+/g, '');
    const m = message || WHATSAPP_MESSAGE_BASE;
    return `https://wa.me/${n}?text=${enc(m)}`;
  }

  const whatsLink = document.getElementById('whatsLink');
  if (whatsLink) {
    const number = whatsLink.getAttribute('data-whatsapp') || WHATSAPP_NUMBER;
    whatsLink.setAttribute('href', buildWhatsLink(number));
  }

  const footerWhats = document.getElementById('footerWhats');
  if (footerWhats) {
    const number = footerWhats.getAttribute('data-whatsapp') || WHATSAPP_NUMBER;
    footerWhats.setAttribute('href', buildWhatsLink(number));
  }

  // Validação simples do formulário e modal de confirmação
  const form = document.getElementById('contactForm');
  const feedback = form ? form.querySelector('.form-feedback') : null;
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const servico = form.servico.value.trim();
      const mensagem = form.mensagem.value.trim();

      const errors = [];
      if (!nome) errors.push('Informe seu nome.');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Informe um email válido.');
      if (!servico) errors.push('Selecione um serviço.');
      if (!mensagem) errors.push('Descreva sua mensagem.');

      if (errors.length) {
        if (feedback) feedback.textContent = errors.join(' ');
        return;
      }

      if (feedback) feedback.textContent = '';

      // Modal de confirmação
      openModal({
        title: 'Mensagem enviada! ✅',
        html: '<p>Entraremos em contato em até 24 horas.</p>',
        showCta: false
      });

      // Opcional: preparar link do WhatsApp com contexto
      const customMsg = `${WHATSAPP_MESSAGE_BASE}\nNome: ${nome}\nServiço: ${servico}`;
      const link = buildWhatsLink(WHATSAPP_NUMBER, customMsg);
      // Exibir dentro do modal para ação rápida
      const extra = document.createElement('p');
      extra.innerHTML = `Se preferir, <a href="${link}" target="_blank" rel="noopener">fale conosco via WhatsApp</a>.`;
      modalBody && modalBody.appendChild(extra);

      form.reset();
    });
  }

  // Partículas leves no background do hero (Canvas)
  const canvas = document.getElementById('heroParticles');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let particles = [];
  let rafId = null;

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }

  function initParticles() {
    if (!canvas || !ctx) return;
    particles = [];
    const count = prefersReducedMotion ? 20 : Math.floor(canvas.width * canvas.height / 50000); // baixa densidade
    for (let i = 0; i < Math.max(20, Math.min(80, count)); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.4),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.1 : 0.4),
        alpha: Math.random() * 0.6 + 0.2
      });
    }
  }

  function drawParticles() {
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      // wrap
      if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(127,179,255,${p.alpha})`;
      ctx.fill();
    }
    rafId = prefersReducedMotion ? null : requestAnimationFrame(drawParticles);
  }

  function startParticles() {
    resizeCanvas();
    initParticles();
    drawParticles();
  }

  window.addEventListener('resize', () => { startParticles(); });
  if (canvas) startParticles();
})();
