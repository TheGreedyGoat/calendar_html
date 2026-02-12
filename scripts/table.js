

class table{
constructor(rows, header){
        this.header = header
        this.createTable(header.length, rows)
        this.rows = rows
        this.cols = header.length
    }
    createTable(cols, rows){
        this.content = []
        for(let i = 0; i < rows; i++){

            let row = []
            for(let j = 0; j < cols; j++){
                row.push("")
            }
            this.content.push(row)
        }
    }

    


    toHtml(addHeader = true, from, to){
        if(!from){
            from = 0
        }
        if(!to){
            to = this.rows
        }

        let rows = ""
        if(this.header && addHeader){
            let cells = ""
            for(let i = 0; i < this.header.length; i++){
                cells += element("th", this.header[i])
            }
            rows += element("tr", cells)
        }
        for(let i = from; i < to; i++){
            let cells = ""
            for(let j  = 0; j < this.content[i].length; j++){
                cells += element("td", this.content[i][j])
            }
            rows += element("tr", cells)
        }

        //return rows
        return element("table", rows)
    }

    getRow(i){
        return this.content[i]
    }

    getCell(row, col){
        return this.content[row][col]
    }

    writeCell(row, col, text){
        this.content[row][col] = text
    }
    
    clear(){
        this.createTable(this.cols, this.rows)
    }
}


function tag(type, closing, attributes, values){
    let res ="<"
    if(closing){
        res += "/"
    }

    res += type

    if(!closing  && attributes && values && attributes.length == values.length){
        for(let i = 0; i < attributes.length; i++){
            if(i > 0){
                res += ","
            }
            res += " " + attributes[i] + '= "' + values[i] + '"'
        }
    }

    res += ">"
    return res
}

function element(type, content, attributes, values){
    return tag(type, false, attributes, values) + content + tag(type, true)
}
