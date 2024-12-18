// Select the canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Particle class
class Particle {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1; // Opacity for fading effect
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha; // Set opacity
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
    this.alpha -= 0.01; // Fade out gradually
    this.draw();
  }
}

// Particle explosion
let particles = [];
const colors = ['#ff5733', '#33ff57', '#3357ff', '#ff33a1', '#ffff33'];

function createExplosion(x, y) {
  const particleCount = 100;
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2; // Random direction
    const speed = Math.random() * 4 + 1; // Random speed
    const radius = Math.random() * 3 + 1; // Random size
    const color = colors[Math.floor(Math.random() * colors.length)];
    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed,
    };

    particles.push(new Particle(x, y, radius, color, velocity));
  }
}

// Handle clicks
canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  createExplosion(x, y);
});

// Animate particles
function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Slight trail effect
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((particle) => particle.alpha > 0); // Remove faded particles
  particles.forEach((particle) => particle.update());
}

// Start animation
animateParticles();
