

const calendarTarget = document.getElementsByClassName("calendarTarget")[0]
const dayTitle = document.getElementById("dayTitle")

const noteList = document.getElementById("noteList")
const noteInputLine = document.getElementById("noteInputLine")

const noteInputField =  document.getElementById("noteInputField")
const addNoteButton = document.getElementById("addNoteButton")

let htmlElementTable
let currentDataSheet
let currentHTMLSheet

let activeDate =  new Date()

setupPage()

document.getElementById("nextMonth").addEventListener("click", function(){
    activeDate.setMonth(activeDate.getMonth() + 1)
    refresh()
})


document.getElementById("lastMonth").addEventListener("click", function(){
    activeDate.setMonth(activeDate.getMonth() - 1)
    refresh()
})

function setupPage(){
    setActiveDate(new Date())
    setupDaySection()
}

function setActiveDate(newDate = new Date()){
    activeDate = newDate
    refresh()
}

function refresh(){
    
    if(!currentDataSheet || !currentDataSheet.isDatePartOfMonth(activeDate)){
        buildDataSheet(activeDate)
        buildHTMLCells()
        buildHTMLSheet()
        setupAttributes()
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
    currentHTMLSheet.classList.add("calendarSheet")

    for(let w = 0; w < 6; w++){
        let week = document.createElement("tr")
        week.classList.add("weekRow")
        currentHTMLSheet.appendChild(week)
        for(let d = 0; d < 7; d++){
            week.appendChild(htmlElementTable[w][d])
        }
    }
}

function setupAttributes(){
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
    calendarTarget.removeChild(calendarTarget.firstChild);
    calendarTarget.prepend(currentHTMLSheet);
}

function refreshDaySection(){
    dayTitle.innerHTML = CalendarTools.dateString(activeDate);
    
    //clear note list
    let safetyCounter = 0;
    while(noteList.firstElementChild.id !== noteInputLine.id && safetyCounter++ < 1000){
        noteList.removeChild(noteList.firstChild);
    }

    // insert saved notes if existing
    let noteObject = CalendarTools.tryGetNotesOfDate(activeDate);
    if (noteObject !== undefined){
        let notes = noteObject.notes;
        for(let n = 0; n < notes.length; n++){
            let listNode = document.createElement("li");
            listNode.innerHTML = notes[n];
            listNode.classList.add("noteDisplay");

            noteList.insertBefore(listNode, noteInputLine);
        }
    }
}

function setupDaySection(){
    noteInputField.addEventListener("input", function(){
            noteInputField.style.height = "auto";
            noteInputField.style.height = noteInputField.scrollHeight + "px";
        });

        addNoteButton.addEventListener("click", function(){
            let note = noteInputField.value;
            if(note != ""){
                // Notiz speichern
                CalendarTools.writeNote(activeDate, note);
                //Feld leeren
                noteInputField.value = "";
                refreshDaySection();
            }
        })
}
