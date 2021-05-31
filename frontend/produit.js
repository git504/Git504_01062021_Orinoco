// API
const url = "http://localhost:3000/api/cameras";
const myurl = window.location.href; 
const searchParams = new URLSearchParams(myurl);
let camId = searchParams.get("id");

/*Appel du produit séléctionné*/
let mesVariables; //On stock les données du produit dans cette variable.

async function selectionProduit() {
    fetch(url + "/" + camId).then(function(response){
        response.json().then(function(data){
            mesVariables = data;
        })
    })
}
selectionProduit();

//On recupere dans le .json que les elements qui nous interessent;
//On match l'ID  qui correspond a la selection;

// const findElement = function (data, _id) {
// for (let _id of data) {
// if (_id === _id) {
//  return true;
//  }{
//  return false;
//  }
// }
// }
// console.log(findElement);