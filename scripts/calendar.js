
const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

const monthList = document.getElementById("m")
const yearField = document.getElementById("y")

const calendarSheet = document.getElementById("c1")
const test  = document.getElementById("test")

const calendarTable  = new table(6, weekdays.length)
let currentDate

calendarTable.setHeader(weekdays)

setDate()


calendarSheet.addEventListener("hover", () =>{
        console.log("HOVER!")
    }
)

monthList.addEventListener("change", ()=>{
    setDate()
})
yearField.addEventListener("change", ()=>{
    setDate()
})


function setDate(){
    let m = parseInt(monthList.selectedOptions[0].value)
    let y = parseInt(yearField.value)
    
    currentDate =  date(y, m, 1)
    updateHeader()
    updateTable()
}


function updateHeader(){
    let txt = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}` // eg. 'Januar 2025'

    document.getElementById("my").innerText = txt
}

function updateTable(){
    
    calendarTable.clear();

    let cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    
    let daysSinceLastMonday = cellDate.getDay() -1
    if(daysSinceLastMonday < 0){
        daysSinceLastMonday += 7
    }
    cellDate.setDate(currentDate.getDate() - daysSinceLastMonday)

    for(let i = 0; i < calendarTable.height; i++){

        for(let j = 0; j < calendarTable.width; j++){
            calendarTable.writeCell(i, j, cellDate.getDate())
            
           if(cellDate.getMonth() == currentDate.getMonth()){
                if(cellDate.getDay() === 0){ // => sunday
                calendarTable.getCell(i,j).setAttribute("class", "sundayCurrent")
                }else{
                    calendarTable.getCell(i, j).setAttribute("class", "current")
                }
            }else if(cellDate.getDay() === 0){
                calendarTable.getCell(i,j).setAttribute("class", "sundayOther")
            }
            cellDate.setDate(cellDate.getDate() + 1)
        }
    }
    
    let tmp = calendarTable.toHTML(true)
    calendarSheet.innerHTML = tmp
    window.parent.postMessage(`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`, "*")
}

function getDaysOfMonth(m){
    if(m < 0) m +=12
    if (m > 11) m -= 12

    let res
    if(m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m  === 9 || m === 11){
        res = 31
    }else if(m === 1){
        if(currentDate.getFullYear() % 4 === 0){
            res = 29
        }else{
            res = 28
        }
    }else{
        res = 30
    }
    console.log(`m: ${m}, month: ${months[m]} days: ${res}`)
    return res
}
function date(y = 2026, m = 0, d = 1){
    return new Date(y, m, d)
}