



class CalendarTools{
    static weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    static months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]

    static dateNotes = []

    static dateCopy(d = new Date()){
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }

    static dateString(date = new Date()){
        return `${date.getDate()}. ${CalendarTools.months[date.getMonth()]} ${date.getFullYear()}`
    }

    static monthYearStringDate(date = new Date()){
        return this.monthYearStringInd(date.getMonth(), date.getFullYear());
    }

    static monthYearStringInd(m, y){
        return `${CalendarTools.months[m]} ${y}`;
    }



    static tryGetNotesOfDate(date = new Date()){
        for(let i = 0; i < CalendarTools.dateNotes.length; i++){
            if(date.toLocaleDateString() 
                === CalendarTools.dateNotes[i].date.toLocaleDateString()){
                return CalendarTools.dateNotes[i];
            }
        }
    }

    static writeNote(date = new Date(), note = "CalendarTools.writeNote didnt recieve any note text"){
        let noteWrapper = CalendarTools.tryGetNotesOfDate(date)
        if(noteWrapper === undefined){
            noteWrapper = new NoteWrapper(date)
            CalendarTools.dateNotes.push(noteWrapper)
        }
        noteWrapper.notes.push(note)
    }

    static buildWeekdayHeader(){
        let weekdays = CalendarTools.weekdays;
        let row = document.createElement("tr");
        for(let i = 0; i < weekdays.length; i++){
            let th = document.createElement("th");
            th.classList.add("calendarHeadCell")
            th.innerHTML = weekdays[i]
            row.appendChild(th)
        }
        return row
    }

    static datesEqual(date1 = new Date(), date2 = new Date()){
        return (
            date1.getDate() == date2.getDate() 
        &&  date1.getMonth() == date2.getMonth()
        &&  date1.getFullYear() == date2.getFullYear());
    
    }
}

class NoteWrapper{
    constructor(date = new Date){
        this.date = date;
        this.notes = []
    }
}