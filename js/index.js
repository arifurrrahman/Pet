function loadButton() {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then(res => res.json())
        .then(data => displayButton(data.categories))
}


function displayButton(categories) {
    const dButton = document.getElementById('animal-category')
    dButton.classList.add('md:flex', 'md:justify-between', 'lg:flex', 'lg:justify-between', 'grid', 'grid-cols-2', 'gap-3')

    categories.forEach((item) => {
        let value=item.id
        const dDiv = document.createElement('div')
        dDiv.innerHTML = `<button id="btn-${item.category}" onclick="loadAnimalDetails('${item.category}')"class="common-name btn lg:btn-wide lg:btn-wide px-12 lg:px-12 h-[40px] lg:h-[75px] text-base lg:text-2xl rounded-2xl border-2"><img class="h-5 lg:h-10" src="${item.category_icon}" alt=""><span class="font-semibold">${item.category}</span></button>`
        dButton.append(dDiv)
    })
}
const removeActive=()=>{
    const items =document.getElementsByClassName('common-name')
    for(let item of items){
        item.classList.remove("bg-[#0E7A81]", "bg-opacity-25", "border-2", "border-[#0E7A81]","rounded-full", "text-gray-500")
    }
}

const loadAnimalDetails = (data) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${data}`)
        .then(res => res.json())
        .then(result => {
            removeActive()
            document.getElementById(`btn-${data}`).classList.add("bg-[#0E7A81]", "bg-opacity-25", "border-2", "border-[#0E7A81]","rounded-full", "text-gray-500");
            loadSpinner(result.data);
})
}


const getName = (value) => {
    if (value === null || value === "" || value === undefined) return "Not Available"
    else return value
}

const getBreed = (value) => {
    if (value === null || value === "" || value === undefined) return "Not Available"
    else return value
}
const getDOB = (value) => {
    if (value === null || value === "" || value === undefined) return "Not Available"
    else return value
}


const getPrice = (value) => {
    if (value === null || value === "" || value === undefined) return "Not Available"
    else return value
}

const getGender = (value) => {
    if (value === 'Male') return "Male"
    else if (value === 'Female') return "Female"
    else return "Not Available"
}

const getVaccinatedStatus=(value)=>{
    if (value === null || value === "" || value === undefined) return "Not Available"
    else return value
}



const loadLikedImage = (value) => {
    const dDiv = document.getElementById('grid-holder-2')
    const innerDiv = document.createElement('div')
    innerDiv.classList.add("border-2", "p-2", "rounded-lg")
    innerDiv.innerHTML = `<img class="w-full rounded-lg object-cover" src="${value}" alt="">`
    dDiv.appendChild(innerDiv)
}



const showDetailsModal = (values) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pet/${values}`)
        .then(res => res.json())
        .then(data => showModal(data.petData))
}

const showModal = (data) => {
    const modal = document.getElementById('my_modal_4')
    const modalDiv = document.getElementById('modalContent')
    modalDiv.innerHTML = `
    <img class="w-full lg:w-full h-[15opx] lg:h-[250px] rounded-lg" src="${data.image}" alt="">
    <p class="text-xl font-semibold mt-2">${data.pet_name}</p>
    <div class="flex flex-around mt-1">
    <div class="w-[50%]">
        <p><i class="fa-solid fa-paw"></i> Breed: ${getBreed(data.breed)}</p>
        <p><i class="fa-solid fa-mercury"></i> Gender: ${getGender(data.gender)}</p>
        <p><i class="fa-solid fa-syringe"></i>  Vaccinated Status: ${getVaccinatedStatus(data.vaccinated_status)}</p>
        </div>
        <div class="w-[50%]">
        <p><i class="fa-solid fa-calendar-days"></i> Birth: ${getDOB(data.date_of_birth)}</p>
        <p><i class="fa-solid fa-dollar-sign"></i> Price: ${getPrice(data.price)}</p>
        </div>
        </div>
        <hr class="border-b-2 mt-3">
        <div class="mt-2">
        <h1 class="text-xl font-bold">Details Information</h1>
        <p class="text-sm font-normal">${data.pet_details}</p>
        </div>
    <div class="modal-action">
      <form class="w-[100%]" method="dialog">
        <button class="btn w-full text-xl bg-[#0E7A81] bg-opacity-10 hover:bg-[#0E7A81] hover:bg-opacity-10 border-[#0E7A81] hover:border-[#0E7A81] text-[#0E7A81]">Cancel</button>
      </form>
    </div>
    
    `
    modal.showModal()
}
const modalDisable=(value)=>{
    const adoptButton=document.getElementById(`adptModal-${value}`)
            adoptButton.disabled=true;
            adoptButton.textContent="Adopted"
            adoptButton.classList.add("text-sm", "text-gray-500")
    
}

