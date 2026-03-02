

class Holidays{
    
    static SUNDAY_LETTERS = ["G","E","D","C","B","G","F","E","D","B","A","G","F","D","C","B","A","F","E","D","C","A","G","F","E","C","B","A"]
    static DAY_LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
    static GN_TABLE = {
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
    static D_HOLIDAY_NAMES = [
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
    static D_HOLIDAY_DELAYS = [-52,-48,-47,-46,- 2, 0, +1, +39, +50, +60,];
    /**
     * {
     *  year: {
     *          month:{
     *              day: "Feiertag"
     *          }
     *      }
     * }
     */
    static HOLIDAYS_BY_YEAR = {};


    static calculateEasterSunday(year){
        let goldenNumber = (year + 1) % 19;
        let sunCircle = (year + 9) % 28;

        let sundayLetter = Holidays.SUNDAY_LETTERS[sunCircle];   // der Tagesbuchstabe des Ostersonntags
        let easterBorderDelay = Holidays.GN_TABLE[goldenNumber];
        let easterDate = new Date(year, 2, 21); //
        if(easterBorderDelay === 29 ||easterBorderDelay === 28){
            if(Holidays.DAY_LETTERS[easterBorderDelay % 7] === sundayLetter){ // da jeder Sonntag desselben jahres denselben Buchstaben hat
                easterDate.setDate(easterDate.getDate() + easterBorderDelay);
                return easterDate;
            } else{
                easterBorderDelay--;
            }
        }
        let easterBorderDayLetterIndex = easterBorderDelay % 7;
        for(let i = 1; i < 8; i++){                                 // i < 7 eigentlich redundant, aber sicher ist sicher
            let currentIndex = (i + easterBorderDayLetterIndex) % 7;  // wir wollen beim Vollmondbuchstaben starten. % für wrapping.

            if(Holidays.DAY_LETTERS[currentIndex] === sundayLetter){
                easterDate.setDate(easterDate.getDate() + easterBorderDelay + i)
                return easterDate;
            }
        }
        return new Date(2, 2, 2)

    }

    static getEasterDependentHolidayDates(year){
        let easterSunday = Holidays.calculateEasterSunday(year);
        let holidayDates = []
        for(let i  = 0; i < Holidays.D_HOLIDAY_DELAYS.length; i++){
            let date = new Date(easterSunday);
            date.setDate(date.getDate() + Holidays.D_HOLIDAY_DELAYS[i]);
            holidayDates.push(date);
        }
        return holidayDates;
    }

    /**
     * 
     * @param {number} year 
     */
    static addHolidaysOfYear(year){
        let holidays = Holidays.getEasterDependentHolidayDates(year);
        
        Holidays.HOLIDAYS_BY_YEAR[year] = {}
        for(let i = 0; i < holidays.length; i++){
            let date  = holidays[i];
            if(!Holidays.HOLIDAYS_BY_YEAR[year][date.getMonth()]) Holidays.HOLIDAYS_BY_YEAR[year][date.getMonth()] = {};
            Holidays.HOLIDAYS_BY_YEAR[year][date.getMonth()][date.getDate()] = Holidays.D_HOLIDAY_NAMES[i];
        }
    }

    /**
     * 
     * @param {number} year 
     * @param {number} month 
     */
    static getEasterHolidaysOfYear(year){
        if(!Holidays.HOLIDAYS_BY_YEAR[year]) Holidays.addHolidaysOfYear(year);
        return Holidays.HOLIDAYS_BY_YEAR[year]
    }

    /**
     * 
     * @param {number} year 
     * @param {number} month 
     * @returns the months holidays if existing, undefined else;
     */
    static getEasterHolidaysOfMonth(year, month){
        let yearly = Holidays.getEasterHolidaysOfYear(year);
        return yearly[month];
    }

    /**
     * 
     * @param {Date} date 
     * @returns {string} a string of all holidays at the given date, separated by commas
     */
    static getHolidays(date){
        let monthly = Holidays.getEasterHolidaysOfMonth(date.getFullYear(), date.getMonth());
        let hDays = '';
        if(monthly && monthly[date.getDate()]){
            hDays += monthly[date.getDate()];
        }
        let fixed = FIXED_HOLIDAYS[`${date.getDate()}.${date.getMonth() + 1}`];
        hDays += fixed? fixed : '';
        return hDays;
    }
}
