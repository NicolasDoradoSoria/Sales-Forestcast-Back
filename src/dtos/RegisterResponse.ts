export interface RegisterResponseDTO {
  user: {
    id: number
    email: string
    role: string
  }
  token?: string
}