const showAdoptModal = (value) => {
    console.log(value)
    const modal = document.getElementById('my_modal_2')
    modal.showModal()
    let cnt = 2;
    const cntInterval = setInterval(() => {
        if (cnt > 0) {
            document.getElementById('counted-value').innerText = cnt;
        }
        cnt--;

        if (cnt < 0) {
            clearInterval(cntInterval);
            modal.close()
            modalDisable(value)
        }
    }, 1000);
    
    document.getElementById('counted-value').innerText = 3;

}

const modalDisable2=(value)=>{
    const adoptButton=document.getElementById(`adoptModal-${value}`)
            adoptButton.disabled=true;
            adoptButton.textContent="Adopted"
            adoptButton.classList.add("text-sm", "text-gray-500")
    
}

const showAdoptModal2 = (value) => {
    const modal = document.getElementById('my_modal_2')
    modal.showModal()
    let cnt = 2;
    const cntInterval = setInterval(() => {
        if (cnt > 0) {
            document.getElementById('counted-value').innerText = cnt;
        }
        cnt--;

        if (cnt < 0) {
            clearInterval(cntInterval);
            modal.close()
            modalDisable2(value)
        }
    }, 1000);
    
    document.getElementById('counted-value').innerText = 3;

}

document.getElementById('view-more').addEventListener('click', function () {
    document.getElementById('grid-holder-3').classList.remove('hidden')
    document.getElementById('grid-holder-1').classList.add('hidden')
})

function loadSpinner(data) {
    const spinContainer = document.getElementById('spinner-div')
    const spin = document.createElement('div')
    spin.id = "spinnerHolder"
    spin.classList.add("loading", "loading-bars", "loading-lg")
    spinContainer.appendChild(spin)
    const dDiv = document.getElementById('grid-holder-1')
    dDiv.classList.add('hidden')
    const dDiv3 = document.getElementById('grid-holder-2')
    dDiv3.classList.add('hidden')
    const dDiv2 = document.getElementById('grid-holder-3')
    dDiv2.classList.add('hidden')
    document.getElementById('spinner-div').classList.remove("hidden")
    setTimeout(() => {
        stopSpinner(data)
    }, 2000)
}


function stopSpinner(data) {
    const spinContainer = document.getElementById('spinnerHolder')
    loadCard(data)
    spinContainer.remove()
    document.getElementById('spinner-div').classList.add("hidden")
}

