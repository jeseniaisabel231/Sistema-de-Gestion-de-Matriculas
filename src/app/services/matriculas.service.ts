import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { matricula } from '../interfaces/matricula.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatriculasService {
  private urlBackend =
    'https://angry-caitrin-jhonmata0427s-projects-e45e6268.koyeb.app/api/v1';
  private http = inject(HttpClient);

  //variable que almacena als materias actuales
  public cacheMatriculas: matricula[] = [];

  /////////////////////////////////////////////
  //Metodo get no necesita parametros
  obtener() {
    //Paso 1: Verificar si hay datos en el cache
    //legth: devuelve la cantidad de elementos que contiene
    if (this.cacheMatriculas.length) {
      return of(this.cacheMatriculas);
    }
    return this.http
      .get<matricula[]>(`${this.urlBackend}/matriculas`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }) //Guardar las materias en cache
      .pipe(
        tap((Matriculas) => {
          this.cacheMatriculas = Matriculas;
        })
      ); //clave: 'token'
  }

  /////////////////////////////////////////////
  //Metodo delete para eliminar matriculas
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/matriculas/${id}`, {
        headers: { Authorizacion: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          const indice = this.cacheMatriculas.findIndex(
            (item) => item.id === id
          );
          this.cacheMatriculas.splice(indice, 1);
        })
      );
  }

  /////////////////////////////////////////////
  //endpoitn de actualizar matricula
  actualizar(id: number, datos: matricula) {
    return this.http
      .put<matricula>(`${this.urlBackend}/matriculas/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((matricula) => {
          const indice = this.cacheMatriculas.findIndex(
            (item) => item.id === id
          );
          this.cacheMatriculas[indice] = matricula;
        })
      );
  }

  //endpoint de crear materia
    crear(matricula: matricula) {
      return this.http
        .post<matricula>(`${this.urlBackend}/matriculas`, matricula, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .pipe(
          tap((matricula) => {
            this.cacheMatriculas.push(matricula);
          })
        );
    }
}
