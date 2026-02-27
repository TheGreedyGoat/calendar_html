
const classes = document.querySelector("main").classList;

let stopTransitionTimer = 0;


window.onresize = function(){ // sonst wird das resizing animiert
    stopTransistions()
};

function stopTransistions(){
    console.log("resizing");
    if (stopTransitionTimer) {
        clearTimeout(stopTransitionTimer);
        stopTransitionTimer = null;
    }
    else
        classes.add('stop-transitions');

    stopTransitionTimer = setTimeout(() => {
        classes.remove('stop-transitions');
        stopTransitionTimer = null;
    }, 100);
}


function swipeToMonth(){
    document.querySelector("main").style.transform = "translateX(100dvw)"
}

function swipeToDay(){
    document.querySelector("main").style.transform = "translateX(0dvw)"
}