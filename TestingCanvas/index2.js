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
  const figure = {figureId:idShape,
                  shape:shapeType.RECT, 
                  pX: 50, 
                  pY: 50, 
                  w: 100, 
                  h: 50, 
                  text: prompt("Enter company label:", ""), 
                  bgColor: "LightBlue",
                  txtColor : "white"}
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
  const figure = {figureId:idShape,
                  shape:shapeType.CIRCLE, 
                  pX: 50, 
                  pY: 50, 
                  radius: 20, 
                  text: prompt("Enter Person label:", ""), 
                  bgColor: "LightGreen",
                  txtColor : "white"}
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

function isMouseOnShape(posX,posY,tShape){
  console.log(tShape.shape);
  
  switch (tShape.shape){
      case shapeType.RECT:
        console.log("Comprueba si Estoy en rectangulo");
        console.log(posX);
        console.log(posY);
        console.log(tShape.pX);
        console.log(tShape.pY);
        console.log(tShape.w);
        console.log(tShape.h);
        if (
          posX >= tShape.pX &&
          posX <= tShape.pX + tShape.w &&
          posY >= tShape.pY &&
          posY <= tShape.pY + tShape.h
        ) {
          console.log("Estoy clickando dentro del rectangulo");
          return tShape.figureId;
        } else {
          return 0;
        }
      case shapeType.CIRCLE:
        console.log("Comprueba si Estoy en Circulo");
        console.log(`center:${tShape.pX}-${tShape.pY}`);
        
        console.log(`posx:${posX}`);
        console.log(`posy:${posY}`);
        console.log(`radius: ${tShape.radius}`);
        console.log("hipotenusa: " + Math.sqrt(Math.pow(posX-tShape.pX,2)+Math.pow(posY-tShape.pY,2)));
        if(Math.sqrt(Math.pow(posX - tShape.pX, 2) + Math.pow(posY - tShape.pY, 2)) <=
        tShape.radius){
          console.log("Estoy clickando dentro del circulo");
          return tShape.figureId;
        }
        else return 0;
      default:
        return 0;
  }
}

let mouse_down = function(event){
  event.preventDefault();
  
  let startX = parseInt(event.clientX);
  let startY = parseInt(event.clientY);
  console.log("clicking on canvas");
  let shapeClicked=0;
  for(let shape of Diagram_Struct.reverse()){
    shapeClicked= isMouseOnShape(startX,startY,shape)
    if (shapeClicked!=0){
      console.log(shape);
    }
  }
}

canvas.onmousedown = mouse_down;