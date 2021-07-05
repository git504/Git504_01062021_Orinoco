let resOrder = JSON.parse(localStorage.getItem("resOrder"));
console.log(resOrder);

//Attribution des données aux id respectifs
let paramsConfirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("Namecommande");
let prixConfirmation = document.getElementById("Prixcommande");
let idConfirmation = document.getElementById("Idcommande");

nameConfirmation.textContent = resOrder.contact.firstName;
prixConfirmation.textContent = sessionStorage.getItem("totalPanier");
idConfirmation.textContent = resOrder.orderId;

sessionStorage.clear();
localStorage.clear();
