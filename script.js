"use strict";

const content = document.querySelector(".content");

const navLinks = [...document.querySelectorAll(".nav-link")];

const sections = [...document.querySelectorAll(".content section[id]")];

const yearElement = document.querySelector("#year");

const projectCards = [...document.querySelectorAll(".project-card")];

/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================================
   RIGHT SIDE SCROLL
========================================================= */

if (content) {
  content.addEventListener(
    "scroll",
    () => {
      updateActiveNavigation();
    },
    {
      passive: true,
    },
  );
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function updateActiveNavigation() {
  if (!content) return;

  const scrollPosition = content.scrollTop + content.clientHeight * 0.25;

  let currentSection = "";

  sections.forEach((section) => {
    const top = section.offsetTop;

    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    const sectionName = link.dataset.section;

    link.classList.toggle("active", sectionName === currentSection);
  });
}

updateActiveNavigation();

/* =========================================================
   NAVIGATION CLICK
========================================================= */

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.dataset.section;

    const target = document.getElementById(targetId);

    if (!target || !content) {
      return;
    }

    content.scrollTo({
      top: target.offsetTop,

      behavior: "smooth",
    });

    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

/* =========================================================
   INTERSECTION OBSERVER
========================================================= */

if (content && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === id);
          });
        }
      });
    },
    {
      root: content,

      threshold: 0.3,
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

/* =========================================================
   PROJECT CARD HOVER
========================================================= */

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;

    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;

    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -2;

    const rotateY = ((x - centerX) / centerX) * 2;

    card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-7px)
                `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* =========================================================
   REVEAL ANIMATION
========================================================= */

const revealElements = [
  ...document.querySelectorAll(
    ".content-section, .Certificate-card, .project-card, .skill-group",
  ),
];

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("revealed");

        observer.unobserve(entry.target);
      });
    },
    {
      root: content,
      threshold: 0.08,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/* =========================================================
   KEYBOARD NAVIGATION
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
    return;
  }

  const activeIndex = navLinks.findIndex((link) =>
    link.classList.contains("active"),
  );

  if (activeIndex === -1) {
    return;
  }

  let nextIndex = activeIndex;

  if (event.key === "ArrowDown") {
    nextIndex = Math.min(activeIndex + 1, navLinks.length - 1);
  }

  if (event.key === "ArrowUp") {
    nextIndex = Math.max(activeIndex - 1, 0);
  }

  const nextLink = navLinks[nextIndex];

  if (nextLink) {
    nextLink.click();
  }
});

/* =========================================================
   PROJECT LINK EFFECT
========================================================= */

const projectLinks = [...document.querySelectorAll(".project-link")];

projectLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.letterSpacing = "0.03em";
  });

  link.addEventListener("mouseleave", () => {
    link.style.letterSpacing = "";
  });
});

const hero = document.querySelector(".hero-content");

if (hero && content) {
  content.addEventListener(
    "scroll",
    () => {
      const scroll = content.scrollTop;

      if (scroll < 800) {
        hero.style.transform = `translateY(${scroll * 0.08}px)`;

        hero.style.opacity = Math.max(0.15, 1 - scroll / 550);
      }
    },
    {
      passive: true,
    },
  );
}

/* ================================BACK TO TOP============================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop && content) {
  backToTop.addEventListener("click", () => {
    content.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  updateActiveNavigation();
});
/* ------------------google amar--------------------- */
document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', function () {

        const href = this.href;

        if (href.includes('github.com')) {
            gtag('event', 'github_click');
        }

        else if (href.includes('linkedin.com')) {
            gtag('event', 'linkedin_click');
        }

        else if (href.includes('instagram.com')) {
            gtag('event', 'instagram_click');
        }

        else if (href.includes('youtube.com')) {
            gtag('event', 'youtube_click');
        }

        else if (href.startsWith('mailto:')) {
            gtag('event', 'email_click');
        }

        else if (href.startsWith('tel:')) {
            gtag('event', 'phone_click');
        }
    });
});