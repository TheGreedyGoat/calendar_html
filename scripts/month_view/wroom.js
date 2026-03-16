
let moveLeft = true;
let carTopBase = 150;

window.setTimeout(carDrive, 3000);

function carDrive() {
    let cLeft = parseInt(window.getComputedStyle(CAR).left, 10) || 0;
    let newLeft = cLeft + 900 * (moveLeft ? -1 : 1);
    CAR.style.left = (newLeft + 'px');
    moveLeft = !moveLeft;
    window.setTimeout(uTurn, 3000);
}

function uTurn() {

    CAR.style.transform = 'scaleX(' + (moveLeft ? 1 : -1) + ')';
    let cTop = parseInt(window.getComputedStyle(CAR).top) || 0;

    let newTop = carTopBase + 45 * (moveLeft ? 0 : 1);
    CAR.style.top = (newTop + 'px');
    carDrive();
}