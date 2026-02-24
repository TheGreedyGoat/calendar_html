
class CalendarSheet{
    constructor(date  = new Date()){
        let dateOfFIrstDay = new Date(date.getFullYear(), date.getMonth(), 1)
       
        this.firstofMonthIndex = (dateOfFIrstDay.getDay() + 6) % 7 // SUN = 0, 0 + 6 = 6, 6 % 7 = 6
        this.firstOfNextMonthIndex = 10
        this.monthNum  = dateOfFIrstDay.getMonth()
        this.year = dateOfFIrstDay.getFullYear()
        this.firstDateOfTable = new Date(dateOfFIrstDay)
        this.firstDateOfTable.setDate(this.firstDateOfTable.getDate() - this.firstofMonthIndex)

        this.table = []
        let cellDate = new Date(this.firstDateOfTable)

        for(let d = 0; d < 6 * 7; d++){ // 6 weeks * 6 days
            this.table.push(new DateData(cellDate))
            cellDate.setDate(cellDate.getDate() + 1);

            if(d > this.firstofMonthIndex 
                && cellDate.getMonth() != this.monthNum 
                && cellDate.getDate() == 1){
                this.firstOfNextMonthIndex = d
            }
        }

    }

    static getSheet(date = new date()){
        return new CalendarSheet(date);
    }

    static getIndexFromGrid(w, d){
        return w * 7 + d
    }


    getDataAtGridIndex(w, d){
        return this.table[CalendarSheet.getIndexFromGrid(w, d)]
    }

    getIndexFromDate(date = new Date()){
        return CalendarTools.daysBetweenSigned(date, this.firstDateOfTable)
    }

    isDateOnSheet(date = new Date()){ // is it visible on the calendar sheet?
        let i = this.getIndexFromDate()
        return  i >= 0 && i < this.table.length
    }

    isDatePartOfMonth(date = new Date()){ // is it part of the core month?
        return date.getMonth() == this.monthNum
            &&  date.getFullYear() == this.year
    }
    
    toHTML(addHeader = true){
        let htmlSheet = document.createElement("table");
        htmlSheet.classList.add("calendar_sheet");

        if(addHeader) CalendarSheet.addHeader(htmlSheet)

        for(let w = 0; w < 6; w++){
            let row = document.createElement("tr");
            row.classList.add("weekRow")
            for(let d = 0; d < 7; d++){
                let htmlCell = this.buildHTMLCell(w, d)
                this.setCellAttributes(htmlCell, w, d)
                row.appendChild(htmlCell);
            }
            htmlSheet.appendChild(row);
        }
        return htmlSheet;
    }

    static addHeader(sheet){
        let headRow = document.createElement("tr");
        headRow.classList.add("calendarWeekRow");
        for(let wdString of CalendarTools.weekdays){
            console.log(wdString)
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
        let numClass = CalendarSheet.getIndexFromGrid(w,d) % 2 === 0? "even":"odd"
        htmlCell.classList.add(numClass)
        htmlCell.appendChild(cellDiv)
        return htmlCell;
    }

    setCellAttributes(htmlCell, w, d){
        let elemClasses = htmlCell.classList;
        elemClasses.add("day");
        let cIndex = CalendarSheet.getIndexFromGrid(w, d);

        //current or other month
        if(cIndex < this.firstofMonthIndex || cIndex > this.firstOfNextMonthIndex){
            elemClasses.add("other");
        }
        else{
            elemClasses.add("current");
        }
        //sunday
        if(d == 6){
            elemClasses.add("sunday");
        }
        // weekday
        else{
            elemClasses.add("weekday");
        }
    }

}

class DateData{
    constructor(date = new Date()){
        this.date = new Date(date)
        // attributes??
    }

    addNote(noteText = "I didnt get anything to type into the note :("){
        if(this.dailyNotes === undefined){ this.dailyNotes = []}
        this.dailyNotes.add(noteText)
    }
}
