// src/app/services/inscripcion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  private apiUrl = 'http://192.168.1.69:3000'; // Apunta al Gateway

  constructor(private http: HttpClient) { }

  /**
   * Envía los datos del formulario de inscripción al backend.
   * @param formData Los datos del formulario.
   * @returns Un Observable con la respuesta del servidor.
   */
  submitInscripcion(formData: any): Observable<any> {
    // El AuthInterceptor añadirá el token de autorización automáticamente
    return this.http.post(`${this.apiUrl}/api/inscripciones`, formData);
  }

    getStatus(): Observable<any> {
    // El interceptor que creamos antes añadirá el token a esta petición
    return this.http.get(`${this.apiUrl}/api/inscripciones/status`);
  }
}
