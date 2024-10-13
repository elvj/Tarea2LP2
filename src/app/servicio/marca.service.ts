import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment.development";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Marca } from "../modelo/Marca";

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private url: string = `${environment.HOST}/marcas`;
  private marcaSubject = new BehaviorSubject<Marca[]>([]); // Comportamiento inicial
  marcas$ = this.marcaSubject.asObservable(); // Observable para suscribirse

  constructor(private http: HttpClient) { }

  findAll(): void {
    this.http.get<Marca[]>(this.url).subscribe(data => {
      this.marcaSubject.next(data); // Actualiza el BehaviorSubject con los datos recibidos
    });
  }
}
