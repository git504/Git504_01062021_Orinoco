const getCams = function () {
    return fetch (url)
    .then(function(response){
        return response.json()
    })
}
getCams();