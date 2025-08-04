import { HttpException } from "../utils/exceptions/HttpException.js"

export class User {
  constructor(
    public email: string,
    public password: string,
    public role: string
  ) {}

  static create(email: string, password: string, confirmPassword: string, role: string): User {
    if (!email) throw new HttpException(400, 'Email is required')
    if (!password) throw new HttpException(400, 'Password is required')
    if (password !== confirmPassword) throw new HttpException(400, 'Passwords do not match')
  
    return new User(email, password, role)
  }
}
