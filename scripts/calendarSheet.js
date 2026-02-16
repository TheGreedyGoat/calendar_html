class CalendarSheet{
    constructor(sheetDate = new Date()){
        
        this.frontendTable = document.createElement("table")
        this.frontendTable.setAttribute("class", "calendarSheet")
        this.buildHead()

        this.buildBackendTable(sheetDate)
        this.buildFrontendTable()
        
    }

    buildHead(){
        let headRow = document.createElement("tr")
        headRow.setAttribute("class", "calendarWeekdays")
        for(let i = 0; i < CalendarFunctions.weekdays.length; i++){
            let headCell = document.createElement("th")
            headCell.innerHTML = CalendarFunctions.weekdays[i]
            headCell.setAttribute("name", CalendarFunctions.weekdays[i])
            headRow.appendChild(headCell)
        }
        this.frontendTable.insertBefore(headRow, this.frontendTable.firstChild)
    }

    buildBackendTable(sheetDate){
        this.month = CalendarFunctions.months[sheetDate.getMonth()]
        this.year = sheetDate.getFullYear()

        let cellDate = CalendarFunctions.dateCopy(sheetDate);
        cellDate.setDate(1)
        let day = cellDate.getDay()
        let daysSinceLastMonday
        if(day !== 0){
            daysSinceLastMonday = day % 7
        }else{
            daysSinceLastMonday = 6
        }
        cellDate.setDate(cellDate.getDate() - daysSinceLastMonday)

        this.backendTable = []
        for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
            this.backendTable.push([])
            for(let d = 0; d < 7; d++){ 
                cellDate.setDate(cellDate.getDate() + 1)
                this.backendTable[w].push(CalendarFunctions.dateCopy(cellDate))
            }
        }
    }

    buildFrontendTable(){
        for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
            let htmlRow = document.createElement("tr")
            htmlRow.setAttribute("class", "calenderWeek")
            htmlRow.setAttribute("name", "week_" + w)
            for(let d = 0; d < 7; d++){ 
                let htmlCell = this.createHTMLCell(this.backendTable[w][d], w, d)
                this.setCellAttributes(htmlCell, this.backendTable[w][d])
                htmlRow.appendChild(htmlCell)
            }
            this.frontendTable.appendChild(htmlRow)
        }
    }


    createHTMLCell(cellDate, w, d){
        
        let htmlCell = document.createElement("td")
        let cellDiv = document.createElement("div")

        cellDiv.setAttribute("class", "dateContainer")
        cellDiv.setAttribute("id", `${w}:${d}`)
        cellDiv.innerHTML = cellDate.getDate()
        
        let year  = cellDate.getFullYear()
        let month = cellDate.getMonth()
        let day = cellDate.getDate()
        cellDiv.addEventListener("click", function(){
            window.postMessage(
                {
                    type: "dateClicked",
                    value: new Date(year, month, day)
                },
                "*"
            )
        })/**/ 

        htmlCell.appendChild(cellDiv)
        return  htmlCell
    }


    setCellAttributes(htmlCell, cellDate){
        let classes = "day "
                if(cellDate.getMonth() == this.month){ 

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
        calendarContainer.appendChild(this.frontendTable)

        return calendarContainer
    }
}
