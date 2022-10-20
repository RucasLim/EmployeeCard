

//12 random emplyees
let url = `https://randomuser.me/api?results=${12}`;

let ArrayOfEmployee;

//get data from url 
function getEmployees(){
    return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

//Sort employees card on a page 
async function sortEmployee(){
    let gallery = document.querySelector("#gallery");
    let data = await getEmployees();  

    ArrayOfEmployee = data.results;
    let mark = '';

    //load same order
    let ind = -1; 

    mark += ArrayOfEmployee
        .map((employee) => {
            ind++;
// -------------------------------------------------------------------
        //     <div class="card">
        //     <div class="card-img-container">
        //         <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
        //     </div>
        //     <div class="card-info-container">
        //         <h3 id="name" class="card-name cap">first last</h3>
        //         <p class="card-text">email</p>
        //         <p class="card-text cap">city, state</p>
        //     </div>
        // </div>
        // -------------------------------------------------------------
            return `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile picture" onclick="displayModal(${ind})">
            </div>
            <div class="card-info-container">
                <h3 class="card-name cap" onclick="displayModal(${ind})">
                ${employee.name.first} ${employee.name.last}</h3>
                <br>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
            </div>
        </div>`
        })
        .join("");
    
    gallery.innerHTML = mark;

}
sortEmployee();

function displayModal(i) {

    let MEmployee = ArrayOfEmployee[i];
// ==================================================================================
//     <div class="modal-container">
//     <div class="modal">
//         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//         <div class="modal-info-container">
//             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//             <h3 id="name" class="modal-name cap">name</h3>
//             <p class="modal-text">email</p>
//             <p class="modal-text cap">city</p>
//             <hr>
//             <p class="modal-text">(555) 555-5555</p>
//             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//             <p class="modal-text">Birthday: 10/21/2015</p>
//         </div>
//     </div>

//     // IMPORTANT: Below is only for exceeds tasks 
//     <div class="modal-btn-container">
//         <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//         <button type="button" id="modal-next" class="modal-next btn">Next</button>
//     </div>
// </div>
// ======================== -->

    document.querySelector("body").insertAdjacentHTML(
        `beforeend`, 
        `<div id="modal${i}" class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="closeModal(${i})"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${MEmployee.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${MEmployee.name.first} ${MEmployee.name.last}</h3>
                <p class="modal-text">${MEmployee.email}</p>
                <p class="modal-text cap">${MEmployee.location.city}</p>
                <hr>
                <p class="modal-text">${MEmployee.cell}</p>
                <p class="modal-text">${MEmployee.location.street.number} ${MEmployee.location.street.name}, ${MEmployee.location.city}, ${MEmployee.location.state} ${MEmployee.location.postcode}</p>
                <p class="modal-text">Birthday: ${MEmployee.dob.date}</p>
            </div>
        </div>`
    );
}

//close modal
function closeModal(i){
 document.getElementById(`modal${i}`).style.display='none';
}
