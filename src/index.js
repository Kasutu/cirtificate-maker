import { createCanvas, Image, registerFont } from 'canvas';
import fs from 'fs';
import { namesList } from '../input/namesList.js';

const outputDir = '../output';
const inputDir = '../input';
const bgName = 'Info-Session-Cert.png';
const width = 2000;
const height = 1414;
const center = width / 2;
const targetHight = 580;

let getFromInputPath = (name) => `${inputDir}/${name}`;
let writeOutputDir = (name) => `${outputDir}/${name}.png`;

registerFont(getFromInputPath('minecraft.ttf'), {
  family: 'monospace',
  weight: 'bold',
});

const bgSrc = getFromInputPath(bgName);
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

function drawText(name) {
  const imgOut = writeOutputDir(name);

  let img = new Image();
  img.src = bgSrc;

  ctx.drawImage(img, 0, 0);

  ctx.font = '90px monospace';
  ctx.fillStyle = 'white';
  const textWidth = ctx.measureText(name).width;
  ctx.fillText(name, center - textWidth / 2, targetHight);

  try {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(imgOut, buffer);

    console.log(`Created: ${imgOut}`);
  } catch (error) {
    console.log(error);
  }
}

namesList.forEach((v) => {
  drawText(v);
});
