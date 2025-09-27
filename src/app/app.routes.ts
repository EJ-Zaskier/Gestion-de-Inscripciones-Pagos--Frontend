import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // 1. La ruta raíz redirige a /login
    pathMatch: 'full'
  },
  {
    path: 'login', // 2. La ruta /login ahora existe y carga el componente
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./components/inicio/inicio.component').then(m => m.InicioComponent)
  },
  {
    path: 'registro',
    loadComponent: () => import('./components/registro/registro.component').then(m => m.RegistroComponent)
  },
  {
    path: '**', // 3. Ruta comodín para cualquier otra URL
    redirectTo: 'login' // Por defecto, si no se encuentra la ruta, va a login
  }
];
