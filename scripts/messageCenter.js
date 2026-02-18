
window.addEventListener("message", 
    function(event){
        console.log("message recieved")
        handleMessage(event.data)
    }
)

function checkMessageFormat(data){
    return data.type && data.value
}

function handleMessage(data){
    if(!checkMessageFormat(data)) {
        console.log(`Invalid Message format ${data.type}, ${data.value}.`)
        return false
    }
    switch(data.type){
        case "log":
            console.log(data.value)
            break
        case "alert":
            alert(data.value)
            break
        case "dateClicked":
            setActiveDate(data.value)
            break
        default: 
            console.log(`Unknown data type ${data.type}.`)
            return false
        
    }
    return true
}
