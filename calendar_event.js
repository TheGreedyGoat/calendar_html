class CalendarEvent{
    static events = {};
    /**
     * 
     * @param {string} title 
     * @param {Date} start 
     * @param {Date} end 
     */
    constructor(title, start, end, repetition){
        if(start.getTime() >= end.getTime()){
            //ungültige Zeitspanne
            throw new Error('Ereignisbeginn darf nicht vor dem Ende liegen!');
        }
        if(title === ''){
            throw new Error('Ereignisname muss ein nicht leerer String sein!');
        }


        this.title = title;     // 'Geburtstag von Jutta'
        this.start = start;
        this.end = end;

        let currenDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        
        let lastDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        do{

            currenDate.setDate(currenDate.getDate() + 1)
        }while(currentDate < lastDate);
        // this.repetition;    // 'annual'
    }

    /**
     * to prevent us from assigning an empty string as title
     * @param {string} newTitle 
     */
    setTitle(newTitle){
        this.title = newTitle && newTitle != '' ? newTitle : this.title;
    }
}

//[e0, e1, e2, e3, ...]