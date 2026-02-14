let topHeight = document.getElementById("topBody").clientHeight

window.parent.postMessage(
    {
        type: "topFrameHeight",
        value: topHeight
    }, 
"*")