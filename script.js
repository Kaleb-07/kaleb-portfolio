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
  const typingEleme
}
  // Typing animation variables
  const typingElement = document.querySelector(".typing")
  const phrases = ["Software Engineer", "Video Editor", "Graphic Designer"]
  let phraseIndex = 0
  const letterIndex = 0
  const currentPhrase = []
  let isDeleting = false
  let isEnd = false
  let typingSpeed = 100

  // Hide loader after page is loaded
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden")

      // Start typing animation after loader is hidden
      setTimeout(() => {
        typingAnimation()
      }, 500)
    }, 2000)
  })

  // Typing animation function
  function typingAnimation() {
    // Set typing speed based on current state
    const currentText = phrases[phraseIndex]

    typingSpeed = isDeleting ? 50 : 100;

    // If in deleting state, remove last character
    if (isDeleting && currentPhrase.length > 0) {
      currentPhrase.pop()
      typingElement.textContent = currentPhrase.join("")
    }
    // If not deleting and not completed phrase, add next character
    else if (!isDeleting && currentPhrase.length < currentText.length) {
      currentPhrase.push(currentText[currentPhrase.length])
      typingElement.textContent = currentPhrase.join("")
    }

    // If completed phrase, set end state and prepare to delete
    if (!isDeleting && currentPhrase.length === currentText.length) {
      isEnd = true
      isDeleting = true
      typingSpeed = 1500 // Pause at the end of phrase
    }

    // If deleted all characters, move to next phrase
    if (isDeleting && currentPhrase.length === 0) {
      isDeleting = false
      phraseIndex = (phraseIndex + 1) % phrases.length
    }

    // Continue the animation loop
    setTimeout(typingAnimation, isEnd ? typingSpeed : typingSpeed)
    isEnd = false
  }

  // Custom cursor
  function updateCursor(e) {
    const posX = e.clientX
    const posY = e.clientY
    
    cursorDot.style.left = `${posX}px`
    cursorDot.style.top = `${posY}px`
    cursorDotOutline.style.left = `${posX}px`
    cursorDotOutline.style.top = `${posY}px`

    // Make cursor visible once it moves
    cursorDot.style.opacity = "1"
    cursorDotOutline.style.opacity = "1"
  }

  // Add cursor hover effect for interactive elements
  function addCursorHoverEffect() {
    const interactiveElements = document.querySelectorAll(
      "a, button, .btn, .project-item, .filter-btn, .theme-toggle, .hamburger, .floating-btn, .scroll-top, input, textarea",
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover")
      })
      el.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover")
      })
    })
  }

  // Initialize custom cursor if not on mobile
  if (window.innerWidth > 768) {
    document.addEventListener("mousemove", updateCursor)
    addCursorHoverEffect()
  }

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.remove("dark-mode")
  }

  // Theme toggle functionality with smooth transition
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode")

    // Save theme preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
    // optionally
    //       localStorage.setItem(
    //   "theme",
    //   document.body.classList.contains("dark-mode") ? "dark" : "light"
    // );
  })

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Close mobile menu when a nav item is clicked
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")

      // Remove active class from all nav items
      navItems.forEach((navItem) => {
        navItem.classList.remove("active")
      })

      // Add active class to clicked nav item
      this.classList.add("active")
    })
  })

  // Testimonials slider functionality
  let currentTestimonial = 0

  function showTestimonial(index) {
    // Hide all testimonials
    testimonialItems.forEach((item) => {
      item.classList.remove("active")
    })

    // Remove active class from all dots
    testimonialDots.forEach((dot) => {
      dot.classList.remove("active")
    })

    // Show the selected testimonial and activate its dot
    testimonialItems[index].classList.add("active")
    testimonialDots[index].classList.add("active")

    // Update current index
    currentTestimonial = index
  }

  // Next testimonial
  function nextTestimonial() {
    const nextIndex = (currentTestimonial + 1) % testimonialItems.length
    showTestimonial(nextIndex)
  }

  // Previous testimonial
  function prevTestimonial() {
    const prevIndex = (currentTestimonial - 1 + testimonialItems.length) % testimonialItems.length
    showTestimonial(prevIndex)
  }

  // Auto-advance testimonials
  let testimonialInterval = setInterval(nextTestimonial, 5000)

  // Add event listeners for testimonial controls
  nextArrow.addEventListener("click", () => {
    clearInterval(testimonialInterval)
    nextTestimonial()
    testimonialInterval = setInterval(nextTestimonial, 5000)
  })

  prevArrow.addEventListener("click", () => {
    clearInterval(testimonialInterval)
    prevTestimonial()
    testimonialInterval = setInterval(nextTestimonial, 5000)
  })

  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(testimonialInterval)
      showTestimonial(index)
      testimonialInterval = setInterval(nextTestimonial, 5000)
    })
  })

  // Floating "Hire Me" button functionality
  floatingBtn.addEventListener("click", () => {
    // Scroll to contact section
    const contactSection = document.getElementById("contact")
    contactSection.scrollIntoView({ behavior: "smooth" })

    // Focus on the name input after a short delay
    setTimeout(() => {
      document.getElementById("name").focus()
    }, 1000)
  })

  // Scroll to top button functionality
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("active")
    } else {
      scrollTopBtn.classList.remove("active")
    }

    // Add active class to nav items based on scroll position
    const sections = document.querySelectorAll("section")
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active")
      }
    })

    // Animate skill bars when skills section is in view
    const skillsSection = document.querySelector(".skills")
    const skillsSectionTop = skillsSection.offsetTop
    const skillsSectionHeight = skillsSection.clientHeight

    if (pageYOffset >= skillsSectionTop - skillsSectionHeight / 2) {
      skillBars.forEach((bar) => {
        const progress = bar.getAttribute("data-progress")
        bar.style.width = progress + "%"
      })
    }
  })

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Project filtering functionality with animation
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active class from all filter buttons
      filterBtns.forEach((filterBtn) => {
        filterBtn.classList.remove("active")
      })

      // Add active class to clicked filter button
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      // Add fade-out animation to all items
      projectItems.forEach((item) => {
        item.style.opacity = "0"
        item.style.transform = "scale(0.8)"
      })

      // After short delay, show the filtered items with animation
      setTimeout(() => {
        projectItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 50)
          } else {
            item.style.display = "none"
          }
        })
      }, 300)
    })
  })

  // Contact form validation
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const subject = document.getElementById("subject")
    const message = document.getElementById("message")

    // Validation flags
    let isValid = true

    // Clear previous error styles
    const formInputs = [name, email, subject, message]
    formInputs.forEach((input) => {
      input.style.borderColor = ""
    })

    // Validate name
    if (name.value.trim() === "") {
      name.style.borderColor = "red"
      isValid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
      email.style.borderColor = "red"
      isValid = false
    }

    // Validate subject
    if (subject.value.trim() === "") {
      subject.style.borderColor = "red"
      isValid = false
    }

    // Validate message
    if (message.value.trim() === "") {
      message.style.borderColor = "red"
      isValid = false
    }

    // If form is valid, submit it
    if (isValid) {
      // In a real application, you would send this data to a server
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    } else {
      alert("Please fill in all fields correctly.")
    }
  })  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const target = document.querySelector(this.getAttribute("href"))

      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
  // Initialize testimonials
  showTestimonial(0)

})
