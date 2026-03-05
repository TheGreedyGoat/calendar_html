
class DateSelector{
    /**
     * 
     * @param {Date} date 
     * @param {string} id 
     */
    constructor(date, id){
        this.value = date;
        this.sheet = new CalendarSheet(date);
        this.id = id;

        this.showHide = document.createElement('button');
        this.showHide.innerText = this.value.toLocaleDateString();

        this.flexWrapper =document.createElement('div');
        this.innerWrapper = document.createElement('div');
        this.form = document.createElement('form');

        this.prevMonthButton = document.createElement('button');
        this.headWrapper = document.createElement('div');
        this.header = document.createElement('h3');

        let options = {
            month: 'long',
            year: 'numeric'
        };
        this.header.innerText = date.toLocaleDateString('de-DE', options);
        this.nextMonthButton = document.createElement('button');

        this.assemble();
        this.hide();
        // this.setHidden(true);
    }

    /**
     * prepends individual with this.id
     * @param {string} individual 
     */
    buildID(individual){
        return this.id + '_' + individual;
    }

    assemble(){
        this.showHide.setAttribute('id', this.buildID('showHide'));
        this.innerWrapper.setAttribute('id', this.buildID('innerWrapper'));
        this.prevMonthButton.setAttribute('id', this.buildID('prevMonth'));
        this.nextMonthButton.setAttribute('id', this.buildID('nextMonth'));
        this.form.setAttribute('id', this.buildID('form'));

        
        this.showHide.classList.add('selector-showHide');
        this.flexWrapper.classList.add('selector-flexWrapper');
        this.innerWrapper.classList.add('selector-innerWrapper');
        this.headWrapper.classList.add('selector-headWrapper');
        this.prevMonthButton.classList.add('selector-month');
        this.nextMonthButton.classList.add('selector-month');
        this.form.classList.add('selector-form');

        this.prevMonthButton.innerText = '<';
        this.nextMonthButton.innerText = '>';

        

        this.headWrapper.appendChild(this.prevMonthButton);
        this.headWrapper.appendChild(this.header);
        this.headWrapper.appendChild(this.nextMonthButton);
        this.innerWrapper.appendChild(this.headWrapper);
        
        this.form.appendChild(this.sheet.toHTML())
        this.innerWrapper.appendChild(this.form);

        this.flexWrapper.appendChild(this.innerWrapper)

        this.setupButtons();
    }

    setupButtons(){

        this.showHide.addEventListener('click', () =>{
            this.toggleHidden();
        })
        this.prevMonthButton.addEventListener('click', () => {
            console.log('click!')
            this.sheet.IncreaseOrDecreaseMonth(-1)
        });
        this.nextMonthButton.addEventListener('click', () => {
            console.log('click!')
            this.sheet.IncreaseOrDecreaseMonth(+1)
        });

        this.sheet.addDateClickEvent((value) => {
            console.log(value);
            this.setValue(value);
        });
    }

    /**
     * 
     * @param {Date} value 
     */
    setValue(value){
        this.value = value;
        this.showHide.innerText = value.toLocaleDateString();
    }


    place(target){
        target.innerHTML = '';
        target.appendChild(this.showHide);
        target.appendChild(this.flexWrapper);
    }

    
    toggleHidden(){
        this.innerWrapper.hidden = !this.innerWrapper.hidden;
    }

    hide(){
        this.innerWrapper.hidden = true;
    }

}
