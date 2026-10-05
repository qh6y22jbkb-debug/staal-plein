/** Vrolijke confetti over het hele scherm (canvas, geen plaatjes nodig). */
const KLEUREN = ['#ff6b6b', '#ffd43b', '#69db7c', '#4dabf7', '#da77f2', '#ff922b'];
let canvas, ctx, deeltjes = [], bezig = false;

function zorgVoorCanvas() {
  if (canvas) return;
  canvas = document.createElement('canvas');
  canvas.className = 'confetti';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
}

export function confetti(aantal = 90) {
  zorgVoorCanvas();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const midden = canvas.width / 2;
  for (let i = 0; i < aantal; i++) {
    deeltjes.push({
      x: midden + (Math.random() - 0.5) * canvas.width * 0.5,
      y: canvas.height * 0.35 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 9,
      vy: -6 - Math.random() * 8,
      draai: Math.random() * Math.PI,
      vdraai: (Math.random() - 0.5) * 0.3,
      b: 8 + Math.random() * 8,
      h: 5 + Math.random() * 5,
      kleur: KLEUREN[Math.floor(Math.random() * KLEUREN.length)],
      leven: 1,
    });
  }
  if (!bezig) {
    bezig = true;
    requestAnimationFrame(teken);
  }
}

function teken() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const d of deeltjes) {
    d.vy += 0.35;
    d.vx *= 0.99;
    d.x += d.vx;
    d.y += d.vy;
    d.draai += d.vdraai;
    if (d.y > canvas.height * 0.6) d.leven -= 0.02;
    ctx.save();
    ctx.globalAlpha = Math.max(0, d.leven);
    ctx.translate(d.x, d.y);
    ctx.rotate(d.draai);
    ctx.fillStyle = d.kleur;
    ctx.fillRect(-d.b / 2, -d.h / 2, d.b, d.h);
    ctx.restore();
  }
  deeltjes = deeltjes.filter((d) => d.leven > 0 && d.y < canvas.height + 30);
  if (deeltjes.length) requestAnimationFrame(teken);
  else {
    bezig = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}
