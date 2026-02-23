const CALENDAR_TARGET = document.getElementById("calendar_target")
const CALENDAR_WRAPPER_ID = "calendar_wrapper";
const CALENDAR_SHEET_ID = "calendar_sheet";


let activeMonth;
let activeYear;



sendMessageToAllWindows("setup",{
        date: new Date()
});


function setupPage(setupDate){
    setActiveDate(setupDate);
    
}

function setActiveDate(newDate = new Date()){
    let oldMonth = activeMonth;
    let oldYear = activeYear;
    activeMonth = newDate.getMonth();
    activeYear = newDate.getFullYear();
    if(newDate.getMonth() != oldMonth || newDate.getFullYear() != oldYear){
        placeHTMLSheet(new CalendarSheet(newDate))
    }

}



function buildDataSheet(date = new Date()){
    // DataSheet bauen
    currentDataSheet = CalendarSheet.getSheet(date)
}

function dateClicked(date){
    setActiveDate(date);
    document.querySelector("main").style.transform = "translateX(0dvw)"
}

function resetPosition(){
    document.querySelector("main").style.transform = "translateX(100dvw)"
}
    

function placeHTMLSheet(sheet){
    if(CALENDAR_TARGET.firstChild.id == CALENDAR_WRAPPER_ID){
        CALENDAR_TARGET.removeChild(CALENDAR_TARGET.firstChild);
    }

    let wrapper  = document.createElement("div");
    let heading = document.createElement("h3");

    heading.innerText = CalendarTools.monthYearStringInd(activeMonth, activeYear);

    wrapper.appendChild(heading);
    wrapper.appendChild(sheet.toHTML());
    wrapper.setAttribute("id", CALENDAR_WRAPPER_ID)
    CALENDAR_TARGET.prepend(wrapper);
}




function monthBtnClicked(n  = 1){
    addMonth(n)
}

function addMonth(n = 1){
    setActiveDate(new Date(activeYear, activeMonth + n, 1))
}


