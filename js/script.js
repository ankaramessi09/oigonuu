const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const APP_ID = "f6007a91";
const APP_key = "33e50c7d7af5e1ce73eecf89cafdc332";
// console.log(container)
searchForm.addEventListener("submit", (e) => {
e.preventDefault();
searchQuery = e.target.querySelector(".recipe-search").value;
fetchAPI();
});р

async function fetchAPI() { 
const response = await fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=100`);
const data = await response.json();
generateHTML(data.hits);
console.log(data);
}

function generateHTML(results) {
container.classList.remove("initial");
let generatedHTML = "";
results.map((result) => {
    generatedHTML += `
    <div class="item"> 
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
        <h1 class="title">${result.recipe.label}</h1>
        <a class="view-btn" target="_blank" href="${
            result.recipe.url
        }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${
        result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
    </div>
    `;
});
searchResultDiv.innerHTML = generatedHTML;
}
