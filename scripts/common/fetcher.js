
class Fetcher {
    static async tryFetch(url, callback) {
        let response = await fetch('https://proxy.corsfix.com/?' + url);
        let data = await response.json();
        callback(data);
    }
    static async tryFetchPokemon(pokeID, callback) {
        Fetcher.tryFetch('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/', callback)
    }
}
