let btnAjouter = document.getElementById("Boutonpanier");
let divProduit = document.getElementById("Selectionproduit");
let nombreArticle = document.getElementById("Nombre");
let article = {};
let produit = {};
let articleExist = false;

//------
// ----- PRODUIT SELECTIONNE INDEX (*plan test)
//------

// Création de la variable contenant l'id faisant REF. au dossier backend/routes/camera.js -> router.get('/:id', cameraCtrl.getOneCamera);
const params = new URLSearchParams(window.location.search);
let camId = params.get("id");
console.log(camId);

//------
// ----- AFFICHER LE PRODUIT (*plan test)
//------
let produitHtml = "";

const afficherProduit = async () => {
  try {
    let reponse = await fetch(`${getUrl()}/${camId}`);
    if (reponse.ok) {
      produit = await reponse.json();
      console.log(produit);

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
      console.log(article);

      //------
      // ----- CHOIX DES LENTILLES (*plan test)
      //------

      //Boucle forEach pour implémenter une  liste 'déroulante'
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

//------
// ----- AJOUTER UN PRODUIT AU PANIER (*plan test)
//------
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

  //------
  // ----- CHOIX DE LA LENTILLE (*plan test)
  //------

  // 'panierBag' est dans le 'localstorage' en 'JSON', l'objectif est de ne pas créer un objet supplémentaire pour un article identique '_id' avec une même lentille 'lense'.
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

  // Il faut passer des chaines de caractères
  localStorage.setItem("monPanier", JSON.stringify(panierBag));
  let panier = JSON.parse(localStorage.getItem("monPanier"));

  // ce code est rendu inutile grace a location reload
  // let somme = 0;
  // panier.forEach((produit) => {
  //   somme = somme + produit.quantity;
  // });
  // intoBag.textContent = somme;

  //------
  // ----- METTRE A JOUR LE PANIER
  //------
  location.reload();
  console.log(panier);
}
