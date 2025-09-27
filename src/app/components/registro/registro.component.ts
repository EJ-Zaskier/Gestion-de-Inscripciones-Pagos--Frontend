import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Función validadora personalizada para contraseñas
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './registro.component.html',
  styleUrl: '../login/login.component.css' // Asegúrate que la ruta al CSS sea correcta
})
export class RegistroComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator }); // Añadimos el validador al grupo
  }

  onSubmit(): void {
    // Detiene si el formulario es inválido
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // Marca todos los campos para mostrar errores
      return;
    }

    // Llama al servicio de registro (excluyendo confirmPassword)
    const { confirmPassword, ...userData } = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('¡Registro exitoso!', response);
        // Opcional: mostrar un mensaje de éxito
        alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
        // Redirige al usuario a la página de login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        // Opcional: mostrar un mensaje de error específico
        alert(`Error en el registro: ${err.error.msg || 'Inténtalo de nuevo.'}`);
      }
    });
  }
}
