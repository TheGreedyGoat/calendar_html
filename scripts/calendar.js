
let weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
let months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]


let cal  = new table(5, weekdays)
cal.writeCell(1, 1, "Hello")

const monthList = document.getElementById("m")
monthList.addEventListener("change",() => {
        let index = parseInt(monthList.selectedOptions [0].value)
        document.getElementById("my").innerText = `${months[index -1]}`
    }
)



document.getElementById("c1").innerHTML = cal.toHtml()



