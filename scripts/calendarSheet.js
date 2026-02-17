

class CalendarSheet{
    constructor(date  = new Date()){
        let dateOfFIrstDay = new Date(date.getFullYear(), date.getMonth(), 1)
        
        this.firstofMonthIndex = (dateOfFIrstDay.getDay() + 6) % 7 // SUN = 0, 0 + 6 = 6, 6 % 7 = 6
        this.firstOfNextMonthIndex = 10
        this.monthNum  = dateOfFIrstDay.getMonth()
        this.year = dateOfFIrstDay.getFullYear()
        this.firstDateOfTable = new Date(dateOfFIrstDay)
        this.firstDateOfTable.setDate(this.firstDateOfTable.getDate() - this.firstofMonthIndex)
        //active??
        this.table = []
        let cellDate = new Date(this.firstDateOfTable)

        for(let d = 0; d < 6 * 7; d++){ // 6 weeks * 6 days
            this.table.push(new DateData(cellDate))
            cellDate.setDate(cellDate.getDate() + 1);

            if(d > this.firstofMonthIndex 
                && cellDate.getMonth() != this.monthNum 
                && cellDate.getDate() == 1){
                this.firstOfNextMonthIndex = d
            }
        }

    }


    static getIndexFromGrid(w, d){
        return w * 7 + d
    }


    getDataAtGridIndex(w, d){
        return this.table[CalendarSheet.getIndexFromGrid(w, d)]
    }

    getIndexFromDate(date = new Date()){
        return CalendarTools.daysBetweenSigned(date, this.firstDateOfTable)
    }

    isDateOnSheet(date = new Date()){ // is it visible on the calendar sheet?
        let i = this.getIndexFromDate()
        return  i >= 0 && i < this.table.length
    }

    isDatePartOfMonth(date = new Date()){ // is it part of the core month?
        return date.getMonth() == this.monthNum
            &&  date.getFullYear() == this.year
    }
    getDataOfDate(){

    }


}

class DateData{
    constructor(date = new Date()){
        this.date = new Date(date)
        // attributes??
        // 
        // this. dailyInfo = ...
    }
}
