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
    this._validarDatos(datos);
    const citas = this._obtenerCitas();
    this._comprobarDobleReserva(citas, datos);

    const cita = this._crearCita(datos);
    citas.push(cita);
    this._guardarCitas(citas);

    return cita;
  },

  /** Valida que los campos obligatorios estén presentes. */
  _validarDatos(datos) {
    if (!datos.pacienteId || !datos.medicoId || !datos.fecha || !datos.hora) {
      throw new Error('Todos los campos son obligatorios');
    }
  },

  /** Evita la doble reserva del mismo médico en el mismo horario (RF-07). */
  _comprobarDobleReserva(citas, datos) {
    const duplicada = citas.find(
      (c) => c.medicoId === datos.medicoId && c.fecha === datos.fecha && c.hora === datos.hora
    );
    if (duplicada) {
      throw new Error('Ese horario ya está reservado para este médico');
    }
  },

  /** Crea el objeto cita a partir de los datos. */
  _crearCita(datos) {
    return {
      id: Date.now(),
      pacienteId: datos.pacienteId,
      medicoId: datos.medicoId,
      fecha: datos.fecha,
      hora: datos.hora,
      motivo: datos.motivo || '',
      estado: 'pendiente',
    };
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