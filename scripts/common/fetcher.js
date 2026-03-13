
class Fetcher {
    static async tryFetch(url, callback) {
        let response = await fetch('https://proxy.corsfix.com/?' + url);
        console.log(response);
        let data = await response.json();
        callback(data);
    }
    static async tryFetchPokemon(pokeID, callback) {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokeID + '/');
        let data = await response.json();
        callback(data);
    }
}
