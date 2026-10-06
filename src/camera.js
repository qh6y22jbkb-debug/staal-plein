import * as THREE from 'three';

/** Camera die de speler van schuin achter volgt en niet door muren gaat. */
export class VolgCamera {
  constructor(camera, blokkers) {
    this.camera = camera;
    this.blokkers = blokkers;
    this.yaw = 0; // 0 = camera staat aan de zuidkant en kijkt naar de school
    this.pitch = 0.42;
    this.afstand = 10;
    this.huidigeAfstand = 10;
    this.focus = new THREE.Vector3();
    this.richting = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.eersteKeer = true;
    this.gesprek = false;
    this.laatsteGesprek = null;
    this.meng = 0;
    this.handmatig = 0;
    this.kijk = new THREE.Vector3();
  }

  /** Draait de camera rustig naar een bepaalde kijkrichting (bijv. bij een gesprek). */
  draaiNaar(yaw, pitch) {
    this.doelYaw = this.yaw + Math.atan2(Math.sin(yaw - this.yaw), Math.cos(yaw - this.yaw));
    this.doelPitch = pitch;
  }

  /**
   * Camera draait vanzelf rustig achter de speler aan (voor kinderen zonder muis).
   * @param doelYaw  de kijkrichting van de speler + 180°
   * @param snelheid hoe snel de camera bijdraait
   */
  volgAchter(doelYaw, dt, snelheid = 3) {
    if (this.handmatig > 0 || this.doelYaw != null || this.gesprek) return;
    const verschil = Math.atan2(Math.sin(doelYaw - this.yaw), Math.cos(doelYaw - this.yaw));
    this.yaw += verschil * Math.min(1, dt * snelheid);
  }

  draai(dx, dy) {
    if (dx || dy) {
      this.doelYaw = this.doelPitch = null; // zelf draaien gaat voor
      this.handmatig = 2.5; // even niet automatisch meedraaien
    }
    this.yaw -= dx * 0.006;
    this.pitch = THREE.MathUtils.clamp(this.pitch + dy * 0.004, 0.12, 1.15);
  }

  zoom(delta) {
    this.afstand = THREE.MathUtils.clamp(this.afstand + delta, 5, 18);
  }

  update(dt, doel) {
    const gewenstFocus = new THREE.Vector3(doel.x, doel.y + 1.6, doel.z);
    if (this.eersteKeer) {
      this.focus.copy(gewenstFocus);
      this.eersteKeer = false;
    } else {
      this.focus.lerp(gewenstFocus, Math.min(1, dt * 8));
    }

    if (this.handmatig > 0) this.handmatig -= dt;
    const k = Math.min(1, dt * 4);
    if (this.doelYaw != null) {
      this.yaw += (this.doelYaw - this.yaw) * k;
      if (Math.abs(this.doelYaw - this.yaw) < 0.002) this.doelYaw = null;
    }
    if (this.doelPitch != null) {
      this.pitch += (this.doelPitch - this.pitch) * k;
      if (Math.abs(this.doelPitch - this.pitch) < 0.002) this.doelPitch = null;
    }

    const cp = Math.cos(this.pitch);
    this.richting.set(Math.sin(this.yaw) * cp, Math.sin(this.pitch), Math.cos(this.yaw) * cp);

    // Zit er een muur tussen speler en camera? Dan komt de camera dichterbij.
    let max = this.afstand;
    this.raycaster.set(this.focus, this.richting);
    this.raycaster.far = this.afstand;
    const raak = this.raycaster.intersectObjects(this.blokkers, true)[0];
    if (raak) max = Math.max(1.2, raak.distance - 0.4);

    if (max < this.huidigeAfstand) this.huidigeAfstand = max; // meteen naar voren
    else this.huidigeAfstand += (max - this.huidigeAfstand) * Math.min(1, dt * 3);

    const pos = this.camera.position;
    pos.copy(this.focus).addScaledVector(this.richting, this.huidigeAfstand);
    pos.y = Math.max(0.5, pos.y);

    // Tijdens een gesprek schuift de camera soepel naar een vast standpunt bij de kraam.
    this.meng += ((this.gesprek ? 1 : 0) - this.meng) * Math.min(1, dt * 3);
    if (this.meng > 0.001 && this.laatsteGesprek) {
      const m = this.meng * this.meng * (3 - 2 * this.meng);
      pos.lerp(this.laatsteGesprek.positie, m);
      this.kijk.copy(this.focus).lerp(this.laatsteGesprek.kijk, m);
      this.camera.lookAt(this.kijk);
    } else {
      this.camera.lookAt(this.focus);
    }
  }

  /** Camerastandpunt voor een gesprek: schuin voor de kraam, karakter boven in beeld. */
  zetGesprek(kraamGroep, { hoogte = 3.4 } = {}) {
    if (!kraamGroep) {
      this.gesprek = false;
      return;
    }
    // Afstand zo kiezen dat de hele kraam (5 m breed) in beeld past, ook op een smal scherm.
    const halveHoek = Math.atan(Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * this.camera.aspect);
    const afstand = Math.max(8.5, 3.2 / Math.tan(halveHoek));
    const zijHoek = 0.45;
    const lokaal = new THREE.Vector3(Math.sin(zijHoek) * afstand, hoogte, Math.cos(zijHoek) * afstand);
    this.laatsteGesprek = {
      positie: lokaal.applyEuler(kraamGroep.rotation).add(kraamGroep.position),
      // Iets onder het karakter richten, zodat het boven het dialoogvenster staat.
      kijk: new THREE.Vector3(0, this.camera.aspect > 1 ? 1.1 : 0.3, 0.6).applyEuler(kraamGroep.rotation).add(kraamGroep.position),
    };
    this.gesprek = true;
  }
}
