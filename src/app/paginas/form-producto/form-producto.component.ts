import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Categoria } from "../../modelo/Categoria";
import { Marca } from "../../modelo/Marca";
import { ProductoService } from "../../servicio/producto.service";
import { Producto } from "../../modelo/Producto";
import { ProductoRepor } from "../../modelo/ProductoRepor";
import { CategoriaService } from "../../servicio/categoria.service";
import { MarcaService } from "../../servicio/marca.service";
import { UnidadMedida } from "../../modelo/UnidadMedida";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {UnidadMedidaService} from "../../servicio/unidadMedida.service";

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [
    ReactiveFormsModule, NgForOf, NgIf
  ],
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css'] // Corregido: styleUrls en lugar de styleUrl
})

export class FormProductoComponent implements OnInit {
  productForm: FormGroup;
  productSaved = false;

  categorias: Categoria[] = [];
  marcas: Marca[] = [];
  unidadesMedida: UnidadMedida[] = [];

  productoSeleccionado: ProductoRepor | null = null;

  constructor(
    private serviceProducto: ProductoService,
    private servicioMarca: MarcaService,
    private categoriaService: CategoriaService,  // Inyectar el servicio de categorías
    private unidadMedidaService: UnidadMedidaService, // Inyectar el servicio de unidades de medida
    private fb: FormBuilder
  ) {
    // Inicializar el formulario
    this.productForm = this.fb.group({
      idProducto: [null],
      nombre: ['', Validators.required],
      pu: [0, Validators.required],
      puOld: [0],
      utilidad: [0, Validators.required],
      stock: [0, Validators.required],
      stockOld: [0],
      categoria: [null, Validators.required],
      marca: [null, Validators.required],
      unidadMedida: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar las marcas desde el servicio
    this.servicioMarca.findAll(); // Carga inicial de marcas
    this.servicioMarca.marcas$.subscribe({
      next: (data) => {
        this.marcas = data; // Actualizar la lista de marcas
      },
      error: (err) => {
        console.error('Error al cargar marcas', err);
      }
    });

    // Cargar las categorías desde el servicio

    this.categoriaService.findAll(); // Carga inicial de marcas
    this.categoriaService.categoria$.subscribe({
      next: (data) => {
        this.categorias = data; // Actualizar la lista de categorías
      },
      error: (err) => {
        console.error('Error al cargar categorías', err);
      }
    });
    this.unidadMedidaService.findAll(); // Carga inicial de marcas
    this.unidadMedidaService.unidadMedida$.subscribe({
      next: (data) => {
        this.unidadesMedida = data; // Actualizar la lista de unidades de medida
      },
      error: (err) => {
        console.error('Error al cargar unidades de medida', err);
      }
    });
  }

  saveProduct() {
    if (this.productForm.valid) {
      // Crear el objeto Producto
      const product: Producto = {
        idProducto: this.productForm.value['idProducto'],
        nombre: this.productForm.value['nombre'],
        pu: this.productForm.value['pu'],
        puOld: this.productForm.value['puOld'],
        utilidad: this.productForm.value['utilidad'],
        stock: this.productForm.value['stock'],
        stockOld: this.productForm.value['stockOld'],
        categoria: this.productForm.value['categoria'],
        marca: this.productForm.value['marca'],
        unidadMedida: this.productForm.value['unidadMedida']
      };

      // Guardar el producto a través del servicio
      this.serviceProducto.save(product).subscribe({
        next: (response) => {
          console.log('Producto guardado exitosamente', response);
          this.productForm.reset(); // Resetea el formulario después de guardar
          this.productSaved = true; // Mostrar mensaje de éxito

          // Ocultar mensaje de éxito después de unos segundos
          setTimeout(() => this.productSaved = false, 3000);
        },
        error: (error) => {
          console.error('Error al guardar el producto', error);
        }
      });
    } else {
      this.productForm.markAllAsTouched(); // Marcar todos los campos como tocados si no son válidos
    }
  }
}
