/**
 * Tests de la funcionalidad de recuperación de contraseña (RF-03).
 * Patrón AAA: Arrange - Act - Assert.
 */

function limpiarAlmacenamiento() {
  localStorage.removeItem(Auth.STORAGE_KEY);
}

// ===== Test 1: Recuperar contraseña de un correo existente =====
TestRunner.test('Recuperar contraseña de un correo registrado devuelve la contraseña', () => {
  // Arrange
  limpiarAlmacenamiento();
  Auth.registrar({
    nombre: 'Ana Pérez',
    correo: 'ana@example.com',
    telefono: '600123456',
    password: 'secreto123',
  });

  // Act
  const password = Auth.recuperarPassword('ana@example.com');

  // Assert
  assertEqual(password, 'secreto123', 'Debe devolver la contraseña del usuario');
});

// ===== Test 2: Recuperar contraseña de correo inexistente lanza error =====
TestRunner.test('Recuperar contraseña de un correo no registrado lanza error', () => {
  // Arrange
  limpiarAlmacenamiento();
  Auth.registrar({
    nombre: 'Ana Pérez',
    correo: 'ana@example.com',
    telefono: '600123456',
    password: 'secreto123',
  });

  // Act & Assert
  assertThrows(
    () => Auth.recuperarPassword('noexiste@example.com'),
    'Debe lanzar error por correo no registrado'
  );
});

// ===== Test 3: Recuperar contraseña con correo vacío lanza error =====
TestRunner.test('Recuperar contraseña con correo vacío lanza error', () => {
  // Arrange
  limpiarAlmacenamiento();

  // Act & Assert
  assertThrows(
    () => Auth.recuperarPassword(''),
    'Debe lanzar error por correo vacío'
  );
});