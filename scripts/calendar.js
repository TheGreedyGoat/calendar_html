let targets = document.getElementsByClassName("calendarTarget")

for(let i = 0; i < targets.length; i++){
    let t = targets[i]
    addSheet(new Date(2026, i, 1), t)
}

function addSheet(date = new Date(), target){
    target.appendChild(new CalendarSheet(date).toHTML(2));
}
