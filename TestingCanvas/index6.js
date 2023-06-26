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
    return this.title.slice(0, 3);
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
  firstName="";
  lastName="";
  dob="";
  constructor(imgSrc,x, y, width, height){
    super(imgSrc, x, y, width, height);
  }
}

class Corporation extends ImageObject{
  Name="";
  yearCreation="";

  constructor(imgSrc,x, y, width, height){
    super(imgSrc, x, y, width, height);
  }
}


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const pixelRatio = window.devicePixelRatio || 1;
const canvasRect = canvas.getBoundingClientRect();

canvas.width = canvasRect.width * pixelRatio;
canvas.height = canvasRect.height * pixelRatio;

ctx.scale(pixelRatio, pixelRatio);

const imageObjects = []; // Array para almacenar las imágenes

const pplIcon = document.getElementById("PersonImg");
const corpIcon = document.getElementById("CompanyImg");

pplIcon.addEventListener("click", function () {
  //const image = new ImageObject(pplImg, 10, 10, 30, 30);
  const image = new Person(pplImg, 10, 10, 30, 30);
  imageObjects.push(image);
  drawCanvas();
});

corpIcon.addEventListener("click", function () {
  // const image = new ImageObject(corpImg, 10, 10, 30, 30);
  const image = new Corporation(corpImg, 10, 10, 30, 30);
  imageObjects.push(image);
  drawCanvas();
});

// Agregar eventos para el arrastre y el doble clic de las imágenes
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("dblclick", handleDoubleClick);

canvas.addEventListener("touchstart", handleMouseDown);
canvas.addEventListener("touchmove", handleMouseMove);
canvas.addEventListener("touchend", handleMouseUp);
// canvas.addEventListener("dblclick", handleDoubleClick);

// Función para manejar el inicio del arrastre
function handleMouseDown(event) {
  const offsetX = event.pageX - canvas.offsetLeft;
  const offsetY = event.pageY - canvas.offsetTop;

  for (const image of imageObjects) {
    if (image.isPointInside(offsetX, offsetY)) {
      image.handleDragStart(event);
      break;
    }
  }
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
