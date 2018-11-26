'use strict';

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
let radius = 100;
let toggle;
let color = 0;
let isShift;
let drawing = false;
let needsRepaint = false;
let curves = [];

document.body.style.overflow = 'hidden';

function canvasResize() {
  document.body.style.width = '100vw';
  document.body.style.height = '100vh';
  canvas.setAttribute('width', document.body.clientWidth);
  canvas.setAttribute('height', document.body.clientHeight);
  curves = [];
}

function changeRadius() {
  if (radius === 100) {
    toggle = true;
  }
  if (radius === 5) {
    toggle = false;
  }
  return toggle ? radius-- : radius++;
}

function changeHue() {
  if (isShift) {
    return (color > 0 && color <= 359) ? color-- : color = 359;
  } else {
    return (color <= 359) ? color++ : color = 0;
  }
}

function smoothCurve(points) {
  ctx.beginPath();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  if (points.length > 2) {
    for (let i = points.length - 2; i < points.length - 1; i++) {
      ctx.moveTo(...points[i]);
      smoothCurveBetween(points[i], points[i + 1]);
    }
    ctx.stroke();
  }
}

function smoothCurveBetween(p1, p2) {
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.lineWidth = changeRadius();
  ctx.strokeStyle = `hsl(${changeHue()}, 100%, 50%)`;
  ctx.quadraticCurveTo(...p1, ...cp);
}

canvas.addEventListener("mousedown", (event) => {
  drawing = true;
  const curve = [];
  curve.push([event.offsetX, event.offsetY]);
  curves.push(curve);
  needsRepaint = true;
  if (event.shiftKey) {
    isShift = true;
  }
});

canvas.addEventListener("mouseup", (event) => {
  curves = [];
  drawing = false;
});

canvas.addEventListener("mouseleave", (event) => {
  curves = [];
  drawing = false;
});

canvas.addEventListener("mousemove", event => {
  if (drawing) {
    isShift = event.shiftKey;
    const point = [event.offsetX, event.offsetY];
    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
});

canvas.addEventListener("dblclick", (event) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  curves = [];
});

function repaint() {
  curves.forEach((curve) => {
    smoothCurve(curve);
  });
}

function tick() {
  if (needsRepaint) {
    repaint();
    needsRepaint = false;
  }
  window.requestAnimationFrame(tick);
}

window.addEventListener('load', canvasResize);
window.addEventListener('resize', canvasResize);
tick();
