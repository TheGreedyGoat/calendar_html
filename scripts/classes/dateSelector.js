
class DateSelector {

    static domTemplateString;
    static currentID = 0;
    static selectPreviewFormat = {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }
    /**
     * 
     * @param {Date} date 
     */
    constructor(date, calendarTarget) {
        if (!DateSelector.domTemplateString) {
            DateSelector.domTemplateString = Templates.getTemplateString('date_selector_template');
        }



        this.id = 'selector' + DateSelector.currentID++;

        this.selectedDate = date;
        this.setupDOM(calendarTarget);
        this.switchMonth(0);

    }

    //Die zu übergebene Methode in der Date-Selector Klasse
    onDateClick = (date) => {

        messageHandler.sendMessage(window.parent, 'click', { clicKType: 'general' });
        this.selectDate(date);
        this.sheet.setup(date);
        this.setVisibility(false);
    };

    selectDate(date) {
        this.selectedDate = new Date(date);
        this.showHide.innerText = this.selectedDate.toLocaleDateString('de-DE', DateSelector.selectPreviewFormat);
        this.updateHeader();
    }

    setupDOM(calendarTarget) {

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
            messageHandler.sendMessage(window.parent, 'click', { clicKType: 'general' });
            this.switchMonth(-1);
        })
        this.nextMonthBtn.addEventListener('click', () => {
            messageHandler.sendMessage(window.parent, 'click', { clicKType: 'general' });
            this.switchMonth(+1);
        })

        this.showHide = this.queryID('showHide');
        this.showHide.innerText = this.selectedDate.toLocaleDateString('de-DE', DateSelector.selectPreviewFormat);
        this.showHide.addEventListener('click', () => {
            messageHandler.sendMessage(window.parent, 'click', { clicKType: 'general' });
            this.toggleVisibility();
        });

        this.innerWrapper = this.queryID('inner_wrapper');
        this.sheet.addDateClickEvent(this.onDateClick);

        if (calendarTarget != undefined) {
            calendarTarget.appendChild(this.innerWrapper);
        }

    }

    switchMonth(delta) {
        this.sheet.IncreaseOrDecreaseMonth(delta);
        this.updateHeader();
    }

    updateHeader() {
        let str = this.sheet.dateOfFirstDay.toLocaleDateString('de-DE', {
            month: 'short',
            year: 'numeric'
        });

        this.sheetHeader.innerText = str;

    }
    toggleVisibility() {
        this.innerWrapper.hidden = !this.innerWrapper.hidden
    }

    /**
     * 
     * @param {boolean} visible 
     */
    setVisibility(visible) {
        this.innerWrapper.hidden = !visible;
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

    place(target) {
        target.innerHTML = '';
        target.appendChild(this.DOM);
    }

    placeCalendar(target) {
        target.appendChild(this.innerWrapper);
    }
}


