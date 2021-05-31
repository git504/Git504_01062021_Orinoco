// API
const url = "http://localhost:3000/api/cameras";
const urlOrder = "http://localhost:3000/api/cameras/order";
const myurl = window.location.href //prend l'url de la page produit
const id = myurl.searchParams.get("id") //on recupere un parametre precis id
console.log(id);

/*Appel de l'API*/
const getProduit = function () {
    return fetch (url)
    .then(function(response){
        return response.json()
    })
    .then(function(resp){
        return response.json()
    })
    .catch(error => alert("Erreur : " + error));
}
getProduit();

//On recupere dans le .json que les elements qui nous interessent;
//on match l'_ID  qui correspond a la selection;

