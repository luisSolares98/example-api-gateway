const fetch = require('node-fetch');
const customHeaders = {
    "Content-Type": "application/json",
}

const peticionGet = async (url) => {
    let respuesta ;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        respuesta = data;
    })
    .catch(error => {
        respuesta = null;
    });
    return respuesta;
}

const peticionPost = async (url, data) => {
    let respuesta ;
    await fetch(url,{
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        respuesta = data;
    })
    .catch(error => {
        respuesta = null;
    });
    return respuesta;
}

module.exports = { peticionGet, peticionPost }
