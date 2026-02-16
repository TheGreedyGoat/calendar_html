let sheet  = CalendarSheet.getSheet(new Date(2026, 0, 1))
let target = document.getElementsByClassName("calendarTarget")[0]

target.appendChild(sheet.toHTML())

function switchToDate(date = new Date()){
    document.getElementById("dayTitle").innerHTML = CalendarFunctions.dateString(date)
    CalendarFunctions.writeNote(date, "Notiz 1 " + date.toDateString())
    CalendarFunctions.writeNote(date, "Notiz 2 ")
    CalendarFunctions.writeNote(date, "Notiz 3 ")

    let noteSection = document.getElementById("dayNotes")
    console.log(CalendarFunctions.getDateInfo(date).notes)
    noteSection.replaceChildren(CalendarFunctions.getDateInfo(date).notes)
}
