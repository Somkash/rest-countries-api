// https://restcountries.com/v3.1/all

apiCountries = "https://restcountries.com/v3.1/all"

const mainContainer = document.getElementById("main-container")
const searchEl = document.getElementById("search")
const filterEl = document.getElementById("filter")


///////////////////////SEARCH Coutnry //////////////////////////
searchEl.addEventListener("change", () => searchCountry(searchEl.value))

async function searchCountry(searchString){
    let apiCountry = "https://restcountries.com/v3.1/name/{" + searchString +"}"
    let countryResponse = await fetch(apiCountry)
    if (countryResponse.ok){
        const countryData = await countryResponse.json();
        mainContainer.innerHTML = ""
        createDisplay(countryData[0])
    }
    else alert("No such Country")   
}

//////////////////// Filter by Region  //////////////////////
filterEl.addEventListener("input", async() => {
    let filterApiCountry = "https://restcountries.com/v3.1/region/" + filterEl.value 

    let filterResponse = await fetch(filterApiCountry)
    const filterData = await filterResponse.json();

    
    mainContainer.innerHTML = ""
    for ([index, country] of filterData.entries()){
        createDisplay(country);
    }
})


function createDisplay(country){

    let data = `
    <div class="country-display">
        <a href="/CountryDetail.html?${country.cca3} ">    
            <div class="flag-container">
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="flag">
            </div>
            <div class="data">
                <h2 class="name">${country.name.common}</h2>
                <p class="population"><strong>Population:</strong>   ${Number(country.population).toLocaleString()}</p>
                <p class="region"><strong>Region:</strong>      ${country.region} </p>
                <p class="capital"><strong>Capital:</strong>   ${country.capital} </p>
            </div>
        </a>
    </div>
    `
    let newDisplay = document.createElement("div")
    newDisplay.innerHTML= data;

    mainContainer.appendChild(newDisplay);

}

async function getCountry() { 
    let response = await fetch(apiCountries)
    const data = await response.json();
    
    for ([index, country] of data.entries()){
        createDisplay(country);
    }
}

getCountry()

