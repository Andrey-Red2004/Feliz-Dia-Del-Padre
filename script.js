function mostrarSorpresa() {
  document.getElementById('sorpresa').classList.remove('oculto');
}

// FIREWORKS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

document.addEventListener("click", (e) => {
  for (let i = 0; i < 30; i++) {
    fireworks.push(new Firework(e.clientX, e.clientY));
  }
});

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 3 + 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 5 + 2;
    this.alpha = 1;
    this.gravity = 0.05;
  }

  update() {
    this.speed *= 0.98;
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + this.gravity;
    this.alpha -= 0.02;
  }

  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  fireworks = fireworks.filter(f => f.alpha > 0);
  fireworks.forEach(f => {
    f.update();
    f.draw();
  });
}

animate();

// Ajustar el tamaño si cambia el tamaño de la ventana
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
