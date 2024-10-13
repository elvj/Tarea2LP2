import {Categoria} from "./Categoria";
import {Marca} from "./Marca";
import {UnidadMedida} from "./UnidadMedida";

export class ProductoRepor {
  idProducto: number;
  nombre: string;
  pu: number;
  puOld: number;
  utilidad: number;
  stock: number;
  stockOld: number;
  categoria: Categoria;
  marca: Marca;
  unidadMedida:UnidadMedida;
}
