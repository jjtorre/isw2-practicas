/**
 * Mini framework de tests para el proyecto standalone.
 * Implementa el patrón AAA (Arrange - Act - Assert).
 */
const TestRunner = {
  tests: [],

  /** Registra un test con su nombre y función. */
  test(nombre, fn) {
    this.tests.push({ nombre, fn });
  },

  /** Ejecuta todos los tests registrados y devuelve los resultados. */
  run() {
    const resultados = [];
    for (const t of this.tests) {
      try {
        t.fn();
        resultados.push({ nombre: t.nombre, estado: 'pass', error: null });
      } catch (e) {
        resultados.push({ nombre: t.nombre, estado: 'fail', error: e.message });
      }
    }
    return resultados;
  },
};

/** Aserciones básicas. */
function assert(condicion, mensaje) {
  if (!condicion) {
    throw new Error(mensaje || 'La aserción falló');
  }
}

function assertEqual(actual, esperado, mensaje) {
  if (actual !== esperado) {
    throw new Error(
      (mensaje ? mensaje + ' — ' : '') +
        'Esperado: ' + JSON.stringify(esperado) +
        ', Actual: ' + JSON.stringify(actual)
    );
  }
}

function assertThrows(fn, mensaje) {
  let lanzado = false;
  try {
    fn();
  } catch (e) {
    lanzado = true;
  }
  if (!lanzado) {
    throw new Error(mensaje || 'Se esperaba que la función lanzara una excepción');
  }
}