const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


let isDragging = false;
let startX, startY;
let selectedShape = null;

// Lista de objetos arrastrables
const draggableShapes = [
  { x: 50, y: 50, width: 100, height: 50, text: "Company 1" },
  { x: 200, y: 50, width: 100, height: 50, text: "Company 2" },
];

// Dibujar los objetos iniciales
draggableShapes.forEach((shape) => {
  drawShape(shape);
});

// Agregar eventos de arrastrar y soltar
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);

// Función para dibujar un objeto en el canvas
function drawShape(shape) {
  ctx.fillStyle = "lightblue";
  ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
  ctx.fillStyle = "black";
  ctx.fillText(shape.text, shape.x + 10, shape.y + 30);
}

// Función para verificar si se hizo clic en un objeto
function isClickedOnShape(shape, mouseX, mouseY) {
  return (
    mouseX >= shape.x &&
    mouseX <= shape.x + shape.width &&
    mouseY >= shape.y &&
    mouseY <= shape.y + shape.height
  );
}

// Función para manejar el evento mousedown (inicio del arrastre)
function handleMouseDown(event) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  draggableShapes.forEach((shape) => {
    if (isClickedOnShape(shape, mouseX, mouseY)) {
      isDragging = true;
      startX = mouseX - shape.x;
      startY = mouseY - shape.y;
      selectedShape = shape;
    }
  });
}

// Función para manejar el evento mousemove (arrastrar el objeto)
function handleMouseMove(event) {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Actualizar la posición del objeto arrastrado
    selectedShape.x = mouseX - startX;
    selectedShape.y = mouseY - startY;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Volver a dibujar los objetos arrastrables
    draggableShapes.forEach((shape) => {
      drawShape(shape);
    });

    // Dibujar las conexiones
    drawConnections();
  }
}

// Función para manejar el evento mouseup (fin del arrastre)
function handleMouseUp() {
  isDragging = false;
  selectedShape = null;
}

// Función para dibujar las conexiones entre los objetos arrastrables
function drawConnections() {
  ctx.beginPath();
  ctx.strokeStyle = "black";
  draggableShapes.forEach((shape) => {
    const startX = shape.x + shape.width / 2;
    const startY = shape.y + shape.height;
    const endX = shape.x + shape.width / 2;
    const endY = shape.y + shape.height + 50;

    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
  });
  ctx.stroke();
}