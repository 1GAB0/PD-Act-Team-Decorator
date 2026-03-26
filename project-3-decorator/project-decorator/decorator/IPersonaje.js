class IPersonaje {
  constructor(nombre, monedas) {
    this.nombre  = nombre;
    this.monedas = monedas;
  }

  getNombre()  { return this.nombre;  }
  getMonedas() { return this.monedas; }

  calcularDef()  { return 0; }

  calcularDanio() { return 0; }

  getPiezas() { return []; }

  getArmas() { return []; }

  getCostoTotal()  { return 0; }
  getDescripcion() { return `${this.nombre} sin armadura`; }
}

export default IPersonaje;