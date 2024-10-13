import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Categoria } from "../modelo/Categoria";
import {Observable, catchError, BehaviorSubject} from "rxjs";
import {Marca} from "../modelo/Marca";  // Importar Observable y catchError para manejar errores

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url: string = `${environment.HOST}/categoria`; // Definir la URL del backend
  private categoriaSubject = new BehaviorSubject<Categoria[]>([]); // Comportamiento inicial
  categoria$ = this.categoriaSubject.asObservable(); // Observable para suscribirse

  constructor(private http: HttpClient) { }

  findAll(): void {
    this.http.get<Categoria[]>(this.url).subscribe(data => {
      this.categoriaSubject.next(data); // Actualiza el BehaviorSubject con los datos recibidos
    });
  }
}
