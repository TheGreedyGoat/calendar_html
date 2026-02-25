const CONTENT = document.querySelector("#content");
let year = 2026;

let hData;

getData(year);


async function getData(year) {
  const url = `https://digidates.de/api/v1/germanpublicholidays?year=${year}&region=de`;

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
    console.log(jsonThingy);
    for(let m = 1; m <= 12; m++){
        for(let d = 1; d <= 31; d++){
            let entry = jsonThingy[CalendarTools.valuesToJsonDKey(year, m, d)];
            if(entry) console.log(entry);
        }
    }
}

