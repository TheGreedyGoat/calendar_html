const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

class CalendarSheet{
    constructor(date = new Date()){
        this.month = months[date.getMonth()]
        this.year = date.getFullYear()

        let cellDate = dateCopy(date);
        cellDate.setDate(1)
        let day = cellDate.getDay()
        let daysSinceLastMonday
        if(day !== 0){
            daysSinceLastMonday = day % 7
        }else{
            daysSinceLastMonday = 6
        }
        cellDate.setDate(cellDate.getDate() - daysSinceLastMonday)

        this.dataTable = []
        //this.htmlTable = new Table(6, 7)
        this.htmlTable = document.createElement("table")
        this.htmlTable.setAttribute("class", "calendarSheet")
        //this.htmlTable.setHeader(weekdays)
        let headerRow = document.createElement("tr")
        headerRow.setAttribute("class", "calendarWeekdays")
        this.htmlTable.appendChild(headerRow)
        for(let i = 0; i < weekdays.length; i++){
            let head = document.createElement("th")
            head.innerHTML = weekdays[i]
            head.setAttribute("name", weekdays[i])
            headerRow.appendChild(head)
        }
        this.buildCalendarTable
        for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
            this.dataTable.push([])
            let htmlRow = document.createElement("tr")
            htmlRow.setAttribute("class", "calenderWeek")
            htmlRow.setAttribute("name", "week_" + w)
            for(let d = 0; d < 7; d++){ 
                this.dataTable[w].push(dateCopy(cellDate))
                cellDate.setDate(cellDate.getDate() + 1)

                let htmlCell = this.createHTMLCell(cellDate)
                this.setCellAttributes(htmlCell, cellDate, date)
                htmlRow.appendChild(htmlCell)
            }
            this.htmlTable.appendChild(htmlRow)
        }
    }


    createHTMLCell(cellDate, w, d){
        let htmlCell = document.createElement("td")
        let cellDiv = document.createElement("div")

        cellDiv.setAttribute("class", "dateContainer")
        cellDiv.setAttribute("id", `${w}:${d}`)
        cellDiv.innerHTML = cellDate.getDate()

        /*
        cellDiv.addEventListener("click", function(){
            window.postMessage({
                type : "log",
                value : cellDate
            }, "*")
        })/**/ 

        htmlCell.appendChild(cellDiv)
        return  htmlCell
    }

    setCellAttributes(htmlCell, cellDate, date){
        let classes = "day "
                if(cellDate.getMonth() == date.getMonth()){ 

                    if(cellDate.getDay() === 0){ // => sundy
                        classes += "sundayCurrent "
                    }else{
                        classes +=  "current "
                    }
                }else if(cellDate.getDay() === 0){
                    classes +=  "sundayOther "
                }else{
                    classes += "other "
                }
                htmlCell.setAttribute("class", classes)
    }

    static getSheet(date = new Date()){
        console.log(date)
        return new CalendarSheet(date)
    }

    toHTML(headerSize = 2){
        let calendarContainer = document.createElement("div");
        calendarContainer.setAttribute("class", "calendarContainer")
        if(headerSize > 0){
            let headDiv = document.createElement("div")
            headDiv.setAttribute("class", "calendarHeadDiv")

            let title = document.createElement(`h${Math.min(headerSize, 6)}`)
            title.setAttribute("class", "calendarTitle")
            title.innerHTML = `${this.month} ${this.year}`

            //headDiv.appendChild(title)
            calendarContainer.appendChild(title)
        }
        calendarContainer.appendChild(this.htmlTable)

        return calendarContainer
    }
}

function dateCopy(d = new Date()){
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}