let btnAjouter = document.getElementById("Boutonpanier");
let divProduit = document.getElementById("Selectionproduit");
let nombreArticle = document.getElementById("Nombre");
let alertAjoutpanier = document.querySelector(".ajoutpanierok");
let messageSuccess = document.querySelector(".alert.alert-success");
let article = {};
let produit = {};
let articleExist = false;

//------
// ----- PRODUIT SELECTIONNE PAR ID API (*plan test)
//------

// camId faisant REF. a backend/routes/camera.js -> router.get('/:id', cameraCtrl.getOneCamera);
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

      //Liste 'déroulante' forEach produit.lense
      produit.lenses.forEach((lense) => {
        lenses += `                               
            <option value="${lense}">${lense}</option>
            `;
      });

      //Présentation du produit
      produitHtml = `
                                 <label for="lentille">Type de lentille :</label><br>
                                <select name="lentille" id="lentille">
                               ${lenses}
                                 </select>
                                 <div id="Descriptionproduit">
                                     <div class="Blockdescription">
                                         <div class="B1description">
                                             <img src= ${
                                               produit.imageUrl
                                             } alt="Photographie de l'appareil." class="Imagedescription">
                                        </div>
                                     <div class="B2description">
                                            <h2 class="Nomdescription">${
                                              produit.name
                                            }</h2>
                                             <p class="Prixdescription"><span id="prixQuantity">${
                                               produit.price / 100
                                             } </span>&#8364;</p>
                                            <p class="Descriptionproduit">${
                                              produit.description
                                            }</p>
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

function selectNbreArticle() {
  prixQuantity.innerHTML = nombreArticle.value * (produit.price / 100);
}

function ajouterAuPanier() {
  const lenseIntoBag = document.getElementById("lentille");
  console.log(lenseIntoBag.value);
  //const lenseIntoBag = document.getElementById("lentille");
  //alert("👍 " + nombreArticle.value + " dans le panier ...");
  messageSuccess.style.display = "block";
  alertAjoutpanier.innerHTML = "👍 " + nombreArticle.value + " dans le panier ..."
  // intoBag.textContent = nombreArticle.value;

  article = {
    _id: produit._id,
    imgUrl: produit.imageUrl,
    name: produit.name,
    price: produit.price * parseInt(nombreArticle.value),
    description: produit.description,
    lense: lenseIntoBag.value,
    quantity: parseInt(nombreArticle.value),
  };
  // console.log(article);

  //------
  // ----- CHOIX DE LA LENTILLE (*plan test)
  //------

  // "panierBag" est dans le "localstorage" en 'JSON', l'objectif est de ne pas créer un objet supplémentaire pour un article identique : '_id' && 'lense'.
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

  //------
  // ----- METTRE A JOUR LE PANIER
  //------
  location.reload();
  console.log(panier);
}
