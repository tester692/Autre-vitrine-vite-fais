/* NOVA — École Supérieure | Interactions */
(function () {
  "use strict";
  document.documentElement.classList.remove("no-js");

  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav__toggle");
  const panel = document.querySelector(".nav__panel");
  const backToTop = document.querySelector(".back-to-top");

  /* En-tête au défilement + bouton retour en haut */
  const onScroll = () => {
    const y = window.scrollY;
    if (header && !header.classList.contains("site-header--solid")) {
      header.classList.toggle("is-scrolled", y > 40);
    }
    if (backToTop) backToTop.classList.toggle("is-visible", y > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* Menu mobile */
  if (toggle && panel) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      panel.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    window.matchMedia("(min-width: 1024px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
  }

  /* Apparition au défilement */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* Compteurs animés */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counters = document.querySelectorAll("[data-count]");
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = (el.dataset.count.split(".")[1] || "").length;
    if (reduceMotion) { el.textContent = target.toLocaleString("fr-FR", { minimumFractionDigits: decimals }); return; }
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(animateCount);
  }

  /* Filtres des formations */
  const filters = document.querySelectorAll(".filter");
  const programs = document.querySelectorAll(".program[data-category]");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.dataset.filter;
      filters.forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
      programs.forEach((p) => {
        const match = cat === "all" || p.dataset.category.split(" ").includes(cat);
        p.classList.toggle("is-hidden", !match);
        if (match) p.classList.add("is-visible");
      });
    });
  });

  /* Accordéon FAQ */
  document.querySelectorAll(".faq__q").forEach((q) => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq__item");
      const open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", String(!open));
      item.classList.toggle("is-open", !open);
    });
  });

  /* Formulaire de contact (validation côté client) */
  const form = document.querySelector("#contact-form");
  if (form) {
    const rules = {
      prenom: (v) => v.trim().length >= 2 || "Veuillez indiquer votre prénom.",
      nom: (v) => v.trim().length >= 2 || "Veuillez indiquer votre nom.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Adresse e-mail invalide.",
      sujet: (v) => v !== "" || "Veuillez choisir un sujet.",
      message: (v) => v.trim().length >= 10 || "Votre message doit contenir au moins 10 caractères.",
    };
    const validateField = (name) => {
      const input = form.elements[name];
      const field = input.closest(".field");
      const err = field.querySelector(".field__error");
      const result = rules[name](input.value);
      const ok = result === true;
      field.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      err.textContent = ok ? "" : result;
      return ok;
    };
    Object.keys(rules).forEach((name) => {
      form.elements[name].addEventListener("blur", () => validateField(name));
      form.elements[name].addEventListener("input", () => {
        if (form.elements[name].closest(".field").classList.contains("has-error")) validateField(name);
      });
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const results = Object.keys(rules).map(validateField);
      const consent = form.elements.consent;
      const consentErr = form.querySelector("#consent-error");
      consentErr.textContent = consent.checked ? "" : "Merci d'accepter le traitement de vos données.";
      if (results.every(Boolean) && consent.checked) {
        const success = form.querySelector(".form__success");
        success.textContent = `Merci ${form.elements.prenom.value.trim()} ! Votre message a bien été envoyé. Notre équipe vous répondra sous 48 h ouvrées.`;
        success.classList.add("is-visible");
        form.reset();
      } else {
        const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstError) firstError.focus();
      }
    });
  }

  /* Newsletter */
  document.querySelectorAll(".newsletter").forEach((nl) => {
    nl.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = nl.querySelector("input");
      const msg = nl.parentElement.querySelector(".newsletter-msg");
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim());
      if (msg) msg.textContent = ok ? "Merci, vous êtes inscrit·e à notre lettre d'information." : "Veuillez saisir une adresse e-mail valide.";
      if (ok) input.value = "";
    });
  });

  /* Année du pied de page */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
