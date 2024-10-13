import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { UnidadMedida } from "../modelo/UnidadMedida";
import {BehaviorSubject, Observable} from "rxjs";
import {Marca} from "../modelo/Marca";

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private url: string = `${environment.HOST}/unidadMedida`;
  private unidadMedidaSubject = new BehaviorSubject<UnidadMedida[]>([]); // Comportamiento inicial
  unidadMedida$ = this.unidadMedidaSubject.asObservable(); // Observable para suscribirse

  constructor(private http: HttpClient) { }

  findAll(): void {
    this.http.get<UnidadMedida[]>(this.url).subscribe(data => {
      this.unidadMedidaSubject.next(data); // Actualiza el BehaviorSubject con los datos recibidos
    });
  }
}
