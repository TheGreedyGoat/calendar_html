
class DateSelector{

    static templateString;

    constructor(){
        if(!DateSelector.templateString){
            DateSelector.templateString = Templates.getTemplateString('date_selector_template');
        }

        console.log(DateSelector.templateString);
        document.body.innerHTML = DateSelector.templateString
    }
}


window.addEventListener('message', (message) => {
    if(message.data === 'templates loaded'){
    console.log('hellooo?')
        new DateSelector();
    }
})
