class tableFormat extends MoviesDataProvider{

    createTable() {
        var table = document.createElement('table');
        table.id = 'tabla';
        table.border = '0px'
        table.className = "tbl-header"
        document.body.appendChild(table)
        return table
    }
    
    createRow(table) {
        var row = table.insertRow(0);
        return row;
    }

    createCell(cell) {
        var colum = cell.insertCell();
        return colum;
    }
    async dataTable(table) {
        const answer = await this.getMoviesWithGenres();
        answer.map(answer_1 => {
            var rowas = this.Img(table, answer_1);
            this.Title(rowas, answer_1);
            this.genres(rowas, answer_1);
            var rows_3 = this.overview(rowas, answer_1);
            var rows_3 = this.views(rows_3, rowas, answer_1);
            var rows_3 = this.popularity(rows_3, rowas, answer_1);
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

