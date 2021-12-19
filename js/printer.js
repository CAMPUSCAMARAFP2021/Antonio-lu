class printer extends tableFormat {

    printTable() {

        var table = this.createTable();
        if (table != null) {
            this.delete();
        }
        this.headers(table);
        const pelisTitle = this.dataTable(table);
    }

    delete() {
        var table = document.getElementById("tabla");
        var rows = table.getElementsByTagName("tr");
        if (rows.length > 0) {
            table.remove();
        }

    }

    popularity(rows, rowas, respuesta) {
        var rows = this.createCell(rowas);
        rows.textContent = respuesta.popularity;
        return rows;
    }

    views(rows, rowas, respuesta) {
        var rows = this.createCell(rowas);
        rows.textContent = respuesta.vote_average;
        return rows;
    }

    overview(rowas, respuesta) {
        var rows = this.createCell(rowas);
        respuesta.overview == "" ? rows.textContent = "No disponible" : rows.textContent = respuesta.overview;
        return rows;
    }

    genres(rowas, respuesta) {
        var rowa = this.createCell(rowas);
        respuesta.genre_ids[0] == undefined ? rowa.textContent = "No disponible" : rowa.textContent = respuesta.genre_ids[0].name;
    }

    Title(rowas, respuesta) {
        var row = this.createCell(rowas);
        row.textContent = respuesta.original_title;
    }

    Img(table, respuesta) {
        var rowas = this.createRow(table);
        var src = respuesta.poster_path;
        var img = document.createElement('img');
        img.src = this.linkimg + src;

        src == null ? rowas.appendChild("no disponible en este momento") : rowas.appendChild(img);
        return rowas;
    }
    async printTitle() {
        var titulo = await this.getMoviesWithGenres().then(answer => answer.map(answ => answ.original_title));
        return titulo;
    }
}

MoviesFind = new printer
