const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const pixelRatio = window.devicePixelRatio || 1;
const canvasRect = canvas.getBoundingClientRect();
const shapeType ={
  RECT: "rectangle",
  CIRCLE: "circle"
}

let idShape=1;

canvas.width = canvasRect.width * pixelRatio;
canvas.height = canvasRect.height * pixelRatio;

ctx.scale(pixelRatio, pixelRatio);

const Diagram_Struct=[];
const addCoBtn = document.getElementById("addCoBtnId");
const addPrsBtnId = document.getElementById("addPrsBtnId");


addCoBtn.addEventListener("click",()=>{
  const figure = {figureId:idShape,shape:shapeType.RECT, pX: 50, pY: 50, w: 100, h: 50, text: "Company 1", bgColor: "LightBlue",txtColor : "white"}
  Diagram_Struct.push(figure);
  idShape++;
  drawCoShape(figure);
});


function drawCoShape(shape) {
  ctx.fillStyle = shape.bgColor;
  ctx.fillRect(shape.pX, shape.pY, shape.w, shape.h);
  ctx.fillStyle = shape.txtColor;
  ctx.font = '10px Arial';
  ctx.fillText(shape.text, shape.pX + 10, shape.pY + 30);
}


addPrsBtnId.addEventListener("click",()=>{
  const figure = {figureId:idShape,shape:shapeType.CIRCLE, pX: 50, pY: 50, radius: 20, text: "Person 1", bgColor: "LightGreen",txtColor : "white"}
  console.log(figure);
  Diagram_Struct.push(figure);
  idShape++;
  drawPerShape(figure);
});

function drawPerShape(shape){
  ctx.beginPath();
  ctx.arc(shape.pX, shape.pY, shape.radius, 0, Math.PI * 2);
  ctx.fillStyle = shape.bgColor;
  ctx.fill();

  ctx.fillStyle = shape.txtColor;
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(shape.text, shape.pX, shape.pY);
}

