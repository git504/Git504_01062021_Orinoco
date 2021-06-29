getPanierQuantity();

//------
// FETCH APPEL DE l’API (*plan test)
//------

// Promise pour afficher array + objet
// fetch("monlien").then((res) => res);
const getCams = function () {
  return fetch(getUrl()).then(function (response) {
    return response.json();
  });
};
getCams();
console.log(getCams());

//------
// ----- AFFICHER LA LISTE DES CAMERAS (*plan test)
//------
async function listeCams() {
  const cams = await getCams();
  // console.log(cams);
  // attend que le await soit exécuté avant de faire la suite

  // On vient cibler la balise section ayant l'id "Produits"
  let produits = document.getElementById("Produits");
  let listOfCam = "";

  // On crée l'affichage de la liste des produits proposés qui sera présente sur l'index avec la méthode map.
  cams.map((cam) => {
    listOfCam += `
      <div class="Block">
          <div class="B1">
            <img src= ${
              cam.imageUrl
            } alt="image du produit" class="Imageproduit">
          </div>
          <div class="B2">
                      <h2 class="Nomproduits">${cam.name}</h2>
                      <p class="Prixproduit">${cam.price / 100} &#8364;</p>
                      <a href="produit.html?id=${
                        cam._id
                      }" style="color: rgb(49, 49, 49); font-weight: bold;">En savoir plus ...</a>
          </div>
      </div>
      `;
  });
  produits.innerHTML = listOfCam;
}
listeCams();
