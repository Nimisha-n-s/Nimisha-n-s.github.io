const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

// Mobile menu toggle
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Close mobile menu when a nav link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Contact form handler
function sendMessage(event) {
  event.preventDefault();

  const name =
    event.target.querySelector('input[type="text"]')?.value || "there";

  alert(
    `Thank you, ${name}! Your message has been received.\n\nPlease contact me directly through Email, LinkedIn, or GitHub.`
  );

  event.target.reset();
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// --- NEW ANIMATIONS ---

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal, .project-card, .skill-box, .timeline-item, .cert-grid div, .section-heading, .about-text').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Dynamic Navbar Background
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 3D Tilt Effect for Project Cards
document.querySelectorAll('.project-card, .skill-box').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// Typing Effect for Eyebrow Text (triggered after load)
function startTypingEffect() {
  const eyebrowText = "Full Stack Developer · Computer Science Engineering Student";
  const eyebrowEl = document.querySelector('.eyebrow');
  if (eyebrowEl) {
    eyebrowEl.innerHTML = '';
    let i = 0;
    function typeWriter() {
      if (i < eyebrowText.length) {
        eyebrowEl.innerHTML += eyebrowText.charAt(i);
        i++;
        setTimeout(typeWriter, 40);
      } else {
        eyebrowEl.innerHTML += '<span class="cursor">|</span>';
      }
    }
    setTimeout(typeWriter, 400); // Wait briefly after hero content pops in
  }
}

// --- SPACE BACKGROUND ANIMATION ---
const spaceCanvas = document.getElementById('space-canvas');
let warpSpeed = 25; // Initial high speed for loading
let warpSlowdownInterval = null;

if (spaceCanvas) {
  const ctx = spaceCanvas.getContext('2d');
  let width, height;
  let stars = [];
  let ships = [];

  class Spaceship {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width - width / 2;
      this.y = Math.random() * height - height / 2;
      this.z = initial ? Math.random() * width : width;
      this.speed = Math.random() * 1.5 + 0.8;
      this.size = Math.random() * 2 + 1.5;
      this.color = ['#00d9ff', '#8b5cf6', '#ec4899'][Math.floor(Math.random() * 3)];
    }

    draw(ctx, cx, cy) {
      this.z -= warpSpeed * this.speed;
      if (this.z <= 0) {
        this.reset();
      }

      const x = cx + (this.x / this.z) * width;
      const y = cy + (this.y / this.z) * width;
      const scale = (1 - this.z / width) * this.size * 3;

      if (x > 0 && x < width && y > 0 && y < height && scale > 0) {
        ctx.save();
        ctx.translate(x, y);
        
        // Ship points outwards from the center
        const angle = Math.atan2(this.y, this.x);
        ctx.rotate(angle + Math.PI / 2);
        
        // Draw engine trail
        ctx.beginPath();
        ctx.moveTo(-scale * 0.8, scale * 0.5);
        ctx.lineTo(scale * 0.8, scale * 0.5);
        ctx.lineTo(0, scale * (3 + warpSpeed * 0.3)); // Trail lengthens at warp speed
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.min(0.8, warpSpeed * 0.1 + 0.3); 
        ctx.fill();
        
        // Draw Ship body (sleek starfighter)
        ctx.beginPath();
        ctx.moveTo(0, -scale * 2.5); // Nose
        ctx.lineTo(scale * 1.4, scale); // Right wing
        ctx.lineTo(0, scale * 0.4); // Inner engine cut
        ctx.lineTo(-scale * 1.4, scale); // Left wing
        ctx.closePath();
        
        ctx.fillStyle = '#e2e8f0';
        ctx.globalAlpha = 0.9;
        ctx.fill();
        
        // Draw cockpit window
        ctx.beginPath();
        ctx.arc(0, -scale * 0.5, scale * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        
        ctx.restore();
      }
    }
  }

  function initSpace() {
    width = spaceCanvas.width = window.innerWidth;
    height = spaceCanvas.height = window.innerHeight;
    stars = [];
    ships = [];
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5
      });
    }
    for (let i = 0; i < 12; i++) {
      ships.push(new Spaceship());
    }
  }

  function animateSpace() {
    ctx.fillStyle = 'rgba(7, 11, 24, 0.2)';
    ctx.fillRect(0, 0, width, height);
    
    const cx = width / 2;
    const cy = height / 2;
    
    ctx.fillStyle = 'white';
    stars.forEach(star => {
      star.z -= warpSpeed;
      if (star.z <= 0) {
        star.z = width;
        star.x = Math.random() * width - cx;
        star.y = Math.random() * height - cy;
      }
      
      const x = cx + (star.x / star.z) * width;
      const y = cy + (star.y / star.z) * width;
      const size = (1 - star.z / width) * star.size * 3;
      
      if (x > 0 && x < width && y > 0 && y < height) {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw spaceships
    ships.forEach(ship => ship.draw(ctx, cx, cy));

    requestAnimationFrame(animateSpace);
  }

  window.addEventListener('resize', initSpace);
  initSpace();
  animateSpace();
}

// Preloader & Custom Cursor Init
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Keep the loading screen a bit longer to show the warp speed
    setTimeout(() => {
      preloader.classList.add('hide');
      document.body.classList.add('loaded');
      startTypingEffect();
      
      // Smoothly decelerate warp speed to a calm space drift
      warpSlowdownInterval = setInterval(() => {
        if (warpSpeed > 0.5) {
          warpSpeed *= 0.9;
        } else {
          warpSpeed = 0.5;
          clearInterval(warpSlowdownInterval);
        }
      }, 50);
      
    }, 1200);
  } else {
    document.body.classList.add('loaded');
    startTypingEffect();
    warpSpeed = 0.5;
  }
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 150, fill: "forwards" });
  });

  const interactables = document.querySelectorAll('a, button, .project-card, .skill-box, input, textarea, i');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.backgroundColor = 'rgba(139, 92, 246, 0.15)';
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.backgroundColor = 'transparent';
    });
  });
}

// Hero Image Floating Effect Parallax
document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;
  const ring = document.querySelector('.image-ring');
  if(ring) {
    ring.style.transform = `translateX(${x}px) translateY(${y}px)`;
  }
});