class DataProvider {

    linkapi = "https://api.themoviedb.org/3/"
    apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
    linkimg = `https://image.tmdb.org/t/p/w200/`



    endPoint(endPoint, params) {
        const url = this.linkapi + endPoint + this.apiKey
        return this.call(url, params)
    }

    async call(url) {
        try {
            const res = await fetch(url)
            return await res.json()
        } catch (error) {
            return this.errorHandle(error)
        }
    }

    errorHandle(error) {
        throw new Error()
    }


}


class MoviesDataProvider extends DataProvider {

    endpoints = {
        genres: '/genre/movie/list',
        movies: 'movie',
        populars: 'movie/popular'
    };


    async getMovies() {
        const pelis = this.endPoint(this.endpoints.populars)
        return pelis
    }
   
    

    getGenres() {
        const res = this.endPoint(this.endpoints.genres)
        return res
    }
    
     getMoviesWithGenres = async () => {
        // espero por la lista de generos que usando destructuring lo saco directamente encadenando un then;
        const genres = await this.getGenres().then(({genres}) => genres);  
        // devuelvo la lista de pelis transformada llamando al metodo siguiente por cada peli.
        return this.getMovies().then(({results}) => results.map(movie => this.attachGenresToMovie(movie,genres)))
    } 
    
    
    
    // este metodo cambia el array de ids de generos de un "movie" por un array de generos ( objeto )
     attachGenresToMovie = (movie, genres) => {
       movie.genres = movie.genres.map((genreId => genres.find(genre => genre.id === genreId)));
       return movie;
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
        var pelis = await this.provider.getMovies();
        var genres = this.provider.getGenres();
       // this.pelis = this.provider.getMoviesWithGenres(pelis, genres)
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
es = new MoviesFinder();
es.getMovies



