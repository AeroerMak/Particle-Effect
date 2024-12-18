const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Fire particle properties
const particles = [];
const maxParticles = 2000; // Increased max particles for fuller effect

// Physics constants
const gravity = 0.05;  // Gravity strength (lower value for more floaty fire)
const wind = 0.03;    // Wind strength (affects particle horizontal movement)

// Fire particle constructor
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 5; // Larger initial size
    this.speedX = Math.random() * 4 - 2 + wind; // Horizontal speed with wind influence
    this.speedY = Math.random() * 5 - 5; // Vertical speed, can go upwards
    this.life = 200; // Particle lifespan (higher for longer-lasting particles)
    this.color = this.randomColor();
    this.accelerationX = 0; // Wind acceleration
    this.accelerationY = gravity; // Gravity acceleration
  }

  // Randomize fire colors (more subtle, realistic transitions)
  randomColor() {
    const colors = [
      'rgba(255, 69, 0, 0.9)',  // Red
      'rgba(255, 140, 0, 0.9)', // Orange
      'rgba(255, 215, 0, 0.9)', // Yellow
      'rgba(255, 255, 255, 0.8)' // White for high-temperature particles
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    // Apply gravity and wind
    this.speedY += this.accelerationY;
    this.speedX += this.accelerationX;

    this.x += this.speedX;
    this.y += this.speedY;

    // Shrink the particles as they rise to simulate burning away
    this.size = Math.max(0, this.size * 0.98); // Particles get smaller over time

    // Reduce life
    this.life -= 1;

    // Fade out effect: particles will change color and opacity based on their life
    if (this.life < 100) {
      this.color = 'rgba(0, 0, 0, 0.1)'; // Fade out color as life decreases
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

// Fire particle generation
function createFire(x, y) {
  if (particles.length < maxParticles) {
    particles.push(new Particle(x, y));
  }
}

// Animate particles with physics
function animateFire() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();

    // Remove particles that have "died"
    if (particle.life <= 0 || particle.size <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateFire); // Keep animating
}

// Handle user click to trigger fire effect
canvas.addEventListener('click', (event) => {
  for (let i = 0; i < 150; i++) {  // Increase number of particles per click for bigger bursts
    createFire(event.x, event.y);
  }
});

// Start animation
animateFire();
