const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


const pixelRatio = window.devicePixelRatio || 1;
const canvasRect = canvas.getBoundingClientRect();

let idShape=1;

canvas.width = canvasRect.width * pixelRatio;
canvas.height = canvasRect.height * pixelRatio;

ctx.scale(pixelRatio, pixelRatio);

const Diagram_Struct=[];
const pplIcon = document.getElementById("PersonImg");
const CorpIcon = document.getElementById("CompanyImg");

const pplImg = new Image();
pplImg.src ="./profile.png"

const corpImg = new Image();
corpImg.src ="./building.png"


pplIcon.addEventListener("click", function() {
  drawIcon(pplImg, 10, 10,20,20);
});

CorpIcon.addEventListener("click", function() {
  drawIcon(corpImg, 10, 10,20,20);
});

function drawIcon(icon, x, y,w,h) {
  ctx.drawImage(icon, x, y,w,h);
}
