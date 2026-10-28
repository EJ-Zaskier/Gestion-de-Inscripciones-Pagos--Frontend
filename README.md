# Gestión de inscripciones y pagos (frontend)

Aplicación web en Angular para que los alumnos se registren, paguen su inscripción y envíen su solicitud. Se conecta a un backend de microservicios a través de un API Gateway.

*Angular 19 · TypeScript · RxJS · Reactive Forms*

## Funciones

- **Registro e inicio de sesión** con formularios reactivos y validación (incluida la confirmación de contraseña).
- **Interceptor HTTP** que agrega el token de autenticación a cada petición.
- **Pago de inscripción** antes de habilitar el formulario.
- **Formulario de inscripción** con envío de datos y archivos.
- **Consulta del estado** de la solicitud.

## Estructura

```text
src/app/components/   inicio, login, registro
src/app/services/     auth.service (login/registro), inscripcion.service (solicitud y estado)
src/app/interceptors/ auth.interceptor (token en cada petición)
```

## Ejecutar

```bash
npm install
npx ng serve
```

Abre `http://localhost:4200`. La URL del API Gateway se define en `src/app/services/*.service.ts` (`apiUrl`).

## Pruebas

```bash
npx ng test
```
