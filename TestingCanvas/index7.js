// Objeto para representar una imagen en el canvas
class ImageObject {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.title = "";
  }

  // Función para dibujar la imagen en el canvas
  draw(ctx) {
    console.log("En draw");
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.getTrimmedTitle(), this.x, this.y + this.height + 12);
  }

  // Función para verificar si el punto (x, y) está dentro de la imagen
  isPointInside(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  // Función para manejar el inicio del arrastre de la imagen
  handleDragStart(event) {
    this.dragStartX = event.pageX - canvas.offsetLeft;
    this.dragStartY = event.pageY - canvas.offsetTop;
    this.offsetX = this.dragStartX - this.x;
    this.offsetY = this.dragStartY - this.y;
    this.isDragging = true;
  }

  // Función para manejar el movimiento del arrastre de la imagen
  handleDragMove(event) {
    if (this.isDragging) {
      const currentX = event.pageX - canvas.offsetLeft;
      const currentY = event.pageY - canvas.offsetTop;
      this.x = currentX - this.offsetX;
      this.y = currentY - this.offsetY;
      drawCanvas();
    }
  }

  // Función para manejar el final del arrastre de la imagen
  handleDragEnd() {
    this.isDragging = false;
  }

  // Función para obtener el título truncado a las primeras tres letras
  getTrimmedTitle() {
    return this.title.slice(0, 5);
  }

  // Función para agregar o editar el título al hacer doble clic en la imagen
  handleDoubleClick(event) {
    const newTitle = prompt("Ingrese el título de la imagen:");
    if (newTitle !== null) {
      this.title = newTitle;
      drawCanvas();
    }
  }
}


class Person extends ImageObject{
  figureId=0;
  firstName="";
  lastName="";
  dob="";
  constructor(figId,imgSrc,x, y, width, height){
    super(imgSrc, x, y, width, height);
    this.figureId=figId;
  }

  setValues(fName,lName,dob){
    this.firstName= fName;
    this.lastName = lName;
    this.dob = dob;
  }
}

class Corporation extends ImageObject{
  figureId=0;
  corpName    ="";
  yearCreation="";

  constructor(figId,imgSrc,x, y, width, height){
    super(imgSrc, x, y, width, height);
    this.figureId=figId;
  }
  
  setValues(cName,yCreation){
    this.corpName = cName;
    this.yearCreation = yCreation;
  }

}

class connectionLine extends ImageObject{

}

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const pixelRatio = window.devicePixelRatio || 1;
const canvasRect = canvas.getBoundingClientRect();

canvas.width = canvasRect.width * pixelRatio;
canvas.height = canvasRect.height * pixelRatio;

ctx.scale(pixelRatio, pixelRatio);

const imageObjects = []; // Array para almacenar las imágenes
let figId=0;
const pplIcon = document.getElementById("PersonImg");
const corpIcon = document.getElementById("CompanyImg");
const linkedLine = document.getElementById("CrossedLineImg");

pplIcon.addEventListener("click", function () {
  const image = new Person(figId,pplImg, 10, 10, 30, 30);
  figId++;
  imageObjects.push(image);
  drawCanvas();
});

corpIcon.addEventListener("click", function () {
  const image = new Corporation(figId,corpImg, 10, 10, 30, 30);
  figId++;
  imageObjects.push(image);
  drawCanvas();
});

// Agregar eventos para el arrastre y el doble clic de las imágenes
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("click", handleClick);
canvas.addEventListener("dblclick", handleDoubleClick);

canvas.addEventListener("touchstart", handleMouseDown);
canvas.addEventListener("touchmove", handleMouseMove);
canvas.addEventListener("touchend", handleMouseUp);
linkedLine.addEventListener("click",drawConnection);

let startPoint = null;
let endPoint = null;
let connectionEnabled = false;

function drawConnection(e){
  connectionEnabled = true;
}


// Función para manejar el inicio del arrastre
function handleMouseDown(event) {
  const offsetX = event.pageX - canvas.offsetLeft;
  const offsetY = event.pageY - canvas.offsetTop;

    //the event is called to move the image
  
    for (const image of imageObjects) {
      if (image.isPointInside(offsetX, offsetY)) {
        if(connectionEnabled == false){
          image.handleDragStart(event);
          break;
        }
        //otherwise it's to select the objects to draw the line.
        else{
          if (startPoint === null) {
              startPoint = { x: offsetX, y: offsetY };
          } 
          else if (endPoint === null) {
              endPoint = { x: offsetX, y: offsetY };
              drawLine(startPoint, endPoint);
              startPoint = null;
              endPoint = null;
              connectionEnabled = false;
          }
        }
      }
    }  
}

