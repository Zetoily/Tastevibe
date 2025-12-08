// Scroll reveal animations
const onScrollReveal = () => {
  const elements = document.querySelectorAll(".reveal");
  const trigger = window.innerHeight * 0.85;
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < trigger) {
      el.classList.add("visible");
    }
  });
};

// Smooth scroll for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
};

// Parallax effect for hero section
const initParallax = () => {
  const heroVisual = document.querySelector(".hero-visual");
  const heroBubbles = document.querySelectorAll(".hero-bubble");
  
  if (heroVisual) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      
      if (heroBubbles.length > 0) {
        heroBubbles[0].style.transform = `translateY(${rate * 0.3}px)`;
        heroBubbles[1].style.transform = `translateY(${rate * 0.2}px)`;
      }
      
      if (scrolled < window.innerHeight) {
        heroVisual.style.transform = `translateY(${rate * 0.4}px)`;
      }
    });
  }
};

// Card hover effects with tilt
const initCardEffects = () => {
  const cards = document.querySelectorAll(".recipe-card, .feature-card");
  
  cards.forEach((card) => {
    card.addEventListener("mouseenter", (e) => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
    
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
};

// Image lazy loading with fade-in
const initLazyImages = () => {
  const images = document.querySelectorAll("img[data-src]");
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("fade-in");
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach((img) => imageObserver.observe(img));
};

// Image error handling with fallback
const initImageErrorHandling = () => {
  const images = document.querySelectorAll("img");
  const fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23e8f4ec' width='600' height='400'/%3E%3Ctext fill='%232f8d46' font-family='sans-serif' font-size='20' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3EFood Image%3C/text%3E%3C/svg%3E";
  
  images.forEach((img) => {
    img.addEventListener("error", function() {
      if (this.src !== fallbackImage) {
        this.src = fallbackImage;
        this.alt = "Image placeholder";
      }
    });
    
    // Add loading state
    img.addEventListener("load", function() {
      this.classList.add("loaded");
    });
  });
};

// Button ripple effect
const initRippleEffect = () => {
  const buttons = document.querySelectorAll(".btn");
  
  buttons.forEach((button) => {
    button.addEventListener("click", function(e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
};

// Search functionality
const initSearch = () => {
  const searchInput = document.querySelector(".search-bar input, #search");
  const recipeCards = document.querySelectorAll(".recipe-card");
  
  if (searchInput && recipeCards.length > 0) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      recipeCards.forEach((card) => {
        const title = card.querySelector("h3")?.textContent.toLowerCase() || "";
        const description = card.querySelector("p")?.textContent.toLowerCase() || "";
        
        if (title.includes(query) || description.includes(query)) {
          card.style.display = "";
          card.classList.add("search-match");
          setTimeout(() => card.classList.remove("search-match"), 300);
        } else {
          card.style.display = query === "" ? "" : "none";
        }
      });
    });
  }
};

// Filter functionality
const initFilters = () => {
  const filterBtn = document.querySelector(".filters .btn.primary");
  const categorySelect = document.getElementById("category");
  const timeSelect = document.getElementById("time");
  const recipeCards = document.querySelectorAll(".recipe-card");
  
  if (filterBtn && recipeCards.length > 0) {
    const applyFilters = () => {
      const category = categorySelect?.value || "All";
      const time = timeSelect?.value || "Any";
      
      recipeCards.forEach((card) => {
        let show = true;
        const pills = card.querySelectorAll(".pill");
        const timeText = Array.from(pills).find(p => p.textContent.includes("min"))?.textContent || "";
        
        // Category filter
        if (category !== "All") {
          const hasCategory = Array.from(pills).some(p => 
            p.textContent.toLowerCase().includes(category.toLowerCase())
          );
          if (!hasCategory) show = false;
        }
        
        // Time filter
        if (time !== "Any" && timeText) {
          const cardTime = parseInt(timeText) || 0;
          if (time === "0-15 min" && cardTime > 15) show = false;
          if (time === "15-30 min" && (cardTime <= 15 || cardTime > 30)) show = false;
          if (time === "30+ min" && cardTime <= 30) show = false;
        }
        
        if (show) {
          card.style.display = "";
          card.classList.add("filter-match");
          setTimeout(() => card.classList.remove("filter-match"), 300);
        } else {
          card.style.display = "none";
        }
      });
    };
    
    if (filterBtn) {
      filterBtn.addEventListener("click", applyFilters);
    }
    
    if (categorySelect) categorySelect.addEventListener("change", applyFilters);
    if (timeSelect) timeSelect.addEventListener("change", applyFilters);
  }
};

// Header scroll effect
const initHeaderScroll = () => {
  const header = document.querySelector(".site-header");
  let lastScroll = 0;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
    
    lastScroll = currentScroll;
  });
};

// Counter animation for stats
const initCounters = () => {
  const counters = document.querySelectorAll("[data-count]");
  
  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
};

// Initialize all effects
document.addEventListener("DOMContentLoaded", () => {
  onScrollReveal();
  window.addEventListener("scroll", onScrollReveal);
  initSmoothScroll();
  initParallax();
  initCardEffects();
  initLazyImages();
  initImageErrorHandling();
  initRippleEffect();
  initSearch();
  initFilters();
  initHeaderScroll();
  initCounters();
});
