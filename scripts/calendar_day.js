let activeDate = new Date();

let activeSheet  
let targetContainer = document.getElementsByClassName("calendarTarget")[0]

buildActiveSheet()

function switchToDate(newDate = new Date()){
    activeDate = newDate
    if(activeSheet.month != newDate.getMonth() || activeSheet.year != newDate.getFullYear()){   // if the new date is not within the active sheet's main month 
        buildActiveSheet()
    }
    document.getElementById("dayTitle").innerHTML = CalendarFunctions.dateString(newDate)
    CalendarFunctions.writeNote(newDate, "Notiz 1 " + newDate.toDateString())
    CalendarFunctions.writeNote(newDate, "Notiz 2 ")
    CalendarFunctions.writeNote(newDate, "Notiz 3 ")

    let noteSection = document.getElementById("dayNotes")
    noteSection.replaceChildren(CalendarFunctions.getDateInfo(newDate).notes)

    // find the corresponding cell within the sheet and mark it as active
    activeSheet.setActiveDate(activeDate)
}

function buildActiveSheet(){
    activeSheet = CalendarSheet.getSheet(activeDate)
    targetContainer.replaceChildren(activeSheet.toHTML())
}

