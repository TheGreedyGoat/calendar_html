const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

class CalendarSheet{
    constructor(date = new Date()){
        this.month = months[date.getMonth()]
        this.year = date.getFullYear()

        let cellDate = dateCopy(date);
        let day = cellDate.getDay()
        let daysSinceLastMonday
        if(day !== 0){
            daysSinceLastMonday = day % 7
        }else{
            daysSinceLastMonday = 6
        }
        cellDate.setDate(cellDate.getDate() - daysSinceLastMonday)

        this.dataTable = []
        this.htmlTable = new Table(6, 7)
        this.htmlTable.setHeader(weekdays)
        this.htmlTable.setAttribute("class", "calendarSheet")
        for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
            this.dataTable.push([])
            for(let d = 0; d < 7; d++){ 
                // fill data table
                this.dataTable[w].push(dateCopy(cellDate))
                cellDate.setDate(cellDate.getDate() + 1)
                //fill HTML table
                let htmlCell = this.htmlTable.getCell(w,d)
                htmlCell.content = cellDate.getDate()

                // set Attributes
                if(cellDate.getMonth() == date.getMonth()){ 
                if(cellDate.getDay() === 0){ // => sundy
                    htmlCell.setAttribute("class", "sundayCurrent")
                }else{
                    htmlCell.setAttribute("class", "current")
                }
                }else if(cellDate.getDay() === 0){
                    htmlCell.setAttribute("class", "sundayOther")
                }
                htmlCell.addAttributeValue("class", "day")
            }
        }
    }

    toHTML(addHeader  =false){
        let html = ""

        if(addHeader){
            let elem = document.createElement("h3")
            elem.innerHTML = `${this.month}, ${this.year}`
            html += elem.outerHTML
        }

        html += this.htmlTable.toHTML()

        return html
    }
}

function dateCopy(d = new Date()){
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}