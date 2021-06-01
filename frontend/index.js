
// API
const url = "http://localhost:3000/api/cameras";

/*Appel de l'API*/

// convert in asyn function
// const getCams = async function () {
//     const response = await fetch(url);
//     return await response.json();
// }
// getCams();

const getCams = function () {
    return fetch (url)
    .then(function(response){
        return response.json()
    })
}
getCams();
/*##########################################################*/

/*LISTE INDEX*/
async function listeCams() {
    const cams = await getCams();
    console.log(cams);

    /*On vient cibler la balise section ayant l'id "Produits"*/
    let produits = document.getElementById("Produits");
    let listOfCam = "";
    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    cams.map((cam) => {
      listOfCam += `
      <div class="Block">
          <div class="B1">
            <img src= ${cam.imageUrl} alt="image du produit" class="Imageproduit">
          </div>
          <div class="B2">
                      <h2 class="Nomproduits">${cam.name}</h2>
                      <p class="Prixproduit">${cam.price}</p>
                      <a href="produit.html?id=${cam._id}" style="color: rgb(49, 49, 49); font-weight: bold;">En savoir plus ...</a>
          </div>
      </div>
      `
})
produits.innerHTML = listOfCam;
};
listeCams();