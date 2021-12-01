
linkgral = "https://api.themoviedb.org/3/"
apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
linkimg =`https://image.tmdb.org/t/p/w200/`

const getPeliculasPopulares = () => {
    axios.get(`${linkgral}genre/movie/list${apiKey}`)
    .then(res =>{
        const peliculas = res.data.genres;
        peliculas.forEach(generos => {
           
    axios.get(`${linkgral}movie/popular${apiKey}`)
    .then(res =>{
        const peliculas = res.data.results;
        peliculas.forEach(pelicula => {
            if (pelicula.genre_ids[0] == generos.id) {
                document.getElementById("tablaprueba").insertRow(-1).innerHTML = `<td><img src="${linkimg}${pelicula.backdrop_path}" alt=""></td><td>${pelicula.title}</td><td>${pelicula.overview}</td><td>${generos.name}</td>`;
             }
             
           
        })
    })
})
})
}



const getPeliculas = () => {
  
}
getPeliculasPopulares()
getPeliculas()


