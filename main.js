/* =========================================================
   VALENTINA GONZÁLEZ — interacciones del portafolio
   Datos editables, navegación, proyectos, habilidades y formulario
   ========================================================= */

// Edita estos objetos para actualizar los proyectos sin cambiar el HTML.
const projects = [
  {
    title: "XII Festival Internacional de Cine de Guayaquil",
    date: "ago. 2026",
    categories: ["Estrategia", "Audiovisual"],
    description: "Estrategia y gestión de contenido del canal oficial durante toda la cobertura, desde la inauguración hasta la ceremonia de premiación. Reels con más de 30K y 40K vistas.",
    visual: "img/project-festival.svg",
    tint: "#EBC2CD",
    detail: "Planificación de cobertura, selección de momentos clave y producción de piezas ágiles para acompañar el festival en tiempo real. Los reels destacados superaron las 30K y 40K vistas."
  },
  {
    title: "Ale Benavides MX",
    date: "jul.–ago. 2025",
    categories: ["Estrategia"],
    description: "Gestión de redes para una creadora de contenido y su agencia: redacción, diseño de carruseles y edición de reels.",
    visual: "img/project-social.svg",
    tint: "#C9D8F0",
    detail: "Acompañamiento de contenido para una creadora y su agencia, cuidando la coherencia visual y verbal entre publicaciones, carruseles y videos cortos."
  },
  {
    title: "Red Lobster Ecuador",
    date: "2025",
    categories: ["Fotografía"],
    description: "Fotografía gastronómica y piezas promocionales para campañas en redes.",
    visual: "img/project-food.svg",
    tint: "#EBC2CD",
    detail: "Fotografía gastronómica pensada para abrir el apetito y apoyar las campañas digitales con imágenes cálidas, cuidadas y orientadas al producto."
  },
  {
    title: "Pareidolia, obra de teatro",
    date: "2026",
    categories: ["Fotografía"],
    description: "Edición y diseño del material promocional: afiches, banners y entradas.",
    visual: "img/project-theatre.svg",
    tint: "#D7D2C9",
    detail: "Desarrollo de materiales promocionales para una producción escénica, adaptando el lenguaje visual a distintos formatos impresos y digitales."
  },
  {
    title: "Lista Blanca",
    date: "revista digital de cine y literatura",
    categories: ["Estrategia"],
    description: "Identidad visual, diseño editorial y estrategia en redes para una revista digital.",
    visual: "img/project-listablanca.svg",
    tint: "#C9D8F0",
    detail: "Un espacio editorial para cruzar cine y literatura a través de una identidad visual reconocible, publicaciones digitales y una línea de comunicación coherente."
  },
  {
    title: "Valentina González Fotógrafa",
    date: "marca personal",
    categories: ["Estrategia"],
    description: "Estrategia de posicionamiento y calendario de contenido en Instagram.",
    visual: "img/project-personal.svg",
    tint: "#EBC2CD",
    detail: "Construcción de una presencia digital que conecta fotografía, proceso creativo y servicios, con pilares de contenido y planificación editorial."
  },
  {
    title: "Taller de Cine Municipal",
    date: "2026",
    categories: ["Audiovisual"],
    description: "Script, asistencia de dirección y asistencia de cámara.",
    visual: "img/project-film.svg",
    tint: "#D6D4CE",
    detail: "Participación en el flujo de rodaje apoyando continuidad, coordinación de dirección y tareas de cámara dentro de un equipo audiovisual."
  }
];

// Porcentajes iniciales orientativos: ajústalos según tu experiencia real.
const technicalSkills = [
  { name: "Fotografía", level: 92 },
  { name: "Diseño gráfico", level: 84 },
  { name: "Edición de video", level: 88 },
  { name: "Guion y storytelling", level: 82 },
  { name: "Meta Ads", level: 74 },
  { name: "Notion", level: 80 }
];

const personalSkills = [
  { name: "Comunicación", level: 91 },
  { name: "Organización", level: 88 },
  { name: "Liderazgo de equipos", level: 78 },
  { name: "Resolución de problemas", level: 85 }
];

/* -------------------- Menú móvil -------------------- */
function setupNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = nav.querySelectorAll("a");

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 860) closeMenu();
  });
}

/* -------------------- Render de tarjetas -------------------- */
function renderProjects(filter = "Todos") {
  const grid = document.querySelector("#project-grid");
  const filtered = filter === "Todos"
    ? projects
    : projects.filter((project) => project.categories.includes(filter));

  grid.replaceChildren();

  filtered.forEach((project) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "project-card";
    card.style.setProperty("--project-tint", project.tint);
    card.setAttribute("aria-label", `Ver detalles del proyecto: ${project.title}`);

    const visual = document.createElement("div");
    visual.className = "project-card__visual";
    const image = document.createElement("img");
    image.src = project.visual;
    image.alt = `Imagen placeholder para ${project.title}`;
    image.loading = "lazy";
    visual.append(image);

    const meta = document.createElement("div");
    meta.className = "project-card__meta";
    const number = String(projects.indexOf(project) + 1).padStart(2, "0");
    meta.innerHTML = `<span>proyecto ${number}</span><span>${project.date}</span>`;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const bottom = document.createElement("div");
    bottom.className = "project-card__bottom";
    const categories = document.createElement("div");
    categories.className = "project-card__categories";
    project.categories.forEach((category) => {
      const tag = document.createElement("span");
      tag.textContent = category;
      categories.append(tag);
    });
    const arrow = document.createElement("span");
    arrow.className = "project-card__arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    bottom.append(categories, arrow);

    card.append(visual, meta, title, description, bottom);
    card.addEventListener("click", () => openProjectModal(project));
    grid.append(card);
  });
}

