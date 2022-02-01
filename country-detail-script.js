const parameters = location.search.substring(1).split("&");
const mainEl = document.getElementById("main-display") 
console.log(parameters[0])

async function getCountry(apiCountries) { 
    let response = await fetch(apiCountries)
    const data = await response.json();
    DOMLog(data);
}


function getLanguages(lang){
    let langString = "" //lang[Object.keys(lang)[0]]
   for (const key in lang)
       langString += lang[key] + ", " 
    langString = langString.slice(0, -2)
    return langString
}

function getNativeName(name){
    return name[Object.keys(name)[0]].official
}

function getCurrency(currency){
    return currency[Object.keys(currency)[0]].name
}

async function makeBorderBtns(borders){
    console.log(borders)
    let bdrString =""
    for (let b in borders){
        let bdrApi = "https://restcountries.com/v3.1/alpha/" + borders[b]
        
        let bdrResponse = await fetch(bdrApi)
        const bdrData = await bdrResponse.json();
        bdrString +=`<a href="countrydetail.html?${borders[b]}" class="btn">${bdrData[0].name.common}</a>
        `   
    }
    console.log(bdrString)

    let bdrStr = `
    <div class="border-countries">
                    <h4>Border Countries:</h4>
                    <div class="border-buttons btn">
                    ${bdrString}
                    </div>
                </div>
    `
    let bdrDisplay = document.createElement("div")
    bdrDisplay.innerHTML= bdrStr;

    const countryDisplayEl = document.getElementById("country-display")

   countryDisplayEl.appendChild(bdrDisplay);

    return (bdrString)

}

function DOMLog(data){

    const langString = getLanguages(data[0].languages)
    const nativeNameStr = getNativeName(data[0].name.nativeName)
    const currencyStr = getCurrency(data[0].currencies)
    const borderStr = makeBorderBtns(data[0].borders)
    const htmlString = `
    <div class="container">
            <div class="country-display" id="country-display">
                <div class="flag-container">
                    <img src=${data[0].flags.png} alt="Flag of Flag of ${data[0].name.common}">
                </div>

                <div class="country-detail">
                    <h2 class="name">${data[0].name.common}</h2>
                    <div class="data">

                        <div class="main-detail">
                            <p><strong>Native Name: </strong>${nativeNameStr}</p>
                            <p><strong>Population: </strong>  ${Number(data[0].population).toLocaleString()}</p>
                            <p><strong>Region: </strong>  ${data[0].region}</p>
                            <p><strong>Sub Region: </strong>  ${data[0].subregion} </p>
                            <p><strong>Capital: </strong>  ${data[0].capital} </p>
                        </div>
                        <div class="other-detail">
                            <p><strong>Top Level Domain: </strong>  ${data[0].tld}</p>
                            <p><strong>Currencies </strong>  ${currencyStr}</p>
                            <p><strong>Languages: </strong>  ${langString} </p>
                            <p></p>
                        </div>
                    </div>
                </div>
                

            </div> 
        </div>
    `
    console.log(htmlString)
    let newDisplay = document.createElement("div")
    newDisplay.innerHTML= htmlString;

    mainEl.appendChild(newDisplay);

}

let apiCountries = "https://restcountries.com/v3.1/alpha/" + parameters[0]+""
getCountry(apiCountries)
