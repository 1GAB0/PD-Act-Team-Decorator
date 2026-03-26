import IPersonaje from './IPersonaje';
 
class PiezaDecorador extends IPersonaje {
  constructor(personaje, tipoPieza, material) {
    super(personaje.getNombre(), personaje.getMonedas());
    this._personaje  = personaje;
    this._tipoPieza  = tipoPieza; 
    this._material   = material;  
  }

  calcularDef() {
    return this._personaje.calcularDef() + this._material.getDefensa();
  }

  getPiezas() {
    return [
      ...this._personaje.getPiezas(),
      {
        tipo:        this._tipoPieza,
        material:    this._material.nombre,
        icono:       this._material.icono,
        rareza:      this._material.rareza,
        rarityColor: this._material.rarityColor,
        defensa:     this._material.getDefensa(),
        durabilidad: this._material.getDurabilidad(),
        costo:       this._material.getCosto(),
      },
    ];
  }
 
  getCostoTotal() {
    return this._personaje.getCostoTotal() + this._material.getCosto();
  }
 
  getDescripcion() {
    return (
      `${this._personaje.getDescripcion()} | ` +
      `${this._tipoPieza} de ${this._material.nombre}`
    );
  }
 
  getMonedas() {
    return this._personaje.getMonedas();
  }
}
 
export default PiezaDecorador;