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

})
