

const getPeliculasPopulares = () => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res =>{
        const peliculas = res.data.results;// el body de la respuesta viene en la propiedad “data”
        peliculas.forEach(pelicula => {
            document.getElementById("tablaprueba").insertRow(-1).innerHTML = `<td></td><td>${pelicula.title}</td><td>${pelicula.overview}</td>`;
           
        })
    })
}


const getPeliculas = () => {
    fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES')
    .then(res=>res.json())
    .then(res => {
        const peliculas = res.results;
        peliculas.forEach(pelicula => {
            console.log(pelicula.name)
        })
    })
}
getPeliculasPopulares()
getPeliculas()


