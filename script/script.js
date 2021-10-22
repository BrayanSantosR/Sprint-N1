const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`
const SEARCH_URL = 'http://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

let templateCard= document.getElementById("template-card").content;
let fragment = document.createDocumentFragment();
let items = document.getElementById("items");

const getData = async()=>{

    let url = API_URL;
    let respuesta= await fetch(url);
    //console.log(respuesta);
    let datos = await respuesta.json();
    //console.log(datos);
    let {results}=datos;
    //console.log(results);
    return results;
}
getData();
const showData= async()=>{
    let data = await getData();
    data.forEach(element => {
        let {title,poster_path,vote_average,overview}=element;
        templateCard.querySelector('h5').textContent=title;
        templateCard.querySelector('span').classList.add("clase");
        templateCard.querySelector('span').textContent=("Calificacion"+ " "+vote_average);
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild       
    });

 items.appendChild(fragment);//le entrego todo el fragmento a items
    //console.log(data);
}
function getClassByRate(vote) {
    if (vote >= 8.0) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
showData()
document.addEventListener('DomContentLoaded',showData);

let boton= document.getElementById("btnBuscar");
boton.addEventListener('click',async()=>{
    //items.innerHTML ="";
    let texto = document.getElementById("inputBuscar").value;
    let data = await getData();
    let busqueda=data.filter(elemento=>elemento.title.toLowerCase()==texto.toLowerCase())//filter compara y trae todo el elemento
    console.log(busqueda);
    busqueda.forEach(element => {
        let {title,poster_path,vote_average,overview}=element;
        templateCard.querySelector('h5').textContent=title;
        templateCard.querySelector('img').setAttribute('src',IMG_PATH+poster_path);
        const clone=templateCard.cloneNode(true);//clona el nodo
        fragment.appendChild(clone);//apila los herores uno sobre otro eso hace appendchild
        console.log(fragment);
    });
    items.innerHTML ="";
    items.appendChild(fragment);//le entrego todo el fragmento a items
    
})
