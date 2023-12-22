/*variables*/
const gallery = document.querySelector(".gallery");

/* fonction pour retourner le tableau wroks*/
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();

/*affichage des works dans le DOM*/
async function displayWorks() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach(works => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = works.imageUrl;
        figcaption.textContent = works.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

displayWorks();