import IArma from './IArma';

// ── Espada de Madera ────────────────────────────────────────
class EspadaMadera extends IArma {
  constructor() { super('Madera', require('../assets/icons/Madera.png'), 'Común', '#8B7355'); }
  getDanio()       { return 4;  }
  getDurabilidad() { return 59; }
  getCosto()       { return 20; }
  getDescripcion() { return 'El arma más básica. Para empezar a sobrevivir.'; }
}

// ── Espada de Hierro ────────────────────────────────────────
class EspadaHierro extends IArma {
  constructor() { super('Hierro', require('../assets/icons/Hierro.png'), 'Poco común', '#A8A8A8'); }
  getDanio()       { return 7;   }
  getDurabilidad() { return 250; }
  getCosto()       { return 70;  }
  getDescripcion() { return 'Resistente y versátil. Estándar del aventurero.'; }
}

// ── Espada de Diamante ──────────────────────────────────────
class EspadaDiamante extends IArma {
  constructor() { super('Diamante', require('../assets/icons/Diamante.png'), 'Épico', '#44C8D8'); }
  getDanio()       { return 12;   }
  getDurabilidad() { return 1561; }
  getCosto()       { return 140;  }
  getDescripcion() { return 'El filo más poderoso. Requiere mucho farmeo.'; }
}

// ── Arco de Madera ──────────────────────────────────────────
class ArcoMadera extends IArma {
  constructor() { super('Madera', require('../assets/icons/Madera.png'), 'Común', '#8B7355'); }
  getDanio()       { return 3;  }
  getDurabilidad() { return 59; }
  getCosto()       { return 25; }
  getDescripcion() { return 'Dispara desde lejos pero con poco poder.'; }
}

// ── Arco de Hierro ──────────────────────────────────────────
class ArcoHierro extends IArma {
  constructor() { super('Hierro', require('../assets/icons/Hierro.png'), 'Poco común', '#A8A8A8'); }
  getDanio()       { return 6;   }
  getDurabilidad() { return 250; }
  getCosto()       { return 75;  }
  getDescripcion() { return 'Alcance y daño mejorados. Buena elección a distancia.'; }
}

// ── Arco de Diamante ────────────────────────────────────────
class ArcoDiamante extends IArma {
  constructor() { super('Diamante', require('../assets/icons/Diamante.png'), 'Épico', '#44C8D8'); }
  getDanio()       { return 11;   }
  getDurabilidad() { return 1561; }
  getCosto()       { return 145;  }
  getDescripcion() { return 'Dispara con precisión letal. La élite de los arqueros.'; }
}

// ── Hacha de Madera ─────────────────────────────────────────
class HachaMadera extends IArma {
  constructor() { super('Madera', require('../assets/icons/Madera.png'), 'Común', '#8B7355'); }
  getDanio()       { return 5;  }
  getDurabilidad() { return 59; }
  getCosto()       { return 22; }
  getDescripcion() { return 'Tala árboles y aplasta cráneos. Lo básico.'; }
}

// ── Hacha de Hierro ─────────────────────────────────────────
class HachaHierro extends IArma {
  constructor() { super('Hierro', require('../assets/icons/Hierro.png'), 'Poco común', '#A8A8A8'); }
  getDanio()       { return 9;   }
  getDurabilidad() { return 250; }
  getCosto()       { return 80;  }
  getDescripcion() { return 'Golpe devastador. Ideal para combate cuerpo a cuerpo.'; }
}

// ── Hacha de Diamante ───────────────────────────────────────
class HachaDiamante extends IArma {
  constructor() { super('Diamante', require('../assets/icons/Diamante.png'), 'Épico', '#44C8D8'); }
  getDanio()       { return 15;   }
  getDurabilidad() { return 1561; }
  getCosto()       { return 150;  }
  getDescripcion() { return 'El hacha definitiva. Destruye enemigos y bloques por igual.'; }
}

export const ARMAS_POR_TIPO = {
  Espada: [new EspadaMadera(), new EspadaHierro(), new EspadaDiamante()],
  Arco:   [new ArcoMadera(),   new ArcoHierro(),   new ArcoDiamante()],
  Hacha:  [new HachaMadera(),  new HachaHierro(),  new HachaDiamante()],
};

export default { ARMAS_POR_TIPO };