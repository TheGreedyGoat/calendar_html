
const TEMPLATES_URL = '../templates.html';

class ScheduleFormular{
    
    static SCHEDULE_CREATOR_TEMPLATE_STRING;
    static PARSER;
    static async #loadTemplate(){
        const response = await fetch(TEMPLATES_URL)
        const html = await response.text();
        ScheduleFormular.PARSER = new DOMParser();
        const doc = ScheduleFormular.PARSER.parseFromString(html, 'text/html');
        const template = doc.querySelector('#schedule_creator_template');
        const fragment = template.content;
        this.SCHEDULE_CREATOR_TEMPLATE_STRING = fragment.children[0].outerHTML;
    }

    static #getDOM(){
        return this.PARSER.parseFromString(this.SCHEDULE_CREATOR_TEMPLATE_STRING, 'text/html').querySelector('#main_div');
    }

    static async createInstance(startDate){
        if(!this.SCHEDULE_CREATOR_TEMPLATE_STRING){
            await this.#loadTemplate();
        }
        return new ScheduleFormular(startDate);
    }
/**
 * 
 * @param {Date} startDate 
 */
    constructor(startDate){
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

        this.startSelecorTarget = this.DOM.querySelector('#start_selector_target');
        this.endSelecorTarget = this.DOM.querySelector('#end_selector_target');

        this.startSelector = new DateSelector(startDate, 'start');
        this.startSelector.place(this.startSelecorTarget);
        this.endSelector = new DateSelector(endDate, 'end')
        this.endSelector.place(this.endSelecorTarget);
        
        
        // this.startDateSelector = new DateSelector(this.inputValues.startDate);
        // this.endDateSelector = new DateSelector(this.inputValues.endDate);
    }

    /**
     * 
     * @param {Element} target 
     */
    place(target){
        target.innerHTML = '';
        target.appendChild(this.DOM);
    }

}

const TARGET = document.querySelector('main');

createSC()
async function createSC(){
    let sC = await ScheduleFormular.createInstance(new Date());
    sC.place(TARGET);
    console.log(document.body.innerHTML);
}
