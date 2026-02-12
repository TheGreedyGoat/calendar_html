class table{
constructor(tHeight, tWidth){
        this.createTable(tHeight, tWidth)
        this.height = tHeight
        this.width = tWidth
    }

    createTable(tHeight, tWidth){
        this.rows = []
        for(let i = 0; i < tHeight; i++){

            let row = new tableRow(tWidth)
            for(let j = 0; j < tWidth; j++){
                row.writeCell(j)
            }
            this.rows.push(row)
        }
    }

    setHeader(head){
        this.header = new tableRow(this.width, true)
        for(let i = 0; i < this.width && i < head.length; i++){
            this.header.writeCell(i, head[i])
        }
    }


    toHTML(addHeader = true){
        let rowsHTML = "\n"
        if(addHeader && this.header) rowsHTML = this.header.toHTML()
        for(let i = 0; i < this.rows.length; i++){
            rowsHTML += this.rows[i].toHTML() 
        }
        return element("table", rowsHTML) + "\n"
    }

    getRow(i){
        return this.rows[i]
    }

    getCell(row, col){
        return this.getRow(row).getCell(col)
    }
    getCellContent(row, col){
        return this.getCell(row, col).content
    }
    writeCell(row, col, text){
        this.getRow(row).getCell(col).content  = text
    }

    clear(){
        this.createTable(this.height, this.width)
    }
}

class tableRow{
    constructor(size = 1, isHeader = false){
        this.cells = []
        for(let i = 0; i< size; i++){
            this.cells.push(new tableCell(isHeader))
        }
    }

    size(){ return this.cells.length}
    getCell(i){ return this.cells[i]}
    getCellContent(i){ return this.cells[i].content}
    
    writeCell(i, text = ""){ 
        this.getCell(i).content = text 
    }

    toHTML(){
        let cellsHTML = "\n"
        for(let i = 0; i < this.cells.length; i++){
            cellsHTML += this.cells[i].toHTML();
        }
        return element("tr", cellsHTML) + "\n"
    }
}

class tableCell{
    constructor(isHeader = false, content = ""){
        this.isHeader = isHeader
        this.content = content
    }

    getAttribute(type){
        if(!this.attributes) return
        for(let i = 0; i < this.attributes.length; i++){
            if(this.attributes[i] == type) return this.attValues[i]
        }
        
    }

    setAttribute(type, value){
        console.log(`adding attribute ${type} with value ${value}`)
        if(!this.attributes) this.attributes = []
        if(!this.attValues) this.attValues = []

        for(let i = 0; i < this.attributes.length; i++){
            if(this.attributes[i] == type){
                this.attValues[i] = value
                return
            }
        }

        this.attributes.push(type)
        this.attValues.push(value)
        
    }

    removeAttribute(type){
        if(!this.attributes) return
        for(let i = 0; i < this.attributes.length; i++){
            if(this.attributes[i] == type){
                this.attributes.slice(i)
                this.attValues.slice(i)
            }
        }

    }

    toHTML(){
        let tagType = "td"
        if(this.isHeader) tagType = "th"
        return element(tagType, this.content, this.attributes, this.attValues) + "\n"
    }
}

function tag(type = "div", closing = false, attributes, values){
    let res ="<"
    if(closing){
        res += "/"
    }

    res += type
    if(!closing  && attributes && values && attributes.length == values.length){
        for(let i = 0; i < attributes.length; i++){
            res += " " + attributes[i] + '= "' + values[i] + '"'
        }
    }

    res += ">"
    return res
}

function element(type = "div", content = "", attributes, values){
    return tag(type, false, attributes, values) + content + tag(type, true)
}
