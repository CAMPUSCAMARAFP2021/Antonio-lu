class printer extends tableFormat {

    imprimirtabla() {

        var table = this.creartabla();
        if (table != null) {
            this.borrar();
        }
        this.headers(table);
        const pelisTitle = this.datosTabla(table);
    }

    borrar() {
        var table = document.getElementById("tabla");
        var rows = table.getElementsByTagName("tr");
        if (rows.length > 0) {
            table.remove();
        }

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
    async imprimirTitulo() {
        var titulo = await this.getMoviesWithGenres().then(respuesta => respuesta.map(respus => respus.original_title));
        return titulo;
    }
}

MoviesFind = new printer
