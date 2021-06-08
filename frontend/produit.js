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
      console.log(produit.lenses);
      let lenses = "";
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

// async function selectionProduit() {
//     await fetch(url + "/" + camId).then((response) => {
// let produit = reponse.json();

//         /*On vient cibler la balise div ayant pour id Selectionproduit*/
//         let produitOneByOne = document.getElementById("Selectionproduit");//On stock les données du produit dans cette variable.

//         /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
//         cams.map((cam) => {
//           produitOneByOne = `
//                             <label for="lentille">Type de lentille :</label><br>
//                             <select name="lentille" id="lentille">
//                                 <option value="Type de lentille">${cam.lenses}</option>
//                             </select>
//                             <div id="Descriptionproduit">
//                                 <div class="Blockdescription">
//                                     <div class="B1description">
//                                         <img src= ${cam.imageUrl} alt="Photographie de l'appareil." class="Imagedescription">
//                                     </div>
//                                     <div class="B2description">
//                                         <h2 class="Nomdescription">${cam.name}</h2>
//                                         <p class="Prixdescription">${cam.price}</p>
//                                         <p class="Descriptionproduit">${cam.description}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             `
//             }
//         )
//     });
// }

// selectionProduit.innerHTML = produitOneByOne;

// selectionProduit();

// //On stock le panier dans cette variable
// let panier = JSON.parse(localStorage.getItem("monPanier"));

// /*Ajouter un article au panier*/
// function ajouterAuPanier(){
//     const bouton = document.getElementById("Boutonpanier");
//     bouton.addEventListener("click", async function(){
//         panier.push(produitOneByOne);
//         localStorage.setItem("monPanier", JSON.stringify(panier));
//         alert("l'article est dans votre Bag ;-)")
//         location.reload();
//     });
// };
// ajouterAuPanier();
