/**
 * Módulo de gestión de citas médicas.
 * Almacenamiento local en el navegador (localStorage).
 */

const Citas = {
  /** Clave usada en localStorage para guardar las citas. */
  STORAGE_KEY: 'citas_citas',

  /**
   * Solicita una nueva cita médica.
   * @param {Object} datos - { pacienteId, medicoId, fecha, hora, motivo }
   * @returns {Object} La cita creada.
   */
  solicitar(datos) {
    // Validar campos obligatorios
    if (!datos.pacienteId || !datos.medicoId || !datos.fecha || !datos.hora) {
      throw new Error('Todos los campos son obligatorios');
    }

    const citas = this._obtenerCitas();

    // Evitar doble reserva del mismo médico en el mismo horario (RF-07)
    const duplicada = citas.find(
      (c) => c.medicoId === datos.medicoId && c.fecha === datos.fecha && c.hora === datos.hora
    );
    if (duplicada) {
      throw new Error('Ese horario ya está reservado para este médico');
    }

    // Crear cita
    const cita = {
      id: Date.now(),
      pacienteId: datos.pacienteId,
      medicoId: datos.medicoId,
      fecha: datos.fecha,
      hora: datos.hora,
      motivo: datos.motivo || '',
      estado: 'pendiente',
    };

    citas.push(cita);
    this._guardarCitas(citas);

    return cita;
  },

  /** Lee la lista de citas almacenada. */
  _obtenerCitas() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  },

  /** Guarda la lista de citas en localStorage. */
  _guardarCitas(citas) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(citas));
  },
};