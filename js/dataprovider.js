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





