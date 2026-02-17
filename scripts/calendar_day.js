// @ts-nocheck

const calendarTarget = document.getElementsByClassName("calendarTarget")[0]
const dayTitle = document.getElementById("dayTitle")

let htmlElementTable
let currentDataSheet
let currentHTMLSheet

let activeDate

setActiveDateAndRefresh(new Date(2026, 1, 1))

function setActiveDateAndRefresh(newDate = new Date()){
    activeDate = newDate
    if(!currentDataSheet || !currentDataSheet.isDatePartOfMonth(newDate)){
        buildDataSheet(newDate)
        buildHTMLCells()
        buildHTMLSheet()
        setAttributes()
        placeHTMLSheet()
    }
    refreshDaySection()
}

function buildDataSheet(date = new Date()){
    // DataSheet bauen
    currentDataSheet = new CalendarSheet(date)
}

// HTML Elemente basteln
function buildHTMLCells(){
    htmlElementTable = []
    for(let w = 0; w < 6; w++){
        htmlElementTable.push([])
        for(let d = 0; d < 7; d++){
            let cellDate = currentDataSheet.getDataAtGridIndex(w, d).date
            // Datum extrahieren und Element bauen
            let htmlCell = document.createElement("td");  // day
            let cellDiv = document.createElement("div"); // dateContainer

            cellDiv.addEventListener("click", function(){
                window.postMessage({
                    type : "dateClicked",
                    value: new Date(cellDate)
                });
            });
            cellDiv.innerHTML = cellDate.getDate()
            cellDiv.classList.add("dateContainer");

            htmlCell.appendChild(cellDiv)
            htmlElementTable[w].push(htmlCell)
        }
    }
}
    
    // HTML Sheet bauen
function buildHTMLSheet(){
    currentHTMLSheet = document.createElement("table")
    currentHTMLSheet.appendChild(CalendarTools.buildWeekdayHeader())

    for(let w = 0; w < 6; w++){
        let week = document.createElement("tr")
        week.classList.add("weekRow")
        currentHTMLSheet.appendChild(week)
        for(let d = 0; d < 7; d++){
            week.appendChild(htmlElementTable[w][d])
        }
    }
}

function setAttributes(){
    // Attribute setzen
    for(let w = 0; w < htmlElementTable.length; w++){
        for(let d = 0; d < htmlElementTable[w].length; d++){
            let elem = htmlElementTable[w][d];
            let elemClasses = elem.classList;
            elemClasses.add("day")
            /* day types */
            //current or other month
            let cIndex = CalendarSheet.getIndexFromGrid(w, d)
            if(cIndex < currentDataSheet.firstofMonthIndex || cIndex > currentDataSheet.firstOfNextMonthIndex){
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

            /* containers*/
        }
    }

}

function placeHTMLSheet(){
    calendarTarget.innerHTML = ""
    calendarTarget.appendChild(currentHTMLSheet)
}

function refreshDaySection(){
    dayTitle.innerHTML = CalendarTools.dateString(activeDate)

}
