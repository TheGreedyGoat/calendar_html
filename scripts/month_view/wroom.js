
let moveLeft = true;

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
    let cTop = parseInt(window.getComputedStyle(CAR).top, 10) || 0;
    let newTop = cTop + 100 * (moveLeft ? -1 : 1);

    CAR.style.top = (newTop + 'px');
    carDrive();
}