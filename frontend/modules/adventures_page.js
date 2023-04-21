
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city = search.substring(search.indexOf("?city=")+6)
  // console.log(city)
  return city

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
try{
  let adventures = await fetch(config.backendEndpoint+`/adventures?city=${city}`)
return adventures.json()
}
catch(err){
  return null
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    // let div = document.getElementById("data")

    // let anchor = document.createElement("a")
    // anchor.setAttribute("class","activity-card")
    // anchor.setAttribute("href",config.backendEndpoint+`/adventures/detail/?adventure=${key.id}`)

    // let img = document.createElement("img")
    // img.setAttribute("src",key.image)

    // let textDivOne = document.createElement("div")
    // textDivOne.setAttribute("class","adventure-text d-flex justify-content-between")
    // let name = document.createElement("p")
    // let costPerHead = document.createElement("p")
    // name.innerText = key.name
    // costPerHead.innerText = key.currency+key.costPerHead
    // textDivOne.append(name,costPerHead)



    // let textDivTwo = document.createElement("div")
    // textDivTwo.setAttribute("class","adventure-text d-flex justify-content-between")
    // let durationText = document.createElement("p")
    // let duration = document.createElement("p")
    // durationText.innerText = "Duration"
    // duration.innerText = key.duration + " Hours"
    // textDivTwo.append(durationText,duration)

    // let catBanner = document.createElement("p")
    // catBanner.setAttribute("class","category-banner")
    // catBanner.innerText = key.category

    // let col = document.createElement("div")
    // col.setAttribute("class","col-sm-6 col-lg-3")

    // div.append(col)
    // col.append(anchor)
    // anchor.append(img,textDivOne,textDivTwo,catBanner)

    let div = document.getElementById("data")
    let col = document.createElement("div")
    col.setAttribute("class","col-sm-6 col-lg-3")

    col.innerHTML = `
    <a href="${config.backendEndpoint}/adventures/detail/?adventure=${key.id}" class="activity-card" id="${key.id}">
      <img src=${key.image} alt="">
      <div class="adventure-text d-flex justify-content-between">
        <p>${key.name}</p>
        <p>${key.currency} ${key.costPerHead}</p>
      </div>
      <div class="adventure-text d-flex justify-content-between">
        <p>Duration</p>
        <p>${key.duration} Hours</p>
      </div>
      <p class="category-banner">${key.category}</p>
    </a>
    `
  div.append(col)

  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter((item)=>item.duration >= low && item.duration <= high)

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter((item)=>categoryList.includes(item.category))
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if(filters.duration && filters.category.length == 0) {
    console.log("Only Duration Filter")
    let [low,high] = filters.duration.split("-")
    let filterList = filterByDuration(list, low, high)
    return filterList
  } else if(!filters.duration && filters.category.length != 0){
    console.log("Only Category Filter")
    let categoryList = filters.category
    let filterList = filterByCategory(list, categoryList)
    return filterList
  } else if(filters.duration && filters.category.length != 0){
    console.log("Both Filters")
    let [low,high] = filters.duration.split("-")
    let categoryList = filters.category
    let firstFilter = filterByDuration(list, low, high)
    let filterList = filterByCategory(firstFilter, categoryList)
    return filterList
  } else {
    console.log("No Filters")
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  console.log(filters)
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let data = window.localStorage.getItem("filters")
  let filters = JSON.parse(data)
  return filters
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryDiv = document.getElementById("category-list")
  filters.category.forEach((filter)=>{
    let div = document.createElement("div")
    div.textContent = `${filter}`
    div.setAttribute("class", "category-filter")
    categoryDiv.append(div)
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
