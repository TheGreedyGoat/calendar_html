const NOTE_LIST = document.getElementById("noteList")

const NOT_INPUT_LINE = document.getElementById("noteInputLine")

const noteInputField =  document.getElementById("noteInputField")
const addNoteButton = document.getElementById("addNoteButton")

const NOTE_LINE_CLASS = "noteLine";

function setupNoteInputField(){
    noteInputField.addEventListener("input", function(){
        noteInputField.style.height = "auto";
        noteInputField.style.height = noteInputField.scrollHeight + "px";
    });

    refresh();
}

function sendNoteWriteRequest(){
    let note = noteInputField.value == ""? null : noteInputField.value;
    if(noteInputField.value != ''){
        sendMessage(window.parent, "click", {
            clickType: "add note",
            clickValue: {
                date: activeDate,
                note: note
            }
        });
        let newNoteLine = document.createElement("li")
        newNoteLine.classList.add(NOTE_LINE_CLASS);
        newNoteLine.innerText = noteInputField.value;
        NOTE_LIST.prepend(newNoteLine)
        noteInputField.value = "";
    }
}

function refreshNotes(notes){

    let safetyCounter = 1000; //<= because while loops are scary
    // clearNoteList
    while(NOTE_LIST.firstElementChild.id != NOT_INPUT_LINE.id){
        
        NOTE_LIST.firstElementChild.remove();

        safetyCounter --;
        if(safetyCounter == 0) break;
    }
    
    if(notes){
        for(let i  = 0; i < notes.length; i++){
            let note = notes[i];
            let noteLine = document.createElement("li");
            noteLine.setAttribute("class", NOTE_LINE_CLASS);
            noteLine.innerText = note;
            NOTE_LIST.prepend(noteLine);
        }
    }

}

