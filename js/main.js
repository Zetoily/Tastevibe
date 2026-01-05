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
      
  
    // Shared filter implementation used by search + controls
    const applyFilters = () => {
      const recipeNodes = document.querySelectorAll('.recipe-card, .recipe-detail');
      if (recipeNodes.length === 0) return;
      const category = categorySelect?.value || 'All';
      const time = timeSelect?.value || 'Any';
      const query = (document.querySelector('.search-bar input, #search')?.value || '').toLowerCase().trim();

      recipeNodes.forEach((node) => {
        let show = true;

        // Text match (title + description)
        const title = (node.querySelector('h3, h1')?.textContent || '').toLowerCase();
        const desc = (node.querySelector('.lead, p')?.textContent || '').toLowerCase();
        if (query) {
          if (!(title.includes(query) || desc.includes(query))) show = false;
        }

        const pills = node.querySelectorAll('.pill');
        const timeText = Array.from(pills).find(p => p.textContent.includes('min'))?.textContent || '';

        // Category filter
        if (category !== 'All') {
          const hasCategory = Array.from(pills).some(p => p.textContent.toLowerCase().includes(category.toLowerCase()));
          if (!hasCategory) show = false;
        }

        // Time filter
        if (time !== 'Any' && timeText) {
          const cardTime = parseInt(timeText) || 0;
          if (time === '0-15 min' && cardTime > 15) show = false;
          if (time === '15-30 min' && (cardTime <= 15 || cardTime > 30)) show = false;
          if (time === '30+ min' && cardTime <= 30) show = false;
        }

        if (show) {
          node.style.display = '';
          node.classList.add('filter-match');
          setTimeout(() => node.classList.remove('filter-match'), 300);
        } else {
          node.style.display = 'none';
        }
      });
    };

    if (filterBtn) filterBtn.addEventListener('click', applyFilters);
    if (categorySelect) categorySelect.addEventListener('change', applyFilters);
    if (timeSelect) timeSelect.addEventListener('change', applyFilters);

    // expose for other modules (search)
    window.applyRecipeFilters = applyFilters;
  
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
});

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
  // ensure ripple elements don't interfere with modal button clicks
  buttons.forEach(btn => btn.style.position = btn.style.position || 'relative');
};

// Search functionality
const initSearch = () => {
  const searchInput = document.querySelector(".search-bar input, #search");
  
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      if (typeof window.applyRecipeFilters === 'function') window.applyRecipeFilters();
    });
  }
};

// Filter functionality
const initFilters = () => {
  const filterBtn = document.querySelector(".filters .btn.primary");
  const categorySelect = document.getElementById("category");
  const timeSelect = document.getElementById("time");
  
  const applyFilters = () => {
    const recipeCards = document.querySelectorAll(".recipe-card");
    if (recipeCards.length === 0) return;
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
  window.RecipeDB?.ensureSeeded?.();
  renderUserRecipes();
  loadServerGrid();
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
  initModals();
  initRecipeForms();
});

// Show a quick toast message
function showToast(message) {
  const msg = document.createElement("div");
  msg.className = "toast";
  msg.textContent = message;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2400);
}

// Modal handling: open/close in-page dialogs
function initModals() {
  const openers = document.querySelectorAll('[data-modal]');
  const dialogs = document.querySelectorAll('dialog');
  console.log('initModals: running', {openers: openers.length, dialogs: dialogs.length});

  const openModal = (selector) => {
    const dlg = document.querySelector(selector);
    if (!dlg) return;
    try {
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', '');
      dlg.querySelector('input, textarea, select')?.focus();
    } catch (err) {
      // fallback: add visible class
      dlg.setAttribute('open', '');
    }
  };

  const closeModal = (dlg) => {
    if (!dlg) return;
    try {
      if (typeof dlg.close === 'function') dlg.close();
      else dlg.removeAttribute('open');
    } catch (err) {
      dlg.removeAttribute('open');
    }
  };

  openers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const selector = btn.dataset.modal;
      console.log('modal opener clicked', {selector});
      if (!selector) return;
      e.preventDefault();
      openModal(selector);
    });
  });

  dialogs.forEach((dlg) => {
    // clicking on backdrop area (dialog element itself) should close
    dlg.addEventListener('click', (e) => {
      if (e.target === dlg) {
        console.log('dialog backdrop click, closing', dlg.id);
        closeModal(dlg);
      }
    });
    const closers = dlg.querySelectorAll('.close, .modal-close');
    console.log('dialog closers found', {id: dlg.id, count: closers.length});
    closers.forEach((btn) => btn.addEventListener('click', () => closeModal(dlg)));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dialogs.forEach((dlg) => closeModal(dlg));
  });

  // Prevent real submission for demo; show a simple confirmation and close
  const forms = document.querySelectorAll('#loginForm, #signupForm, #communityForm');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const backdrop = form.closest('.modal-backdrop');
      closeModal(backdrop);
      // small confirmation (could be replaced by real handling)
      showToast('Thanks! (This is a frontend demo)');
    });
  });
};

