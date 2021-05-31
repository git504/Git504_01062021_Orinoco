// API
const url = "http://localhost:3000/api/cameras";
/*Création de la variable contenant l'id*/
const myurl = window.location.href; 
const searchParams = new URLSearchParams(myurl);
let camId = searchParams.get("id");
console.log(camId);

/*Appel du produit séléctionné*/
let mesVariables; //On stock les données du produit dans cette variable.

async function selectionProduit() {
    fetch(url + "/" + camId)
    .then(function(response){
        console.log(url);
        console.log(camId);
        response.json().then(function(data){
            mesVariables = data;
        })
        // Itère sur les paramètres de recherche.
        for (let p of searchParams) {
        console.log(p);
        //On recupere dans le .json que les elements qui nous interessent;
        console.log(p[1]);
        const findElement = function (data, camId) {
            for (let camId of data) {
            if (p[1] === camId) {
             return true;
             }{
             return false;
             }
            }
            }
            console.log(findElement);
  }
    })
    .catch(error => alert("Erreur : " + error))
}
selectionProduit();


//On match l'ID  qui correspond a la selection;

