import { HttpClient } from '@angular/common/http'; //hacer peticiones http
import { inject, Injectable } from '@angular/core';
import { materia } from '../interfaces/materia.interface';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriasService {
  private urlBackend =
    'https://angry-caitrin-jhonmata0427s-projects-e45e6268.koyeb.app/api/v1';
  private http = inject(HttpClient);

  //variable que almacena als materias actuales
  public cacheMaterias: materia[] = [];
  //cacheMaterias: variable
  //materia[]: tipo de dato

  //////////////////////////////////////////////////////////////////////////
  //metodo get no se necesita pasar parametros
  obtener() {
    //Paso1: Verificar si hay datos en el cache
    //length: es un arreglo que devuelve la cantidad de elementos que contiene
    if (this.cacheMaterias.length) {
      //si tiene datos
      return of(this.cacheMaterias); //retorna un observable con los datos
    }
    //Si no hay datos en la cacheMaterias, se hace una peticion GET al backend
    return this.http
      .get<materia[]>(`${this.urlBackend}/materias`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      //Guardar las materias en cache
      .pipe(
        tap((Materias) => {
          this.cacheMaterias = Materias;
        })
      ); //clave: 'token'
  }
  //   Authorization: Bearer ... → Se envía un token de autenticación para acceder a la API.
  // localStorage.getItem('token') → Obtiene el token almacenado en el navegador.
  //////////////////////////////////////////////////////////////////////////


  //endppoint para eliminar amteria
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/materias/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          const indice = this.cacheMaterias.findIndex((item) => item.id === id);
          this.cacheMaterias.splice(indice, 1);
        })
      );
  }

  //endpoitn de actualizar materias
  actualizar(id: number, datos: materia) {
    return this.http
      .put<materia>(`${this.urlBackend}/materias/${id}`, datos, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((materia) => {
          const indice = this.cacheMaterias.findIndex((item) => item.id === id);
          this.cacheMaterias[indice] = materia;
        })
      );
  }

  //endpoint de crear materia
  crear(materia: materia) {
    return this.http
      .post<materia>(`${this.urlBackend}/materias`, materia, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((materia) => {
          this.cacheMaterias.push(materia);
        })
      );
  }
}
