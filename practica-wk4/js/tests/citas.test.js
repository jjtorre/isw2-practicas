/**
 * Tests de la funcionalidad de solicitud de cita (RF-06) y
 * prevención de doble reserva (RF-07).
 * Patrón AAA: Arrange - Act - Assert.
 */

function limpiarCitas() {
  localStorage.removeItem(Citas.STORAGE_KEY);
}

// Datos base para una cita válida
function citaValida() {
  return {
    pacienteId: 1,
    medicoId: 10,
    fecha: '2026-08-20',
    hora: '10:00',
    motivo: 'Consulta general',
  };
}

// ===== Test 1: Solicitar cita válida la crea =====
TestRunner.test('Solicitar una cita válida crea la cita', () => {
  // Arrange
  limpiarCitas();
  const datos = citaValida();

  // Act
  const cita = Citas.solicitar(datos);

  // Assert
  assert(cita !== null && cita !== undefined, 'Debe devolver la cita creada');
  assertEqual(cita.pacienteId, 1, 'El paciente debe coincidir');
  assertEqual(cita.medicoId, 10, 'El médico debe coincidir');
  assertEqual(cita.fecha, '2026-08-20', 'La fecha debe coincidir');
  assertEqual(cita.hora, '10:00', 'La hora debe coincidir');
  assertEqual(cita.estado, 'pendiente', 'El estado inicial debe ser pendiente');
  assert(cita.id !== undefined, 'Debe asignar un id');
});

// ===== Test 2: La cita se guarda en localStorage =====
TestRunner.test('La cita solicitada se guarda en localStorage', () => {
  // Arrange
  limpiarCitas();

  // Act
  Citas.solicitar(citaValida());
  const guardadas = JSON.parse(localStorage.getItem(Citas.STORAGE_KEY) || '[]');

  // Assert
  assertEqual(guardadas.length, 1, 'Debe existir una cita guardada');
  assertEqual(guardadas[0].medicoId, 10, 'El médico guardado debe coincidir');
});

// ===== Test 3: No permite doble reserva del mismo médico/hora =====
TestRunner.test('No permite reservar el mismo médico en el mismo horario (RF-07)', () => {
  // Arrange
  limpiarCitas();
  Citas.solicitar(citaValida());

  // Act & Assert
  assertThrows(
    () => Citas.solicitar(citaValida()),
    'Debe lanzar error por doble reserva'
  );
});

// ===== Test 4: Permite mismo médico en distinta hora =====
TestRunner.test('Permite reservar el mismo médico en una hora distinta', () => {
  // Arrange
  limpiarCitas();
  Citas.solicitar(citaValida());

  // Act
  const otra = citaValida();
  otra.hora = '12:00';
  const cita = Citas.solicitar(otra);

  // Assert
  assertEqual(cita.hora, '12:00', 'Debe permitir la cita en otra hora');
});

// ===== Test 5: Valida campos obligatorios =====
TestRunner.test('Rechaza la cita si faltan campos obligatorios', () => {
  // Arrange
  limpiarCitas();
  const incompleta = citaValida();
  incompleta.fecha = '';

  // Act & Assert
  assertThrows(
    () => Citas.solicitar(incompleta),
    'Debe lanzar error si falta la fecha'
  );
});

// ===== Test 6: Listar citas de un paciente =====
TestRunner.test('Listar citas devuelve solo las del paciente indicado (RF-08)', () => {
  // Arrange
  limpiarCitas();
  Citas.solicitar({ ...citaValida(), pacienteId: 1 });
  Citas.solicitar({ ...citaValida(), pacienteId: 2, hora: '12:00' });

  // Act
  const citasPaciente1 = Citas.listarPorPaciente(1);

  // Assert
  assertEqual(citasPaciente1.length, 1, 'Debe devolver solo las citas del paciente 1');
  assertEqual(citasPaciente1[0].pacienteId, 1, 'La cita debe pertenecer al paciente 1');
});

// ===== Test 7: Listar citas de un paciente sin citas =====
TestRunner.test('Listar citas de un paciente sin citas devuelve lista vacía', () => {
  // Arrange
  limpiarCitas();

  // Act
  const citas = Citas.listarPorPaciente(99);

  // Assert
  assertEqual(citas.length, 0, 'Debe devolver una lista vacía');
});