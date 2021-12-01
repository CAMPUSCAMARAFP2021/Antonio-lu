class DataProvider {
    
    linkapi = "https://api.themoviedb.org/3/"
    apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
    linkimg =`https://image.tmdb.org/t/p/w200/`

    endPoint(endPoint, params) {
        const url = this.linkapi + endPoint + this.apiKey
        return this.call(url, params)
    }

    call (url, params) {
      return fetch(url)
       .then(res => res.json())
       .catch(this.errorHandle)
    }

    errorHandle(error){
        throw new Error()
    }


}


class MoviesDataProvider extends DataProvider {

    endpoints = {
        genres: '/genres/movie/list',
        movies: '/movie',
        populars: '/movie/populars'
    };


    async getMovies(size = 10){
        return pelis = await this.endPoint(this.endpoints.movies, { size })
    }

    attachGenres(pelis, genres){
        return pelis;
    }

    getGenres(){
        return this.endPoint(this.endpoints.genres)
        
    }


}


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

movie = new MoviesFinder.render()
console.log(movie)
