let sourceImg=null;
let maskImg=null;
let renderCounter=0;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_1.png";

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  // background(255, 0, 0);
  background(sourceFile);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

function draw () {
  for(let i = 0; i < 5000; i ++) {
    let x = floor(random(sourceImg.width));
    let y = floor(random(sourceImg.height));
    let pix = sourceImg.get(x, y);
    let mask = maskImg.get(x, y);
    fill(pix[0], 0, 0);
    noStroke();
    if(mask[0] > 128) { // white part of mask
      let pointSize = 10;
      // stroke(pix[0], 0, 0);
      stroke(pix);
      strokeWeight(pointSize / 5);
      line(x - pointSize, y - pointSize, x + pointSize, y + pointSize);   
      line(x - pointSize, y + pointSize, x + pointSize, y - pointSize);
    }
    else { // black part of mask
      let pointSize = 15;
      fill(pix);
      stroke(pix[0], 20, 255, 100);
      strokeWeight(pointSize / 5);   
      line(x, y - pointSize - 10, x, y + pointSize + 10); 
      stroke(pix);
      line(x, y - pointSize, x, y + pointSize); 
      // line(x - pointSize, y, x + pointSize, y);
    }
  }
  renderCounter = renderCounter + 1;
  if(renderCounter > 10) {
    console.log("Done!")
    noLoop();
    // uncomment this to save the result
    // saveArtworkImage(outputFile);
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
}
