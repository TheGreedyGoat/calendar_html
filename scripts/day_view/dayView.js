
const DATE_TITLE_ELEMENT = document.getElementById("date_title")
const HOLIDAY_SECTION = document.querySelector("#holiday_section")

const NOTE_LIST = document.getElementById("noteList")
const noteInputLine = document.getElementById("noteInputLine")

const noteInputField =  document.getElementById("noteInputField")
const addNoteButton = document.getElementById("addNoteButton")

let activeDate = new Date();

setupPage();

function setupPage(setupDate = new Date()){
    activeDate = setupDate;
    setupDaySection();
}

function setActiveDate(newDate = new Date()){
    activeDate = newDate;
    refresh();
}


function refresh(){
    DATE_TITLE_ELEMENT.innerHTML = CalendarTools.dateString(activeDate);
    HOLIDAY_SECTION.innerText = Fetcher.getHolidaysFromDate(activeDate);
}

function setupDaySection(){
    noteInputField.addEventListener("input", function(){
        noteInputField.style.height = "auto";
        noteInputField.style.height = noteInputField.scrollHeight + "px";
    });

    refresh();
}

function sendNoteWriteRequest(){
    let note = noteInputField.value == ""? null : noteInputField.value;
    sendMessage(window.parent, "click", {
        clickType: "add note",
        clickValue: {
            date: activeDate,
            note: note
        }
    });
    noteInputField.value = "";
    refresh()
}

function recieveNotes(notesObject){
    console.log(notesObject.date.toDateString(), activeDate.toDateString())
    if(!CalendarTools.datesEqual(notesObject.date, activeDate)) return;
    console.log("EQUALITY!")
    let notes = notesObject.notes;

    // clearNoteList
    while(NOTE_LIST.firstElementChild.id != noteInputLine.id){
        NOTE_LIST.remove(NOTE_LIST.firstElementChild);

    }

    for(let i  = 0; i < notes.length; i++){
        let note = notes[i];
        let noteLine = document.createElement("li");
        noteLine.setAttribute("class", "noteLine");
        noteLine.innerText = note;
        NOTE_LIST.prepend(noteLine);
    }

}

