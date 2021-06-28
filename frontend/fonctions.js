// fucntions communes

let intoBag = document.getElementById("Numberarticle");
let panierBag;

function getUrl() {
  return "http://localhost:3000/api/cameras";
}

//affiche la qté ds le localestorage - en dehors de tt scope; fonctionne grace location reload
function getPanierQuantity() {
  panierBag = JSON.parse(localStorage.getItem("monPanier"));
  console.log(panierBag);
  if (panierBag === null) panierBag = [];
  let somme = 0;
  panierBag.forEach((produit) => {
    somme = somme + produit.quantity;
  });
  intoBag.textContent = somme;
}

function inputRegex(text) {
  return /^[A-Za-z]{3,20}$/.test(text);
}

function inputRegexMail(textemail) {
  return /^[A-Za-z0-9-éàè.]+@[a-z.]+[a-z.]$/.test(textemail);
}

function inputRegexAdresse(textadresse) {
  return /^[A-Za-z0-9-éàè\s]{10,50}$/.test(textadresse);
}
