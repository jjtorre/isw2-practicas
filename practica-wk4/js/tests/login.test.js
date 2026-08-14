/**
 * Tests de la funcionalidad de inicio de sesión (RF-02).
 * Patrón AAA: Arrange - Act - Assert.
 */

function limpiarAlmacenamiento() {
  localStorage.removeItem(Auth.STORAGE_KEY);
}

// Helper para crear un usuario de prueba
function crearUsuarioPrueba() {
  return {
    nombre: 'Ana Pérez',
    correo: 'ana@example.com',
    telefono: '600123456',
    password: 'secreto123',
  };
}

// ===== Test 1: Login exitoso con credenciales correctas =====
TestRunner.test('Iniciar sesión con credenciales correctas devuelve el usuario', () => {
  // Arrange
  limpiarAlmacenamiento();
  Auth.registrar(crearUsuarioPrueba());

  // Act
  const usuario = Auth.iniciarSesion('ana@example.com', 'secreto123');

  // Assert
  assert(usuario !== null && usuario !== undefined, 'Debe devolver el usuario');
  assertEqual(usuario.correo, 'ana@example.com', 'El correo debe coincidir');
  assertEqual(usuario.nombre, 'Ana Pérez', 'El nombre debe coincidir');
});

// ===== Test 2: Login falla con contraseña incorrecta =====
TestRunner.test('Iniciar sesión con contraseña incorrecta lanza error', () => {
  // Arrange
  limpiarAlmacenamiento();
  Auth.registrar(crearUsuarioPrueba());

  // Act & Assert
  assertThrows(
    () => Auth.iniciarSesion('ana@example.com', 'clave-incorrecta'),
    'Debe lanzar error por contraseña incorrecta'
  );
});

// ===== Test 3: Login falla con correo no registrado =====
TestRunner.test('Iniciar sesión con correo no registrado lanza error', () => {
  // Arrange
  limpiarAlmacenamiento();
  Auth.registrar(crearUsuarioPrueba());

  // Act & Assert
  assertThrows(
    () => Auth.iniciarSesion('noexiste@example.com', 'secreto123'),
    'Debe lanzar error por correo no registrado'
  );
});

// ===== Test 4: Login falla con campos vacíos =====
TestRunner.test('Iniciar sesión con campos vacíos lanza error', () => {
  // Arrange
  limpiarAlmacenamiento();

  // Act & Assert
  assertThrows(
    () => Auth.iniciarSesion('', ''),
    'Debe lanzar error por campos vacíos'
  );
});