import * as THREE from 'three';
import { VOETBAL, VOETBAL_TEAMS } from '../data/oefeningen.js';
import { voetbalstand } from './voetbalstand.js';
import { cilinder, doos } from '../wereld/helpers.js';

/*
 * Het toernooi: drie tegenstanders van makkelijk naar moeilijk.
 * Het tweede team gaat open als je van het eerste wint, het derde na winst op het tweede.
 * Win je van alle drie, dan krijg je de Bunders Beker.
 */
export const toernooi = {
  teams: VOETBAL_TEAMS,

  isOpen(i) { return i === 0 || voetbalstand.isVerslagen(VOETBAL_TEAMS[i - 1].id); },
  isVerslagen(team) { return voetbalstand.isVerslagen(team.id); },

  /** Hoogste team dat je mag spelen (om mee te beginnen). */
  volgendeTeam() {
    for (let i = 0; i < VOETBAL_TEAMS.length; i++) {
      if (this.isOpen(i) && !this.isVerslagen(VOETBAL_TEAMS[i])) return VOETBAL_TEAMS[i];
    }
    return VOETBAL_TEAMS[VOETBAL_TEAMS.length - 1];
  },

  /** Wedstrijd gewonnen: wat gaat er open? Geeft { nieuwVrij: team|null, beker: bool }. */
  registreerWinst(team) {
    const eerder = this.isVerslagen(team);
    voetbalstand.zetVerslagen(team.id);
    const i = VOETBAL_TEAMS.indexOf(team);
    const volgende = VOETBAL_TEAMS[i + 1];
    const nieuwVrij = !eerder && volgende ? volgende : null;
    const alles = VOETBAL_TEAMS.every((t) => voetbalstand.isVerslagen(t.id));
    const beker = alles && !voetbalstand.beker;
    if (beker) voetbalstand.zetBeker();
    return { nieuwVrij, beker };
  },
};

/** Groot bord "Kies je tegenstander" naast het veld. */
export class Toernooibord {
  constructor(scene, x, z) {
    this.positie = new THREE.Vector3(x, 0, z);
    this.canvas = document.createElement('canvas');
    this.canvas.width = 1024;
    this.canvas.height = 640;
    this.tex = new THREE.CanvasTexture(this.canvas);
    this.tex.colorSpace = THREE.SRGBColorSpace;
    const g = new THREE.Group();
    g.position.copy(this.positie);
    scene.add(g);
    for (const px of [-2.3, 2.3]) cilinder(0.12, 4.2, 0x495057, px, 2.1, 0, g, 8);
    doos(5.2, 3.3, 0.2, 0x1d6b2f, 0, 2.75, 0, g);
    const paneel = new THREE.Mesh(new THREE.PlaneGeometry(4.9, 3.05), new THREE.MeshBasicMaterial({ map: this.tex }));
    paneel.position.set(0, 2.75, 0.11); // voorkant naar het veld (+z)
    g.add(paneel);
    this.teken();
  }

  teken() {
    const ctx = this.canvas.getContext('2d');
    const { width: b, height: h } = this.canvas;
    ctx.fillStyle = '#2f9e44'; ctx.fillRect(0, 0, b, h);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 72px "Trebuchet MS", sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(`⚽ ${VOETBAL.kiesTegenstander}`, b / 2, 70);
    VOETBAL_TEAMS.forEach((t, i) => {
      const y = 170 + i * 150;
      const open = toernooi.isOpen(i);
      const verslagen = toernooi.isVerslagen(t);
      ctx.fillStyle = open ? '#ffffff' : 'rgba(255,255,255,0.45)';
      ctx.beginPath(); ctx.roundRect(60, y, b - 120, 120, 24); ctx.fill();
      // Shirtje in de teamkleuren.
      ctx.fillStyle = t.tenue.shirt; ctx.fillRect(90, y + 22, 76, 76);
      ctx.fillStyle = t.tenue.streep; ctx.fillRect(90, y + 52, 76, 16);
      ctx.fillStyle = open ? '#1d2b4f' : '#5c6b7a';
      ctx.textAlign = 'left';
      ctx.font = 'bold 56px "Trebuchet MS", sans-serif';
      ctx.fillText(`${i + 1}. ${t.naam}`, 196, y + 46);
      ctx.font = 'bold 34px "Trebuchet MS", sans-serif';
      ctx.fillStyle = '#868e96';
      ctx.fillText(VOETBAL.niveaus[t.niveau] ?? '', 200, y + 92);
      ctx.textAlign = 'right';
      ctx.font = 'bold 54px "Trebuchet MS", sans-serif';
      ctx.fillText(verslagen ? '✅' : open ? '▶' : '🔒', b - 90, y + 62);
    });
    this.tex.needsUpdate = true;
  }

  afstandTot(p) { return Math.hypot(p.x - this.positie.x, p.z - this.positie.z); }
}
