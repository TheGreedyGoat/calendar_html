
const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

const monthList = document.getElementById("m")
const yearField = document.getElementById("y")

const calendarSheet = document.getElementById("c1")
const test  = document.getElementById("test")

const calendarTable  = new table(6, weekdays)

let currentDate = new Date()
setMonthAndYear()

monthList.addEventListener("change", ()=>{
    currentDate = setMonthAndYear()
})
yearField.addEventListener("change", ()=>{
    currentDate = setMonthAndYear()
})

calendarSheet.innerHTML = calendarTable.toHtml()




function setMonthAndYear(){
    let m = parseInt(monthList.selectedOptions[0].value)
    let y = parseInt(yearField.value)
    
    currentDate =  date(m, y)
    updateHeader()
    updateSheet()
}

function date(m, y){
    return new Date(`${y}-${m+1}`)
}

function updateHeader(){
    let txt = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    

    document.getElementById("my").innerText = txt
}

function updateSheet(){
    let startIndex = currentDate.getDay()
    calendarTable.clear();
    let day = 1
    let maxDays = getDaysOfMonth()
   for(let i = 0; i < calendarTable.rows; i++){
        let jStart = 0;
        if(i === 0){
            jStart = startIndex-1
            if(jStart < 0 ){
                jStart = 6
            }
        }
        for(let j = jStart; j < calendarTable.cols; j++){
            calendarTable.writeCell(i, j, day)
            if(++day > maxDays){
                calendarSheet.innerHTML = calendarTable.toHtml()
                return
            }
        }
   }
    
    
}

function getDaysOfMonth(){
    let m = currentDate.getMonth()

    if(m === 0 || m === 2 || m === 4 || m === 6 || m === 7 || m  === 9 || m === 11){
        return 31
    }else if(m === 1){
        if(currentDate.getFullYear() % 4 === 0){
            return 29
        }else{
            return 28
        }
    }else{
        return 30
    }
}