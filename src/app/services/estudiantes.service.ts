import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { estudiante } from '../interfaces/estudiante.interface';
import { of, tap } from 'rxjs';
import { materia } from '../interfaces/materia.interface';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {
  private urlBackend =
    'https://angry-caitrin-jhonmata0427s-projects-e45e6268.koyeb.app/api/v1';
  private http = inject(HttpClient);

  //variable que almacena los estudiantes actuales
  public cacheEstudiantes: estudiante[] = [];

  //////////////////////////////////////////////////////////////
  //metodo get para obtener estudiantes
  obtener() {
    if (this.cacheEstudiantes.length) {
      return of(this.cacheEstudiantes);
    }
    return this.http
      .get<estudiante[]>(`${this.urlBackend}/estudiantes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((Estudiantes) => {
          this.cacheEstudiantes = Estudiantes;
        })
      );
  }

  //////////////////////////////////////////////////////////////
  //metodo para eliminar un estudiante
  eliminar(id: number) {
    return this.http
      .delete<void>(`${this.urlBackend}/estudiantes/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap(() => {
          //se va actualizando el cache local
          const indice = this.cacheEstudiantes.findIndex(
            //busca el indice del estudiante
            (item) => item.id === id
          );
          this.cacheEstudiantes.splice(indice, 1); //splice(indice, 1):
        })
      );
  }

  //////////////////////////////////////////////////////////////////
  //metodo para actualizar estudiante
  actualizar(id: number, datos: estudiante) {
    return this.http
      .put<estudiante>(`${this.urlBackend}/estudiantes/${id}`, datos, {//datos: es el cuerpo de solictud PUT
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((estudiante) => {
          const indice = this.cacheEstudiantes.findIndex((item) => item.id === id);
          this.cacheEstudiantes[indice] = estudiante;
        })
      );
  }

  //////////////////////////////////////////////////////////////////
  //metodo para crear estudiantes
  crear(estudiante: estudiante) {
    return this.http
      .post<estudiante>(`${this.urlBackend}/estudiantes`, estudiante, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .pipe(
        tap((estudiante) => {
          this.cacheEstudiantes.push(estudiante);
        })
      );
  }
}
