const NOTE_LIST = document.getElementById("noteList")

const NOT_INPUT_LINE = document.getElementById("noteInputLine")

const noteInputField =  document.getElementById("noteInputField")
const addNoteButton = document.getElementById("addNoteButton")

const NOTE_LINE_CLASS = "noteLine";

/**
 * Passt die Höhe des Notiz-Inputs den Textzeilen an
 */
function setupNoteInputField(){
    noteInputField.addEventListener("input", function(){
        noteInputField.style.height = "auto";
        noteInputField.style.height = noteInputField.scrollHeight + "px";
    });

    refresh();
}

/**
 * Wir prüfen erstmal, ob überhaupt was geschrieben wurde, wenn ja, senden wir die neue Notiz ans Hauptfenster
 */
function sendNoteWriteRequest(){
    sendMessage(window.parent, "click", {clickType : "note Added"}) // für den Kilcksound, der ist wichtig!

    let note = noteInputField.value == ""? null : noteInputField.value;
    if(noteInputField.value != ''){
        sendMessage(window.parent, "click", {
            clickType: "add note",
            clickValue: {
                date: activeDate,
                note: note
            }
        });

        let newNoteLine = document.createElement("li")  //neue Notiz wird erstmal selbst angehängt
        newNoteLine.classList.add(NOTE_LINE_CLASS);
        newNoteLine.innerText = noteInputField.value;
        NOTE_LIST.prepend(newNoteLine)
        noteInputField.value = "";
    }
}

/**
 * 
 * @param {Array<string>} notes 
 */
function displayTodayshNotes(notes){
    let safetyCounter = 1000; //<= because while loops are scary
    
    while(NOTE_LIST.firstElementChild.id != NOT_INPUT_LINE.id){ // damit wir nicht das Inputfeld löschen
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

