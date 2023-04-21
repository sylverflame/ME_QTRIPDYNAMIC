import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
try
{
  let data = await fetch(config.backendEndpoint+"/cities")
  return data.json()
}
catch(err){
  return null
}
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM


let cityName = document.createElement("h5")
cityName.innerText = city
let places = document.createElement("p")
places.innerText = description
let tileText = document.createElement("div")
tileText.setAttribute("class", "tile-text")
tileText.append(cityName,places)

let img = document.createElement("img")
img.setAttribute("src", image)

let tile = document.createElement("div")
tile.setAttribute("class", "tile")
tile.append(img,tileText)

let anchor = document.createElement("a")
anchor.setAttribute("id", id)
anchor.setAttribute("href", `pages/adventures/?city=${id}`)
anchor.append(tile)

let col = document.createElement("div")
col.setAttribute("class", "col-sm-6 col-lg-3")
col.append(anchor)


let div = document.getElementById("data")
div.append(col)
}

export { init, fetchCities, addCityToDOM };
