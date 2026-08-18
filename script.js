"use strict";

/* =========================================================
   PORTFOLIO — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const body = document.body;
  const header = document.getElementById("header");
  const loader = document.getElementById("page-loader");

  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const revealElements = document.querySelectorAll(".reveal");

  const projectItems = document.querySelectorAll(".project-item");

  const projectModal = document.getElementById("project-modal");
  const modalContainer = projectModal?.querySelector(".modal-container");
  const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalCategory = document.getElementById("modal-category");
  const modalDescription = document.getElementById("modal-description");
  const modalTechnologies = document.getElementById("modal-technologies");
  const modalLink = document.getElementById("modal-link");

  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  const currentYear = document.getElementById("current-year");
  
  /* =====================================================
       PAGE LOADER
    ===================================================== */

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (loader) {
        loader.classList.add("loaded");
      }

      document.body.classList.add("page-loaded");
    }, 800);
  });

  /* =====================================================
       HEADER — SCROLL EFFECT
    ===================================================== */

  const handleHeaderScroll = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  handleHeaderScroll();

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const openMenu = () => {
    menuToggle?.classList.add("active");
    navMenu?.classList.add("active");

    menuToggle?.setAttribute("aria-expanded", "true");

    body.classList.add("menu-open");
  };

  const closeMenu = () => {
    menuToggle?.classList.remove("active");
    navMenu?.classList.remove("active");

    menuToggle?.setAttribute("aria-expanded", "false");

    body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.contains("active");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* =====================================================
       CLOSE MOBILE MENU WITH ESC
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

  const sections = document.querySelectorAll("main section[id]");

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      link.classList.toggle("active", href === `#${currentSection}`);
    });
  };

  updateActiveNav();

  window.addEventListener("scroll", updateActiveNav, { passive: true });

  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       PROJECT DATA
    ===================================================== */

  const projectData = {
    "project-01": {
      title: "Autonomous Robot",
      category: "Robotics",
      image: "assets/projects/project-01.jpg",
      description:
        "A robotic system designed to navigate and interact with its environment using sensors, microcontrollers, and custom control logic.",
      technologies: ["C++", "Arduino", "Sensors", "Control Systems"],
      link: "#",
    },

    "project-02": {
      title: "Smart Monitoring System",
      category: "Embedded Systems",
      image: "assets/projects/project-02.jpg",
      description:
        "An embedded monitoring system capable of collecting sensor data and presenting real-time information through a digital interface.",
      technologies: ["ESP32", "C++", "IoT", "Electronics"],
      link: "#",
    },

    "project-03": {
      title: "Interactive Web Application",
      category: "Web Development",
      image: "assets/projects/project-03.jpg",
      description:
        "A responsive web application focused on delivering a clean user experience with interactive components and dynamic behavior.",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      link: "#",
    },

    "project-04": {
      title: "Automated Control System",
      category: "Automation",
      image: "assets/projects/project-04.jpg",
      description:
        "An automated control system designed to monitor inputs, process data, and control physical components according to defined conditions.",
      technologies: ["PLC", "Automation", "Control", "Electronics"],
      link: "#",
    },

    "project-05": {
      title: "Engineering Software Project",
      category: "Software",
      image: "assets/projects/project-05.jpg",
      description:
        "A software project created to solve an engineering problem through algorithmic thinking, automation, and data processing.",
      technologies: ["Python", "Algorithms", "Data", "Engineering"],
      link: "#",
    },

    "project-06": {
      title: "Mechanical Prototype",
      category: "Engineering Design",
      image: "assets/projects/project-06.jpg",
      description:
        "A mechanical prototype developed from concept and CAD design to physical fabrication and testing.",
      technologies: ["CAD", "3D Printing", "Design", "Prototyping"],
      link: "#",
    },
  };

  /* =====================================================
       PROJECT MODAL
    ===================================================== */

  const getProjectId = (project) => {
    const image = project.querySelector(".project-image img");

    if (!image) return null;

    const src = image.getAttribute("src") || "";

    const match = src.match(/project-(\d+)/);

    if (!match) return null;

    return `project-${match[1]}`;
  };

  const openProjectModal = (projectId) => {
    if (!projectModal || !projectData[projectId]) {
      return;
    }

    const project = projectData[projectId];

    if (modalImage) {
      modalImage.src = project.image;
      modalImage.alt = project.title;
    }

    if (modalTitle) {
      modalTitle.textContent = project.title;
    }

    if (modalCategory) {
      modalCategory.textContent = project.category;
    }

    if (modalDescription) {
      modalDescription.textContent = project.description;
    }

    if (modalTechnologies) {
      modalTechnologies.innerHTML = "";

      project.technologies.forEach((technology) => {
        const tag = document.createElement("span");

        tag.textContent = technology;

        modalTechnologies.appendChild(tag);
      });
    }

    if (modalLink) {
      modalLink.href = project.link;
    }

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");

    body.classList.add("modal-open");
  };

  const closeProjectModal = () => {
    if (!projectModal) return;

    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");

    body.classList.remove("modal-open");
  };

  projectItems.forEach((project) => {
    const image = project.querySelector(".project-image");

    const link = project.querySelector(".project-link");

    const projectId = getProjectId(project);

    if (!projectId) return;

    image?.addEventListener("click", () => {
      openProjectModal(projectId);
    });

    link?.addEventListener("click", (event) => {
      event.preventDefault();

      openProjectModal(projectId);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeProjectModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && projectModal?.classList.contains("active")) {
      closeProjectModal();
    }
  });

  /* =====================================================
       MODAL — CLICK OUTSIDE
    ===================================================== */

  projectModal?.addEventListener("click", (event) => {
    if (
      event.target === projectModal ||
      event.target.classList.contains("modal-overlay")
    ) {
      closeProjectModal();
    }
  });

  /* =====================================================
       CONTACT FORM
    ===================================================== */

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!formMessage) return;

    const formData = new FormData(contactForm);

    const name = formData.get("name")?.toString().trim();

    const email = formData.get("email")?.toString().trim();

    const subject = formData.get("subject")?.toString().trim();

    const message = formData.get("message")?.toString().trim();

    if (!name || !email || !subject || !message) {
      formMessage.textContent = "Please complete all fields.";

      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      formMessage.textContent = "Please enter a valid email address.";

      return;
    }

    /*
                Frontend-only website:
                No real server request is made.

                For now, the form prepares a mailto link.
                Replace YOUR_EMAIL with your real email.
            */

    const destinationEmail = "your.email@example.com";

    const mailSubject = encodeURIComponent(subject);

    const mailBody = encodeURIComponent(
      `Name: ${name}\n\n` + `Email: ${email}\n\n` + `Message:\n${message}`,
    );

    const mailto =
      `mailto:${destinationEmail}` +
      `?subject=${mailSubject}` +
      `&body=${mailBody}`;

    window.location.href = mailto;

    formMessage.textContent = "Opening your email client...";
  });

  /* =====================================================
       CURRENT YEAR
    ===================================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#" || targetId === "#!") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header?.offsetHeight || 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      closeMenu();
    });
  });

  /* =====================================================
       BACK TO TOP
    ===================================================== */

  const backToTop = document.querySelector(".back-to-top");

  backToTop?.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

  const projectImages = document.querySelectorAll(
    ".project-image img, #modal-image",
  );

  projectImages.forEach((image) => {
    image.addEventListener("error", () => {
      image.style.display = "none";

      const parent = image.parentElement;

      if (parent) {
        parent.classList.add("image-error");
      }
    });
  });

  /* =====================================================
       KEYBOARD ACCESSIBILITY
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", () => {
    body.classList.remove("keyboard-navigation");
  });

  /* =====================================================
       PREVENT BROKEN # LINKS
    ===================================================== */

  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      /*
                    Project links are handled above.
                    Other placeholder links remain disabled.
                */

      if (!link.classList.contains("project-link")) {
        event.preventDefault();
      }
    });
  });

  /* =====================================================
       CONSOLE
    ===================================================== */

  console.log("%cPortfolio initialized.", "font-size:14px;font-weight:bold;");
});
