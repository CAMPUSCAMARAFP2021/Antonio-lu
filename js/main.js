
linkgral = "https://api.themoviedb.org/3/"
apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`

const getPeliculasPopulares = () => {
    axios.get(`${linkgral}movie/popular${apiKey}`)
    .then(res =>{
        const peliculas = res.data.results;
        peliculas.forEach(pelicula => {
            document.getElementById("tablaprueba").insertRow(-1).innerHTML = `<td></td><td>${pelicula.title}</td><td>${pelicula.overview}</td>`;
           
        })
    })
}



const getPeliculas = () => {
    axios.get(`${linkgral}genre/movie/list${apiKey}`)
    .then(res =>{
        const peliculas = res.data.genres;
        peliculas.forEach(pelicula => {
            document.getElementById("tablaprueba").insertRow(-1).innerHTML = `<td></td><td></td><td></td><td>${pelicula.name}</td>`;
           
        })
    })
}
getPeliculasPopulares()
getPeliculas()


