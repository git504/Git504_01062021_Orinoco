let btnAjouter = document.getElementById("Boutonpanier");
let divProduit = document.getElementById("Selectionproduit");
let nombreArticle = document.getElementById("Nombre");
let article = {};
let produit = {};
let articleExist = false;

/*PRODUIT SELECTIONNE INDEX*/

/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let camId = params.get("id");
// faisant ref au dossier routes -> camera.js -> router.get('/:id', cameraCtrl.getOneCamera);
console.log(camId);

let produitHtml = "";

const afficherProduit = async () => {
  try {
    let reponse = await fetch(`${getUrl()}/${camId}`);
    if (reponse.ok) {
      produit = await reponse.json();
      //console.log(produit.lenses);

      let lenses = "";

      article = {
        _id: produit._id,
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

// let panierBag = JSON.parse(localStorage.getItem("monPanier"));
// console.log(panierBag);
// if (panierBag === null) panierBag = [];

getPanierQuantity();

/*Ajouter un article au panier*/
function ajouterAuPanier() {
  const lenseIntoBag = document.getElementById("lentille");
  console.log(lenseIntoBag.value);
  //const lenseIntoBag = document.getElementById("lentille");
  alert(nombreArticle.value + " dans le panier ...");
  // intoBag.textContent = nombreArticle.value;

  article = {
    _id: produit._id,
    imgUrl: produit.imageUrl,
    name: produit.name,
    price: produit.price,
    description: produit.description,
    lense: lenseIntoBag.value,
    quantity: parseInt(nombreArticle.value),
  };
  // console.log(article);

  // panierBag est ds le localstorage lecture JSON
  panierBag.forEach((prod, index) => {
    if (prod.name == article.name && prod.lense == article.lense) {
      prod.quantity = prod.quantity + article.quantity;
      // localStorage.setItem("monPanier", JSON.stringify(panierBag));
      // location.reload();
      articleExist = true;
      console.log(index);
    }
  });

  if (articleExist == false) {
    panierBag.push(article);
  }

  localStorage.setItem("monPanier", JSON.stringify(panierBag));
  let panier = JSON.parse(localStorage.getItem("monPanier"));

  // ce code est rendu inutile grace a location reload
  // let somme = 0;
  // panier.forEach((produit) => {
  //   somme = somme + produit.quantity;
  // });
  // intoBag.textContent = somme;

  //pour mette a jour le cart
  location.reload();
  console.log(panier);
}
