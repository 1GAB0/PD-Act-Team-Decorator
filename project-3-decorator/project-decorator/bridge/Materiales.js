import IMaterial from './IMaterial';
 
class MaterialCuero extends IMaterial {
  constructor() { super('Cuero', require('../assets/icons/Cuero.png'), 'Común', '#8B7355'); }
  getDefensa()     { return 3; }
  getDurabilidad() { return 65; }
  getCosto()       { return 30; }
  getDescripcion() { return 'Ligero y barato. Ideal para empezar a farmear.'; }
}
 
class MaterialHierro extends IMaterial {
  constructor() { super('Hierro', require('../assets/icons/Hierro.png'), 'Poco común', '#A8A8A8'); }
  getDefensa()     { return 8; }
  getDurabilidad() { return 250; }
  getCosto()       { return 80; }
  getDescripcion() { return 'Resistente y versátil. El estándar del aventurero.'; }
}
 
class MaterialDiamante extends IMaterial {
  constructor() { super('Diamante', require('../assets/icons/Diamante.png'), 'Épico', '#44C8D8'); }
  getDefensa()     { return 18; }
  getDurabilidad() { return 1561; }
  getCosto()       { return 150; }
  getDescripcion() { return 'Máxima protección. Requiere mucho farmeo.'; }
}
 
const cuero    = new MaterialCuero();
const hierro   = new MaterialHierro();
const diamante = new MaterialDiamante();
const MATERIALES = [cuero, hierro, diamante];
 
export default { cuero, hierro, diamante, MATERIALES };