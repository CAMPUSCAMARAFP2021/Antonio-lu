class MoviesDataProvider extends DataProvider {

    endpoints = {
        genres: '/genre/movie/list',
        movies: 'movie',
        populars: 'movie/popular',
        search: `search/movie`,
        query: `&query=`
    };


    getMovies() {
        const movieUser = document.getElementById('buscador-top').value
        const movieSearch = this.endPoints(this.endpoints.search, this.endpoints.query, movieUser)
        return movieSearch
    }

    async getimg() {
        const moviesTitle = await this.getMoviesWithGenres().then((answer) => answer.map(answer => answer.backdrop_path))
        const img = this.endPoint(moviesTitle)
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
    
}





