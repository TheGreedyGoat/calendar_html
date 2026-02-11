

class table{
    constructor(cols, rows, addHeader){
        if(addHeader){
            this.header = []
            for(let i  = 0; i < cols; i++){
                this.header.push("H" + i.toString())
            }
        }

        this.content = []
        for(let i = 0; i < rows; i++){
            //this.content.push([])

            let row = []
            for(let j = 0; j < cols; j++){
                row.push(i +", " + j)
            }
            this.content.push(row)
        }
    }

    toHtml(){
        let rows = ""
        for(let i = 0; i < this.content.length; i++){
            let cells = ""
            for(let j  = 0; j < this.content[i].length; j++){
                cells += element("td", this.content[i][j])
            }
            rows += element("tr", cells)
        }

        return rows
        return element("table", rows)
    }

    getRow(i){
        return this.content[i]
    }

    getCell(i, j){
        return this.content[i][j]
    }
}


function tag(type, closing){
    let res ="<"
    if(closing){
        res += "/"
    }

    res += type + ">"
    return res
}

function element(type, content){
    return tag(type, false) + content + tag(type, true)
}
