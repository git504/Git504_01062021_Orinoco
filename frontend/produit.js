// API
const url = "http://localhost:3000/api/cameras";

/*Appel de l'API*/
const getProduit = function () {
    return fetch (url)
    .then((response) => response.json())
    .then(function(response){
        const myurl = window.location.href; 
        //Url complète de la page en cours de consultation
        //La propriété est accessible en écriture et permet de réaliser une redirection par programmation.
        const searchParams = new URLSearchParams(myurl)
        //Lit les params de l'URL
        for (let p of searchParams) {
            const id = p[1]
            console.log(id);
          }
        //On isole l'élément numéro 1 dans l'array const ID
        console.log(searchParams.get("id"))
    })
    .catch(error => alert("Erreur : " + error));
}
getProduit();

//On recupere dans le .json que les elements qui nous interessent;
//On match l'ID  qui correspond a la selection;

const findElement = (data, _id) {
    for (let _id of data) {
 
 if (_id === _id) {
 return true;
 }
  
 }
 return false;
 }