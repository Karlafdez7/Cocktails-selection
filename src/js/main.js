'use strict';

const userSearch=document.querySelector(".js-inputSearch");

const btnSearchUser=document.querySelector(".js-btnSearch");

const btnResetUser=document.querySelector(".js-btnReset");

const listFavourites=document.querySelector(".js-favourites");

const listCocktails=document.querySelector(".js-cocktails")

const btnDeleteFavourites=document.querySelector('.js-btnDelet')



//Lista vacía para rellenar con los datos de la API
let listCocktailsData = [];
// let listSearchUserData = [];
let listFavouritesCocktailsData = [];

//Traer datos-cócteles: que se abra una lista de cócteles al cargar el proyecto
//data.drinks es para obetener los datos que necesito de cada cocktail
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    .then((response) => response.json())
    .then (data => {
        listCocktailsData = data.drinks;
        renderCocktailsList (listCocktailsData)
        
    });

//En la línea 106 se ha enviado a Local los datos de los cócteles guardado, ahora tenemos que cogerlos: para que se proyecte en la página.
//La colocamos aquí para que se situe al lado de la otra acción que se ejecuta cuando se actualiza o se inicia la página
//Creamos una función que recoja esta acción. Para que se ejecute la llamamos abajo de la función. También habríamos podido no hacer la función, pero por motivos de estética la he creado. 
function loadPageFav () {
    const favouriteListLocal = JSON.parse(localStorage.getItem('itemCocktails'));
    if (favouriteListLocal) {
        listFavouritesCocktailsData=favouriteListLocal;
        renderFavourites(listFavouritesCocktailsData);        
    }
}
loadPageFav();

    //Se crea una función donde hacemos el FETCH con el link de la api para que la usuaria meta el valor de busqueda (userSearch.value)
    //Para que no se sobreescriba a la lista de margaritas que tenemos al cargar la página: llamamos donde se pinta la lista de cócteles (ul) y la vacíamos.
    //Hemos creado un nuevo array para que contenga la lista de busqueda de la usuaria "listSearchUser"
    //Llamamos la estructura "renderCocktailsList" y le ponemos el parámetro de nuestro array. 

