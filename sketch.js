
let sourceImg = null;
let maskImg = null;
let renderCounter = 0;
let curLayer = 0;

// change these three lines as appropiate
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_1.png";

var finalRowColorR = [];
var finalRowColorG = [];
var finalRowColorB = [];

function preload() {
  sourceImg = loadImage(sourceFile);
  maskImg = loadImage(maskFile);
}

function setup () {
  let main_canvas = createCanvas(1920, 1080);
  main_canvas.parent('canvasContainer');

  imageMode(CENTER);
  noStroke();
  background(0, 0, 128);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  
}

function draw () {
  let colArrR = [];
  let colArrG = [];
  let colArrB = [];

  if (curLayer == 0) {
    let num_lines_to_draw = 1;
    // get one scanline
    for(let j = renderCounter; j < renderCounter + num_lines_to_draw && j < 1080; j ++) {
      for(let i = 0; i < 1920; i ++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        // create a color from the values (always RGB)
        // let col = color(pix);
        let mask = maskImg.get(i, j);

        colArrR.push(pix[0]);
        colArrG.push(pix[1]);
        colArrB.push(pix[2]);

        var colAverageR = Math.round(colArrR.reduce((a, b) => a + b, 0) / colArrR.length);
        var colAverageG = Math.round(colArrG.reduce((a, b) => a + b, 0) / colArrG.length);
        var colAverageB = Math.round(colArrB.reduce((a, b) => a + b, 0) / colArrB.length);
  
        var colAverage = color(colAverageR, colAverageG, colAverageB);

        if(mask[0] > 128) {
          // draw the full pixels
          // let gray_color = 64 + pix[1] / 8;

          // var rgbAverage = [colAverageR, colAverageG, colAverageB];

          // set(random(i + 10, i - 10), random(j + 5, j - 5), colAverage);
          set(i, j, colAverage);

        } else {
          set(i, j, pix);
        }
      }
      //In J Loop
      // finalRowColorR.push(colAverageR);
      // finalRowColorG.push(colAverageG);
      // finalRowColorB.push(colAverageB);
      finalRowColorR[j] = colAverageR;
      finalRowColorG[j] = colAverageG;
      finalRowColorB[j] = colAverageB;

      // print(colAverageR);
      // print(finalRowColorR.length);
    }
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  
  } 

  if (curLayer == 1) {
    rectMode(CORNERS);
    // colArrR = [];
    // colArrG = [];
    // colArrB = [];

    for(let i = 0; i < 500; i ++) {
      let x1 = random(0, width);
      let y1 = random(0, height);
      let x2 = x1 + 5;
      let y2 = y1 + 5;

      // colorMode(HSB, 360);

      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);

      let colHSB = color(pix);

      // colArrR.push(pix[0]);
      // colArrG.push(pix[1]);
      // colArrB.push(pix[2]);
      
      // fill(pix);
      // let colAverageR = colArrR.reduce((a, b) => a + b, 0) / colArrR.length;
      // let colAverageG = colArrG.reduce((a, b) => a + b, 0) / colArrG.length;
      // let colAverageB = colArrB.reduce((a, b) => a + b, 0) / colArrB.length;
    
      // let colAverage = color(colAverageR, colAverageG, colAverageB);


      // let finalColAverage = color(finalRowColor[y1[0]], finalRowColor[y1[1]], finalRowColor[y1[2]]);
      // print(finalColAverage);
      let roundY1 = Math.round(y1);
      var finalColAverage = color(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1]);
      // print(roundY1);
      // print(finalRowColorR.length);

      if (mask[1] < 128) {

        // let h = hue(colHSB);
        // let s = saturation(colHSB);
        // let b = brightness(colHSB);

        // let new_brt = map(b, 0, 360, 85, 360);
        // let new_sat = map(s, 0, 360, 60, 360);
        // let new_col = color(h, new_sat, new_brt);

        // noStroke();
        // fill(new_col);
        // rect(x1, y1, x2, y2, 2);

        if (i < 9) {
          colorMode(RGB);
          noStroke();
          fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 5);
          circle(x1 + random(-20, 20), y1 + random(-20, 20), random(100, 200));
          // if (i == 1 && renderCounter < 50) {
          //   // stroke(255, 100);
          //   fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 200);
          //   triangle(x1, y1, x1 + 22, y1 - 44, x1 - 22, y1 - 44);
          // }
          
        }
      } else {
        // fill();
        colorMode(RGB);
        // stroke(finalColAverage);
        stroke(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 15);
        // stroke(255);
        strokeWeight(3);
        let yRan = y1 + random(-20, 20);
        let xRan = x1 + random(-20, 20);
        line(x1, yRan, x1 + 10, yRan);
        line(xRan, y1, xRan, y1 + 10);
        // noStroke();
        // fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 5);
        // triangle(x1, y1, x1 + 22, y1 - 44, x1 - 22, y1 - 44);
        if (i %2 == 1) {
          noStroke();
          fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 5);
          // blendMode(LIGHTEST);
          circle(x1 + random(-30, 30), y1 + random(-30, 30), random(20, 130));
          // blendMode(BLEND);
        }
      }
    }

    renderCounter = renderCounter + 1;
  }
  // print(renderCounter);
  if (curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
  } else if (curLayer == 1 && renderCounter > 500) {
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
//     // saveArtworkImage(outputFile);
//   }
// }

// function keyTyped() {
//   if (key == '!') {
//     saveBlocksImages();
//   }
// }
