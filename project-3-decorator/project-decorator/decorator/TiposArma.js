import ArmaDecorador from './ArmaDecorador';

// ── Espada ──────────────────────────────────────────────────
class EspadaDecorador extends ArmaDecorador {
  constructor(personaje, arma) {
    super(personaje, 'Espada', arma);
  }
}

// ── Arco ────────────────────────────────────────────────────
class ArcoDecorador extends ArmaDecorador {
  constructor(personaje, arma) {
    super(personaje, 'Arco', arma);
  }
}

// ── Hacha ───────────────────────────────────────────────────
class HachaDecorador extends ArmaDecorador {
  constructor(personaje, arma) {
    super(personaje, 'Hacha', arma);
  }
}

export default { EspadaDecorador, ArcoDecorador, HachaDecorador };