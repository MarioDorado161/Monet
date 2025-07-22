const searchInput = document.getElementById("searchInput");
const docList = document.getElementById("docList");
const sidebar = document.getElementById("sidebar");

function createSidebar(data) {
  sidebar.innerHTML = '';
  data.forEach(section => {
    const category = document.createElement("div");
    category.className = "category";
    category.textContent = section.title;

    const ul = document.createElement("ul");
    section.items.forEach(item => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#";
      a.textContent = item.name;
      a.onclick = () => renderContent(section.title, item.name);
      li.appendChild(a);
      ul.appendChild(li);
    });

    category.onclick = () => ul.classList.toggle("visible");

    sidebar.appendChild(category);
    sidebar.appendChild(ul);
  });
}

function renderContent(category, title) {
  docList.innerHTML = '';
  const article = document.createElement("div");
  article.className = "article";
  article.innerHTML = `<h2>${title}</h2><p>Contenido de "${title}" en la categoría "${category}".</p>`;
  docList.appendChild(article);
}

function filterDocs(query) {
  const lowerQuery = query.toLowerCase();

  // Filtrar secciones y temas coincidentes
  const filtered = docData
    .map(section => ({
      title: section.title,
      items: section.items.filter(item =>
        item.name.toLowerCase().includes(lowerQuery)
      ),
    }))
    .filter(section => section.items.length > 0);

  // Actualizar sidebar (opcional si quieres ocultar los que no coinciden)
  createSidebar(filtered);

  // Mostrar resultados directamente como artículos
  docList.innerHTML = '';

  if (query === '') {
    docList.innerHTML = '<p>Selecciona un tema desde la barra lateral o filtra por buscador</p>';
    return;
  }

  filtered.forEach(section => {
    section.items.forEach(item => {
      const article = document.createElement("div");
      article.className = "article";
      article.innerHTML = `<h2>${item.name}</h2><p>Contenido de "${item.name}" en la categoría "${section.title}".</p>`;
      docList.appendChild(article);
    });
  });
}

searchInput.addEventListener("input", e => {
  filterDocs(e.target.value);
});

createSidebar(docData);
docList.innerHTML = '<p>Selecciona un tema desde la barra lateral o filtra desde el buscador.</p>';


