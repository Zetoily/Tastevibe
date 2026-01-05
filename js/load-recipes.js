fetch('backend/get_recipes.php')
  .then(res => res.json())
  .then(recipes => {
    const grid = document.getElementById('recipesGrid');
    const empty = document.getElementById('emptyState');

    if (!recipes.length) {
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';

    recipes.forEach(r => {
      const card = document.createElement('article');
      card.className = 'recipe-card reveal';

      card.innerHTML = `
        ${r.image ? `<img src="${r.image}" alt="">` : ''}
        <div class="recipe-body">
          <div class="recipe-meta">
            ${r.category ? `<span class="pill highlight">${r.category}</span>` : ''}
            ${r.time ? `<span class="pill neutral">${r.time}</span>` : ''}
          </div>
          <h3>${r.title}</h3>
          <p>${r.steps.substring(0, 100)}...</p>
        </div>
      `;

      grid.appendChild(card);
    });
  });
