/*
  PrimeWeb Studios — Funcionalidades
  Arquivo: app.js
  Tecnologias: JavaScript vanilla
  Recursos: scroll suave, modal genérico, validação do formulário, partículas em canvas, micro-interações e geração dinâmica de link do WhatsApp.
*/

;(() => {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches

  // Configurações WhatsApp
  const WHATSAPP_NUMBER = "5553999666606" // Número informado
  const WHATSAPP_MESSAGE_BASE = "Olá! Gostaria de criar meu site com a PrimeWeb Studios."

  // Util: encode
  const enc = encodeURIComponent

  // Atualiza ano no footer
  const yearEl = document.getElementById("year")
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  // Menu responsivo
  const navToggle = document.querySelector(".nav-toggle")
  const mainNavUl = document.querySelector(".main-nav ul")
  if (navToggle && mainNavUl) {
    navToggle.addEventListener("click", () => {
      const shown = mainNavUl.style.display === "flex"
      mainNavUl.style.display = shown ? "none" : "flex"
      navToggle.setAttribute("aria-expanded", (!shown).toString())
    })
  }

  // Fallback de logo: se a imagem falhar, esconder apenas a imagem e manter o texto
  const logoImg = document.querySelector(".logo-img")
  if (logoImg) {
    logoImg.addEventListener("error", () => {
      logoImg.style.display = "none"
    })
    logoImg.addEventListener("load", () => {
      logoImg.style.display = "inline"
    })
  }

  // Scroll suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const targetId = a.getAttribute("href").substring(1)
      const target = document.getElementById(targetId)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" })
      }
    })
  })

  // Aparição progressiva (IntersectionObserver)
  const reveals = Array.from(document.querySelectorAll(".reveal"))
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear")
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    reveals.forEach((el) => io.observe(el))
  } else {
    reveals.forEach((el) => el.classList.add("appear"))
  }

  // Modal genérico reutilizável
  const modal = document.getElementById("modal")
  const modalTitle = document.getElementById("modal-title")
  const modalBody = modal ? modal.querySelector(".modal-body") : null
  const modalCta = document.getElementById("modal-cta")

  function openModal({ title = "Detalhes", html = "", showCta = false, ctaText = "Quero este modelo", onCta = null }) {
    if (!modal || !modalBody || !modalTitle) return
    modalTitle.textContent = title
    modalBody.innerHTML = html
    if (modalCta) {
      modalCta.hidden = !showCta
      modalCta.textContent = ctaText
      modalCta.onclick = onCta || null
    }
    modal.classList.add("show")
    modal.setAttribute("aria-hidden", "false")
    // Foco acessível
    const closeBtn = modal.querySelector(".modal-close")
    if (closeBtn) closeBtn.focus()
    // Fechar com Esc
    const escHandler = (ev) => {
      if (ev.key === "Escape") closeModal()
    }
    document.addEventListener("keydown", escHandler, { once: true })
  }

  function closeModal() {
    if (!modal) return
    modal.classList.remove("show")
    modal.setAttribute("aria-hidden", "true")
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-close-modal]")) closeModal()
    })
  }

  // Botões "Ver modelo"
  const templateButtons = document.querySelectorAll(".open-template")

  // Mapeamento de templates para suas imagens
  const templateGalleries = {
    smartphone: [
      { src: "img/smartphone-store-hero.jpg", alt: "Página inicial da loja de smartphones" },
      { src: "img/smartphone-store-products.jpg", alt: "Produtos em destaque" },
      { src: "img/smartphone-store-categories.jpg", alt: "Categorias de produtos" },
    ],
    law: [
      { src: "img/law-office-hero.jpg", alt: "Página inicial do escritório de advocacia" },
      { src: "img/law-office-services.jpg", alt: "Serviços jurídicos" },
      { src: "img/law-office-testimonials.jpg", alt: "Depoimentos de clientes" },
    ],
    fitness: [
      { src: "img/fitness-academy-hero.jpg", alt: "Página inicial da academia" },
      { src: "img/fitness-academy-about.jpg", alt: "Sobre a academia" },
      { src: "img/fitness-classes.jpg", alt: "Aulas disponíveis" },
      { src: "img/fitness-pricing.jpg", alt: "Planos e preços" },
    ],
    aesthetic: [
      { src: "img/aesthetic-clinic-hero.jpg", alt: "Página inicial da clínica" },
      { src: "img/aesthetic-clinic-services.jpg", alt: "Serviços estéticos" },
      { src: "img/aesthetic-clinic-about.jpg", alt: "Sobre a clínica" },
      { src: "img/aesthetic-clinic-gallery.jpg", alt: "Galeria de resultados" },
    ],
    delivery: [
      { src: "img/delivery-hero.jpg", alt: "Página inicial do delivery" },
      { src: "img/delivery-cart.jpg", alt: "Carrinho de compras" },
    ],
    fashion: [
      { src: "img/fashion-store-hero.jpg", alt: "Página inicial da loja" },
      { src: "img/fashion-store-products.jpg", alt: "Catálogo de produtos" },
      { src: "img/fashion-store-contact.jpg", alt: "Página de contato" },
    ],
    automotive: [
      { src: "img/car-dealership-hero.jpg", alt: "Página inicial da revenda" },
      { src: "img/car-dealership-catalog.jpg", alt: "Catálogo de veículos" },
      { src: "img/car-dealership-contact.jpg", alt: "Formulário de contato" },
    ],
  }

  templateButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-template")
      const gallery = templateGalleries[id] || []

      // Criar galeria de imagens HTML
      let galleryHTML = '<div class="template-gallery">'

      if (gallery.length > 0) {
        gallery.forEach((img) => {
          galleryHTML += `<img src="${img.src}" alt="${img.alt}" class="template-preview-img" />`
        })
      } else {
        // Fallback para templates sem galeria definida
        const imgUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='700'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='%230f1c47'/><stop offset='1' stop-color='%230c183d'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g)'/><text x='50%' y='50%' fill='%237AEAFF' font-size='42' font-family='Arial' dominant-baseline='middle' text-anchor='middle'>Modelo%20${id}%20Preview</text></svg>`
        galleryHTML += `<img src="${imgUrl}" alt="Visual do Modelo ${id}" class="template-preview-img" />`
      }

      galleryHTML += "</div>"

      openModal({
        title: `Modelo ${id}`,
        html: galleryHTML,
        showCta: true,
        ctaText: "Quero este modelo",
        onCta: () => {
          closeModal()
          const contato = document.getElementById("contato")
          contato && contato.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
        },
      })
    })
  })

  // Geração de link WhatsApp nos botões rápidos
  function buildWhatsLink(number, message) {
    const n = (number || WHATSAPP_NUMBER).replace(/\D+/g, "")
    const m = message || WHATSAPP_MESSAGE_BASE
    return `https://wa.me/${n}?text=${enc(m)}`
  }

  const whatsLink = document.getElementById("whatsLink")
  if (whatsLink) {
    const number = whatsLink.getAttribute("data-whatsapp") || WHATSAPP_NUMBER
    whatsLink.setAttribute("href", buildWhatsLink(number))
  }

  const footerWhats = document.getElementById("footerWhats")
  if (footerWhats) {
    const number = footerWhats.getAttribute("data-whatsapp") || WHATSAPP_NUMBER
    footerWhats.setAttribute("href", buildWhatsLink(number))
  }

  const form = document.getElementById("contactForm")
  const feedback = form ? form.querySelector(".form-feedback") : null
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()
      const servico = form.servico.value.trim()
      const mensagem = form.mensagem.value.trim()

      const errors = []
      if (!servico) errors.push("Selecione um serviço.")
      if (!mensagem) errors.push("Descreva sua mensagem.")

      if (errors.length) {
        if (feedback) feedback.textContent = errors.join(" ")
        return
      }

      if (feedback) feedback.textContent = ""

      // Preparar mensagem para WhatsApp com serviço e mensagem
      const customMsg = `${WHATSAPP_MESSAGE_BASE}\n\nServiço: ${servico}\n\nMensagem: ${mensagem}`
      const link = buildWhatsLink(WHATSAPP_NUMBER, customMsg)

      // Redirecionar para WhatsApp
      window.open(link, "_blank")

      form.reset()
    })
  }

  // Partículas leves no background do hero (Canvas)
  const canvas = document.getElementById("heroParticles")
  const ctx = canvas ? canvas.getContext("2d") : null
  let particles = []
  let rafId = null
  const mouse = { x: 0, y: 0 }

  function resizeCanvas() {
    if (!canvas) return
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }

  function initParticles() {
    if (!canvas || !ctx) return
    particles = []
    const count = prefersReducedMotion ? 30 : Math.floor((canvas.width * canvas.height) / 40000)
    for (let i = 0; i < Math.max(30, Math.min(120, count)); i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2.5 + 0.8,
        vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.2 : 0.6),
        vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.2 : 0.6),
        alpha: Math.random() * 0.7 + 0.3,
        hue: Math.random() * 60 + 180, // tons de azul/cyan
      })
    }
  }

  function drawParticles() {
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy

      const dx = mouse.x - p.x
      const dy = mouse.y - p.y
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 150) {
        const force = (150 - dist) / 150
        p.x -= dx * force * 0.02
        p.y -= dy * force * 0.02
      }

      // wrap
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
      gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.alpha})`)
      gradient.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`)

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // Núcleo brilhante
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue}, 100%, 85%, ${p.alpha * 0.8})`
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 120) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(111, 239, 255, ${(1 - dist / 120) * 0.15})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }

    rafId = prefersReducedMotion ? null : requestAnimationFrame(drawParticles)
  }

  function startParticles() {
    resizeCanvas()
    initParticles()
    drawParticles()
  }

  if (canvas) {
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    })

    canvas.addEventListener("mouseleave", () => {
      mouse.x = 0
      mouse.y = 0
    })
  }

  window.addEventListener("resize", () => {
    startParticles()
  })

  if (canvas) startParticles()

  const cursor = document.createElement("div")
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 212, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease, opacity 0.15s ease;
    opacity: 0;
  `
  document.body.appendChild(cursor)

  const cursorDot = document.createElement("div")
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: rgba(0, 212, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.05s ease;
    box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
  `
  document.body.appendChild(cursorDot)

  let cursorX = 0,
    cursorY = 0
  let dotX = 0,
    dotY = 0

  document.addEventListener("mousemove", (e) => {
    cursorX = e.clientX
    cursorY = e.clientY
    cursor.style.opacity = "1"
  })

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0"
  })

  function animateCursor() {
    dotX += (cursorX - dotX) * 0.5
    dotY += (cursorY - dotY) * 0.5

    cursor.style.left = cursorX - 10 + "px"
    cursor.style.top = cursorY - 10 + "px"

    cursorDot.style.left = dotX - 3 + "px"
    cursorDot.style.top = dotY - 3 + "px"

    requestAnimationFrame(animateCursor)
  }

  if (!prefersReducedMotion) {
    animateCursor()
  }

  document.querySelectorAll("a, button, .card, .template-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
      cursor.style.borderColor = "rgba(255, 0, 110, 0.8)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      cursor.style.borderColor = "rgba(0, 212, 255, 0.6)"
    })
  })
})()
