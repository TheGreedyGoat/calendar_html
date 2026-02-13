
const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
               //["01", "02", "03", "04", "05", "06", "00"]
               //["00", "01", "02", "03", "04", "05", "06"]
const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

const monthList = document.getElementById("m")
const yearField = document.getElementById("y")

const calendarSheet = document.getElementById("c1")
const test  = document.getElementById("test")

const htmlTable  = new table(6, weekdays.length)
let currentDate

let dataTable;

let currentMonth
let currentYear


monthList.addEventListener("change", ()=>{
    getUserInput()
})
yearField.addEventListener("change", ()=>{
    getUserInput()
})


getUserInput()

function getUserInput(){
    currentMonth = parseInt(monthList.selectedOptions[0].value)
    currentYear = parseInt(yearField.value)

    updateDataTable();
}

function updateHeader(){
    let txt = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}` // eg. 'Januar 2025'

    document.getElementById("my").innerText = txt
}

// writes full date objects into the data table
function updateDataTable(){
    
    dataTable = []
    
    let cellDate = new Date(currentYear, currentMonth, 1);
    console.log(cellDate)
    
    let daysSinceLastMonday = (cellDate.getDay() + 6) % 7

    cellDate.setDate(cellDate.getDate() - daysSinceLastMonday)
    
    for(let w = 0;  w < 6; w ++){ // 6 weeks/ month
        dataTable.push([])
        for(let d = 0; d < 7; d++){
            //fill cell with date
            dataTable[w].push(dateCopy(cellDate));
            console.log(dataTable[w][d])
            cellDate.setDate(cellDate.getDate() + 1)
        }
    }

    createHTMLTable()
}

// write Info from data Table and write calendar
function createHTMLTable(){ 
    
    htmlTable.clear();

    for(let w = 0; w < dataTable.length; w++){
        for(let d = 0; d < dataTable[w].length; d++){
            let cellDate = dataTable[w][d]
            htmlTable.writeCell(w, d, cellDate.getDate())
            
           
           if(cellDate.getMonth() == currentMonth){
                if(cellDate.getDay() === 0){ // => sunday
                htmlTable.getCell(w,d).setAttribute("class", "sundayCurrent")
                }else{
                    htmlTable.getCell(w, d).setAttribute("class", "current")
                }
            }else if(cellDate.getDay() === 0){
                htmlTable.getCell(w,d).setAttribute("class", "sundayOther")
            }/**/
        }
    }
    
    let tmp = htmlTable.toHTML(true)
    calendarSheet.innerHTML = tmp
    window.parent.postMessage(`${months[currentMonth]} ${currentYear}`, "*")
}

function getDaysOfMonth(month, year){
    if(month < 0) month +=12
    if (month > 11) month -= 12

    let res
    if(month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month  === 9 || month === 11){
        res = 31
    }else if(month === 1){
        if(year % 4 === 0){
            res = 29
        }else{
            res = 28
        }
    }else{
        res = 30
    }
}
function date(y = 2026, m = 0, d = 1){
    return new Date(y, m, d)
}

function dateCopy(d = new Date()){
    return new date(d.getFullYear(), d.getMonth(), d.getDate())
}