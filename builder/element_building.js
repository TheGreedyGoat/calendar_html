const CONTENT = document.querySelector("#content");
let year = 2026;

let hData;

getData(year);


async function getData(year) {
  const url = `https://pokeapi.co/api/v2/pokemon/5/`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        // console.log(typeof(response))
        dosStuffWithThatJSONThingy(result);
    } catch (error) {
        console.error(error.message);
    }
}


function dosStuffWithThatJSONThingy(jsonThingy){
    hData = jsonThingy;
    console.log(jsonThingy['name']);
    document.querySelector('#target').src = jsonThingy['sprites']['front_default']
}