const loadCard = (data) => {
    const dDiv = document.getElementById('grid-holder-1')
    dDiv.classList.remove('hidden')
    const dDiv3 = document.getElementById('grid-holder-2')
    dDiv3.classList.remove('hidden')

    dDiv.innerHTML = ``
    if (data.length == 0) {
        document.getElementById('grid-holder-1').classList.remove('grid')
        document.getElementById('grid-holder-1').classList.add("bg-[#13131308]", "rounded-xl", "flex", "justify-center", "items-center", "flex-col", "text-center")
        dDiv.innerHTML = `
        <img class="mt-12" src="./images/error.webp" alt="">
        <h1 class="text-3xl font-bold">No Information Available</h1>
        <p class="w-[90%] lg:w-[60%] mb-10">It is widely recognized that readers can be distracted by the legible content on a page when assessing its layout. However, in this case, there is no relevant information found regarding the topic you are searching for.</p>
        `
    }
    else {
        data.forEach((items) => {
            let value = items.image
            console.log(value)
            const innerDiv = document.createElement('div')
            document.getElementById('grid-holder-1').classList.add('grid')
            document.getElementById('grid-holder-1').classList.remove("bg-[#13131308]", "rounded-xl", "py-20", "flex", "justify-center", "items-center", "flex-col", "text-center")
            innerDiv.innerHTML = `
        <div class="shadow-xl border-2 p-3 rounded-lg"><img class="w-full h-[150px] rounded-lg" src="${items.image}" alt="">
        <p class="text-xl font-semibold mt-4">${getName(items.pet_name)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-paw"></i> Breed: ${getBreed(items.breed)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-calendar-days"></i> Birth: ${getDOB(items.date_of_birth)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-mercury"></i> Gender: ${getGender(items.gender)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-dollar-sign"></i> Price: ${getPrice(items.price)}</p>
        <hr class="border-b-2 mt-4">
        <div class="flex justify-between mt-2 lg:mt-5">
        <button onclick="(loadLikedImage('${value}'))" class="border-0 md:border-2 lg:border-2 px-2 md:px-6 lg:px-6 py-2 rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>
        <button id="adptModal-${items.petId}" onclick="showAdoptModal(${items.petId})" class="font-bold border-0 md:border-2 lg:border-2 px-2 md:px-6 lg:px-7 py-2 rounded-lg text-[#0E7A81]">Adopt</button>
        <button onclick="showDetailsModal(${items.petId})" class="font-bold border-0 md:border-2 md:px-6 lg:border-2 px-2 lg:px-7 py-2 rounded-lg text-[#0E7A81]">Details</button>
        </div>
        </div>`
            dDiv.appendChild(innerDiv)
        })
    }
}


function loadInitialCard() {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
        .then(res => res.json())
        .then(data => InitialCard(data.pets))
}

const InitialCard = (data) => {
    const dDiv = document.getElementById('grid-holder-3')
    data.forEach((items) => {
        let value = items.image
        const innerDiv = document.createElement('div')
        innerDiv.innerHTML = `<div class="shadow-xl border-2 p-3 rounded-lg"><img class="w-full h-[150px] rounded-lg" src="${items.image}" alt="">
        <p class="text-xl font-semibold mt-4">${getName(items.pet_name)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-paw"></i> Breed: ${getBreed(items.breed)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-calendar-days"></i> Birth: ${getDOB(items.date_of_birth)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-mercury"></i> Gender: ${getGender(items.gender)}</p>
        <p><i class="text-xs lg:text-base fa-solid fa-dollar-sign"></i> Price: ${getPrice(items.price)}</p>
        <hr class="border-b-2 mt-2 md:mt-4 lg:mt-4">
        <div class="flex justify-between mt-5">
        <button onclick="(loadLikedImage('${value}'))" class="border-0 md:border-2 lg:border-2 px-2 md:px-6 lg:px-6 py-2 rounded-lg"><i class="fa-regular fa-thumbs-up"></i></button>
        <button id="adoptModal-${items.petId}" onclick="showAdoptModal2(${items.petId})" class="font-bold border-0 md:border-2 lg:border-2 px-2 md:px-6 lg:px-7 py-2 rounded-lg text-[#0E7A81]">Adopt</button>
        <button onclick="showDetailsModal(${items.petId})" class="font-bold border-0 md:border-2 md:px-6 lg:border-2 px-2 lg:px-7 py-2 rounded-lg text-[#0E7A81]">Details</button>
        </div>
        </div>`
        dDiv.appendChild(innerDiv)
    })

}

loadInitialCard()
loadButton()