
let sourceImg = null;
let maskImg = null;
let renderCounter = 0;
let curLayer = 0;

// change these three lines as appropiate
let sourceFile = "input_5.jpg";
let maskFile   = "mask_5.png";
let outputFile = "output_5.png";

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

        // let newR = pix[0] + 5;
        // let newG = pix[1] + 15;
        // let newB = pix[2] + 5;

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

        if (i < 7) {
          colorMode(RGB);
          noStroke();
          fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 5);
          strokeWeight(0.25);
          stroke(10, 1);
          circle(x1 + random(-20, 20), y1 + random(-20, 20), random(100, 200));
          // if (i == 1 && renderCounter < 50) {
          //   // stroke(255, 100);
          //   fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 200);
          //   triangle(x1, y1, x1 + 22, y1 - 44, x1 - 22, y1 - 44);
          // }

          // noFill();
          // strokeWeight(1);
          // stroke(255, 5);
          // line(x1 - 30, y1 - 2, x1 + 30, y1 - 2);

          strokeWeight(3);
          stroke(finalRowColorR[roundY1] + 20, finalRowColorG[roundY1] + 20, finalRowColorB[roundY1] - 70, 20);
          line(x1 - 30, y1, x1 + 30, y1);
        }
      } else {
        // fill();
        colorMode(RGB);
        // stroke(finalColAverage);
        stroke(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 25);
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
          fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 4);
          // blendMode(REMOVE);
          circle(x1 + random(-30, 30), y1 + random(-30, 30), random(20, 130));
          // blendMode(BLEND);
        }
        set(x1, y1, pix);
      }
    }

    renderCounter = renderCounter + 1;
  }
  if (curLayer == 2) {
    let num_lines_to_draw = 1;
    // get one scanline
    for(let j = renderCounter; j < renderCounter + num_lines_to_draw && j < 1080; j ++) {
      for(let i = 0; i < 1920; i ++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        // create a color from the values (always RGB)
        // let col = color(pix);
        let mask = maskImg.get(i, j);

        if(mask[0] > 128) {
          fill(pix);
          circle(i, j, 2);
        } else {
        }
      }
      print(j);
    }

    renderCounter = renderCounter + num_lines_to_draw;
    // updatePixels(); 
  }

  // print(renderCounter);
  if (curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
    console.log("Layer1Done");
  } else if (curLayer == 1 && renderCounter > 500) {
    curLayer = 2;
    renderCounter = 0;
    console.log("Layer2Done");
  } else if (curLayer == 2 && renderCounter > 1080) {
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