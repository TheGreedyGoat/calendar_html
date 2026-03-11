
class Fetcher {
    static async tryFetch(url, callback) {
        let response = await fetch('https://proxy.corsfix.com/?' + url);
        let data = await response.json();
        callback(data);
    }
}
