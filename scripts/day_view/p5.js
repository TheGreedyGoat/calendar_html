
new p5(backGroundSketch)
function backGroundSketch(p){
    const pixelSize = 5
    const parentid = "body"
    const variation = 5;
    const median = 75;
    const hue = 35;
    const sat = 60;
    buildBackground(p, parentid, pixelSize, variation, median, hue, sat)
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
function buildBackground(p, parentid, pixelSize, variation, median, hue, sat){
  
  p.setup = function() {
    p.pixelDensity(1)
    let cnv = p.createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent(parentid)
    cnv.position(0, 0);
    cnv.style("z-index", "-2");
    p.colorMode(p.HSB, 360, 100, 100, 100)

    let img = p.createImage(50, 50);
    img.loadPixels();
    
    let dark = Math.min(median - variation)
    let bright = Math.min(median + variation)

    for(let y = 0; y < img.height; y += pixelSize){
      for(let x = 0; x < img.width; x += pixelSize){

        let value = p.random(dark, bright);
        let c = p.color(hue, sat, value)
        let r = p.red(c)
        let g = p.green(c)
        let b = p.blue(c)

        for(let dy = 0; dy < pixelSize; dy++){
          for(let dx = 0; dx < pixelSize; dx++){
            img.set(x + dx, y + dy, [r, g, b, 255]);
          }
        }
      }
    }
    img.updatePixels();
    img.save("b_boardBackground.png")



    p.noLoop();
  } // end setup
  

  // // p.draw = function(){
  // //   p.loadPixels();


  // //   for(let y = 0; y < p.height; y += pixelSize){
  // //     for(let x = 0; x < p.width; x += pixelSize){
        
    
  // //       for(let dy = 0; dy < pixelSize; dy++){
  // //         for(let dx = 0; dx < pixelSize; dx++){
  // //             let index = (pixelSize - 1) * ((x + dx) + (y + dy) * p.width)
              
  // //             p.pixels[index ]    += r; //r
  // //             p.pixels[index + 1] += g; //g
  // //             p.pixels[index + 2] += b; //b
  // //             p.pixels[index + 3] += 255; //a
  // //         }
  // //       }
  // //     }
  // //   }
  // //   p.updatePixels()
  // // }

  p.windowResized = function(){
    p.resizeCanvas(window.innerWidth, window.innerHeight)
  }
}
