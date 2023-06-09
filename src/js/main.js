"use-strict";

//setView([Y-Achse, X-Achse], ZOOM) Gibt Ansicht auf der MAP
const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//marker([Y-ACHSE, X-ACHSE])
function setMaker(){

    let circle = L.circle([0, 0],{
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500000
    }).addTo(map);

    map.on('click', grad => {
        circle.setLatLng([grad.latlng.lat, grad.latlng.lng]);
        document.querySelector("header > p:nth-child(2)").innerHTML = 
        `
        <span>Längengrade: ${grad.latlng.lat}°</span><br><span>Breitengrade: ${grad.latlng.lng}°</span>
        `;
        document.querySelector("header > h1").innerHTML = `Standort: Circle`;
    } );
}

async function where(){
    const url = 'https://api.wheretheiss.at/v1/satellites/25544';
    const response = await fetch(url);
    const data = await response.json();
    L.marker([data.latitude, data.longitude],{title: 'Hier befindet sich die Internationale Raumstation :)'}).addTo(map);
    document.querySelector("header > p:nth-child(2)").innerHTML = 
    `
    <span>Längengrade: ${data.longitude}°</span><br><span>Breitengrade: ${data.latitude}°</span>
    `;
}

where().catch(error => alert("Error! Es ist ein Fehler aufgetreten"));
setMaker();