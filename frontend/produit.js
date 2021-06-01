/*PRODUIT SELECTIONNE INDEX*/
const url = "http://localhost:3000/api/cameras";

/*Création de la variable contenant l'id*/
const params = new URLSearchParams(window.location.search);
let camId = params.get("id");

/*Appel du produit séléctionné*/
let produitOneByOne;//On stock les données du produit dans cette variable.

async function selectionProduit() {
    fetch(url + "/" + camId).then(function(response){
        response.json().then(function(data){
            produitOneByOne = data;
            console.log(produitOneByOne);

        /*On vient cibler la balise div ayant pour id Selectionproduit*/
        let selectionProduit = document.getElementById("Selectionproduit");

        /*On crée l'affichage de la liste des produits proposés qui sera présente sur l'index*/
        cams.map((cam) => {
          produitOneByOne = `
                            <label for="lentille">Type de lentille :</label><br>
                            <select name="lentille" id="lentille">
                                <option value="Type de lentille">${cam.lenses}</option>
                            </select>
                            <div id="Descriptionproduit">
                                <div class="Blockdescription">
                                    <div class="B1description">
                                        <img src= ${cam.imageUrl} alt="Photographie de l'appareil." class="Imagedescription">
                                    </div>
                                    <div class="B2description">
                                        <h2 class="Nomdescription">${cam.name}</h2>
                                        <p class="Prixdescription">${cam.price}</p>
                                        <p class="Descriptionproduit">${cam.description}</p>
                                    </div>
                                </div>
                            </div>
                            `
            }
        )
    });
selectionProduit.innerHTML = produitOneByOne;                  
};
selectionProduit();


//On stock le panier dans cette variable
let panier = JSON.parse(localStorage.getItem("monPanier")); 

/*Ajouter un article au panier*/
function ajouterAuPanier(){
    const bouton = document.getElementById("Boutonpanier");
    bouton.addEventListener("click", async function(){
        panier.push(produitOneByOne);
        localStorage.setItem("monPanier", JSON.stringify(panier));
        alert("l'article est dans votre Bag ;-)")
        location.reload();
    });
};
ajouterAuPanier();