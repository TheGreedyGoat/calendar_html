function setup() {
    createCanvas(400, 400);
    background(0);
}


let a = 0;
let step  = 1.1;

function draw() {
    let sinA = sin(a);
    let x = 16* pow(sinA, 3);
    let y = - (13 * cos(a) - 5 * cos(2*a) - 2 * cos(3*a) - cos(4*a));
    translate(width/2, height/2);
    strokeWeight(3)
    for(let i = 0; i <= 10; i++){
    let gb = map(i, 0, 10, 255, 0)
    stroke(255, gb,gb);
        point(x * i, y * i)
    }
    //point(x*10, y*10);
    a += step;
}