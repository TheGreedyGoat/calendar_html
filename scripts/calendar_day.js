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
    let sheetelement = activeSheet.toHTML()
    targetContainer.replaceChildren(sheetelement)

    let monthSwitchButtonDiv = document.createElement("div")
    monthSwitchButtonDiv.setAttribute("class", "monthSwitchButtonDiv")

    let buttonPrev = document.createElement("button")
    buttonPrev.setAttribute("class", "buttonPrev")
    monthSwitchButtonDiv.appendChild(buttonPrev)

    buttonPrev.innerHTML = '<svg class = "chevron" width = 10 height  = 10 viewBox = "0 0 100 100" xmlns="http://www.w3.org/2000/svg">'
    + '<polyline points = "35,5 70,50 35,95"  fill = none stroke="black" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"></polygon>' 
    +'</svg>'

    let buttonNext = document.createElement("button")
    buttonNext.setAttribute("class", "buttonNext")
    monthSwitchButtonDiv.appendChild(buttonNext)
    buttonNext.innerHTML = '<svg class = "chevron" width = 10 height  = 10 viewBox = "0 0 100 100" xmlns="http://www.w3.org/2000/svg">'
    + '<polyline points = "35,5 70,50 35,95"  fill = none stroke="black" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"></polygon>' 
    +'</svg>'
    sheetelement.querySelector(".calendarTitle").appendChild(monthSwitchButtonDiv)
}

