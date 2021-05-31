// API
const url = "http://localhost:3000/api/cameras";

/*Appel de l'API*/
const getProduit = function () {
    return fetch (url)
    .then((response) => response.json())
    
    .then(function(response){
        const myurl = window.location.href; 
        //Url complète de la page en cours de consultation
        const id = myurl.searchParams.get("id");
        //On recupere dans le .json que les elements qui nous interessent;
        //On match l'ID  qui correspond a la selection;
        console.log(id)
    })
    .catch(error => alert("Erreur : " + error));
}
getProduit();