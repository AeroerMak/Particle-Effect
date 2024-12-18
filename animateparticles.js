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

// Particle class
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.opacity = Math.random() * 0.8 + 0.2; // Random initial opacity
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Wrap around edges
    if (this.x - this.radius > canvas.width) this.x = -this.radius;
    if (this.x + this.radius < 0) this.x = canvas.width + this.radius;
    if (this.y - this.radius > canvas.height) this.y = -this.radius;
    if (this.y + this.radius < 0) this.y = canvas.height + this.radius;

    this.draw();
  }
}

// Particle settings
let particles = [];
const particleCount = 150;
const colors = ['#ffffff', '#ffcc00', '#00ccff', '#ff6699', '#66ff66'];

function initParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    const radius = Math.random() * 3 + 1; // Random size
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocity = {
      x: (Math.random() - 0.5) * 0.5, // Slow random horizontal speed
      y: (Math.random() - 0.5) * 0.5, // Slow random vertical speed
    };

    particles.push(new Particle(x, y, radius, color, velocity));
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Semi-transparent background for trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => particle.update());
}

// Initialize and animate
initParticles();
animateParticles();
