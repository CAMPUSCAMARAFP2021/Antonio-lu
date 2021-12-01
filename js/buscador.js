linkgral = "https://api.themoviedb.org/3/"
apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
linkimg =`https://image.tmdb.org/t/p/w200/`

const Search =  () =>{
    axios.get(`${linkgral}movie/popular${apiKey}`)
    .then(res =>{
        const peliculas = res.data.results;
        peliculas.forEach(pelicula => {
            console.log(pelicula.id)
            axios.get(`${linkgral}movie/popular${apiKey}`)
            if (pelicula.title == document.getElementById('buscador-top').value) {
                console.log(pelicula.title)
            }
            
        
    })
})
}