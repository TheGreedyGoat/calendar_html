
const SUNDAY_LETTERS = ["G","E","D","C","B","G","F","E","D","B","A","G","F","D","C","B","A","F","E","D","C","A","G","F","E","C","B","A"]
const DAY_LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const GN_TABLE = {
    //keys: goldene Zahl, 
    // values : Tage des Vollmonddatums nach dem 21. März,
        // gleichzeitig der Index im Computus
    14 : 1,
    3  : 2,
    11 : 4,
    19 : 6,
    8  : 7,
    16 : 9,
    5  : 10,
    13 : 12,
    2  : 13,
    10 : 15,
    18 : 17,
    7  : 18,
    15 : 20,
    4  : 21,
    12 : 23,
    1  : 24,
    9  : 26,
    17 : 28,
    6  : 29
};
const D_HOLIDAY_NAMES = [
    "Weiberfastnacht",    
    "Rosenmontag",        
    "Karnevalsdienstag",  
    "Aschermittwoch",     
    "Karfreitag",         
    "Ostersonntag",       
    "Ostermontag",        
    "Christi Himmelfahrt",
    "Pfingstmontag",      
    "Fronleichnam",
]       
const D_HOLIDAY_DELAYS = [-52,-48,-47,-46,- 2, 0, +1, +39, +50, +60,]

const HOLIDAYS_BY_YEAR = {}

const SUB_HOLIDAYS = ["Tolkien-Tag, 3.1.", "e-day, 27.1","Pokemon Day, 27.2."]

addHolidaysOfYear(2026);
console.log(HOLIDAYS_BY_YEAR);


function calculateEasterSunday(year){
    let goldenNumber = (year + 1) % 19;
    let sunCircle = (year + 9) % 28;

    let sundayLetter = SUNDAY_LETTERS[sunCircle];   // der Tagesbuchstabe des Ostersonntags
    let easterBorderDelay = GN_TABLE[goldenNumber];
    let easterDate = new Date(year, 2, 21); //
    if(easterBorderDelay === 29 ||easterBorderDelay === 28){
        if(DAY_LETTERS[easterBorderDelay % 7] === sundayLetter){ // da jeder Sonntag desselben jahres denselben Buchstaben hat
            easterDate.setDate(easterDate.getDate() + easterBorderDelay);
            return easterDate;
        } else{
            easterBorderDelay--;
        }
    }
    let easterBorderDayLetterIndex = easterBorderDelay % 7;
    for(i = 1; i < 8; i++){                                 // i < 7 eigentlich redundant, aber sicher ist sicher
        let currentIndex = (i + easterBorderDayLetterIndex) % 7;  // wir wollen beim Vollmondbuchstaben starten. % für wrapping.

        if(DAY_LETTERS[currentIndex] === sundayLetter){
            easterDate.setDate(easterDate.getDate() + easterBorderDelay + i)
            return easterDate;
        }
    }
    return new Date(2, 2, 2)

}

function getEasterDependentHolidayDates(year){
    let easterSunday = calculateEasterSunday(year);
    let holidayDates = []
    for(let i  = 0; i < D_HOLIDAY_DELAYS.length; i++){
        let date = new Date(easterSunday);
        date.setDate(date.getDate() + D_HOLIDAY_DELAYS[i]);
        holidayDates.push(date);
    }
    return holidayDates;
}

/**
 * 
 * @param {number} year 
 */
function addHolidaysOfYear(year){
    let dependend = getEasterDependentHolidayDates(year);
    
    HOLIDAYS_BY_YEAR[year] = {}
    for(let i = 0; i < dependend.length; i++){
        let date  = dependend[i];
        if(!HOLIDAYS_BY_YEAR[year][date.getMonth()]) HOLIDAYS_BY_YEAR[year][date.getMonth()] = {};
        HOLIDAYS_BY_YEAR[year][date.getMonth()][date.getDate()] = D_HOLIDAY_NAMES[i];
    }
}
