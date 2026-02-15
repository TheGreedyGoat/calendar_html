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
        for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
            this.dataTable.push([])
            let htmlRow = document.createElement("tr")
            htmlRow.setAttribute("class", "calenderWeek")
            htmlRow.setAttribute("name", "week_" + w)
            for(let d = 0; d < 7; d++){ 
                // fill data table
                this.dataTable[w].push(dateCopy(cellDate))
                cellDate.setDate(cellDate.getDate() + 1)

                //fill HTML table
                let htmlCell = document.createElement("td")
                let cellDiv = document.createElement("div")

                cellDiv.setAttribute("class", "dateContainer")
                cellDiv.innerHTML = cellDate.getDate()
                cellDiv.addEventListener("click", function(){
                    window.postMessage({
                        type : "alert",
                        value : "Hello World!"
                    }, "*")
                    console.log("message sent!")
                })

                //htmlCell.content = "\n" + cellDiv.outerHTML +"\n"
                htmlCell.appendChild(cellDiv)

                // set Attributes
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
                htmlRow.appendChild(htmlCell)
            }
            this.htmlTable.appendChild(htmlRow)
        }
    }

    toHTML(headerSize = 2){
        let div = document.createElement("div");
        div.setAttribute("class", "calendarContainer")
        if(headerSize > 0){
            let title = document.createElement(`h${Math.min(headerSize, 6)}`)
            title.setAttribute("class", "calendarTitle")
            title.innerHTML = `${this.month} ${this.year}`
            div.appendChild(title)
        }
        div.appendChild(this.htmlTable)

        return div
    }
}

function dateCopy(d = new Date()){
    return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}