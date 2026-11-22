export function getAuthErrorMessage(error) {
  if (error.status === 401) return "Email o contraseña incorrectos"
  if (error.status === 422) return "Revisa los campos marcados"
  if (error.status === 400 && error.message.includes("already exists")) {
    return "Ese email ya está registrado"
  }
  return "No se pudo conectar con el servidor"
}