// Render user/local recipes into any section that declares data-user-recipes
function renderUserRecipes() {
  if (!window.RecipeDB) return;
  const sections = document.querySelectorAll("[data-user-recipes]");
  if (sections.length === 0) return;

  const recipes = window.RecipeDB.getAll();

  sections.forEach((section) => {
    const grid = section.querySelector("[data-recipes-grid]");
    const empty = section.querySelector("[data-empty-state]");
    if (!grid) return;

    grid.innerHTML = "";

    if (!recipes || recipes.length === 0) {
      if (empty) empty.style.display = "";
      return;
    }

    if (empty) empty.style.display = "none";

    recipes.forEach((recipe) => {
      const card = document.createElement("article");
      card.className = "recipe-card reveal user-recipe";

      const img = document.createElement("img");
      img.loading = "lazy";
      img.src = recipe.image || "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop";
      img.alt = recipe.title || "Recipe photo";

      const body = document.createElement("div");
      body.className = "recipe-body";

      const meta = document.createElement("div");
      meta.className = "recipe-meta";

      const category = document.createElement("span");
      category.className = "pill success";
      category.textContent = recipe.category || "Recipe";
      meta.appendChild(category);

      if (recipe.time) {
        const time = document.createElement("span");
        time.className = "pill neutral";
        time.textContent = recipe.time;
        meta.appendChild(time);
      }

      const title = document.createElement("h3");
      title.textContent = recipe.title || "Untitled recipe";

      const desc = document.createElement("p");
      desc.textContent = recipe.description || "Shared recipe";

      const ing = document.createElement("p");
      ing.className = "muted";
      const ingPreview = (recipe.ingredients || []).slice(0, 3).join(", ");
      ing.textContent = ingPreview ? `Ingredients: ${ingPreview}${(recipe.ingredients || []).length > 3 ? "…" : ""}` : "Ingredients: added by author";

      const steps = document.createElement("p");
      steps.className = "muted";
      const stepsPreview = (recipe.steps || []).slice(0, 2).join(" → ");
      steps.textContent = stepsPreview ? `Steps: ${stepsPreview}${(recipe.steps || []).length > 2 ? "…" : ""}` : "Steps: provided by author";

      const saved = document.createElement("p");
      saved.className = "muted";
      saved.textContent = recipe.source === "seed" ? "Sample recipe (local)" : "Saved locally on this device";

      body.appendChild(meta);
      body.appendChild(title);
      body.appendChild(desc);
      body.appendChild(ing);
      body.appendChild(steps);
      body.appendChild(saved);

      card.appendChild(img);
      card.appendChild(body);

      grid.appendChild(card);
    });
  });

  onScrollReveal();
}

// Hook up recipe forms (modal + dedicated page) to local storage
function initRecipeForms() {
  if (!window.RecipeDB) return;
  const forms = document.querySelectorAll("[data-recipe-form], #addRecipeForm");
  if (forms.length === 0) return;

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const title = (data.get("title") || "").trim();

      if (!title) {
        showToast("Please add a recipe title");
        return;
      }

      const recipe = {
        title,
        description: (data.get("description") || data.get("summary") || "").trim(),
        image: (data.get("image") || "").trim(),
        time: (data.get("time") || "").trim(),
        category: (data.get("category") || "").trim() || "Homemade",
        servings: (data.get("servings") || "").trim(),
        ingredients: (data.get("ingredients") || "").trim(),
        steps: (data.get("steps") || "").trim(),
        source: "user"
      };

      window.RecipeDB.add(recipe);
      renderUserRecipes();
      form.reset();

      const dialog = form.closest("dialog");
      if (dialog) {
        try {
          dialog.close();
        } catch (err) {
          dialog.removeAttribute("open");
        }
      }

      showToast("Recipe saved locally");

      const redirectTarget = form.dataset.redirect;
      if (redirectTarget) {
        setTimeout(() => {
          window.location.href = redirectTarget;
        }, 300);
      }
    });
  });
};
