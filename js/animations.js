// Advanced animations and visual effects

// Stagger animation for cards
const initStaggerAnimation = () => {
  const cards = document.querySelectorAll(".recipe-card, .feature-card");
  
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add("stagger-animate");
  });
};

// Pulse effect for buttons
const initPulseButtons = () => {
  const primaryButtons = document.querySelectorAll(".btn.primary");
  
  primaryButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", function() {
      this.style.animation = "pulse 1s ease-in-out infinite";
    });
    
    btn.addEventListener("mouseleave", function() {
      this.style.animation = "";
    });
  });
};

// Floating animation for hero elements
const initHeroFloating = () => {
  const heroImage = document.querySelector(".hero-image");
  const heroBubbles = document.querySelectorAll(".hero-bubble");
  
  if (heroImage) {
    setInterval(() => {
      heroImage.style.transform = `translateY(${Math.sin(Date.now() / 2000) * 10}px)`;
    }, 50);
  }
  
  heroBubbles.forEach((bubble, index) => {
    setInterval(() => {
      const offset = index === 0 ? 15 : 10;
      bubble.style.transform = `translateY(${Math.sin(Date.now() / 3000 + index) * offset}px)`;
    }, 50);
  });
};

// Image zoom on hover
const initImageZoom = () => {
  const images = document.querySelectorAll(".recipe-card img");
  
  images.forEach((img) => {
    img.parentElement.addEventListener("mouseenter", function() {
      img.style.transform = "scale(1.1)";
      img.style.transition = "transform 0.4s ease";
    });
    
    img.parentElement.addEventListener("mouseleave", function() {
      img.style.transform = "scale(1)";
    });
  });
};

// Shine effect on cards
const initShineEffect = () => {
  const cards = document.querySelectorAll(".recipe-card, .feature-card");
  
  cards.forEach((card) => {
    card.addEventListener("mousemove", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI;
      
      this.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.1) 0%, transparent 50%)`;
    });
    
    card.addEventListener("mouseleave", function() {
      this.style.background = "";
    });
  });
};

// Counter animation for stats
const animateValue = (element, start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

// Scroll progress indicator
const initScrollProgress = () => {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--green-600), var(--green-500));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
};

// Typing effect for hero title
const initTypingEffect = () => {
  const heroTitle = document.querySelector(".hero-copy h1");
  if (!heroTitle) return;
  
  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.borderRight = "3px solid var(--green-600)";
  heroTitle.style.animation = "blink 1s infinite";
  
  let i = 0;
  const type = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    } else {
      setTimeout(() => {
        heroTitle.style.borderRight = "none";
        heroTitle.style.animation = "";
      }, 500);
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setTimeout(type, 500);
      observer.unobserve(heroTitle);
    }
  });
  
  observer.observe(heroTitle);
};

// Glow effect on hover
const initGlowEffect = () => {
  const cards = document.querySelectorAll(".recipe-card");
  
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function() {
      this.style.boxShadow = "0 20px 60px rgba(47, 141, 70, 0.3)";
    });
    
    card.addEventListener("mouseleave", function() {
      this.style.boxShadow = "";
    });
  });
};

// Initialize all animations
document.addEventListener("DOMContentLoaded", () => {
  initStaggerAnimation();
  initPulseButtons();
  initHeroFloating();
  initImageZoom();
  initShineEffect();
  initScrollProgress();
  // initTypingEffect(); // Uncomment if you want typing effect
  initGlowEffect();
});

