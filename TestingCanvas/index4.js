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
  }

  // Función para dibujar la imagen en el canvas
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
    this.dragStartX = event.pageX || event.touches[0].pageX;
    this.dragStartY = event.pageY || event.touches[0].pageY;
    this.offsetX = this.dragStartX - this.x;
    this.offsetY = this.dragStartY - this.y;
    this.isDragging = true;
  }

  // Función para manejar el movimiento del arrastre de la imagen
  handleDragMove(event) {
    if (this.isDragging) {
      const currentX = event.pageX || event.touches[0].pageX;
      const currentY = event.pageY || event.touches[0].pageY;
      this.x = currentX - this.offsetX;
      this.y = currentY - this.offsetY;
      drawCanvas();
    }
  }

  // Función para manejar el final del arrastre de la imagen
  handleDragEnd() {
    this.isDragging = false;
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
  const image = new ImageObject(pplImg, 10, 10, 30, 30);
  imageObjects.push(image);
  drawCanvas();
});

corpIcon.addEventListener("click", function () {
  const image = new ImageObject(corpImg, 10, 10, 30, 30);
  imageObjects.push(image);
  drawCanvas();
});

// Agregar eventos para el arrastre de las imágenes
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);

canvas.addEventListener("touchstart", handleMouseDown);
canvas.addEventListener("touchmove", handleMouseMove);
canvas.addEventListener("touchend", handleMouseUp);

// Función para manejar el inicio del arrastre
function handleMouseDown(event) {
  for (const image of imageObjects) {
    if (image.isPointInside(event.pageX, event.pageY)) {
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
