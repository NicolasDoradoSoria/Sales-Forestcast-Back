export interface User {
  id: number
  email: string
  password_hash: string
  role: string
  created_at: Date
}