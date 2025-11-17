// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  
  // Safer DOM selector function
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // Variables
  const loader = $(".loader-wrapper");
  const themeToggle = $(".theme-toggle");
  const hamburger = $(".hamburger");
  const navLinks = $(".nav-links");
  const navItems = $$(".nav-links a");
  const scrollTopBtn = $(".scroll-top");
  const skillBars = $$(".skill-progress");
  const filterBtns = $$(".filter-btn");
  const projectItems = $$(".project-item");
  const contactForm = $("#contactForm");
  const floatingBtn = $(".floating-btn");
  const testimonialItems = $$(".testimonial-item");
  const testimonialDots = $$(".dot");
  const prevArrow = $(".prev-arrow");
  const nextArrow = $(".next-arrow");
  const cursorDot = $(".cursor-dot");
  const cursorDotOutline = $(".cursor-dot-outline");
  const typingElement = $(".typing");

    // ⏳ Typing animation variables
  const phrases = ["Software Engineer", "Video Editor", "Graphic Designer"];
  let phraseIndex = 0;
  const currentPhrase = [];
  let isDeleting = false;
  let isEnd = false;
  let typingSpeed = 100;

    // Loader
  //------------------------------
  window.addEventListener("load", () => {
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add("hidden");
      setTimeout(() => typingAnimation(), 500);
    }, 1200);
  });

    // Typing Animation
  //------------------------------
  function typingAnimation() {
    if (!typingElement) return;

    const currentText = phrases[phraseIndex];
    typingSpeed = isDeleting ? 60 : 100;

    if (isDeleting && currentPhrase.length > 0) {
      currentPhrase.pop();
    } else if (!isDeleting && currentPhrase.length < currentText.length) {
      currentPhrase.push(currentText[currentPhrase.length]);
    }

    typingElement.textContent = currentPhrase.join("");

    if (!isDeleting && currentPhrase.length === currentText.length) {
      isEnd = true;
      isDeleting = true;
      typingSpeed = 1200; 
    }

    if (isDeleting && currentPhrase.length === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typingAnimation, typingSpeed);
    isEnd = false;
  }
    // Custom Cursor
  //------------------------------
  if (cursorDot && cursorDotOutline && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      const { clientX: x, clientY: y } = e;

      cursorDot.style.cssText = `left:${x}px; top:${y}px; opacity:1`;
      cursorDotOutline.style.cssText = `left:${x}px; top:${y}px; opacity:1`;
    });

    const interactiveElements = $$(
      "a, button, .btn, .project-item, .filter-btn, .theme-toggle, .hamburger, .floating-btn, .scroll-top, input, textarea"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }
})
