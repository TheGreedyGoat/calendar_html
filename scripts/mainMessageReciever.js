window.addEventListener("message", 
    function(event){
        switch(event.data.type){
            case "date": 
                setNewDate(event.data.value) 
                break
            case "topFrameHeight":
                setFrameHeight(event.data.value)
                break
            default: break
        }
        if(event.data.type === "date"){
            
    }
    }
)


function setNewDate(data){
const hystericMessages = ["Ahhhh!", "Ich flipp aus!", "Heiligsblechle!", "Oh mein Gott!", "Hilfe!", "Panik!", "ICH BIN GANZ RUHIG!"]
const hystList = document.getElementById("hystList");
const listHead = document.getElementById("listhead");

    listHead.innerHTML = `Hysterische Ereignisse am ${event.data.value}:`
    let lines = Math.floor(Math.random() * (10 - 3) + 3);
    for(let i = 0; i < lines; i++){
        let newLine = this.document.createElement("li")
        newLine.innerHTML = hystericMessages[Math.floor(Math.random() * hystericMessages.length)]
        listHead.appendChild(newLine);
    }

}

function setFrameHeight(data){
    console.log(data)
    document.getElementById("topFrame").setAttribute("height", data + "px")
}
