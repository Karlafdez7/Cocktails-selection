'use strict';

const userSearch=document.querySelector(".js-inputSearch");

const btnSearchUser=document.querySelector(".js-btnSearch");

const btnResetUser=document.querySelector(".js-btnReset");

const listFavourites=document.querySelector(".js-favourites");

const listCocktails=document.querySelector(".js-cocktails")



//Lista vacía para rellenar con los datos de la API
let listCocktailsData = [];
let listSearchUserData = [];
let listFavouritesCocktailsData = [];

//Traer datos-cócteles: que se abra una lista de cócteles al cargar el proyecto
//data.drinks es para obetener los datos que necesito de cada cocktail
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then (data => {
        listCocktailsData = data.drinks;
        renderCocktailsList (listCocktailsData)
        
    });

    //Se crea una función donde hacemos el FETCH con el link de la api para que la usuaria meta el valor de busqueda (userSearch.value)
    //Para que no se sobrecriba a la lista de margaritas que tenemos al cargar la página: llamamos donde se pinta la lista de cócteles (ul) y la vacíamos.
    //Hemos creado un nuevo array para que contenga la lista de busqueda de la usuaria "listSearchUser"
    //Llamamos la estructura "renderCocktailsList" y le ponemos el parámetro de nuestro array. 


function handleClick(event) {
    event.preventDefault();

    const selectionCocktails = userSearch.value.toLowerCase();
    console.log(selectionCocktails);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selectionCocktails}`)
    .then((response) => response.json())
    .then ((data) => {
        listSearchUserData= data.drinks;
        listCocktails.innerHTML= '';   
        renderCocktailsList (listSearchUserData)  
    });
  

    
}


//Se hace una función para poder ir obteniendo los diferentes cocktails de la API mediante un for...of
//El objetivo es poder pintar los cocktails
//Se recoge la función renderCocktailsStructure para meter los datos de los cocktails dentro de la estructura
//Esta función (renderCocktailsList) se llevará al Fetch para que se rellene una vez la API se haya traído a nuestro proyecto. Debemos tener en cuenta que el FETCH tarda más (aunque imperceptible) en cargar que el resto de ejecuciones, por eso lo debemos llamar en FETCH. 
function renderCocktailsList (listCocktailsData) {
    for (const cocktails of listCocktailsData) {
        if (cocktails.strDrinkThumb) { 
        listCocktails.innerHTML += renderCocktailsStructure(cocktails);
        } else {
            let html =  `<li class="js-elementLi" id=${cocktails.idDrink}>${cocktails.strDrink}</li>
            <img src=  https://via.placeholder.com/210x295/ffffff/666666/?text=TV />`;
            return html;
        }

    }
    
    addEventToCocktails(); //<-- Llamo para que se ejecute la función click de seleccionar aquí: es el momento donde quiero que se ejecute (cuando se está pintando).
    
}

//Crear estructura de LI que se pintará en el HTML 
//Usar referencia del objeto para cada dato que necesito. En este caso el nombre del cocktail (strDrink) y la imagen del cocktail (strDrinkThumb)
function renderCocktailsStructure(cocktails) {
  let html =  `<li class="js-elementLi" id=${cocktails.idDrink}>${cocktails.strDrink}
    <img src= ${cocktails.strDrinkThumb} /> </li>`;
  return html;
}

//Creao la función que va a contener las acciones que desencadena "click" a un cocktail (la llamo en el eventList de abajo)
//En esta función: poner o quitar selección / Llevar a la ul de favoritos el cóctel seleccionado --en proceso--
function handleClickElementLi(ev){    
    ev.currentTarget.classList.toggle('select');
    const idSelected = ev.currentTarget.id 
    const slctCocktail= listFavouritesCocktailsData.ev.currentTarget.id (cocktails => cocktails.id ===idSelected);

}

//Creamos la función que va a sacar todos los LI (mediante bucle) para poder generar en cada uno de ellos el evento click
//Una vez ha sido creado lo tengo que llamar 
function addEventToCocktails() {
    const elementLi=document.querySelectorAll(".js-elementLi")
    for (const li of elementLi) {
        li.addEventListener('click', handleClickElementLi);

    }
}

//Una vez he conseguido que la lista de la API se cargue con la los margaritas:
//Creo mis eventos aquí abajo ⬇️ 
//Arriba iremos poniendo las funciones que se ejecutan cuando activamos el evento

//Primer evento asociado a la busqueda que haga la usuaria de cocktails. 

btnSearchUser.addEventListener('click',handleClick)
//# sourceMappingURL=main.js.map
