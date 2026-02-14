const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

class CalendarSheet{
    constructor(date = new Date()){

        let cellDate = dateCopy(date);
        let daysSinceLastMonday = (cellDate.getDay() + 6) % 7
        cellDate.setDate(cellDate.getDate() - daysSinceLastMonday)

        this.dataTable = []
        this.htmlTable = new Table(6, 7)
        for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
            this.dataTable.push([])
            for(let d = 0; d < 7; d++){ 
                // fill data table
                dataTable[w].push(dateCopy(cellDate))
                cellDate.setDate(cellDate.getDate() + 1)
                //fill HTML table
                let htmlCell = this.htmlTable.getCell(w,d)
                htmlCell.content = cellDate.getDate()

                // set Attributes
                if(cellDate.getMonth() == currentMonth){ 
                if(cellDate.getDay() === 0){ // => sunday
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
}

function dateCopy(d = new Date()){
    return new date(d.getFullYear(), d.getMonth(), d.getDate())
}