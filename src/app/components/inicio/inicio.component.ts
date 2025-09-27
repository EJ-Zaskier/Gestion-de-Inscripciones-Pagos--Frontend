// src/app/components/inicio/inicio.component.ts (VERSIÓN SIMPLIFICADA)

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InscripcionService } from '../../services/inscripcion.service'; // Ya no importamos AuthService

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  userName: string = 'Usuario';
  inscripcionPagada: boolean = false;
  inscripcionEnviada: boolean = false;
  inscriptionForm: FormGroup;

  constructor(
    private router: Router,
    private inscripcionService: InscripcionService, // Ya no inyectamos AuthService
    private fb: FormBuilder
  ) {
    // El formulario se queda igual
    this.inscriptionForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      curp: ['', [Validators.required, Validators.pattern(/^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/)]],
      fechaNacimiento: ['', Validators.required],
      genero: ['', Validators.required],
      estadoCivil: [''],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      direccion: ['', Validators.required],
      carreraInteres: ['', Validators.required],
      turnoPreferido: ['', Validators.required],
      escuelaProcedencia: ['', Validators.required],
      promedioGeneral: ['', [Validators.required, Validators.min(6), Validators.max(10)]],
      tutorNombre: [''],
      tutorParentesco: [''],
      tutorTelefono: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      tutorEmail: ['', [Validators.email]]
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      // 1. Decodificamos el token para obtener los datos del usuario
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userName = payload.usuario.nombre;
      this.inscripcionPagada = payload.usuario.inscripcionPagada || false;

      // 2. Si pagó, preguntamos al inscripcion-service si el formulario ya se envió
      if (this.inscripcionPagada) {
        this.checkInscripcionStatus();
      }

    } catch (e) {
      console.error('Error decodificando el token', e);
      this.logout();
    }
  }

  checkInscripcionStatus(): void {
    // Esta función ahora depende del inscripcion-service, no del login-service
    this.inscripcionService.getStatus().subscribe({
      next: (response) => {
        this.inscripcionEnviada = response.inscripcionEnviada;
      },
      error: (err) => {
        console.error('Error al obtener el estado de la inscripción', err);
        // No cerramos sesión, simplemente asumimos que no se ha enviado
      }
    });
  }

  onSubmit(): void {
    if (this.inscriptionForm.invalid) {
      this.inscriptionForm.markAllAsTouched();
      return;
    }
    this.inscripcionService.submitInscripcion(this.inscriptionForm.value).subscribe({
      next: (response) => {
        console.log('Formulario enviado con éxito', response);
        this.inscripcionEnviada = true;
      },
      error: (err) => {
        console.error('Error al enviar el formulario', err);
        alert(`Error: ${err.error.msg || 'No se pudo enviar la solicitud.'}`);
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
