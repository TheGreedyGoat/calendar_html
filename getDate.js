const hystericMessages = ["Ahhhh!", "Ich flipp aus!", "Heiligsblechle!", "Oh mein Gott!", "Hilfe!", "Panik!", "ICH BIN GANZ RUHIG!"]
const hystList = document.getElementById("hystList");
const listHead = document.getElementById("listhead");

window.addEventListener("message", 
    function(event){
        console.log(event.data)
        listHead.innerHTML = `Hysterische Ereignisse am ${event.data}:`

        
        let lines = Math.floor(Math.random() * (10 - 3) + 3);
        for(let i = 0; i < lines; i++){
            let newLine = this.document.createElement("li")
            newLine.innerHTML = hystericMessages[Math.floor(Math.random() * hystericMessages.length)]
            listHead.appendChild(newLine);
        }
    }
)