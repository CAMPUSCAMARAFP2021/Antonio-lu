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

    imprimirtabla() {
        var table = this.creartabla()
        const pelisTitle = this.getMoviesWithGenres().then(respuesta => {
            respuesta.map(respuesta => {
                var rowas = this.Img(table, respuesta);
                this.Title(rowas, respuesta);
                this.genres(rowas, respuesta);
                var rows = this.overview(rowas, respuesta);
                var rows = this.views(rows, rowas, respuesta);
                var rows = this.popularity(rows, rowas, respuesta);
            })
        })
    }

    popularity(rows, rowas, respuesta) {
        var rows = this.crearCelda(rowas);
        rows.textContent = respuesta.popularity;
        return rows;
    }

    views(rows, rowas, respuesta) {
        var rows = this.crearCelda(rowas);
        rows.textContent = respuesta.vote_average;
        return rows;
    }

    overview(rowas, respuesta) {
        var rows = this.crearCelda(rowas);
        respuesta.overview == "" ? rows.textContent = "No disponible" : rows.textContent = respuesta.overview;
        return rows;
    }

    genres(rowas, respuesta) {
        var rowa = this.crearCelda(rowas);
        respuesta.genre_ids[0] == undefined ? rowa.textContent = "No disponible" : rowa.textContent = respuesta.genre_ids[0].name;
    }

    Title(rowas, respuesta) {
        var row = this.crearCelda(rowas);
        row.textContent = respuesta.original_title;
    }

    Img(table, respuesta) {
        var rowas = this.crearColumna(table);
        var src = respuesta.poster_path;
        var img = document.createElement('img');
        img.src = this.linkimg + src;

        src == null ? rowas.appendChild("no disponible en este momento") : rowas.appendChild(img);
        return rowas;
    }

    eliminardatos() {
        var table = document.getElementById('tabla')
        table.remove()
    }

    async imprimirTitulo() {
        var titulo = await this.getMoviesWithGenres().then(respuesta => respuesta.map(respus => respus.original_title));
        return titulo
    }

    creartabla() {
        var table = document.createElement('table');
        table.id = 'tabla';
        table.border = '0px'
        table.className = "tbl-header"
        document.body.appendChild(table)
        return table
    }
    crearColumna(table) {
        var row = table.insertRow(0)
        return row
    }
    crearCelda(columna) {
        var colum = columna.insertCell()
        return colum
    }
}

MoviesFind = new MoviesDataProvider