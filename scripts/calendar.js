
const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

const monthList = document.getElementById("m")
const dayList  = document.getElementById("d")
const yearField = document.getElementById("y")

const btn = document.getElementById("b")

let cal  = new table(5, weekdays)

setMonthValue()
updateSheetTitle()
monthList.addEventListener("change",() => {
        setMonthValue()
    }
)

btn.addEventListener("click", ()=>{
    updateSheetTitle()
})



document.getElementById("c1").innerHTML = cal.toHtml()



function setMonthValue(){
    let index = parseInt(monthList.selectedOptions [0].value)

    let daySelect = document.getElementById("d")
    let numDays;
    if (index === 1) {
        numDays = 28;
    } else if (index === 3 || index === 5 || index === 8 || index === 10) {
        numDays = 30;
    } else {
        numDays = 31;
    }
    daySelect.innerHTML = "";
    for (let i = 1; i <= numDays; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        daySelect.appendChild(option);
    }
}

function updateSheetTitle(){
    let day = dayList.selectedOptions[0].value
    let month = months[parseInt(monthList.selectedOptions [0].value)]
    let year = parseInt(yearField.value)

    document.getElementById("my").innerText = `${day}.${month} ${year}`
    
}