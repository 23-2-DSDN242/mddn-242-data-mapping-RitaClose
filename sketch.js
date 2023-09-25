
let sourceImg = null;
let maskImg = null;
let renderCounter = 0;

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
  background(180);
  sourceImg.loadPixels();
  maskImg.loadPixels();
}

function draw () {
  let j = renderCounter;
  let colArrR = [];
  let colArrG = [];
  let colArrB = [];

  // get one scanline
  for(let i = 0; i < 1920; i ++) {
    let pix = sourceImg.get(i, j);
    let mask = maskImg.get(i, j);

    // colorMode(HSB);

    colArrR.push(pix[0]);
    colArrG.push(pix[1]);
    colArrB.push(pix[2]);


    if(mask[0] > 128) {
      // draw the full pixels
      // let col = color(pix);
      // colorMode(HSB, 360, 100, 100);
      // let h = hue(col);
      // let s = saturation(col);
      // let b = brightness(col);

      // newH = map(h, 0, 360, 80, 120);
      // let newColor = color(newH, s, b);
      // let gray_color = 64 + pix[1] / 8;
      let colAverageR = colArrR.reduce((a, b) => a + b, 0) / colArrR.length;
      let colAverageG = colArrG.reduce((a, b) => a + b, 0) / colArrG.length;
      let colAverageB = colArrB.reduce((a, b) => a + b, 0) / colArrB.length;

      let colAverage = color(colAverageR, colAverageG, colAverageB);
      // set(random(i + 10, i - 10), random(j + 5, j - 5), colAverage);
      set(i, j, colAverage);
    }
    else {
      // draw a "dimmed" version in gray
      colorMode(RGB);

      set(i, j, pix);
    }
  }
  updatePixels();
  renderCounter = renderCounter + 1;
  print(renderCounter);
  if(renderCounter > 1080) {
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






// //Original Code Source

// let sourceImg=null;
// let maskImg=null;
// let renderCounter=0;

// // change these three lines as appropiate
// let sourceFile = "input_2.jpg";
// let maskFile   = "mask_2.png";
// let outputFile = "output_2.png";

// function preload() {
//   sourceImg = loadImage(sourceFile);
//   maskImg = loadImage(maskFile);
// }

// function setup () {
//   let main_canvas = createCanvas(1920, 1080);
//   main_canvas.parent('canvasContainer');

//   imageMode(CENTER);
//   noStroke();
//   // background(255, 0, 0);
//   background(sourceFile);
//   sourceImg.loadPixels();
//   maskImg.loadPixels();
// }

// function draw () {
//   for(let i = 0; i < 5000; i ++) {
//     let x = floor(random(sourceImg.width));
//     let y = floor(random(sourceImg.height));
//     let pix = sourceImg.get(x, y);
//     let mask = maskImg.get(x, y);
//     fill(pix[0], 0, 0);
//     noStroke();
//     if(mask[0] > 128) { // white part of mask
//       let pointSize = 10;
//       stroke(pix[0], pix[1], 0);
//       // strokeWeight(pointSize / 1.5);
//       // line(x  - pointSize - 10, y, x + pointSize + 10, y); 
//       stroke(pix);
//       strokeWeight(pointSize / 3);
//       line(x - pointSize, y + pointSize, x + pointSize, y - pointSize);
//       stroke(pix[0], 180);
//       line(x - pointSize, y - pointSize, x + pointSize, y + pointSize);   
//       // line(x - pointSize, y, x + pointSize, y);
//     }
//     else { // black part of mask
//       let pointSize = 15;
//       fill(pix, 100);
//       // if (i % 2 == 1) {
//         // triangle(x, y, x + 22, y - 44, x - 22, y - 44);
//       // } else {
//       //   triangle(x, y, x + 20, y + 40, x - 20, y + 40);
//       // }
//       triangle(x, y, x + 10, y + 20, x - 10, y + 20);
//       fill(pix[0], 255, pix[2], 20);
//       circle(x, y + 10, 10);
//       stroke(pix);
//       strokeWeight(pointSize / 2);   
//       // line(x, y - pointSize - 10, x, y + pointSize + 10); 
//       stroke(30, pix[1], pix[2]);
//       let ran = random(0, 10);
//       strokeWeight(ran);
//       // line(x, y - pointSize, x, y + pointSize); 
//     }
//   }
//   renderCounter = renderCounter + 1;
//   if(renderCounter > 20) {
//     console.log("Done!")
//     noLoop();
//     // uncomment this to save the result
//     saveArtworkImage(outputFile);
//   }
// }

// function keyTyped() {
//   if (key == '!') {
//     saveBlocksImages();
//   }
// }
