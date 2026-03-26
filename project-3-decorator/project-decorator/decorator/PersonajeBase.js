import IPersonaje from './IPersonaje';

class PersonajeBase extends IPersonaje {
  constructor() {
    super('Steve', 550);
  }

  calcularDef()    { return 0;  }
  calcularDanio()  { return 1;  } // daño base a puño
  getPiezas()      { return []; }
  getArmas()       { return []; }
  getCostoTotal()  { return 0;  }
  getDescripcion() { return 'Steve — sin armadura'; }
}

export default PersonajeBase;