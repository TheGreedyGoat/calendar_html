



class CalendarFunctions{
    static weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
    static months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
    static dateInfos = []

    static dateCopy(d = new Date()){
        return new Date(d.getFullYear(), d.getMonth(), d.getDate())
    }

    static dateString(date = new Date()){
        return `${date.getDate()}. ${CalendarFunctions.months[date.getMonth()]} ${date.getFullYear()}`
    }

    static getDateInfo(date = new Date()){
        for(let i = 0; i < this.dateInfos.length; i++){
            let info = this.dateInfos[i]
            if(info.date == date) return info
        }
        let newInfo = new DateInfos(date)
        this.dateInfos.push(newInfo)
        return newInfo
    }

    static writeNote(date = new Date(), note = "Hello World!"){
        let info = CalendarFunctions.getDateInfo(date)
        info.appendNote(note)
    }

}

class DateInfos{
    constructor(date = new Date()){
        this.date = date
        this.notes = document.createElement("ul")
    }

    appendNote(note = "Bla"){
        let noteLine = document.createElement("li")
        noteLine.innerHTML = note
        this.notes.appendChild(noteLine)
    }

    notes(){
        return this.notes
    }
}
