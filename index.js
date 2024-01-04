// Obtention des éléments de la galerie et des filtres
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
// Fonction pour obtenir les travaux
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

// L'affichage dans le DOM
async function displayWorks() {
  const worksArray = await getWorks();
  worksArray.forEach(work => {
    createWork(work);
  });
}

// Afficher les boutons de catégorie
async function showCategoriesButtons() {
  const categories = await getCategories();
  categories.forEach((category) => {
    const btn = document.createElement("button");
    btn.textContent = category.name.toUpperCase();
    btn.id = category.id;
    btn.className = "filtersbutton";
    filters.appendChild(btn);
  });
}

// Affichage des boutons de catégorie lors de l'initialisation
showCategoriesButtons();
// Fonction pour obtenir les catégories
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

// Le filtre fonctionne sur le clic de la catégorie
async function filterByCategory() {
  const works = await getWorks();
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(button => {
    button.addEventListener("click", (e) => {
      const btnID = e.target.id;
      gallery.innerHTML = "";
      if (btnID !== "0") {
        const worksFilteredByCategory = works.filter((work) => {
          return work.categoryId == btnID;
        });
        worksFilteredByCategory.forEach(work => {
          createWork(work);
        });
      } else {
       // Si le bouton "Tous" est cliqué, afficher tous les travaux
        works.forEach(work => {
          createWork(work);
        });
      }
    });
  });
}

// Le filtre fonctionne sur le clic de la catégorie lors de l'initialisation
filterByCategory();

// afficher les images au chargemement de la page
displayWorks();
// Fonction permettant de faire apparaître la gallerie 
function createWork(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}
