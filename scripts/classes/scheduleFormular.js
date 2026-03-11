
class ScheduleFormular {

    static domTemplateString;
    static Parser;

    static #getDOM() {
        if (!ScheduleFormular.domTemplateString) {
            ScheduleFormular.domTemplateString = Templates.getTemplateString('schedule_creator_template');
            ScheduleFormular.Parser = new DOMParser();
        }
        return this.Parser.parseFromString(this.domTemplateString, 'text/html').querySelector('#main_div');
    }

    /**
     * 
     * @param {Date} startDate 
     */
    constructor(startDate) {
        let endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1);
        this.inputValues = {
            // <- placeholder value
            title: '',  //
            startDate: startDate, //
            endDate: endDate, //
            recurrence: 'none', //
            recurrenceFreq: 1 //

        }

        this.DOM = ScheduleFormular.#getDOM();

        this.titleInput = this.DOM.querySelector('#title_input');

        this.startSelectorTarget = this.DOM.querySelector('#start_selector_target');
        this.startSelector = new DateSelector(startDate);
        this.startSelector.place(this.startSelectorTarget);

        this.endSelectorTarget = this.DOM.querySelector('#end_selector_target');
        this.endSelector = new DateSelector(endDate)
        this.endSelector.place(this.endSelectorTarget);

        this.wholeDayCheck = this.DOM.querySelector('#whole_day_check');

        this.recurrenceCheck = this.DOM.querySelector('#recurrence_check');
        this.recurrenceWrapper = this.DOM.querySelector('#select_recurrence_wrapper');
        this.recurrenceAmount = this.DOM.querySelector('#recurrence_amount');
        this.selectRecurrence = this.DOM.querySelector('#select_recurrence_type');


        this.submit = this.DOM.querySelector('#submit_schedule');

        this.setupFields();

    }

    setupFields() {
        this.startSelector.showHide.addEventListener('click', () => {
            this.endSelector.setVisibility(false);
        });
        this.endSelector.showHide.addEventListener('click', () => {
            this.startSelector.setVisibility(false);
        });

        this.wholeDayCheck.addEventListener('change', () => {

            sendMessage(window.parent, 'click', { clicKType: 'general' });
            console.log(this.wholeDayCheck.checked);
            this.onWholeDayCheck();
        });
        this.onWholeDayCheck();
        this.recurrenceCheck.addEventListener('change', () => {

            sendMessage(window.parent, 'click', { clicKType: 'general' });
            this.onRecurrenceCheck();
        });
        this.onRecurrenceCheck();
        this.submit.addEventListener('click', () => {

            sendMessage(window.parent, 'click', { clicKType: 'general' });
            this.submitSchedule();
        });
    }

    onWholeDayCheck() {
        const endSection = this.DOM.querySelectorAll('.end');
        for (let elem of endSection) {
            elem.hidden = this.wholeDayCheck.checked;
        }
    }

    onRecurrenceCheck() {
        this.recurrenceWrapper.hidden = !this.recurrenceCheck.checked;
    }

    /**
     * 
     * @param {Element} target 
     */
    place(target) {
        target.innerHTML = '';
        target.appendChild(this.DOM);
    }

    setCalendarTarget(target) {
        this.startSelector.placeCalendar(target);
        this.endSelector.placeCalendar(target);
    }

    submitSchedule() {
        console.log('???')
        this.inputValues.title = this.titleInput.value;
        if (this.inputValues.title === '') {
            alert('Bitte gib einen Titel ein, du Eumel!');
            return;
        }
        let startDate = this.startSelector.selectedDate;;
        console.log(this.startSelector.selectedDate)
        let endDate;
        if (this.wholeDayCheck.checked) {
            startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            endDate = new Date(startDate);
            endDate.setHours(23);
            endDate.setMinutes(59);
            endDate.setSeconds(59);
        } else {
            endDate = this.endSelector.selectedDate;
        }

        this.inputValues.startDate = startDate;
        this.inputValues.endDate = endDate;
        if (this.recurrenceCheck.checked) {
            this.inputValues.recurrence = this.selectRecurrence.value;
            this.inputValues.recurrenceFreq = this.recurrenceAmount.value;
        } else {
            this.inputValues.recurrence = 'none';
        }
        sendMessage(window.parent, 'new_schedule_data', this.inputValues);
    }

}



