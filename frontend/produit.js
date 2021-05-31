// API
const url = "http://localhost:3000/api/cameras";
const urlOrder = "http://localhost:3000/api/cameras/order";


/*Appel de l'API*/
const url = "http://localhost:3000/api/cameras";
const getProduit = function () {
    return fetch (url)
    .then((response) => response.json())
    .then(function(response){
        const myurl = window.location.href;
        const id = myurl.searchParams.get("id");
        console.log(id)
    })
    .catch(error => alert("Erreur : " + error));
}
getProduit();

//On recupere dans le .json que les elements qui nous interessent;
//on match l'_ID  qui correspond a la selection;

