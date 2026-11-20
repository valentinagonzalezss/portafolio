const menuToggle=document.querySelector(".menu-toggle");
const siteNav=document.querySelector(".site-nav");
if(menuToggle&&siteNav){
  menuToggle.addEventListener("click",()=>{
    const open=menuToggle.getAttribute("aria-expanded")==="true";
    menuToggle.setAttribute("aria-expanded",String(!open));
    menuToggle.setAttribute("aria-label",open?"Abrir menú":"Cerrar menú");
    siteNav.classList.toggle("is-open",!open);
  });
  siteNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
    menuToggle.setAttribute("aria-expanded","false");
    menuToggle.setAttribute("aria-label","Abrir menú");
    siteNav.classList.remove("is-open");
  }));
}

// Validación del formulario de contacto. El envío continúa al enlace de contacto
// disponible en el portafolio; no se simula el envío a un servidor.
const contactForm=document.querySelector("#contact-form");
if(contactForm){
  const status=document.querySelector("#form-status");
  const checks={
    name:value=>value.trim().length>=2?"":"Escribe tu nombre (mínimo 2 caracteres).",
    email:value=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())?"":"Escribe un correo válido.",
    message:value=>value.trim().length>=10?"":"Cuéntame un poco más (mínimo 10 caracteres)."
  };
  const validate=field=>{
    const error=checks[field.name](field.value);
    field.setAttribute("aria-invalid",String(Boolean(error)));
    return error;
  };
  Object.keys(checks).forEach(name=>{
    const field=contactForm.elements[name];
    field.addEventListener("input",()=>{
      const error=validate(field);
      if(error){status.textContent=error;}
      else{status.textContent="Campo correcto.";}
    });
  });
  contactForm.addEventListener("submit",event=>{
    event.preventDefault();
    const fields=Object.keys(checks).map(name=>contactForm.elements[name]);
    const errors=fields.map(validate);
    const firstError=errors.find(Boolean);
    if(firstError){
      status.textContent=firstError;
      fields[errors.findIndex(Boolean)].focus();
      return;
    }
    status.textContent="¡Datos validados! Se abrirá tu página de contacto para continuar.";
    window.open("https://bio.site/valentinagonzalez","_blank","noopener,noreferrer");
  });
}
