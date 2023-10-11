
let sourceImg = null;
let maskImg = null;
let renderCounter = 0;
let curLayer = 0;

// Image Number
let sourceFile = "input_1.jpg";
let maskFile   = "mask_1.png";
let outputFile = "output_1.png";

// Average Colour Channels (Setup Variables for layer 1)
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
  background(20);
  sourceImg.loadPixels();
  maskImg.loadPixels();
  
}

function draw () {
  // Layer 0 Colour Average Variable Arrays
  let colArrR = [];
  let colArrG = [];
  let colArrB = [];

  // Original Mask Colour Average Layer
  if (curLayer == 0) {
    // Single Scanline
    let num_lines_to_draw = 1;
    for(let j = renderCounter; j < renderCounter + num_lines_to_draw && j < 1080; j ++) {
      for(let i = 0; i < 1920; i ++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        let mask = maskImg.get(i, j);

        // Push i Pixel Colour
        colArrR.push(pix[0]);
        colArrG.push(pix[1]);
        colArrB.push(pix[2]);

        // Round j line Pixel Colours to i
        var colAverageR = Math.round(colArrR.reduce((a, b) => a + b, 0) / colArrR.length);
        var colAverageG = Math.round(colArrG.reduce((a, b) => a + b, 0) / colArrG.length);
        var colAverageB = Math.round(colArrB.reduce((a, b) => a + b, 0) / colArrB.length);
  
        var colAverage = color(colAverageR, colAverageG, colAverageB);

        if(mask[0] > 20) { // Set Mask Colour from Averages
          set(i, j, colAverage);
        } else { // Set Image Original Colour
          set(i, j, pix);
        }
      }
      //Average Colours for layer 1 (In J Loop)
      finalRowColorR[j] = colAverageR;
      finalRowColorG[j] = colAverageG;
      finalRowColorB[j] = colAverageB;
    }
    renderCounter = renderCounter + num_lines_to_draw;
    updatePixels();
  
  } 

  // Updated Mask Average Colours (Dissolve Effect Layer)
  if (curLayer == 1) {
    let num_lines_to_draw = 1;
    for(let j = renderCounter; j < renderCounter + num_lines_to_draw && j < 1080; j ++) {
      for(let i = 0; i < 1920; i ++) {
        colorMode(RGB);
        let pix = sourceImg.get(i, j);
        let mask = maskImg.get(i, j);

        var finalColAverage = color(finalRowColorR[j], finalRowColorG[j], finalRowColorB[j]);

        if(mask[0] > 20) { // Set Mask Colour from layer 0 averages
          fill(finalColAverage);
          circle(random(i + 10, i - 10), random(j + 10, j - 10), 2);
        }
      }
      print(j);
    }

    renderCounter = renderCounter + num_lines_to_draw;
  }

  // Draw & Blend Layer (Video Camera Effect Layer)
  if (curLayer == 2) {
    rectMode(CORNERS);

    for(let i = 0; i < 500; i ++) {
      let x1 = random(0, width);
      let y1 = random(0, height);

      let pix = sourceImg.get(x1, y1);
      let mask = maskImg.get(x1, y1);

      // Round random Y1 value to integer
      let roundY1 = Math.round(y1);

      if (mask[1] < 20) { // Image Layer with Shapes for watercolour/Old Camera Effect

        noStroke();
        // ReDraw dark green areas with triangles for image clarity
        if (pix[0] < 75 && pix[1] < 130 && pix[2] < 50) {
          fill(pix[0], pix[1], pix[2], 160);
          triangle(x1, y1, x1 + 2, y1 - 4, x1 - 2, y1 - 4);
        }

        // Blending Circles to saturate image
        if (i < 7) {
          colorMode(RGB);
          noStroke();
          if (y1 < 1060) { // Bug Fix Condition
            fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 4);
            circle(x1 + random(-20, 20), y1 + random(-20, 20), random(100, 200));
          }

          // VHS Lines
          strokeWeight(3);
          stroke(finalRowColorR[roundY1] + 20, finalRowColorG[roundY1] + 20, finalRowColorB[roundY1] - 70, 18);
          line(x1 - 30, y1, x1 + 30, y1);
        }
      } else { //Mask Layer with Blend Lines and Circles
        colorMode(RGB);
        stroke(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 20);
        strokeWeight(2);

        // Blending Lines inside mask
        let yRan = y1 + random(-20, 20);
        let xRan = x1 + random(-20, 20);
        line(x1, yRan, x1 + 20, yRan);
        line(xRan, y1, xRan, y1 + 20);

        // Blending Translucent Circles
        if (i %2 == 1 && y1 < 1060) { // Bug Fix Condition
          noStroke();
          fill(finalRowColorR[roundY1], finalRowColorG[roundY1], finalRowColorB[roundY1], 4);
          circle(x1 + random(-100, 100), y1 + random(-30, 30), random(20, 130));
        }
      }
    }

    renderCounter = renderCounter + 1;
  }

  // print(renderCounter);
  if (curLayer == 0 && renderCounter > 1080) {
    curLayer = 1;
    renderCounter = 0;
    console.log("Layer1Done");
  } else if (curLayer == 1 && renderCounter > 1080) {
    curLayer = 2;
    renderCounter = 0;
    console.log("Layer2Done");
  } else if (curLayer == 2 && renderCounter > 500) {
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