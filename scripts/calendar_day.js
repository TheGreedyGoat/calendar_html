let sheet  = CalendarSheet.getSheet(new Date(2026, 0, 1))
let target = document.getElementsByClassName("calendarTarget")[0]

target.appendChild(sheet.toHTML())

function switchToDay(date){
    document.getElementById("dayTitle").innerHTML = data.value.toLocaleDateString()
}