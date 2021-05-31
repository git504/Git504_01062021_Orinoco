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
        //lit les params de l'URL
        //On recupere dans le .json que les elements qui nous interessent;
        //On match l'ID  qui correspond a la selection;
        const id = searchParams.get("id");
        console.log("id")
    })
    .catch(error => alert("Erreur : " + error));
}
getProduit();