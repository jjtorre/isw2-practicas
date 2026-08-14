/**
 * Tests de la funcionalidad de registro de pacientes (RF-01).
 * Patrón AAA: Arrange - Act - Assert.
 */

// Limpiar el almacenamiento antes de cada test
function limpiarAlmacenamiento() {
  localStorage.removeItem(Auth.STORAGE_KEY);
}

// ===== Test 1: Registro exitoso =====
TestRunner.test('Registrar un paciente válido crea el usuario', () => {
  // Arrange
  limpiarAlmacenamiento();
  const datos = {
    nombre: 'Ana Pérez',
    correo: 'ana@example.com',
    telefono: '600123456',
    password: 'secreto123',
  };

  // Act
  const usuario = Auth.registrar(datos);

  // Assert
  assert(usuario !== null && usuario !== undefined, 'Debe devolver el usuario creado');
  assertEqual(usuario.nombre, 'Ana Pérez', 'El nombre debe coincidir');
  assertEqual(usuario.correo, 'ana@example.com', 'El correo debe coincidir');
  assertEqual(usuario.rol, 'paciente', 'El rol debe ser paciente');
  assert(usuario.id !== undefined, 'Debe asignar un id');
});

// ===== Test 2: El usuario se guarda en localStorage =====
TestRunner.test('El usuario registrado se guarda en localStorage', () => {
  // Arrange
  limpiarAlmacenamiento();
  const datos = {
    nombre: 'Luis Gómez',
    correo: 'luis@example.com',
    telefono: '611222333',
    password: 'clave456',
  };

  // Act
  Auth.registrar(datos);
  const guardados = JSON.parse(localStorage.getItem(Auth.STORAGE_KEY) || '[]');

  // Assert
  assertEqual(guardados.length, 1, 'Debe existir un usuario guardado');
  assertEqual(guardados[0].correo, 'luis@example.com', 'El correo guardado debe coincidir');
});

// ===== Test 3: No permite correo duplicado =====
TestRunner.test('No permite registrar un correo ya existente', () => {
  // Arrange
  limpiarAlmacenamiento();
  const datos = {
    nombre: 'Ana Pérez',
    correo: 'ana@example.com',
    telefono: '600123456',
    password: 'secreto123',
  };
  Auth.registrar(datos);

  // Act & Assert
  assertThrows(() => Auth.registrar(datos), 'Debe lanzar error por correo duplicado');
});

// ===== Test 4: Valida campos obligatorios =====
TestRunner.test('Rechaza el registro si faltan campos obligatorios', () => {
  // Arrange
  limpiarAlmacenamiento();
  const datosIncompletos = {
    nombre: '',
    correo: 'incompleto@example.com',
    telefono: '600000000',
    password: 'clave',
  };

  // Act & Assert
  assertThrows(
    () => Auth.registrar(datosIncompletos),
    'Debe lanzar error si falta el nombre'
  );
});

// ===== Test 5: Valida formato de correo =====
TestRunner.test('Rechaza un correo con formato inválido', () => {
  // Arrange
  limpiarAlmacenamiento();
  const datos = {
    nombre: 'Carlos Ruiz',
    correo: 'correo-invalido',
    telefono: '600111222',
    password: 'clave789',
  };

  // Act & Assert
  assertThrows(
    () => Auth.registrar(datos),
    'Debe lanzar error por correo inválido'
  );
});