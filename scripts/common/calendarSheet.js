
class CalendarSheet{
    /**
     * 
     * @param {date} date 
     * @param {*} holidayData the fetched holiday json object 
     */
    constructor(date, holidayData){
        let dateOfFIrstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        

        this.firstofMonthIndex = (dateOfFIrstDay.getDay() + 6) % 7 // SUN = 0, 0 + 6 = 6, 6 % 7 = 6
        this.firstOfNextMonthIndex = 10

        this.monthNum  = dateOfFIrstDay.getMonth()
        this.year = dateOfFIrstDay.getFullYear()
        this.firstDateOfTable = new Date(dateOfFIrstDay)
        this.firstDateOfTable.setDate(this.firstDateOfTable.getDate() - this.firstofMonthIndex)

        this.dataStorage = [];  
        this.dateIndices = {};


        let cellDate = new Date(this.firstDateOfTable)

        for(let i = 0; i < 6 * 7; i++){ // 6 weeks * 7 days/week
            this.dataStorage.push(new DateData(cellDate))
            this.dateIndices[Fetcher.dateToJsonKey(cellDate)] = i;
            this.saveDateSpecificClasses(this.dataStorage[i], holidayData)
            cellDate.setDate(cellDate.getDate() + 1);

            if(i > this.firstofMonthIndex 
                && cellDate.getMonth() != this.monthNum 
                && cellDate.getDate() == 1){
                this.firstOfNextMonthIndex = i
            }
        }

    }

    /**
     * ermittelt und speichert alle Klassen der übergebenen Zelle im dataStorage
     * @param {DateData} dateData
     * @param {*} holidayData
     */
    saveDateSpecificClasses(dateData, holidayData){

        if(dateData.date.getMonth() != this.monthNum){
            dateData.addHTMLClass("other");
        }
        else{
            dateData.addHTMLClass("current");
        }
        //sunday
        if(dateData.date.getDay() == 0){
            dateData.addHTMLClass("sunday");
        }
        // weekday
        else{
            dateData.addHTMLClass("weekday");
        }

        dateData.holiday = "kein Feiertag :(";
        //Holidays => eigene Methode??
        for(let i = 0; i < holidayData.length; i++){
            let entry = holidayData[i.toString()];
           
            if(entry.date == Fetcher.dateToJsonKey(dateData.date)){
                // console.log(entry.date, Fetcher.dateToJsonKey(dateData.date));     
                //Save holiday in data object
                dateData.addHTMLClass("holiday");
                dateData.addHTMLClass(entry.localName);
                dateData.holiday = entry.localName;
            }
        }
    }

    /**
     * 
     * @param {number} w repräsentiert die Zeile (week)
     * @param {number} d repräsentiert die Spalte (day)
     * @returns gibt den zugehörigen 1D - Index zurück
     */
    static getIndexFromGrid(w, d){
        return w * 7 + d
    }


    /**
     * 
     * @param {number} w repräsentiert die Zeile (week)
     * @param {number} d repräsentiert die Spalte (day)
     * @returns 
     */
    getDataAtGridIndex(w, d){
        return this.dataStorage[CalendarSheet.getIndexFromGrid(w, d)]
    }

    /**
     * 
     * @param {Date} date has to be within the calendar sheet
     */
    getDataFromDate(date){
        let index  = this.dateIndices[Fetcher.dateToJsonKey(date)];
        if(!index) console.error("Invalid date", error);
        return this.dataStorage[index];
    }

    isDateOnSheet(date = new Date()){ // is it visible on the calendar sheet?
        let i = this.getIndexFromDate()
        return  i >= 0 && i < this.dataStorage.length
    }

    isDatePartOfMonth(date = new Date()){ // is it part of the core month?
        return date.getMonth() == this.monthNum
            &&  date.getFullYear() == this.year
    }
    
    toHTML(addHeader = true){
        let htmlSheet = document.createElement("table");
        htmlSheet.classList.add("calendar_sheet");

        if(addHeader) CalendarSheet.addWeekdayShortcuts(htmlSheet)

        for(let w = 0; w < 6; w++){
            let row = document.createElement("tr");
            row.classList.add("weekRow")
            for(let d = 0; d < 7; d++){
                let htmlCell = this.buildHTMLCell(w, d)
                row.appendChild(htmlCell);
            }
            htmlSheet.appendChild(row);
        }
        return htmlSheet;
    }



    static addWeekdayShortcuts(sheet){
        let headRow = document.createElement("tr");
        headRow.classList.add("calendarWeekRow");
        for(let wdString of CalendarTools.weekdays){
            let headCell = document.createElement("th");
            headCell.classList.add("calendarWeekCell");
            headCell.classList.add(wdString);
            headCell.innerText = wdString
            headRow.appendChild(headCell)
        }
        sheet.appendChild(headRow);
    }


    buildHTMLCell(w, d){
        let cellDate = this.getDataAtGridIndex(w, d).date
        
        let htmlCell = document.createElement("td");  // day
        let cellDiv = document.createElement("div"); // dateContainer
        
        cellDiv.addEventListener("click", function(event){
            sendMessageToAllWindows("click", {
                clickType: "date cell",
                clickValue: cellDate
            });
        })
        cellDiv.innerHTML = cellDate.getDate()
        cellDiv.classList.add("dateContainer");

        let evenOdd = CalendarSheet.getIndexFromGrid(w,d) % 2 === 0? "even":"odd";
        htmlCell.classList.add(evenOdd);

        this.setHTMLAttributes(htmlCell, w, d);
        htmlCell.appendChild(cellDiv);
        return htmlCell;
    }

    /**
     * 
     * @param {HTMLTableCellElement} htmlCell the htmnl cell to set the attributes to
     * @param {number} w 
     * @param {number} d 
     */
    setHTMLAttributes(htmlCell, w, d){
        let elemClasses = htmlCell.classList;
        elemClasses.add("day");

        let dateData = this.getDataAtGridIndex(w, d);
        let classes = dateData.getHTMLClasses();

        for(let i = 0; i < classes.length; i++){
            elemClasses.add(classes[i]);
        }
    }

}
/**
 * Wrapperstruktur, um datumsspezifische Informationen zu speichern
 */
class DateData{
    /**
     * @param {Date} date 
     */
    constructor(date){
        this.date = new Date(date)
        // attributes??
    }

    /**
     * 
     * @param {string} className 
     */
    addHTMLClass(className){
        className = className.replaceAll(' ', '-');
        this.classes = this.classes? this.classes : [];
        this.classes.push(className);
    }

    getHTMLClasses(){
        return this.classes? this.classes : []
    }

}
