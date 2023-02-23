'use strict';

const userSearch=document.querySelector(".js-inputSearch");

const btnSearchUser=document.querySelector(".js-btnSearch");

const btnResetUser=document.querySelector(".js-btnReset");

const listFavourites=document.querySelector(".js-favourites");

const listCocktails=document.querySelector(".js-cocktails")

//Lista vacía para rellenar con los datos de la API
let listCocktailsData = [];

//Traer datos-cócteles: que se abra una lista de cócteles al cargar el proyecto
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then (data => {
        listCocktailsData = data.drinks;
        renderCocktailsList (listCocktailsData)
        console.log(listCocktails)
    });
//Se hace una función para poder ir obteniendo los diferentes cocktails de la API mediante un for...of
//El objetivo es poder pintar los cocktails
//Se recoge la función renderCocktailsStructure para meter los datos de los cocktails dentro de la estructura
//Esta función (renderCocktailsList) se llevará al Fetch para que se rellene una vez la API se haya traído a nuestro proyecto. Debemos tener en cuenta que el FETCH tarda más (aunque imperceptible) en cargar que el resto de ejecuciones, por eso lo debemos llamar en FETCH. 
function renderCocktailsList (listCocktailsData) {
    for (const cocktails of listCocktailsData)
        listCocktails.innerHTML += renderCocktailsStructure (cocktails);
}

//Crear estructura de LI que se pintará en el HTML 
//Usar referencia del objeto para cada dato que necesito. En este caso el nombre del cocktail (strDrink) y la imagen del cocktail (strDrinkThumb)
function renderCocktailsStructure(cocktails) {
  let html =  `<li>${cocktails.strDrink}</li>
    <img src= ${cocktails.strDrinkThumb} />`;
  return html;
}

//# sourceMappingURL=main.js.map
