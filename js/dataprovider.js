class DataProvider {
    
    linkapi = "https://api.themoviedb.org/3/"
    apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
    linkimg =`https://image.tmdb.org/t/p/w200/`

    link = "https://api.themoviedb.org/3/movie/popular?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES"

    endPoint(endPoint, params) {
        const url = this.linkapi + endPoint + this.apiKey
        return this.call(url, params)
    }

    async call (url) {
      try {
            const res = await fetch(url)
            return await res.json()
        } catch (error) {
            return this.errorHandle(error)
        }
    }

    errorHandle(error){
        throw new Error()
    }


}


class MoviesDataProvider extends DataProvider {

    endpoints = {
        genres: '/genre/movie/list',
        movies: 'movie',
        populars: 'movie/popular'
    };


    async getMovies(){
        return pelis = await this.endPoint(this.endpoints.populars)
        
        //Devolucion de las peliculas con todos los datos propios

        .then(res =>{
            const peliculas = res.results;
            peliculas.forEach(pelicula => {
                console.log(pelicula)
            })
        })
    }


     getpopMovies(){
        return pelispop =  this.endPoint(this.endpoints.populars)
       
    }

    attachGenres(pelis){
        return pelis;
    }

     getGenres(){
        const res =  this.endPoint(this.endpoints.genres)
        
        //Nos devuelve los resultados de la promesa que son los generos con todos los datos
        .then(ress =>{
            const peliculas = ress.genres;
            peliculas.forEach(pelicula => {
                console.log(pelicula.name)
            })
        })
}
}
ejemplo = new MoviesDataProvider



class MoviesFinder {

    pelis

    constructor() {
        this.provider = new MoviesDataProvider();
        this.loadData();
    }
    
    async loadData() {
       pelis = await this.provider.getMovies();
       genres = await this.provider.getGenres();
       this.pelis = this.provider.attachGenres(pelis, genres)
    }

    render() {
        renderedPelis = this.pelis.map(this.renderPeli)
    }

    renderPeli(peli) {
        const img = document.createElement('img').src = peli.poster_path;
        img.alt = peli.title;
        return document.createElement('div').append(img).innerHTML = peli.title;
    }
}


