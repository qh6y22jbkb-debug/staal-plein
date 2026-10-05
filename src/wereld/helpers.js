import * as THREE from 'three';

// Eén materiaal per kleur hergebruiken: scheelt geheugen en tekenwerk.
const materialen = new Map();

export function mat(kleur, extra) {
  if (extra) return new THREE.MeshLambertMaterial({ color: kleur, ...extra });
  if (!materialen.has(kleur)) materialen.set(kleur, new THREE.MeshLambertMaterial({ color: kleur }));
  return materialen.get(kleur);
}

function maakMesh(geo, kleur, x, y, z, ouder) {
  const m = new THREE.Mesh(geo, typeof kleur === 'number' ? mat(kleur) : kleur);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  if (ouder) ouder.add(m);
  return m;
}

export function doos(b, h, d, kleur, x = 0, y = 0, z = 0, ouder) {
  return maakMesh(new THREE.BoxGeometry(b, h, d), kleur, x, y, z, ouder);
}

export function cilinder(r, h, kleur, x = 0, y = 0, z = 0, ouder, segmenten = 10) {
  return maakMesh(new THREE.CylinderGeometry(r, r, h, segmenten), kleur, x, y, z, ouder);
}

export function kegel(r, h, kleur, x = 0, y = 0, z = 0, ouder, segmenten = 8) {
  return maakMesh(new THREE.ConeGeometry(r, h, segmenten), kleur, x, y, z, ouder);
}

export function bol(r, kleur, x = 0, y = 0, z = 0, ouder, detail = 1) {
  return maakMesh(new THREE.IcosahedronGeometry(r, detail), kleur, x, y, z, ouder);
}

/** Vlak plat op de grond (voor lijnen, tekeningen). */
export function grondVlak(b, d, materiaal, x, z, y = 0.02, ouder) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(b, d), materiaal);
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, y, z);
  m.receiveShadow = true;
  if (ouder) ouder.add(m);
  return m;
}

/** Tekent op een canvas en maakt er een textuur van (geen externe plaatjes nodig). */
export function canvasTextuur(breedte, hoogte, teken) {
  const c = document.createElement('canvas');
  c.width = breedte;
  c.height = hoogte;
  teken(c.getContext('2d'), breedte, hoogte);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Naambord-textuur met afgeronde rand. Tekst wordt kleiner gemaakt tot hij past. */
export function tekstTextuur(tekst, {
  breedte = 1024, hoogte = 256,
  achtergrond = '#ffffff', kleur = '#1d2b4f', rand = '#1d2b4f',
  grootte = 130,
} = {}) {
  return canvasTextuur(breedte, hoogte, (ctx, b, h) => {
    ctx.fillStyle = rand;
    ctx.beginPath(); ctx.roundRect(0, 0, b, h, 40); ctx.fill();
    ctx.fillStyle = achtergrond;
    ctx.beginPath(); ctx.roundRect(16, 16, b - 32, h - 32, 28); ctx.fill();
    let s = grootte;
    do {
      ctx.font = `bold ${s}px "Trebuchet MS", Verdana, sans-serif`;
      s -= 4;
    } while (ctx.measureText(tekst).width > b - 90 && s > 20);
    ctx.fillStyle = kleur;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(tekst, b / 2, h / 2 + 6);
  });
}

/** Voorspelbare 'random' zodat de wereld er elke keer hetzelfde uitziet. */
export function zaadRandom(zaad = 7) {
  return () => {
    zaad = (zaad * 16807) % 2147483647;
    return (zaad - 1) / 2147483646;
  };
}
