let btnAjouter = document.getElementById("Boutonpanier");
let divProduit = document.getElementById("Selectionproduit");
let nombreArticle = document.getElementById("Nombre");
let intoBag = document.getElementById("Numberarticle");
let article = {};
let produit = {};

/*PRODUIT SELECTIONNE INDEX*/
// const url = "http://localhost:3000/api/cameras";

/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let camId = params.get("id");
// console.log(camId);
let produitHtml = "";

const afficherProduit = async () => {
  try {
    let reponse = await fetch(`${getUrl()}/${camId}`);
    if (reponse.ok) {
      produit = await reponse.json();
      //console.log(produit.lenses);

      let lenses = "";

      article = {
        imgUrl: produit.imageUrl,
        name: produit.name,
        price: produit.price,
        description: produit.description,
        lense: null,
        quantity: 0,
      };

      //Boucle avec méthode forEach pour implémenter une  liste 'déroulante'
      produit.lenses.forEach((lense) => {
        lenses += `                               
            <option value="${lense}">${lense}</option>
            `;
      });

      produitHtml = `
                                 <label for="lentille">Type de lentille :</label><br>
                                <select name="lentille" id="lentille">
                               ${lenses}
                                 </select>
                                 <div id="Descriptionproduit">
                                     <div class="Blockdescription">
                                         <div class="B1description">
                                             <img src= ${produit.imageUrl} alt="Photographie de l'appareil." class="Imagedescription">
                                        </div>
                                     <div class="B2description">
                                            <h2 class="Nomdescription">${produit.name}</h2>
                                             <p class="Prixdescription">${produit.price}</p>
                                            <p class="Descriptionproduit">${produit.description}</p>
                                        </div>
                                    </div>
                                </div>
                                 `;
    }
    divProduit.innerHTML = produitHtml;
  } catch (error) {
    console.log(error);
  }
};
afficherProduit();

//On stock le panier dans cette variable
let panier = [];
//console.log(panier);
// panier = JSON.parse(localStorage.getItem("monPanier"));
console.log(panier);

/*Ajouter un article au panier*/
function ajouterAuPanier() {
  const lenseIntoBag = document.getElementById("lentille");
  console.log(lenseIntoBag.value);
  //const lenseIntoBag = document.getElementById("lentille");
  alert(nombreArticle.value + " dans le panier ...");
 // intoBag.textContent = nombreArticle.value;

  article = {
    imgUrl: produit.imageUrl,
    name: produit.name,
    price: produit.price,
    description: produit.description,
    lense: lenseIntoBag.value,
    quantity: parseInt(nombreArticle.value),
  };
  console.log(article);

  panier.push(article);
  console.log(article);

  localStorage.setItem("monPanier", JSON.stringify(panier));
  // location.reload();
  console.log(panier);
}

