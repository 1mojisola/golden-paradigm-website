
document.addEventListener("DOMContentLoaded", () => {

  // MOBILE NAVIGATION
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    // Close the menu after selecting a navigation link
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    // Close the menu when clicking outside it
    document.addEventListener("click", event => {
      const clickedInsideMenu = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }


  // CURRENT YEAR
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  // VIDEO MODAL
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const videoClose = document.getElementById("videoClose");
  const videoButtons = document.querySelectorAll("[data-video]");

  function closeVideo() {
    if (!videoModal || !modalVideo) return;

    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();

    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  videoButtons.forEach(button => {
    button.addEventListener("click", () => {
      const videoFile = button.getAttribute("data-video");

      if (!videoFile || !videoModal || !modalVideo) return;

      modalVideo.src = videoFile;

      videoModal.classList.add("active");
      videoModal.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";

      modalVideo.play().catch(() => {
        // The visitor can start playback using the video controls.
      });
    });
  });

  if (videoClose) {
    videoClose.addEventListener("click", closeVideo);
  }

  if (videoModal) {
    videoModal.addEventListener("click", event => {
      if (event.target === videoModal) {
        closeVideo();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeVideo();
    }
  });


  // CONTACT EMAIL PLACEHOLDER PROTECTION
  const contactEmail = document.getElementById("contactEmail");
  const contactNote = document.getElementById("contactNote");

  if (contactEmail) {
    contactEmail.addEventListener("click", event => {
      const destination = contactEmail.getAttribute("href");

      if (!destination || destination.includes("CONTACT_EMAIL_HERE")) {
        event.preventDefault();

        if (contactNote) {
          contactNote.textContent =
            "Please contact the company through its official contact details. Online contact details will be added soon.";
        }
      }
    });
  }


  // IMAGE FALLBACK
  // Show a neutral background if an image cannot be loaded.
  document.querySelectorAll("img").forEach(image => {
    image.addEventListener("error", () => {
      image.style.backgroundColor = "#e9edf2";
      image.style.minHeight = "80px";
      image.alt = image.alt + " (image unavailable)";
    });
  });

});

