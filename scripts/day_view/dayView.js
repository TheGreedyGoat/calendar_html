
const DATE_TITLE_ELEMENT = document.getElementById("date_title")

const noteList = document.getElementById("noteList")
const noteInputLine = document.getElementById("noteInputLine")

const noteInputField =  document.getElementById("noteInputField")
const addNoteButton = document.getElementById("addNoteButton")

let activeDate = new Date();



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
    
    // //clear note list
    // let safetyCounter = 0;
    // while(noteList.firstElementChild.id !== noteInputLine.id && safetyCounter++ < 1000){
    //     noteList.removeChild(noteList.firstChild);
    // }

    // // insert saved notes if existing
    // let noteObject = CalendarTools.tryGetNotesOfDate(activeDate);
    // if (noteObject != undefined){
    //     let notes = noteObject.notes;
    //     for(let n = 0; n < notes.length; n++){
    //         let listNode = document.createElement("li");
    //         listNode.innerHTML = notes[n];
    //         listNode.classList.add("noteDisplay");

    //         noteList.insertBefore(listNode, noteInputLine);
    //     }
    // }
}

function setupDaySection(){
    noteInputField.addEventListener("input", function(){
        noteInputField.style.height = "auto";
        noteInputField.style.height = noteInputField.scrollHeight + "px";
    });

    addNoteButton.addEventListener("click", function(){
        let note = noteInputField.value
        window.postMessage(
            {
                messageType: "click",
                value: {
                        clickType : "addNote",
                        value: note
                    }
            }
        )
    })

    refresh();
}


