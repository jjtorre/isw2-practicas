# Requerimientos — Aplicación de Gestión de Citas Médicas

## 1. Descripción General

Aplicación web para la gestión de citas médicas que permite a pacientes solicitar, consultar y cancelar citas, y a los profesionales de la salud administrar su agenda. El sistema debe ser accesible desde navegadores web y dispositivos móviles.

---

## 2. Roles de Usuario

| Rol | Descripción |
|-----|-------------|
| **Paciente** | Usuario que solicita y gestiona sus citas médicas. |
| **Médico** | Profesional de la salud que administra su agenda y atiende citas. |
| **Administrador** | Gestiona usuarios, especialidades, consultorios y configuración general. |

---

## 3. Requerimientos Funcionales

### 3.1 Autenticación y Gestión de Usuarios
- RF-01: El sistema debe permitir el registro de pacientes con nombre, correo electrónico, teléfono y contraseña.
- RF-02: El sistema debe permitir el inicio de sesión mediante correo electrónico y contraseña.
- RF-03: El sistema debe permitir la recuperación de contraseña mediante correo electrónico.
- RF-04: El sistema debe permitir al administrador crear, editar y desactivar cuentas de médicos.
- RF-05: El sistema debe mostrar el perfil del usuario con sus datos personales editables.

### 3.2 Gestión de Citas
- RF-06: El paciente debe poder solicitar una cita seleccionando especialidad, médico, fecha y hora.
- RF-07: El sistema debe impedir la doble reserva de un mismo horario para un médico.
- RF-08: El paciente debe poder consultar sus citas próximas y pasadas.
- RF-09: El paciente debe poder cancelar una cita con al menos 24 horas de antelación.
- RF-10: El sistema debe enviar una notificación de confirmación al crear, modificar o cancelar una cita.
- RF-11: El médico debe poder ver su agenda diaria, semanal y mensual.
- RF-12: El médico debe poder marcar una cita como atendida o no asistida.
- RF-13: El administrador debe poder ver el historial completo de citas.

### 3.3 Gestión de Médicos y Especialidades
- RF-14: El sistema debe permitir gestionar especialidades médicas (crear, editar, desactivar).
- RF-15: El sistema debe permitir asignar una o varias especialidades a cada médico.
- RF-16: El sistema debe permitir definir el horario de atención de cada médico.

### 3.4 Búsqueda y Filtros
- RF-17: El paciente debe poder buscar médicos por nombre o especialidad.
- RF-18: El sistema debe mostrar la disponibilidad de horarios en tiempo real.

### 3.5 Notificaciones
- RF-19: El sistema debe enviar recordatorios de citas 24 horas antes de la cita.
- RF-20: El sistema debe notificar al médico cuando se agenda una nueva cita.

---

## 4. Requerimientos No Funcionales

### 4.1 Rendimiento
- RNF-01: El sistema debe responder a las peticiones en menos de 2 segundos en condiciones normales.
- RNF-02: El sistema debe soportar al menos 500 usuarios concurrentes.

### 4.2 Seguridad
- RNF-03: Las contraseñas deben almacenarse cifradas (hash + salt).
- RNF-04: El acceso a los datos debe estar protegido mediante autenticación y autorización por rol.
- RNF-05: La comunicación debe realizarse mediante HTTPS.
- RNF-06: Los datos personales de salud deben cumplir con la normativa de protección de datos (RGPD/LOPD).

### 4.3 Usabilidad
- RNF-07: La interfaz debe ser intuitiva y responsive para dispositivos móviles y escritorio.
- RNF-08: El sistema debe mostrar mensajes de error claros y accesibles.

### 4.4 Disponibilidad y Mantenibilidad
- RNF-09: El sistema debe tener una disponibilidad del 99,5%.
- RNF-10: El código debe estar modularizado y documentado para facilitar su mantenimiento.

### 4.5 Compatibilidad
- RNF-11: El sistema debe ser compatible con los navegadores modernos (Chrome, Firefox, Edge, Safari).

---

## 5. Requerimientos de Datos

### 5.1 Entidades Principales
- **Usuario**: id, nombre, correo, teléfono, contraseña, rol, estado.
- **Paciente**: id, usuario_id, fecha_nacimiento, historial.
- **Médico**: id, usuario_id, especialidades, horario.
- **Especialidad**: id, nombre, descripción.
- **Cita**: id, paciente_id, médico_id, fecha, hora, estado, motivo.
- **Consultorio**: id, nombre, ubicación.

### 5.2 Estados de una Cita
- Pendiente
- Confirmada
- Atendida
- Cancelada
- No asistida

---

## 6. Requerimientos de Interfaz (Pantallas)

- Pantalla de inicio de sesión / registro.
- Panel del paciente (dashboard con citas próximas).
- Panel del médico (agenda y citas del día).
- Panel del administrador (gestión de usuarios, especialidades y reportes).
- Formulario de solicitud de cita.
- Vista de detalle de cita.

---

## 7. Requerimientos de Reportes

- Reporte de citas por médico y por especialidad.
- Reporte de citas canceladas y no asistidas.
- Reporte de pacientes más frecuentes.

---

## 8. Criterios de Aceptación (Ejemplos)

- CA-01: Un paciente puede registrarse, iniciar sesión y solicitar una cita en menos de 5 minutos.
- CA-02: No es posible reservar dos citas en el mismo horario para el mismo médico.
- CA-03: El paciente recibe una notificación de confirmación al crear su cita.
- CA-04: El médico puede ver y gestionar su agenda del día.
