const slider = document.querySelector(".hero-slider");

if (slider) {
  const slides = slider.querySelectorAll(".slide");
  let index = 0;

  const showSlide = (i) => {
    slides.forEach((slide, idx) => {
      slide.style.opacity = idx === i ? "1" : "0";
      slide.style.zIndex = idx === i ? "1" : "0";
    });
  };

  showSlide(index);

  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 4000);
}

