// Select the canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Mouse position
const mouse = {
  x: null,
  y: null,
};

// Update mouse position
window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Clear mouse position when it leaves the canvas
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

// Particle class
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.baseX = x; // Original position
    this.baseY = y;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    // Move particles randomly
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Bounce off edges
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    // Interaction with mouse
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;
    const forceFactor = (maxDistance - distance) / maxDistance;

    if (distance < maxDistance) {
      this.x -= dx * forceFactor * 0.2;
      this.y -= dy * forceFactor * 0.2;
    } else {
      // Return to base position
      const homeDx = this.baseX - this.x;
      const homeDy = this.baseY - this.y;
      this.x += homeDx * 0.02;
      this.y += homeDy * 0.02;
    }

    this.draw();
  }
}

// Particle settings
let particles = [];
const particleCount = 200;
const colors = ['#ffffff', '#ffcc00', '#00ccff', '#ff6699'];

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 3 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocity = {
      x: (Math.random() - 0.5) * 1,
      y: (Math.random() - 0.5) * 1,
    };

    particles.push(new Particle(x, y, radius, color, velocity));
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update());
}

// Initialize and animate
initParticles();
animateParticles();
