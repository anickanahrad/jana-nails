const gallerySlider = document.querySelector(".gallery-slider");
const scrollbar = document.querySelector(".gallery-scrollbar");
const thumb = document.querySelector(".gallery-scrollbar-thumb");

if (gallerySlider && scrollbar && thumb) {

  function getValues() {
    const maxScroll =
      gallerySlider.scrollWidth - gallerySlider.clientWidth;

    const maxThumbMove =
  scrollbar.clientWidth - thumb.clientWidth - 8;

    return {
      maxScroll,
      maxThumbMove
    };
  }


  /* =========================
     UPDATE SLIDER
  ========================= */

  function updateThumb() {

    const { maxScroll, maxThumbMove } = getValues();

    if (maxScroll <= 0) {
      thumb.style.transform = "translateX(0)";
      return;
    }

    const progress =
      gallerySlider.scrollLeft / maxScroll;

    thumb.style.transform =
      `translateX(${progress * maxThumbMove}px)`;
  }


  gallerySlider.addEventListener(
    "scroll",
    updateThumb
  );


  /* =========================
     DRAG BOTTOM SLIDER
  ========================= */

  let dragging = false;
  let startX = 0;
  let startScrollLeft = 0;

  thumb.addEventListener("pointerdown", (event) => {

    dragging = true;

    startX = event.clientX;
    startScrollLeft = gallerySlider.scrollLeft;

    thumb.setPointerCapture(event.pointerId);
  });


  thumb.addEventListener("pointermove", (event) => {

    if (!dragging) return;

    const { maxScroll, maxThumbMove } = getValues();

    if (maxThumbMove <= 0) return;

    const movement =
      event.clientX - startX;

    const scrollMovement =
      (movement / maxThumbMove) * maxScroll;

    gallerySlider.scrollLeft =
      Math.max(
        0,
        Math.min(
          maxScroll,
          startScrollLeft + scrollMovement
        )
      );
  });


  thumb.addEventListener("pointerup", () => {
    dragging = false;
  });

  thumb.addEventListener("pointercancel", () => {
    dragging = false;
  });


  /* =========================
     CLICK ON BAR
  ========================= */

  scrollbar.addEventListener("pointerdown", (event) => {

    if (event.target === thumb) return;

    const rect =
      scrollbar.getBoundingClientRect();

    const thumbWidth =
      thumb.clientWidth;

    const maxThumbMove =
      scrollbar.clientWidth - thumbWidth;

    let position =
      event.clientX - rect.left - thumbWidth / 2;

    position =
      Math.max(0, Math.min(maxThumbMove, position));

    const progress =
      position / maxThumbMove;

    const maxScroll =
      gallerySlider.scrollWidth -
      gallerySlider.clientWidth;

    gallerySlider.scrollTo({
      left: progress * maxScroll,
      behavior: "smooth"
    });
  });


  updateThumb();
}

/* =========================
   MOBILE MENU
========================= */

const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

if (burger && mobileMenu) {

  burger.addEventListener("click", () => {

    const isOpen =
      mobileMenu.classList.toggle("active");

    burger.classList.toggle("active", isOpen);

    burger.setAttribute(
      "aria-expanded",
      isOpen
    );

    document.body.classList.toggle(
      "menu-open",
      isOpen
    );

  });


  /* zavření po kliknutí na navigaci */

  mobileLinks.forEach((link) => {

    link.addEventListener("click", () => {

      mobileMenu.classList.remove("active");
      burger.classList.remove("active");

      burger.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    });

  });

}