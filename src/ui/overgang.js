/** Overgang tussen werelden: het scherm wordt even wit en daarna weer zichtbaar. */
let el = null;

function zorgVoorElement() {
  if (el) return el;
  el = document.createElement('div');
  el.className = 'overgang';
  document.body.appendChild(el);
  return el;
}

const wacht = (ms) => new Promise((r) => setTimeout(r, ms));

export async function naarWit(duur = 550) {
  const e = zorgVoorElement();
  e.style.transitionDuration = `${duur}ms`;
  e.classList.add('wit');
  await wacht(duur + 30);
}

export async function vanWit(duur = 650) {
  const e = zorgVoorElement();
  e.style.transitionDuration = `${duur}ms`;
  e.classList.remove('wit');
  await wacht(duur);
}
