

window.addEventListener("message", 
    function(event){
        handleMessage(event.data)
    }
)

function checkMessageFormat(data){
    return data.type && data.value
}

function handleMessage(data){
    if(!checkMessageFormat(data)) {
        console.log(`Invalid Message format ${data.toString()}.`)
        return false
    }
    switch(data.type){
        
        default: {
            console.log(`Unknown data type ${data.type}.`)
            return false
        }
    }
}
