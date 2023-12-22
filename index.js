// Obtention de l'élément de la galerie et des filtres
const galerie = document.querySelector(".gallery");
const filtres = document.querySelector(".filters");

// Fonction pour obtenir les travaux
async function obtenirTravaux() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

// Affichage des travaux dans le DOM
async function afficherTravaux() {
  const tableauTravaux = await obtenirTravaux();
  tableauTravaux.forEach(travail => {
    creerTravail(travail);
  });
}

// Affichage des boutons de catégorie
async function afficherBoutonsCategories() {
  const categories = await obtenirCategories();
  categories.forEach((categorie) => {
    const btn = document.createElement("button")
    btn.textContent = categorie.name.toUpperCase();
    btn.id = categorie.id;
    btn.className = "filtersbutton";
    filtres.appendChild(btn);
  });
}

// Affichage des boutons de catégorie lors de l'initialisation
afficherBoutonsCategories();

// Fonction pour obtenir les catégories
async function obtenirCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

// Filtrer les travaux au clic sur les catégories
async function filtrerParCategorie() {
    const travaux = await obtenirTravaux();
    const boutons = document.querySelectorAll(".filters button");
    boutons.forEach(bouton => {
      bouton.addEventListener("click", (e) => {
        const btnID = e.target.id;
        galerie.innerHTML = "";
        if (btnID !== "0") {
          const travauxTriParCategorie = travaux.filter((travail) => {
            return travail.categoryId == btnID;
          });
          travauxTriParCategorie.forEach(travail => {
            creerTravail(travail);
          });
        } else {
          // Si le bouton "Tous" est cliqué, afficher tous les travaux
          travaux.forEach(travail => {
            creerTravail(travail);
          });
        }
      });
    });
  }

// Filtrer les travaux au clic sur les catégories lors de l'initialisation
filtrerParCategorie();


// Afficher tous les travaux lors du chargement de la page
afficherTravaux();

// Fonction pour créer un élément de travail dans le DOM
function creerTravail(travail) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = travail.imageUrl;
  figcaption.textContent = travail.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  galerie.appendChild(figure);
}