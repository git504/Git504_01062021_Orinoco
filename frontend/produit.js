// API
const url = "http://localhost:3000/api/cameras";
const urlOrder = "http://localhost:3000/api/cameras/order";

/*Appel de l'API*/
const getProduit = function () {
    return fetch (url)
    .then(function(response){
        return response.json()
    })
    .catch(error => alert("Erreur : " + error));
}
getProduit();

//On recupere dans le .json que les elements qui nous interesse...om match l'_ID  qui correspond a la selection

