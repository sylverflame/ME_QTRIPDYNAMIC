import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  return params.get('adventure')
  // Place holder for functionality to work in the Stubs
  //  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let adventureDetails = await fetch(config.backendEndpoint+`/adventures/detail/?adventure=${adventureId}`)
    let jsonData = await adventureDetails.json()
    return jsonData
     
  }
  catch(err){
    return null
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
document.getElementById("adventure-name").textContent = adventure.name
document.getElementById("adventure-subtitle").textContent = adventure.subtitle
document.getElementById("adventure-content").textContent = adventure.content
let photos = document.getElementById("photo-gallery")

adventure.images.forEach((img)=>{
  let image = document.createElement("img")
  image.setAttribute("src",img)
  image.setAttribute("class","activity-card-image")
  photos.append(image)
})

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let photoGallery = document.getElementById("photo-gallery")
   photoGallery.innerHTML=`
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
   <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="slide 3"></button>
   </div>
   <div class="carousel-inner"  id="carousel-inner"></div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div>
   `
   images.forEach((image,index)=>{
     let div = document.createElement("div");
     div.className=`carousel-item ${index===0?'active':''}`;
     div.innerHTML=`<img src=${image} class="activity-card-image pb-3"/>`;
     document.getElementById("carousel-inner").appendChild(div);
   });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
if(adventure.available){
document.getElementById("reservation-panel-sold-out").style.display = "none"
document.getElementById("reservation-panel-available").style.display = "block"
document.getElementById("reservation-person-cost").textContent = parseInt(adventure.costPerHead)
}else{
  document.getElementById("reservation-panel-available").style.display = "none"
  document.getElementById("reservation-panel-sold-out").style.display = "block"
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let reservationCost = document.getElementById("reservation-cost")
  if(persons == ""){
    reservationCost.textContent = 0
  }else{reservationCost.textContent = parseInt(persons)*parseInt(adventure.costPerHead)}
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm")
  form.addEventListener("submit",function(event){
    event.preventDefault()
    let formElement = event.target
    const data = {
      // name: formElement.name.value,
      name: form.elements["name"].value,
      // date: formElement.date.value,
      date: new Date(form.elements["date"].value),
      // person: formElement.person.value,
      person: form.elements["person"].value,
      adventure: adventure.id
      }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        };
      

        fetch(config.backendEndpoint+`/reservations/new`, options)
        .then(data => {
            if (!data.ok) {
              throw Error(data.status);
             }
             return data.json();
            }).then(update => {
              alert("Success!")
            console.log(update);
            }).catch(e => {
              alert("Failed!")
            console.log(e);
            });
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block"
    }else{
      document.getElementById("reserved-banner").style.display = "none"
    }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
