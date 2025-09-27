import { Component } from '@angular/core'; // Ya no se necesita OnInit
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent { // <-- Ya no implementa OnInit
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Lógica de redirección movida aquí, al constructor
    const token = localStorage.getItem('token');
    if (token) {
      // Si ya hay un token, la redirección es inmediata
      this.router.navigate(['/inicio']);
    }

    // El formulario se sigue creando normalmente
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // ngOnInit ya no es necesario para la redirección

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
      }
    });
  }
}
