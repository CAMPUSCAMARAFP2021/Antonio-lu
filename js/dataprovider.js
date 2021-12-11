class DataProvider {

    linkapi = "https://api.themoviedb.org/3/"
    apiKey = `?api_key=cea68b520beecac6718820e4ac576c3a&language=es-ES`
    linkimg = `https://image.tmdb.org/t/p/w200`



    endPoint(endPoint, params) {
        const url = this.linkapi + endPoint + this.apiKey
        return this.call(url, params)
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

hola = new DataProvider

class MoviesDataProvider extends DataProvider {

    endpoints = {
        genres: '/genre/movie/list',
        movies: 'movie',
        populars: 'movie/popular'
    };


    getMovies() {
        const pelis = this.endPoint(this.endpoints.populars)
        return pelis
    }

    async getimg() {
        const pelisTitle = await this.getMoviesWithGenres().then((respuesta) => respuesta.map(respuesta => respuesta.backdrop_path))
        const img = this.endPoint(pelisTitle)
        return img
    }



    getGenres() {
        const res = this.endPoint(this.endpoints.genres)
        return res
    }

    getMoviesWithGenres = async () => {
        // espero por la lista de generos que usando destructuring lo saco directamente encadenando un then;
        const genres = await this.getGenres().then(({ genres }) => genres);
        // devuelvo la lista de pelis transformada llamando al metodo siguiente por cada peli.
        return this.getMovies().then(({ results }) => results.map(movie => this.attachGenresToMovie(movie, genres)))
    }



    getgenreMoviesname = async () => {
        const pelis = await this.getMoviesWithGenres()
        pelis.forEach(element => {
            return element.genre_ids[0].name
        });
    }

    getMoviestitleGenre = async () => {
        var array = []
        const pelisGenre = await this.getMoviestitle()

        const pelisTitle = await this.getMoviesWithGenres()

        var result = pelisGenre.map(function (e) {
            return Object.assign({}, e, pelisTitle.map(resy => resy))
        })
        console.log(result)
        return this.getMoviesWithGenres()
    }


    async imprimirttodosdatos() {
        var table = document.getElementById("tabla");

        // Create an empty <tr> element and add it to the 1st position of the table:
        

        const pelisTitle = await this.getMoviesWithGenres().then((respuesta) => respuesta.map(respuesta => {respuesta.original_title + " , " + respuesta.genre_ids[0].name + " , " + respuesta.overview
            var row = table.insertRow(1);
            row.textContent = respuesta.original_title
            var rows = row.insertCell();
            rows.textContent = respuesta.genre_ids[0].name
            var rowa = row.insertCell();
            rowa.textContent = respuesta.overview
        })
        )
    }
        

    getMoviestitle = async () => {

        const pelisTitle = await this.getMoviesWithGenres().then((respuesta) => respuesta.map(respuesta => respuesta.original_title + " , " + respuesta.genre_ids[0].name + " , " + respuesta.overview))
        return pelisTitle
    }

    getSrcPelis = async () => {
        const pelisTitle = await this.getMoviesWithGenres().then((respuesta) => respuesta.map(respuesta => respuesta.backdrop_path))
        return pelisTitle
    }

    async getimg() {
        const img = this.getSrcPelis().then(respuesta => this.linkimgs(respuesta).then(resp => resp))
        return img
    }

    // este metodo cambia el array de ids de generos de un "movie" por un array de generos ( objeto )
    attachGenresToMovie = (movie, genres) => {
        movie.genre_ids = movie.genre_ids.map((genreId => genres.find(genre => genre.id === genreId)));
        return movie;
    }
    prueba() {
        var pelisGenre = this.getMoviesWithGenres().then(resu => resu.map((res, m) => {
            res.original_title
            m.genre_ids[0].name
        }))
        return pelisGenre
    }

}

ejemplo = new MoviesDataProvider

class imprimir extends MoviesDataProvider {

    imprimirImagenes() {

        const imagen = document.createElement('img')
        imagen.src = MoviesDataProvider.getSrcPelis
        document.body.appendChild(imagen);
    }

}

hola = new imprimir

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



var nameArr = [{ "name": "john" }, { "name": "carl" }, { "name": "peter" }]
var ageArr = [{ "age": "22" }, { "age": "21" }, { "age": "32" }]

var result = nameArr.map(function (e, i) {
    return Object.assign({}, e, ageArr[i])
})
console.log(result)