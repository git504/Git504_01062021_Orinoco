
// API
const url = "http://localhost:3000/api/cameras";
const urlOrder = "http://localhost:3000/api/cameras/order";

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

/*fonction création éléments, attribution*/
function create(type, Qualified, nomType){
    let nomVariable = document.createElement(type);
    nomVariable.setAttribute(Qualified, nomType);
    return nomVariable;
}

/*LISTE INDEX*/
async function listeCams() {
    const cams = await getCams();

    /*On vient cibler la balise section ayant l'id "Produits"*/
    let produits = document.getElementById("Produits");

    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    cams.forEach((cameras) => {
        /*Utilisation de la fonction Create*/
        let produitContainer = create("div", "class", "Block");
        let produitB1 = create("div", "class", "B1");
        let produitB2 = create("div", "class", "B2");
        let produitNom = create("h2", "class", "Nomproduits");
        let produitLien = create("a", "href", "produit.html?id=" + cameras._id);
        let produitPrix = create("p", "class", "Prixproduit");
        let produitImage = create("img", "src", cameras.imageUrl);

    /*Attributs suplémentaires*/
        produitImage.setAttribute("alt", "image du produit");
        produitImage.setAttribute("class", "Imageproduit");
        
    /*Hiérarchisation des élements crées*/ 
        produits.appendChild(produitContainer);
        produitContainer.appendChild(produitB1);
        produitContainer.appendChild(produitB2);
        produitB1.appendChild(produitImage);
        produitB2.appendChild(produitNom);
        produitB2.appendChild(produitPrix);
        produitB2.appendChild(produitLien);

    /*Attribution des données aux élements créees*/
        produitNom.textContent = cameras.name;
        produitPrix.textContent = cameras.price / 100 + " " + "euros";
        produitLien.textContent = "En savoir plus ...";
        produitLien.style.color = "#313131";
        produitLien.style.fontWeight = "bold";
    });
};
listeCams();

