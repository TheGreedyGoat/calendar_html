
class CalendarSheet{
    static weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
    /**
     * 
     * @param {date} date 
     */
    constructor(date){
        this.setup(date);
    }

    /**
     * 
     * @param {Date} date 
     */
    setup(date){
        if(this.dateOfFirstDay && date.getMonth() == this.dateOfFirstDay.getMonth() && date.getFullYear() == this.dateOfFirstDay.getFullYear()){
            return;
        }
        this.dateOfFirstDay = new Date(date.getFullYear(), date.getMonth(), 1)

        this.firstofMonthIndex = (this.dateOfFirstDay.getDay() + 6) % 7 // SUN = 0, 0 + 6 = 6, 6 % 7 = 6
        this.firstOfNextMonthIndex = 10

        this.monthNum  = this.dateOfFirstDay.getMonth()
        this.year = this.dateOfFirstDay.getFullYear()
        this.firstDateOfTable = new Date(this.dateOfFirstDay)
        this.firstDateOfTable.setDate(this.firstDateOfTable.getDate() - this.firstofMonthIndex)

        if(!this.dataStorage){
            this.buildDataStorage();
        }else{
            this.updateDates();
        }
    }

    /**
     * DON'T CALL FROM OUTSIDE! Use this.setup(date) instead!
     */
    buildDataStorage(){
        this.dataStorage = [];  

        for(let i = 0; i < 6 * 7; i++){ // 6 weeks * 7 days/week
            this.dataStorage.push(new DateData())
        }

        
        this.buildDOMTable();
        this.updateDates();
        
    }

    
    /**
     * DON'T CALL FROM OUTSIDE! Use this.setup(date) instead!
     */
    updateDates(){
        let cellDate = new Date(this.firstDateOfTable)
        for(let i = 0; i < 6 * 7; i++){ // 6 weeks * 7 days/week
            this.dataStorage[i].setDate(cellDate);

            cellDate.setDate(cellDate.getDate() + 1);
            if(i > this.firstofMonthIndex 
                && cellDate.getMonth() != this.monthNum 
                && cellDate.getDate() == 1){
                this.firstOfNextMonthIndex = i
            }
        }
        this.updateDOM();
    }


    /**
     * call to completely rebuild the dom only! To update values use updateDOM() instead
     */
    buildDOMTable(){
        this.htmlSheet = document.createElement("table");
        this.htmlSheet.classList.add("calendar_sheet");
        this.htmlSheet.innerText = ''

        // if(addHeader) CalendarSheet.addWeekdayShorthands(this.htmlSheet);
        this.htmlSheet.appendChild(CalendarSheet.getHeaderRow());
        
        for(let w = 0; w < 6; w++){
            let row = document.createElement("tr");
            row.classList.add("weekRow")
            for(let d = 0; d < 7; d++){
                
                let htmlCell = document.createElement("td");  // day
                let cellDiv = document.createElement("div"); // dateContainer
                cellDiv.classList.add("dateContainer");
                htmlCell.appendChild(cellDiv);

                row.appendChild(htmlCell);
                this.dataStorage[CalendarSheet.getIndexFromGrid(w,d)].setHTMLCell(htmlCell);
            }
            this.htmlSheet.appendChild(row);
        }
    }

    updateDOM(){
        let isEven = true;
        for(let data of this.dataStorage){
            data.htmlCell.querySelector('.dateContainer').innerText = data.date.getDate();
            this.saveDateSpecificClasses(data);
            data.addHTMLClass(isEven? 'even' : 'odd');
            isEven = !isEven;
        }
    }
    
    buildHTMLCell(w, d){
        let cellDate = this.getDataAtGridIndex(w, d).date
        let content = cellDate.getDate();
        cellDiv.innerHTML = content;
        let evenOdd = CalendarSheet.getIndexFromGrid(w,d) % 2 === 0? "even":"odd";
        htmlCell.classList.add(evenOdd);
        this.setHTMLAttributes(htmlCell, w, d);

        return htmlCell;
    }



    /**
     * @param {number} differenceSigned 
     */
    IncreaseOrDecreaseMonth(differenceSigned){
        let newDate = new Date(this.dateOfFirstDay.getTime());
        newDate.setMonth(newDate.getMonth() + differenceSigned);


        this.setup(newDate);
    }

    /**
     * ermittelt und speichert alle Klassen der übergebenen Zelle im dataStorage
     * @param {DateData} dateData
     */
    saveDateSpecificClasses(dateData){

        
        dateData.clearHTMLClasses();

        dateData.addHTMLClass('day');
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


    getDataFromDate(date){
        return this.dataStorage[date.getDate() + this.firstofMonthIndex - 1];
    }

    /**
     * 
     * @param {Date} date
     * @returns {Array<string>} die Namen aller gespeicherten Feiertage
     */
    getHolidays(date) {
        let data = this.getDataFromDate(date);
        if(!data) return null;      // <- if the date is not within the sheet. Probably need better handling
        else return data.holidays;
    }

    isDateOnSheet(date = new Date()){ // is it visible on the calendar sheet?
        let i = this.getIndexFromDate()
        return  i >= 0 && i < this.dataStorage.length
    }

    isDatePartOfMonth(date = new Date()){ // is it part of the core month?
        return date.getMonth() == this.monthNum
            &&  date.getFullYear() == this.year
    }
    
    toHTML(){
        return this.htmlSheet;
    }


    /**
     * Um jederzeit von außen die Funktionalität bestimmen zu können
     * @param {function} func Funktion, die ein Datum entgegennimmt
     */
    addDateClickEvent(func){
        for(let data of this.dataStorage){
            data.htmlCell.addEventListener('click', () => {
                func(data.date);
            })
        }
    }

    static getHeaderRow(){
        let headRow = document.createElement("tr");
        headRow.classList.add("calendarWeekRow");
        for(let wdString of CalendarSheet.weekdays){
            let headCell = document.createElement("th");
            headCell.classList.add("calendarWeekCell");
            headCell.classList.add(wdString);
            headCell.innerText = wdString
            headRow.appendChild(headCell)
        }
        return headRow;
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
 * Beinhaltet: 
 * -Datum
 * -Feiertage
 * -DOM-Elemente
 */
class DateData{
    /**
     * @param {Date} date 
     */
    constructor(){
    }

    /**
     * 
     * @param {string} className 
     */
    addHTMLClass(className){
        className = className.replaceAll(' ', '-');
        this.classes.push(className);
        this.htmlCell.classList.add(className);
    }
    setDate(date){
        this.date = new Date(date);
    }
    clearHTMLClasses(){
        this.classes = [];
        this.htmlCell.setAttribute('class', '');
    }

    getHTMLClasses(){
        return this.classes? this.classes : []
    }

    setHTMLCell(cell){
        this.htmlCell = cell;
    }

}
