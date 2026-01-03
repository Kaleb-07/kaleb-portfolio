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
  const links = $$(".nav-links li a");
  const header = $("header");
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

  // Fix: Hide loader when window is fully loaded
  window.addEventListener("load", () => {
    if (loader) {
      loader.classList.add("hidden");
    }
  });

  // Theme Toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });

    // Check saved theme
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.remove("dark-mode");
    }
  }

  // Hamburger Menu
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open"); // Using 'open' class for menu visibility
      hamburger.classList.toggle("toggle"); // Animation for hamburger
    });
  }

  // Close menu when clicking a link
  links.forEach(link => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        hamburger.classList.remove("toggle");
      }

      // Active link handling
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for fixed header
          behavior: 'smooth'
        });
      }
    });
  });

  // Header Scroll Effect & Scroll Top Button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      if (header) header.classList.add("sticky");
      if (scrollTopBtn) scrollTopBtn.classList.add("show");
    } else {
      if (header) header.classList.remove("sticky");
      if (scrollTopBtn) scrollTopBtn.classList.remove("show");
    }

    // Active link on scroll
    links.forEach(link => {
      const section = document.querySelector(link.getAttribute("href"));
      if (section) {
        const scrollPos = window.scrollY + 100;
        if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
          links.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        }
      }
    });
  });

  // Scroll to Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // Project Filter
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterValue = btn.getAttribute("data-filter");

        projectItems.forEach(item => {
          if (filterValue === "all" || item.classList.contains(filterValue)) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 200);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 500);
          }
        });
      });
    });
  }

  // Testimonial Slider
  let currentTestimonial = 0;

  function showTestimonial(index) {
    if (!testimonialItems.length) return;

    // Hide all
    testimonialItems.forEach(item => {
      item.classList.remove("active");
      item.style.display = "none";
    });
    testimonialDots.forEach(dot => dot.classList.remove("active"));

    // Show current
    testimonialItems[index].classList.add("active");
    testimonialItems[index].style.display = "block";
    if (testimonialDots[index]) testimonialDots[index].classList.add("active");
  }

  // Initialize slider
  if (testimonialItems.length > 0) {
    showTestimonial(0);

    if (nextArrow) {
      nextArrow.addEventListener("click", () => {
        currentTestimonial++;
        if (currentTestimonial >= testimonialItems.length) currentTestimonial = 0;
        showTestimonial(currentTestimonial);
      });
    }

    if (prevArrow) {
      prevArrow.addEventListener("click", () => {
        currentTestimonial--;
        if (currentTestimonial < 0) currentTestimonial = testimonialItems.length - 1;
        showTestimonial(currentTestimonial);
      });
    }

    testimonialDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
      });
    });
  }

  // Custom Cursor
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
    }

    if (cursorDotOutline) {
      cursorDotOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    }
  });

  // Typing Animation
  if (typingElement) {
    const texts = ["Software Engineer", "Video Editor", "Graphic Designer"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;
    let typeSpeed = 100;

    (function type() {
      if (count === texts.length) {
        count = 0;
      }
      currentText = texts[count];

      if (isDeleting) {
        letter = currentText.slice(0, --index);
        typeSpeed = 50;
      } else {
        letter = currentText.slice(0, ++index);
        typeSpeed = 150;
      }

      typingElement.textContent = letter;

      if (!isDeleting && letter.length === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && letter.length === 0) {
        isDeleting = false;
        count++;
        typeSpeed = 500; // Pause before next word
      }

      setTimeout(type, typeSpeed);
    })();
  }

  // Hire Me Button Float
  window.addEventListener("scroll", () => {
    const homeHeight = document.querySelector("#home").offsetHeight;
    if (floatingBtn) {
      if (window.scrollY > homeHeight) {
        floatingBtn.style.display = "flex";
      } else {
        floatingBtn.style.display = "none";
      }
    }
  });

});