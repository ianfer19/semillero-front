export interface User {
  id: number
  name: string
  email: string
  type: string
  programId: number
  createdAt: string
  updatedAt: string
  resetToken: string
  resetTokenExpireAt: string
}

export function mapUserToEnglish(user: any): User {
  return {
    id: user.id,
    name: user.nombre,
    email: user.email,
    type: user.tipo,
    programId: user.programa_id,
    createdAt: user.fecha_creacion,
    updatedAt: user.fecha_actualizacion,
    resetToken: user.reset_token,
    resetTokenExpireAt: user.reset_token_expire_at
  }
} 