/* -------------------- Filtros -------------------- */
function setupProjectFilters() {
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      renderProjects(button.dataset.filter);
    });
  });
}

/* -------------------- Modal de proyecto -------------------- */
function openProjectModal(project) {
  const modal = document.querySelector("#project-modal");
  document.querySelector("#modal-category").textContent = project.categories.join(" / ");
  document.querySelector("#modal-title").textContent = project.title;
  document.querySelector("#modal-date").textContent = project.date;
  document.querySelector("#modal-description").textContent = project.detail;
  const tags = document.querySelector("#modal-tags");
  tags.replaceChildren();
  project.categories.forEach((category) => {
    const item = document.createElement("li");
    item.textContent = category;
    tags.append(item);
  });
  modal.showModal();
}

function setupProjectModal() {
  const modal = document.querySelector("#project-modal");
  document.querySelector("#modal-close").addEventListener("click", () => modal.close());
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
  // El elemento <dialog> se cierra de forma nativa al pulsar Escape.
}

/* -------------------- Barras de habilidades -------------------- */
function renderSkills(skills, targetId) {
  const container = document.getElementById(targetId);
  skills.forEach((skill) => {
    const item = document.createElement("div");
    item.className = "skill-item";
    const top = document.createElement("div");
    top.className = "skill-item__top";

    const name = document.createElement("span");
    name.textContent = skill.name;
    const value = document.createElement("span");
    value.className = "skill-item__value";
    value.textContent = "0%";

    const track = document.createElement("div");
    track.className = "skill-item__track";
    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", skill.name);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");
    track.setAttribute("aria-valuenow", "0");

    const fill = document.createElement("div");
    fill.className = "skill-item__fill";
    fill.dataset.level = String(skill.level);
    track.append(fill);
    top.append(name, value);
    item.append(top, track);
    container.append(item);
  });
}

function setupSkillAnimation() {
  const tracks = document.querySelectorAll(".skill-item__track");
  if (!("IntersectionObserver" in window)) {
    tracks.forEach(animateSkill);
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkill(entry.target);
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  tracks.forEach((track) => observer.observe(track));
}

function animateSkill(track) {
  const fill = track.querySelector(".skill-item__fill");
  const value = track.closest(".skill-item").querySelector(".skill-item__value");
  const target = Number(fill.dataset.level);
  const duration = 1100;
  const start = performance.now();

  fill.style.width = `${target}%`;
  track.setAttribute("aria-valuenow", String(target));

  function updateCounter(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    value.textContent = `${Math.round(target * eased)}%`;
    if (progress < 1) requestAnimationFrame(updateCounter);
  }
  requestAnimationFrame(updateCounter);
}

/* -------------------- Aparición al hacer scroll -------------------- */
function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
}

/* -------------------- Validación del formulario -------------------- */
function setupContactForm() {
  const form = document.querySelector("#contact-form");
  const submitButton = document.querySelector("#submit-button");
  const status = document.querySelector("#form-status");
  const messageCount = document.querySelector("#message-count");
  const fields = {
    name: {
      input: document.querySelector("#name"),
      error: document.querySelector("#name-error"),
      validate(value) {
        return value.trim().length >= 3 ? "" : "Escribe tu nombre (mínimo 3 caracteres).";
      }
    },
    email: {
      input: document.querySelector("#email"),
      error: document.querySelector("#email-error"),
      validate(value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailPattern.test(value.trim()) ? "" : "Escribe un email válido, por ejemplo nombre@correo.com.";
      }
    },
    subject: {
      input: document.querySelector("#subject"),
      error: document.querySelector("#subject-error"),
      validate(value) {
        return value.trim() ? "" : "Cuéntame el tema de tu proyecto.";
      }
    },
    message: {
      input: document.querySelector("#message"),
      error: document.querySelector("#message-error"),
      validate(value) {
        return value.trim().length >= 20 ? "" : "El mensaje debe tener al menos 20 caracteres.";
      }
    }
  };

  function validateField(field) {
    const errorMessage = field.validate(field.input.value);
    field.error.textContent = errorMessage;
    field.input.setAttribute("aria-invalid", String(Boolean(errorMessage)));
    return !errorMessage;
  }

  function updateFormState() {
    const allValid = Object.values(fields).every(validateField);
    submitButton.disabled = !allValid;
    messageCount.textContent = `${fields.message.input.value.trim().length} / 20 mín.`;
    return allValid;
  }

  Object.values(fields).forEach((field) => {
    field.input.addEventListener("input", () => {
      validateField(field);
      updateFormState();
      status.textContent = "";
    });
    field.input.addEventListener("blur", () => {
      validateField(field);
      updateFormState();
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!updateFormState()) {
      status.textContent = "Revisa los campos marcados antes de enviar.";
      return;
    }
    status.textContent = "¡Gracias! Tu mensaje está listo. Este formulario de muestra no lo envía a un servidor.";
    form.reset();
    Object.values(fields).forEach((field) => {
      field.error.textContent = "";
      field.input.removeAttribute("aria-invalid");
    });
    messageCount.textContent = "0 / 20 mín.";
    submitButton.disabled = true;
  });
}

/* -------------------- Año dinámico y arranque -------------------- */
function setupCurrentYear() {
  document.querySelector("#current-year").textContent = new Date().getFullYear();
}

function initPortfolio() {
  setupNavigation();
  renderProjects();
  setupProjectFilters();
  setupProjectModal();
  renderSkills(technicalSkills, "technical-skills");
  renderSkills(personalSkills, "personal-skills");
  setupSkillAnimation();
  setupRevealAnimations();
  setupContactForm();
  setupCurrentYear();
}

document.addEventListener("DOMContentLoaded", initPortfolio);
