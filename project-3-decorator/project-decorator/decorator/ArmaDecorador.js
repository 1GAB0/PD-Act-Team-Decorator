import IPersonaje from './IPersonaje';

class ArmaDecorador extends IPersonaje {
  constructor(personaje, tipoArma, arma) {
    super(personaje.getNombre(), personaje.getMonedas());
    this._personaje = personaje;
    this._tipoArma  = tipoArma;
    this._arma      = arma;
  }

  calcularDanio() {
    return this._personaje.calcularDanio() + this._arma.getDanio();
  }

  calcularDef() {
    return this._personaje.calcularDef();
  }

  getArmas() {
    return [
      ...this._personaje.getArmas(),
      {
        tipo:        this._tipoArma,
        material:    this._arma.nombre,
        icono:       this._arma.icono,
        rareza:      this._arma.rareza,
        rarityColor: this._arma.rarityColor,
        danio:       this._arma.getDanio(),
        durabilidad: this._arma.getDurabilidad(),
        costo:       this._arma.getCosto(),
      },
    ];
  }

  getPiezas() {
    return this._personaje.getPiezas();
  }

  getCostoTotal() {
    return this._personaje.getCostoTotal() + this._arma.getCosto();
  }

  getDescripcion() {
    return (
      `${this._personaje.getDescripcion()} | ` +
      `${this._tipoArma} de ${this._arma.nombre}`
    );
  }

  getMonedas() {
    return this._personaje.getMonedas();
  }
}

export default ArmaDecorador;