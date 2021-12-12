class DataProvider {

    linkapi = "https://api.themoviedb.org/3/"
    apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
    linkimg = `https://image.tmdb.org/t/p/w200`



    endPoint(endPoint, params) {
        const url = this.linkapi + endPoint + this.apiKey
        return this.call(url, params)
    }

    endPoints(endPoint, endpoints, movie) {
        const url = this.linkapi + endPoint + this.apiKey + endpoints + movie
        return this.call(url)
    }

    linkimgs(endPoint) {
        const url = this.linkimg + endPoint
        return this.call(url)
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
        populars: 'movie/popular',
        search: `search/movie`,
        query: `&query=`
    };


    getMovies() {
        const peliUser = document.getElementById('buscador-top').value
        const peliSearch = this.endPoints(this.endpoints.search, this.endpoints.query, peliUser)
        return peliSearch
    }

    async getimg() {
        const pelisTitle = await this.getMoviesWithGenres().then((respuesta) => respuesta.map(respuesta => respuesta.backdrop_path))
        const img = this.endPoint(pelisTitle)
        return img
    }

    getGenres() {
        const res = this.endPoint(this.endpoints.genres, this.endpoints.query)
        return res
    }

    getMoviesWithGenres = async () => {
        const genres = await this.getGenres().then(({ genres }) => genres);
        return this.getMovies().then(({ results }) => results.map(movie => this.attachGenresToMovie(movie, genres)))
    }

    attachGenresToMovie = (movie, genres) => {
        movie.genre_ids = movie.genre_ids.map((genreId => genres.find(genre => genre.id === genreId)));
        return movie;
    }


    imprimirttodosdatos() {
        var table = document.getElementById("tabla")
        const pelisTitle = this.getMoviesWithGenres().then((respuesta) => {
            respuesta; respuesta.map(respuesta => {

                var rowas = table.insertRow(1);
                var src = respuesta.poster_path
                var img = document.createElement('img')
                img.src = this.linkimg + src
                rowas.appendChild(img)
                
                var row = rowas.insertCell();
                row.textContent = respuesta.original_title

                var rowa = rowas.insertCell();
                rowa.textContent = respuesta.genre_ids[0].name
                
                var rows = rowas.insertCell();
                rows.textContent = respuesta.overview

                var rows = rowas.insertCell();
                rows.textContent = respuesta.vote_average

                var rows = rowas.insertCell();
                rows.textContent = respuesta.popularity
                

            })
        })
    }
}

ejemplo = new MoviesDataProvider

