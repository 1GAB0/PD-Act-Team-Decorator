import PiezaDecorador from './PiezaDecorador';
 
// ── Casco ───────────────────────────────────────────────────
class CascoDecorador extends PiezaDecorador {
  constructor(personaje, material) {
    super(personaje, 'Casco', material);
  }
}
 
// ── Pecho ───────────────────────────────────────────────────
class PechoDecorador extends PiezaDecorador {
  constructor(personaje, material) {
    super(personaje, 'Pecho', material);
  }
}
 
// ── Botas ───────────────────────────────────────────────────
class BootasDecorador extends PiezaDecorador {
  constructor(personaje, material) {
    super(personaje, 'Botas', material);
  }
}
 
export default { CascoDecorador, PechoDecorador, BootasDecorador };