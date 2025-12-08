// Additional visual effects

// Floating animation for icons
const initFloatingIcons = () => {
  const icons = document.querySelectorAll(".icon");
  
  icons.forEach((icon, index) => {
    icon.style.animation = `float 3s ease-in-out infinite`;
    icon.style.animationDelay = `${index * 0.2}s`;
  });
};

// Gradient animation for CTA section
const initGradientAnimation = () => {
  const ctaCard = document.querySelector(".cta-card");
  
  if (ctaCard) {
    let hue = 0;
    setInterval(() => {
      hue = (hue + 1) % 360;
      ctaCard.style.background = `linear-gradient(135deg, hsl(${hue}, 30%, 95%), hsl(${(hue + 60) % 360}, 25%, 92%))`;
    }, 50);
  }
};

// Typewriter effect for hero title (optional)
const initTypewriter = () => {
  const titleElement = document.querySelector(".hero-copy h1");
  if (!titleElement) return;
  
  const text = titleElement.textContent;
  titleElement.textContent = "";
  titleElement.style.borderRight = "2px solid var(--green-600)";
  
  let i = 0;
  const type = () => {
    if (i < text.length) {
      titleElement.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    } else {
      setTimeout(() => {
        titleElement.style.borderRight = "none";
      }, 500);
    }
  };
  
  // Only run if element is visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      type();
      observer.unobserve(titleElement);
    }
  });
  
  observer.observe(titleElement);
};

// Particle effect for hero (lightweight)
const initParticles = () => {
  const heroSection = document.querySelector(".hero-visual");
  if (!heroSection) return;
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--green-500);
      border-radius: 50%;
      opacity: 0.3;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: float ${3 + Math.random() * 2}s ease-in-out infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    heroSection.appendChild(particle);
  }
};

// Initialize additional effects
document.addEventListener("DOMContentLoaded", () => {
  initFloatingIcons();
  // initGradientAnimation(); // Uncomment if you want animated gradient
  // initTypewriter(); // Uncomment if you want typewriter effect
  // initParticles(); // Uncomment if you want particles
});

