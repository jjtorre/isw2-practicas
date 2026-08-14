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
    this._validarDatos(datos);
    const usuarios = this._obtenerUsuarios();
    this._comprobarCorreoDuplicado(usuarios, datos.correo);

    const usuario = this._crearUsuario(datos);
    usuarios.push(usuario);
    this._guardarUsuarios(usuarios);

    return usuario;
  },

  /**
   * Inicia sesión con correo y contraseña.
   * @param {string} correo
   * @param {string} password
   * @returns {Object} El usuario autenticado.
   */
  iniciarSesion(correo, password) {
    if (!correo || !password) {
      throw new Error('Correo y contraseña son obligatorios');
    }

    const usuario = this._buscarPorCorreo(correo);

    if (!usuario) {
      throw new Error('No existe un usuario con ese correo');
    }
    if (usuario.password !== password) {
      throw new Error('Contraseña incorrecta');
    }

    return usuario;
  },

  /**
   * Recupera la contraseña de un usuario por su correo.
   * @param {string} correo
   * @returns {string} La contraseña del usuario.
   */
  recuperarPassword(correo) {
    // TODO: implementar (fase GREEN)
    throw new Error('No implementado');
  },

  /** Valida que los campos obligatorios estén presentes y el correo sea válido. */
  _validarDatos(datos) {
    if (!datos.nombre || !datos.correo || !datos.telefono || !datos.password) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (!this._esCorreoValido(datos.correo)) {
      throw new Error('El correo electrónico no es válido');
    }
  },

  /** Comprueba si el correo ya está registrado. */
  _comprobarCorreoDuplicado(usuarios, correo) {
    if (this._buscarPorCorreo(correo)) {
      throw new Error('Ya existe un usuario con ese correo');
    }
  },

  /** Busca un usuario por su correo electrónico. */
  _buscarPorCorreo(correo) {
    const usuarios = this._obtenerUsuarios();
    return usuarios.find((u) => u.correo === correo);
  },

  /** Crea el objeto usuario a partir de los datos del formulario. */
  _crearUsuario(datos) {
    return {
      id: Date.now(),
      nombre: datos.nombre,
      correo: datos.correo,
      telefono: datos.telefono,
      password: datos.password,
      rol: 'paciente',
    };
  },

  /** Lee la lista de usuarios almacenada. */
  _obtenerUsuarios() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  },

  /** Guarda la lista de usuarios en localStorage. */
  _guardarUsuarios(usuarios) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  },

  /** Valida el formato básico de un correo electrónico. */
  _esCorreoValido(correo) {
    return correo.includes('@');
  },
};