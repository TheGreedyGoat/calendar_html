
new p5(backGroundSketch)
function backGroundSketch(p){
    const pixelSize = 5
    const parentid = "body"
    const variation = 10;
    const median = 75;
    const strength = 100;
    const hue = 35;
    const sat = 60;
    const borderWidth = 10; // in "Style-Pixels"
    buildBackground(p, parentid, pixelSize, variation, median, hue, sat, borderWidth)
}
/**
 * 
 * @param {*} p 
 * @param {*} parentid 
 * @param {*} pixelSize 
 * @param {*} variation 
 * @param {*} median 
 * @param {*} hue 
 * @param {*} sat 
 */
function buildBackground(p, parentid, pixelSize, variation, median, hue, sat, borderWidth){
  
  p.setup = function() {
    p.pixelDensity(1)
    let cnv = p.createCanvas(window.innerWidth , window.innerHeight);
    cnv.parent(parentid)
    cnv.position(0, 0);
    cnv.style("z-index", "-2");
    p.colorMode(p.HSB, 360, 100, 100, 100)
    p.noLoop();
  } // end setup
  

  p.draw = function(){
    p.loadPixels();

    let dark = Math.min(median - variation)
    let bright = Math.min(median + variation)

    for(let y = 20; y < p.height -  20; y += pixelSize){
      for(let x = 20; x < p.width - 20; x += pixelSize){
        
        let value = p.random(dark, bright);
        let c = p.color(hue, sat, value)
        let r = p.red(c)
        let g = p.green(c)
        let b = p.blue(c)
    
        for(let dy = 0; dy < pixelSize; dy++){
          for(let dx = 0; dx < pixelSize; dx++){
              let index = (pixelSize - 1) * ((x + dx) + (y + dy) * p.width)
              
              p.pixels[index ]    += r; //r
              p.pixels[index + 1] += g; //g
              p.pixels[index + 2] += b; //b
              p.pixels[index + 3] += 255; //a
          }
        }
      }
    }
    p.updatePixels()
  }

  p.windowResized = function(){
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }
}
