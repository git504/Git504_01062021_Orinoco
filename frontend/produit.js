let divProduit = document.getElementById("Selectionproduit");

/*PRODUIT SELECTIONNE INDEX*/
const url = "http://localhost:3000/api/cameras";

/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let camId = params.get("id");
// console.log(camId);
let produitHtml = "";

const afficherProduit = async () => {
  try {
    let reponse = await fetch(`http://localhost:3000/api/cameras/${camId}`);
    if (reponse.ok) {
      let produit = await reponse.json();
      //console.log(produit.lenses);
      let lenses = "";

      //Boucle avec méthode forEach pour implémenter une  liste 'déroulante'
      produit.lenses.forEach((lense) => {
        lenses += `                               
            <option value="Type de lentille">${lense}</option>
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
let panier = JSON.parse(localStorage.getItem("monPanier"));

/*Ajouter un article au panier*/
function ajouterAuPanier() {
  const bouton = document.getElementById("Boutonpanier");
  bouton.addEventListener("click", async function () {
    panier.push(produitHtml);
    localStorage.setItem("monPanier", JSON.stringify(panier));
    alert("l'article est dans votre Bag ;-)");
    location.reload();
  });
}
ajouterAuPanier();
