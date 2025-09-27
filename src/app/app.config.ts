import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
// 1. Importaciones necesarias para los interceptors
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // 2. Importa tu interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 3. Habilita los interceptors basados en clases
    provideHttpClient(withInterceptorsFromDi()),

    // 4. Registra tu AuthInterceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
