class IArma {
  constructor(nombre, icono, rareza, rarityColor) {
    this.nombre      = nombre;
    this.icono       = icono;
    this.rareza      = rareza;
    this.rarityColor = rarityColor;
  }

  getDanio()       { return 0; }
  getDurabilidad() { return 0; }
  getCosto()       { return 0; }
  getDescripcion() { return ''; }
}

export default IArma;