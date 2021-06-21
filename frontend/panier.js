let total = 0; //On stock le prix total dans cette variable afin de l'afficher dans le tableau et dans l'URL

/*Création du panier utilisateur si besoin*/
if (localStorage.getItem("monPanier")){
    console.log("Panier OK");
}else{
    console.log("Création du panier");
    let init = [];
    localStorage.setItem("monPanier", (JSON.stringify(init)));
}

let panier = JSON.parse(localStorage.getItem("monPanier")); //On stock le panier dans cette variable

/*Fonction affichant le nombre d'article dans le panier dans le nav*/
function nombreArticle (){
    let numberArticle = document.getElementById("Numberarticle");
    console.log(panier);
    numberArticle.textContent = panier.length;
}
nombreArticle();

/*Fonction de suppression d'article du panier*/
function suppressionArticle (i){
    console.log("suppression article i :", i);
    panier.splice(i, 1); //suppression de l'element i du tableau;  
    localStorage.clear(); //on vide le storage avant de le mettre à jour;
    localStorage.setItem("monPanier", JSON.stringify(panier)); //maj du panier sans l'élément i;
    window.location.reload();
}

/*Affichage du panier utilisateur dans la page "panier"*/
function affichagePanier (){
    if (panier.length > 0){
        document.getElementById("panierVide").remove();

        /*Nous allons présenter le panier à l'utilisateut sous forme de tableau que nous plaçons dans la section "Sectionpanier"*/
        let tableauSection = document.getElementById("Sectionpanier");



        // <!-- <div id="Sectionpanier">
                            
        // <table class="tableauPanier"><tr class="tableauHeaderLigne"><th>Article(s)</th><th>Nom(s)</th><th>Prix</th><th>Action</th></tr><tr id="articleLigne"><img id="articleImage" src="http://localhost:3000/images/vcam_1.jpg"><td id="articleNom">Zurss 50S</td><td id="articlePrix">499 euros</td><i id="0" alt="Retirer l'article du panier." class="fas fa-trash-alt" aria-hidden="true"></i></tr><tr class="tableauFooterLigne"><th class="tableauFooterPrixTotal" colspan="4">Prix total: 499 euros</th></tr></table></div> -->



        //Création du tableau
        // let tableauPanier = create("table", "class", "tableauPanier");
        // let tableauHeaderLigne = create("tr", "class", "tableauHeaderLigne");
        // let tableauHeaderImage = document.createElement("th");
        // let tableauHeaderNom = document.createElement("th");
        // let tableauHeaderPrix = document.createElement("th");
        // let tableauHeaderAction = document.createElement("th");
        // let tableauFooterLigne = create("tr", "class", "tableauFooterLigne");
        // let tableauFooterPrixTotal = create("th", "class", "tableauFooterPrixTotal");

        /*Attributs suplémentaires*/
        // tableauFooterPrixTotal.setAttribute("colspan", "4");

        /*Hiérarchisation des élements crées*/
        // tableauSection.appendChild(tableauPanier);
        // tableauPanier.appendChild(tableauHeaderLigne);
        // tableauHeaderLigne.appendChild(tableauHeaderImage);
        // tableauHeaderLigne.appendChild(tableauHeaderNom);
        // tableauHeaderLigne.appendChild(tableauHeaderPrix);
        // tableauHeaderLigne.appendChild(tableauHeaderAction);

        /*Attribution des données aux élements créees*/
        // tableauHeaderImage.textContent = "Article(s)";
        // tableauHeaderNom.textContent = "Nom(s)";
        // tableauHeaderPrix.textContent = "Prix";
        // tableauHeaderAction.textContent = "Action";

        /*Création d'une ligne dans le tableau pour chaque produit composant le panier*/
        JSON.parse(localStorage.getItem("monPanier")).forEach((article, index) => {
            // let articleLigne = create("tr", "id", "articleLigne");
            // let articleImage = create("img", "id", "articleImage");
            // let articleNom = create("td", "id", "articleNom");
            // let articlePrix = create("td", "id", "articlePrix");
            // let articleAction = create("i", "id", index);

            /*Attributs suplémentaires*/
            // articleImage.setAttribute("src", article.imageUrl);
            // articleAction.setAttribute("alt", "Retirer l'article du panier.");
            // articleAction.setAttribute("class", "fas fa-trash-alt"); //Logo poubelle pour supprimer l'article du panier.
            
            /*Suppression de l'article en cliquant sur la poubelle*/
            // articleAction.addEventListener("click", function(event){
            //     suppressionArticle(event.target.id);
            // });
            
            /*Hiérarchisation des élements crées*/
            // tableauPanier.appendChild(articleLigne);
            // articleLigne.appendChild(articleImage);
            // articleLigne.appendChild(articleNom);
            // articleLigne.appendChild(articlePrix);
            // articleLigne.appendChild(articleAction);

            /*Attribution des données aux élements créees*/
        //     articleNom.textContent = article.name;
        //     articlePrix.textContent = article.price / 100 + " " + "euros";
        });

        /*Création de la ligne du bas du tableau affichant le prix total de la commande*/
        // tableauPanier.appendChild(tableauFooterLigne);
        // tableauFooterLigne.appendChild(tableauFooterPrixTotal);
        
        // JSON.parse(localStorage.getItem("monPanier")).forEach(priceArticle => {
            // total += priceArticle.price / 100;
        // });

        // tableauFooterPrixTotal.textContent = "Prix total: " + total + " euros";        
    }
}
affichagePanier ();

/*FORMULAIRE*/
/*Validation de formulaire*/
//Création de l'objet à envoyer, regroupant le formulaire et les articles
const commandeUser = {
    contact: {},
    products: [],
}

document.getElementById("formulaire").addEventListener("submit", function (envoi){
    envoi.preventDefault();//

    //Avant d'envoyer un formulaire, vérification que le panier n'est pas vide.
    if (panier.length == 0){
        alert("Votre panier est vide.");
    }
    else {
        //Récupération des champs
        let nomForm = document.getElementById("Nomform").value;
        let prenomForm = document.getElementById("Prénom").value;
        let emailForm = document.getElementById("Email").value;
        let adresseForm = document.getElementById("Adresse").value;
        let villeForm = document.getElementById("Ville").value;
        let codePostalForm = document.getElementById("Codepostal").value;

        //Création de l'objet formulaireObjet
        commandeUser.contact = {
            firstName: prenomForm,
            lastName: nomForm,  
            address: adresseForm,
            city: villeForm,
            email: emailForm,
        }    
        
        //Création du tableau des articles
        panier.forEach(articlePanier =>
            commandeUser.products.push(articlePanier._id)
        )

        //Envoi des données récupérées
        const optionsFetch = {
            headers:{
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(commandeUser),         
        }     

        fetch(urlOrder, optionsFetch).then(function(response) {
            response.json().then(function(text) {
              console.log(text.orderId);
              window.location = `./confirmation.html?id=${text.orderId}&name=${prenomForm}&prix=${total}`
            });
        });
        localStorage.clear()       
    }
})




