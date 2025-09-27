// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // CORRECCIÓN: La URL base debe ser solo la del gateway, sin /auth
  private apiUrl = 'http://192.168.1.69:3000';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    // Construimos la URL completa aquí
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(userData: any): Observable<any> {
    // Construimos la URL completa aquí
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

}
