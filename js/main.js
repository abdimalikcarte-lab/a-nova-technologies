
/* ==========================================
   NOVA TECHNOLOGIES — INTERACTIONS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const menu = document.querySelector(".menu");
  const links = document.getElementById("links");
  const navLinks = document.querySelectorAll("#links a");

  // Mobile navigation
  function closeMenu() {
    links?.classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }

  menu?.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();

      navLinks.forEach(item => item.classList.remove("on"));
      link.classList.add("on");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", event => {
    if (
      links?.classList.contains("open") &&
      !links.contains(event.target) &&
      !menu?.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close menu with Escape
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  // Header scroll effect
  function updateHeader() {
    if (!header) return;

    header.style.boxShadow =
      window.scrollY > 20
        ? "0 8px 30px rgba(0,0,0,.22)"
        : "none";
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  // Active navigation based on visible section
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const activeLink = document.querySelector(
          `#links a[href="#${entry.target.id}"]`
        );

        if (activeLink) {
          navLinks.forEach(link => link.classList.remove("on"));
          activeLink.classList.add("on");
        }
      });
    }, {
      rootMargin: "-25% 0px -65% 0px"
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    ".card, .stats div, .step, .cc, .strip > div, .bar, section.light h2"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // Smooth navigation
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Current year automatically
  const copyright = document.querySelector(".copy");

  if (copyright) {
    copyright.textContent =
      `© ${new Date().getFullYear()} Nova Technologies. All rights reserved.`;
  }
});
