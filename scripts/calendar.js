let body = document.getElementById("mainBody")
let sheet = new CalendarSheet(new Date(2026,1,1))

for(let i = 0; i < 5; i++){
    addSheet(new Date(2026, i, 1), body)
}


function addSheet(date = new Date(), target){
    let div = document.createElement("div")
    div.setAttribute("class", "calendarContainer")
    div.innerHTML = new CalendarSheet(date).htmlTable.toHTML()
    target.appendChild(div)
}