
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
    constructor(date) {
        if (!DateSelector.domTemplateString) {
            DateSelector.domTemplateString = Templates.getTemplateString('date_selector_template');
        }

        this.id = 'selector' + DateSelector.currentID++;


        this.selectedDate = date;
        this.setupDOM();
        this.switchMonth(0);

    }

    //Die zu übergebene Methode in der Date-Selector Klasse
    onDateClick = (date) => {
        this.selectDate(date);
        this.sheet.setup(date);
        this.setVisibility(false);
    };

    selectDate(date) {
        this.selectedDate = new Date(date);
        this.showHide.innerText = this.selectedDate.toLocaleDateString('de-DE', DateSelector.selectPreviewFormat);
        this.updateHeader();
    }

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
        this.showHide.innerText = this.selectedDate.toLocaleDateString('de-DE', DateSelector.selectPreviewFormat);
        this.showHide.addEventListener('click', () => {
            this.toggleVisibility();
        });


        this.focusWrapper = this.queryID('selector_focus_wrapper');
        this.focusWrapper.addEventListener('click', () => {
            this.setVisibility(false);
        });
        this.innerWrapper = this.queryID('inner_wrapper');
        this.sheet.addDateClickEvent(this.onDateClick);

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
        this.focusWrapper.hidden = !this.focusWrapper.hidden
    }

    /**
     * 
     * @param {boolean} visible 
     */
    setVisibility(visible) {
        this.focusWrapper.hidden = !visible;
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
}


