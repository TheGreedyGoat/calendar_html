const COUNTY_CODES = 
{"Baden-Württemberg": "DE-BW",
"Bayern": "DE-BY",
"Berlin": "DE-BE",
"Brandenburg": "DE-BB",
"Bremen": "DE-HB",
"Hamburg": "DE-HH",
"Hessen": "DE-HE",
"Mecklenburg-Vorpommern": "DE-MV",
"Niedersachsen": "DE-NI",
"Nordrhein-Westfalen": "DE-NW",
"Rheinland-Pfalz": "DE-RP",
"Saarland": "DE-SL",
"Sachsen": "DE-SN",
"Sachsen-Anhalt": "DE-ST",
"Schleswig-Holstein": "DE-SH",
"Thüringen": "DE-TH"
};

class Fetcher{
    static holidaysByYear = {}


    static async tryFetchForYear(year){
        if(Fetcher.isYearFetched(year)) return;
        let url = `https://date.nager.at/api/v3/publicholidays/${year}/DE`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            // console.log(typeof(response))
            Fetcher.holidaysByYear[year.toString()] = result;
            console.log("1",Fetcher.holidaysByYear[year])
        } catch (error) {
            console.error(error.message);
        }
    }

    static isYearFetched(year){
        return Fetcher.holidaysByYear[year] != undefined;
    }

    static async getHolidaysOfYear(year){
        
        if(!Fetcher.isYearFetched(year)){

            await Fetcher.tryFetchForYear(year);
        }
        console.log(Fetcher.holidaysByYear[year]);
        return Fetcher.holidaysByYear[year];
    }

    /**
     * 
     * @param {Date} date 
     */
    static getHolidaysFromDate(date){
        return Fetcher.getHolidayFromValues(date.getFullYear(), date.getMonth(), date.getDate());
    }

    static async getHolidayFromValues(y, m, d){
        let pack = Fetcher.getHolidaysOfYear(y);

    }

    static dateToJsonKey(date = new Date()){
        return this.valuesToJSONKey(date.getFullYear(), date.getMonth(), date.getDate());
    }
    /**
     * 
     * @param {number} y 
     * @param {number} m 
     * @param {number} d 
     */
    static valuesToJSONKey(y, m, d){
        return `${Fetcher.nDigitNumber(y, 4)}-${Fetcher.nDigitNumber(m, 2)}-${Fetcher.nDigitNumber(d, 2)}`;
    }
    /**
     * 
     * @param {number} n the number to represent
     * @param {number} digits the numbers of digits
     * @returns 
     */
    static nDigitNumber(n, digits){
        let result  = n.toString();
        while(result.length < digits){
            result = "0" + result;
        }

        return result;
    }
}


/**
 * {
 * year : data
 * }
 */