function handleClick(event) {
    event.preventDefault();
    const selectionCocktails = userSearch.value.toLowerCase();
    console.log(selectionCocktails);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selectionCocktails}`)
    .then((response) => response.json())
    .then ((data) => {
        listCocktailsData= data.drinks;
        listCocktails.innerHTML= '';   
        renderCocktailsList (listCocktailsData)  
    });   
}

// // To check if the coctail is already on the coctailFav array. If so, (!== undefined) it adds the class selected to the div. 
//   const alreadyFav = coctailFav.find (oneCoctailFav => 
// coctailData.id===oneCoctailFav.id
// );
//   if (alreadyFav !== undefined){
//     divElement.setAttribute ('class', 'coctail__div js-coctail selected');
//   }
//   return liElement;
// } 

//Se hace una función para poder ir obteniendo los diferentes cocktails de la API mediante un for...of
//El objetivo es poder pintar los cocktails
//Se recoge la función renderCocktailsStructure para meter los datos de los cocktails dentro de la estructura
//Esta función (renderCocktailsList) se llevará al Fetch para que se rellene una vez la API se haya traído a nuestro proyecto. Debemos tener en cuenta que el FETCH tarda más (aunque imperceptible) en cargar que el resto de ejecuciones, por eso lo debemos llamar en FETCH. 
function renderCocktailsList (listCocktailsData) {
    listCocktails.innerHTML='';    
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
    const selectGeneral=listFavouritesCocktailsData.find(cocktailsFav => cocktails.idDrink ===cocktailsFav.idDrink)
    let html ="";
      if (selectGeneral !== undefined){
        html =  `<li class="js-elementLi list-all select" id=${cocktails.idDrink}><h3 class="name-cocktail">${cocktails.strDrink}</h3>
        <img class="image" src= ${cocktails.strDrinkThumb} alt="${cocktails.strDrink}" title="${cocktails.strDrink}"/> </li>`;
        } else {
            html =  `<li class="js-elementLi list-all" id=${cocktails.idDrink}><h3 class="name-cocktail">${cocktails.strDrink}</h3>
            <img class="image-cocktails" src= ${cocktails.strDrinkThumb} alt="${cocktails.strDrink}" title="${cocktails.strDrink}"/> </li>`;
        }      
  
        
  return html;
}


//Creamos una función para la estrucutra de favoritos ya que vamos a necesitar generar un icono X (para eliminar el cóctel) desde lista favoritos. 
//Además de copiar el línk de awsome icon, le colocamos una clase de js para poder traerla al js y activarle un evento click. Además debemos añadir la ID del cóctel ya que es la forma en que añadimos o quitamos de fav.
function renderCocktailsStructureFav(cocktails) {
  let html =  `<li class="list-fav js-elementLi" id=${cocktails.idDrink}><i class="fa-solid fa-circle-xmark js-DeleteX x-delete" id=${cocktails.idDrink}></i><h3 class="name-cocktail-fav" >${cocktails.strDrink}</h3>
    <img class="image-cocktails_fav" src= ${cocktails.strDrinkThumb} alt="${cocktails.strDrink}" title="${cocktails.strDrink}"/> </li>`;
  return html;
}

//class="< class="fa-solid fa-x js-DeleteX"
//Creao la función que va a contener las acciones que desencadena "click" a un cocktail (la llamo en el eventList de abajo)
//En esta función: poner o quitar selección / Llevar a la ul de favoritos el cóctel seleccionado

function handleClickElementLi(ev){    
    const idSelected = ev.currentTarget.id 
    const slctCocktail=listCocktailsData.find(cocktails => cocktails.idDrink === idSelected);
    const indexCocktailFav= listFavouritesCocktailsData.findIndex(cocktails => cocktails.idDrink === idSelected); //Buscar la posición del elemento 
    if (indexCocktailFav === -1 ) {
        ev.currentTarget.classList.add('select');
        listFavouritesCocktailsData.push(slctCocktail);
    } else { //si esta en el listado de favoritos, eliminalo
        ev.currentTarget.classList.remove('select');
        listFavouritesCocktailsData.splice(indexCocktailFav, 1);
  }
    renderFavourites(listFavouritesCocktailsData);
    localStorage.setItem('itemCocktails', JSON.stringify(listFavouritesCocktailsData)); //<--Guardamos la lista de favoritos en el Local mediante setItem. Lo colocamos aquí porque es el momento donde se crea la lista de favoritos. Con esto lo tenemos guardado, pero necesitamos después cogerlos (get)
}

//Para poder pintar la lista de favoritos que se realiza en la función anterior (handleClickElementLi) que luego llamamos para que se ejecute en el momento que se crea.
//Se ha podido reautilizar la función renderCocktailsStructure ya que se creo como una estructura para poder trabajar varias veces
//
//Se ejecuta aquí el evento X (eliminar favorito) ya que es el momento que se pinta la lista de fasvoritos. 
 function renderFavourites (cocktailsfav) {
    listFavourites.innerHTML = '';
    for (const cocktailfav of cocktailsfav) {
    listFavourites.innerHTML += renderCocktailsStructureFav(cocktailfav);
  }
    addEventToXfavourite();
 }

//Al click de la img X le debemos dar unas acciones a realizar: creamos esta función
//El proceso es similar al que realizamos para crear la lista, con la diferencia que en esta función solo debemos coger las parte que sirven para quitar.
function handleClickXFavourite (ev) {
     const idSelected = ev.currentTarget.id;
     console.log(idSelected);
     const indexCocktailFav= listFavouritesCocktailsData.findIndex(cocktails => cocktails.idDrink === idSelected);
    console.log (indexCocktailFav);
        if (indexCocktailFav !==-1) {
        listFavouritesCocktailsData.splice(indexCocktailFav, 1);
     }
    console.log(listFavouritesCocktailsData);
    renderFavourites(listFavouritesCocktailsData);
    renderCocktailsList (listCocktailsData)
    localStorage.setItem('itemCocktails', JSON.stringify(listFavouritesCocktailsData)); 
    

}

//Al click debemos ofrecerle una función que indique que debe pasar: en este caso lo que se busca con el delet favourite es que los cócteles que estan en favorito se limpie. 
//Si lo que se busca es vaciar la lista de favoritos
function handleClickDeleteFavourites () {
    listFavourites.innerHTML = '';
    localStorage.removeItem('itemCocktails');

}

//Le damos un función al evento click que haga: limpiar la lista de cócteles /limpiar lista de favoritos/ quitar el Local que guardo los favoritos/
//Al vaciar la lista no se vuelve a poner la lista predeterminada, solución: que se reactualice la página una vez limpiado todos los campos. 
function handleClickResetAll () {
    listCocktails.innerHTML= '';
    listFavourites.innerHTML = '';
    location.reload();
    localStorage.removeItem('itemCocktails');   
}

//Una vez he conseguido que la lista de la API se cargue con la los margaritas:
//Creo mis eventos aquí abajo ⬇️ 
//Arriba iremos poniendo las funciones que se ejecutan cuando activamos el evento

//Primer evento asociado a la busqueda que haga la usuaria de cocktails. 

btnSearchUser.addEventListener('click',handleClick);

//Creamos la función que va a sacar todos los LI (mediante bucle) para poder generar en cada uno de ellos el evento click
//Una vez ha sido creado lo tengo que llamar 
function addEventToCocktails() {
    const elementLi=document.querySelectorAll(".js-elementLi")
    for (const li of elementLi) {
        li.addEventListener('click', handleClickElementLi);
    }
    renderFavourites(listFavouritesCocktailsData);
    localStorage.setItem('itemCocktails', JSON.stringify(listFavouritesCocktailsData));
}

//Creamos un evento en la imagen X que hemos creado para que pueda eliminar cócteles.
//Al poner la class a todo aquel cóctel que sea seleccionado y pase al otro lado, se va a hacer un SelectorAll
//Luego debemos hacer un bucle para ir otorgandole a cada X de un cóctel el evento click
function addEventToXfavourite (){
    const xFavourites= document.querySelectorAll('.js-DeleteX');
    for (const xFavourite of xFavourites) {
        xFavourite.addEventListener('click', handleClickXFavourite);
     
    }
} 

//Se trae el botón de reset favorito del html al JS para poder trabajar. Debemos añadirle el evento click
btnDeleteFavourites.addEventListener('click', handleClickDeleteFavourites)

//Traemos el botón Reset a JS y le damos un evento click
btnResetUser.addEventListener('click', handleClickResetAll)







