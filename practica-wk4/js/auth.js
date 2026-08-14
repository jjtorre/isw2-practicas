/**
 * Módulo de autenticación y registro de usuarios.
 * Almacenamiento local en el navegador (localStorage).
 */

const Auth = {
  /** Clave usada en localStorage para guardar los usuarios. */
  STORAGE_KEY: 'citas_usuarios',

  /**
   * Registra un nuevo paciente.
   * @param {Object} datos - { nombre, correo, telefono, password }
   * @returns {Object} El usuario creado.
   */
  registrar(datos) {
    // Validaciones
    if (!datos.nombre || !datos.correo || !datos.telefono || !datos.password) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (!datos.correo.includes('@')) {
      throw new Error('El correo electrónico no es válido');
    }

    // Leer usuarios existentes
    const usuarios = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    // Comprobar correo duplicado
    const duplicado = usuarios.find((u) => u.correo === datos.correo);
    if (duplicado) {
      throw new Error('Ya existe un usuario con ese correo');
    }

    // Crear usuario
    const usuario = {
      id: Date.now(),
      nombre: datos.nombre,
      correo: datos.correo,
      telefono: datos.telefono,
      password: datos.password,
      rol: 'paciente',
    };

    // Guardar
    usuarios.push(usuario);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));

    return usuario;
  },
};