function drawLine(startPoint, endPoint) {
  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(endPoint.x, endPoint.y);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Función para manejar el movimiento del arrastre
function handleMouseMove(event) {
  for (const image of imageObjects) {
    if (image.isDragging) {
      image.handleDragMove(event);
      break;
    }
  }
}

// Función para manejar el final del arrastre
function handleMouseUp(event) {
  for (const image of imageObjects) {
    if (image.isDragging) {
      image.handleDragEnd();
      break;
    }
  }
}

// Función para manejar el doble clic
function handleDoubleClick(event) {
  const offsetX = event.pageX - canvas.offsetLeft;
  const offsetY = event.pageY - canvas.offsetTop;

  for (const image of imageObjects) {
    if (image.isPointInside(offsetX, offsetY)) {
      image.handleDoubleClick(event);
      break;
    }
  }
}

// Función para manejar el doble clic
function handleClick(event) {
  const offsetX = event.pageX - canvas.offsetLeft;
  const offsetY = event.pageY - canvas.offsetTop;

  for (const image of imageObjects) {
    if (image.isPointInside(offsetX, offsetY)) {
      disableInputs();
      cleanInputs();
      if(image instanceof Person){
        console.log("It's a Person");
        recoverDataPerson(image);
      }
      else {
        console.log("It's a corporation");
        recoverDataCorporation(image);
      }
      break;
    }
  }
}

function recoverDataPerson(image){

  const idImg = document.getElementById("idImage"); 
  const pcId = document.getElementById("perCorp");
  const fnId = document.getElementById("idFirstName");
  const lnId = document.getElementById("idLastName");
  const dobId = document.getElementById("idDob");
  
  fnId.disabled = false;
  lnId.disabled = false;
  dobId.disabled = false;

  idImg.value = image.figureId;
  pcId.value = "Per";
  fnId.value = image.firstName;
  lnId.value = image.lastName;
  dobId.value= image.dob;

}

function recoverDataCorporation(image){
  const idImg = document.getElementById("idImage");
  const pcId = document.getElementById("perCorp"); 
  const cnId = document.getElementById("idCorpName");
  const yfId = document.getElementById("idYearFound");
  
  cnId.disabled = false;
  yfId.disabled = false;
  
  idImg.value = image.figureId;
  pcId.value = "Cor";
  cnId.value = image.corpName;
  yfId.value = image.yearCreation;

}

function cleanInputs(){
  const idImg = document.getElementById("idImage"); 
  const fnId = document.getElementById("idFirstName");
  const lnId = document.getElementById("idLastName");
  const dobId = document.getElementById("idDob");
  const cnId = document.getElementById("idCorpName");
  const yfId = document.getElementById("idYearFound");

  fnId. value =  "";
  lnId. value =  "";
  dobId.value =  "";
  cnId. value =  "";
  yfId. value =  "";
}

function disableInputs(){
  const idImg = document.getElementById("idImage"); 
  const fnId = document.getElementById("idFirstName");
  const lnId = document.getElementById("idLastName");
  const dobId = document.getElementById("idDob");
  const cnId = document.getElementById("idCorpName");
  const yfId = document.getElementById("idYearFound");

  fnId.disabled =   true;
  lnId.disabled =   true;
  dobId.disabled =  true;
  cnId.disabled =   true;
  yfId.disabled =   true;
}

function updateInfo(){
  const idImg = document.getElementById("idImage"); 
  const pcId = document.getElementById("perCorp"); 
  const fnId = document.getElementById("idFirstName");
  const lnId = document.getElementById("idLastName");
  const dobId = document.getElementById("idDob");
  const cnId = document.getElementById("idCorpName");
  const yfId = document.getElementById("idYearFound");

  console.log(pcId);
  if (pcId.value=="Per"){
    imageObjects[idImg.value].setValues(fnId.value,lnId.value,dobId.value);
  }
  else{
    imageObjects[idImg.value].setValues(cnId.value,yfId.value);
  }
}



// Función para dibujar el canvas
function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const image of imageObjects) {
    image.draw(ctx);
  }
}



// Ejemplo de uso inicial
const pplImg = new Image();
pplImg.src = "./profile.png";

const corpImg = new Image();
corpImg.src = "./building.png";

drawCanvas();
