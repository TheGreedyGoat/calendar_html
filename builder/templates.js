const TEMPLATES_URL = '../templates.html';

class Templates{
    static doc;
    static async loadTemplates(){
        const response = await fetch(TEMPLATES_URL)
        const html = await response.text();
        const parser = new DOMParser();
        this.doc = parser.parseFromString(html, 'text/html');

    }

    static getTemplateString(templateID){
        const template = this.doc.querySelector('#' + templateID);
        if(!template){
            throw new Error('template with id ' + templateID + ' does not exist!');
        }

        const fragment = template.content;
        return fragment.children[0].outerHTML;
    }
}


load();
async function load(){
    await Templates.loadTemplates();
    window.postMessage('templates loaded', '*'); // Bescheid geben, dass die Templates soweit sind

} 
