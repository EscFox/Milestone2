export const canvas = document.getElementById("myCanvas");
export const ctx = canvas.getContext("2d");
export const pixelRatio = window.devicePixelRatio || 1;
export const canvasRect = canvas.getBoundingClientRect();
export const shapeType = {
  RECT: "rectangle",
  CIRCLE: "circle"
};
export let idShape = 1;
export const Diagram_Struct = [];
export const addCoBtn = document.getElementById("addCoBtnId");
export const addPrsBtnId = document.getElementById("addPrsBtnId");
