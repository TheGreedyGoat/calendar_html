let targets = document.getElementsByClassName("calendarTarget")

for(let i = 0; i < targets.length; i++){
    let t = targets[i]
    addSheet(new Date(2026, i, 1), t)
}

function addSheet(date = new Date(), target){
    let div = document.createElement("div")
    div.setAttribute("class", "calendarContainer")
    div.innerHTML = new CalendarSheet(date).toHTML(true)
    target.appendChild(div)
}