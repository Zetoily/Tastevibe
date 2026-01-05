fetch('/backend/profile.php')
  .then(r => {
    if (r.status === 401) location.href = '/login.html'
    return r.json()
  })
  .then(u => {
    document.getElementById('user-info').innerHTML = `
      <p><b>Username:</b> ${u.username}</p>
      <p><b>Email:</b> ${u.email}</p>
      <p><b>Member since:</b> ${u.created_at}</p>
    `
  })

fetch('/backend/api/my_recipes.php')
  .then(r => r.json())
  .then(recipes => {
    const grid = document.getElementById('recipes')
    grid.innerHTML = ''

    recipes.forEach(r => {
      grid.innerHTML += `
        <div class="recipe-card">
          <img src="${r.image || 'img/placeholder.jpg'}">
          <div class="recipe-content">
            <h3>${r.title}</h3>
            <div class="recipe-meta">
              ⏱ ${r.cooking_time} min
            </div>
          </div>
          <div class="recipe-actions">
            <a href="edit.html?id=${r.id}" class="btn-outline">Edit</a>
            <button class="btn-danger" onclick="deleteRecipe(${r.id})">
              Delete
            </button>
          </div>
        </div>
      `
    })
  })

function deleteRecipe(id) {
  if (!confirm('Delete recipe?')) return
  fetch('/backend/delete_recipe.php?id=' + id)
    .then(() => location.reload())
}

document.getElementById('logout').onclick = () => {
  fetch('/backend/logout.php')
    .then(() => location.href = '/index.html')
}
