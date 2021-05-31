
// API
const url = "http://localhost:3000/api/cameras";
const urlOrder = "http://localhost:3000/api/cameras/order";

/*Appel de l'API*/
const getCams = function () {
    return fetch (url)
    .then(function(response){
        return response.json()
    })
}
getCams();