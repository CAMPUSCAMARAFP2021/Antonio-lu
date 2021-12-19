class tableFormat extends MoviesDataProvider{

    creartabla() {
        var table = document.createElement('table');
        table.id = 'tabla';
        table.border = '0px'
        table.className = "tbl-header"
        document.body.appendChild(table)
        return table
    }
    crearColumna(table) {
        var row = table.insertRow(0);
        return row;
    }
    crearCelda(columna) {
        var colum = columna.insertCell();
        return colum;
    }
    async datosTabla(table) {
        const respuesta = await this.getMoviesWithGenres();
        respuesta.map(respuesta_1 => {
            var rowas = this.Img(table, respuesta_1);
            this.Title(rowas, respuesta_1);
            this.genres(rowas, respuesta_1);
            var rows_3 = this.overview(rowas, respuesta_1);
            var rows_3 = this.views(rows_3, rowas, respuesta_1);
            var rows_3 = this.popularity(rows_3, rowas, respuesta_1);
        });
    }

    headers(table) {
        var header = this.createHeathers(table);
        header.textContent = "Imagen";

        var header = this.createHeathers(table);
        header.textContent = "Titulo";

        var header = this.createHeathers(table);
        header.textContent = "Genero";

        var header = this.createHeathers(table);
        header.textContent = "Descripcion";

        var header = this.createHeathers(table);
        header.textContent = "Media de votacion";

        var header = this.createHeathers(table);
        header.textContent = "Popularidad";
    }

    createHeathers(table) {
        var header = document.createElement('th');
        table.appendChild(header);
        return header;
    }
}

