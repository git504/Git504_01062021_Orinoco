/*Fonction affichant le nombre d'article dans le panier dans le nav*/
getPanierQuantity();

let total = 0; //On stock le prix total dans cette variable afin de l'afficher dans le tableau et dans l'URL

/*Création du panier utilisateur si besoin*/
if (localStorage.getItem("monPanier")) {
  console.log("Panier OK");
} else {
  console.log("Création du panier");
  let init = [];
  localStorage.setItem("monPanier", JSON.stringify(init));
}

//On stock le panier dans cette variable
let panier = JSON.parse(localStorage.getItem("monPanier"));
console.log(panier);
console.log("hello");

/*Fonction de suppression d'article du panier*/
function suppressionArticle(i) {
  console.log("suppression article i :", i);
  panier.splice(i, 1); //suppression --> 1 de l'element i du tableau;
  localStorage.clear(); //on vide le storage avant de le mettre à jour;
  localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
  window.location.reload();
}

/*Affichage du panier utilisateur dans la page "panier"*/
function affichagePanier() {
  if (panier.length > 0) {
    document.getElementById("panierVide").remove();

    /*Nous allons présenter le panier à l'utilisateut sous forme de tableau que nous plaçons dans la section "Sectionpanier"*/
    let tableauSection = document.querySelector(".Rowsarticle");

    let listOfBag = "";
    /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
    panier.map((article, index) => {
      listOfBag += `
<tr>
<td ><img id="articleImage" src="${article.imgUrl}"></td>
<td>${article.name}</td>
<td>${article.lense}</td>
<td>${article.quantity}</td>
<td>${article.price / 100}</td>
<td class="fas fa-trash-alt" onclick="suppressionArticle(${index})"></td>
</tr>`;
    });
    tableauSection.innerHTML = listOfBag;

    /*Création de la ligne du bas du tableau affichant le prix total de la commande*/

    JSON.parse(localStorage.getItem("monPanier")).forEach((priceArticle) => {
      total += priceArticle.price / 100;
    });

    tableauFooterPrixTotal = document.querySelector(".tableauFooterLigne");

    tableauFooterPrixTotal.textContent = "Prix total: " + total + " euros";
  }
}
affichagePanier();

/*FORMULAIRE*/

/*Validation de formulaire*/
//Création de l'objet à envoyer, regroupant le formulaire et les articles
const commandeUser = {
  contact: {},
  products: [],
};

function sendCommand(event) {
  event.preventDefault();

  //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.

  if (panier.length == 0) {
    alert("Votre panier est vide.");
  } else {
    //Récupération des champs
    let nomForm = document.getElementById("Nomform").value;
    let prenomForm = document.getElementById("Prénom").value;
    let emailForm = document.getElementById("Email").value;
    let adresseForm = document.getElementById("Adresse").value;
    let villeForm = document.getElementById("Ville").value;
    let codePostalForm = document.getElementById("Codepostal").value;

    //TEST INPUT FORMULAIRE

    //prenom
    console.log(inputRegex(prenomForm));
    if (!inputRegex(prenomForm)) {
      alert("Votre prénom doit contenir au moins 3 lettres sans caractères spéciaux.");
    }

    //nom
    console.log(inputRegex(nomForm));
    if (!inputRegex(nomForm)) {
      alert("Votre prénom doit contenir au moins 3 lettres sans caractères spéciaux.");
    }

    //ville
    console.log(inputRegex(villeForm));
    if (!inputRegex(villeForm)) {
      alert("Votre ville doit contenir au moins 3 lettres sans caractères spéciaux.");
    }

    //mail
    console.log(inputRegexMail(emailForm));
    if (!inputRegexMail(emailForm)) {
      alert("Votre e-mail ne doit pas contenir de caractères spéciaux.");
    }

    //adresse
    console.log(inputRegexAdresse(adresseForm));
    if (!inputRegexAdresse(adresseForm)) {
      alert("Votre adresse doit contenir au moins 3 lettres sans caractères spéciaux.");
    }

 

    //Création de l'objet formulaireObjet
    commandeUser.contact = {
      firstName: prenomForm,
      lastName: nomForm,
      address: adresseForm,
      city: villeForm,
      email: emailForm,
    };
    console.log(commandeUser);
    console.log(panier);
    //Création du tableau des articles
    panier.forEach((articlePanier) =>
      commandeUser.products.push(articlePanier._id)
    );

    //Envoi des données récupérées
    const optionsFetch = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(commandeUser),
    };

    fetch(getUrl() + "/order", optionsFetch).then(function (response) {
      response.json().then(function (resOrder) {
        console.log(resOrder.contact);
        window.location = `./confirmation.html?id=${resOrder.orderId}&name=${resOrder.contact.firstName}&prix=${total}`;
      });
    });
    localStorage.clear();
  }
}
