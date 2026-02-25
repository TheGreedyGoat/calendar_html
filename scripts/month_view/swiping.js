
const classes = document.querySelector("main").classList;



window.onresize = function(){
    stopTransistions()
};
let timer = 0;

function stopTransistions(){
    console.log("resizing");
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    else
        classes.add('stop-transitions');

    timer = setTimeout(() => {
        classes.remove('stop-transitions');
        timer = null;
    }, 100);
}

function swipeLeft(){
    // document.querySelector("main").setAttribute("class", "left");
    document.querySelector("main").style.transform = "translateX(100dvw)"
}

function swipeRight(){
    // document.querySelector("main").setAttribute("class", "right");
    document.querySelector("main").style.transform = "translateX(0dvw)"
}
