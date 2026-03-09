
class DateSelector {

    static domTemplateString;
    static currentID = 0;
    /**
     * 
     * @param {Date} date 
     */
    constructor(date) {
        if (!DateSelector.domTemplateString) {
            DateSelector.domTemplateString = Templates.getTemplateString('date_selector_template');
        }

        this.id = 'selector' + DateSelector.currentID++;


        this.selectedDate = date;
        this.setupDOM();
        this.switchMonth(0);
        document.querySelector('#test').appendChild(this.DOM);

    }

    //Die zu übergebene Methode in der Date-Selector Klasse
    onDateClick = (date) => {
        console.log(this)
        this.selectedDate = new Date(date);
        this.sheet.setup(date);
        this.innerWrapper.hidden = true;
    };

    setupDOM() {

        const parser = new DOMParser();
        this.DOM = parser.parseFromString(DateSelector.domTemplateString, 'text/html').querySelector('#outest_wrapper');



        let descendants = this.DOM.querySelectorAll('*');
        this.DOM.id = this.id + '_' + this.DOM.id;
        for (let des of descendants) {
            if (des.id !== '') {
                des.id = this.id + '_' + des.id;
            }
        }

        this.sheet = new CalendarSheet(this.selectedDate);
        this.form = this.queryID('form');
        this.form.appendChild(this.sheet.toHTML());
        this.sheetHeader = this.queryID('sheet_header');
        this.prevMonthBtn = this.queryID('prevMonth');
        this.nextMonthBtn = this.queryID('nextMonth');
        this.prevMonthBtn.addEventListener('click', () => {
            this.switchMonth(-1);
        })
        this.nextMonthBtn.addEventListener('click', () => {
            this.switchMonth(+1);
        })

        this.showHide = this.queryID('showHide');
        this.showHide.innerText = this.selectedDate.toLocaleDateString('de-DE', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        this.showHide.addEventListener('click', () => {
            this.toggleVisibility();
        });

        this.innerWrapper = this.queryID('inner_wrapper')
        this.sheet.addDateClickEvent(this.onDateClick);

    }

    switchMonth(delta) {
        this.sheet.IncreaseOrDecreaseMonth(delta);
        let str = this.sheet.dateOfFirstDay.toLocaleDateString('de-DE', {
            month: 'short',
            year: 'numeric'
        });

        this.sheetHeader.innerText = str;
    }


    toggleVisibility(hide) {
        this.innerWrapper.hidden = !this.innerWrapper.hidden
    }

    specificElementID(generalID) {
        return this.id + '_' + generalID;
    }
    queryID(generalID) {
        return this.DOM.querySelector('#' + this.specificElementID(generalID));
    }

    setDate(date) {
        this.date = date;
    }

    setMonth(monthIndex) {
        this.date.setMonth(monthIndex);
    }
}


window.addEventListener('message', (message) => {
    if (message.data === 'templates loaded') {
        new DateSelector(new Date());
    }
})
