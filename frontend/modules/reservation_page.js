import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    let adventures = await fetch(config.backendEndpoint+`/reservations/`)
    let adventuresJson = await adventures.json()
  return adventuresJson
  }
  catch(err){
    return null
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    if(reservations.length == 0){
      document.getElementById("no-reservation-banner").style.display = "block"
      document.getElementById("reservation-table-parent").style.display = "none"
    }else{
      document.getElementById("no-reservation-banner").style.display = "none"
      document.getElementById("reservation-table-parent").style.display = "block"
    }

    
    let tbody = document.getElementById("reservation-table")
    reservations.forEach((reservation)=>{

      let getDate = (dateString,addTime) => {
        let dateObj = new Date(dateString)
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        if(addTime){
          let month = dateObj.toLocaleString(undefined,{month:"long"})
          let time = dateObj.toLocaleString("en-IN").split(" ")
          return `${day} ${month} ${year}, ${time[1]} ${time[2]}`
        }else{
          let month = dateObj.getUTCMonth() + 1;
          let date = day + "/" + month + "/" + year;
          return date
        }
      }

 

        let trow = document.createElement("tr")
        trow.innerHTML =`
        <td>${reservation.id}</td>
        <td>${reservation.name}</td>
        <td>${reservation.adventureName}</td>
        <td>${reservation.person}</td>
        <td>${getDate(reservation.date,false)}</td>
        <td>${reservation.price}</td>
        <td>${getDate(reservation.time,true)}</td>
        <td id="${reservation.id}"><a href="../detail/?adventure=${reservation.adventure}">
        <button class="reservation-visit-button">Visit Adventure</button>
        </a></td>
        `
        tbody.append(trow)
    })

}

export { fetchReservations, addReservationToTable };
