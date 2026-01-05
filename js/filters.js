// Make script robust: wait for DOM and guard selectors
console.log("Filters JS loaded");

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.filters .btn');
  if (btn) {
    btn.addEventListener('click', () => {
      console.log('Filter button clicked');
    });
    btn.addEventListener('click', applyFilters);
  } else {
    console.debug('Filter button not found on this page');
  }

  const searchInput = document.querySelector('#search');
  if (searchInput) searchInput.addEventListener('input', applyFilters);
});

async function applyFilters() {
  const searchEl = document.querySelector('#search');
  const categoryEl = document.querySelector('#category');
  const timeEl = document.querySelector('#time');

  const search = (searchEl?.value || '').trim();
  const category = (categoryEl?.value) || 'All';
  const time = (timeEl?.value) || 'Any';

  let prep_time = 0;
  if (time === '0-15 min') prep_time = 15;
  else if (time === '15-30 min') prep_time = 30;
  else if (time === '30+ min') prep_time = 1000;

  const url = new URL('backend/get_recipes.php', window.location.href);
  if (search) url.searchParams.append('title', search);
  if (category !== 'All') url.searchParams.append('category', category);
  if (prep_time > 0) url.searchParams.append('prep_time', prep_time);

  try {
    console.debug('Fetching', url.toString());
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const recipes = await res.json();
    console.debug('Fetch success, received', Array.isArray(recipes) ? recipes.length : typeof recipes);
    displayRecipes(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    if (typeof showToast === 'function') showToast('Error loading recipes');
  }
}

function displayRecipes(recipes) {
  const container = document.querySelector('.recipe-grid');
  if (!container) return;
  container.innerHTML = '';

  if (!Array.isArray(recipes) || recipes.length === 0) {
    container.innerHTML = '<p>No recipes found.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card reveal';

    const imgSrc = recipe.image || 'https://via.placeholder.com/600x400';
    const timeText = recipe.prep_time ? recipe.prep_time + ' min' : '';

    card.innerHTML = `
      <img src="${imgSrc}" alt="${recipe.title || ''}" loading="lazy">
      <div class="recipe-body">
        <div class="recipe-meta">
          <span class="pill highlight">${recipe.category || ''}</span>
          <span class="pill neutral">${timeText}</span>
        </div>
        <h3>${recipe.title || ''}</h3>
        <p>${recipe.ingredients || ''}</p>
        <a class="btn text" href="#">View recipe</a>
      </div>
    `;

    container.appendChild(card);
  });
}


  if (typeof window.applyRecipeFilters === 'function') window.applyRecipeFilters();

