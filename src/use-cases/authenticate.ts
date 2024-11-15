import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialError } from './errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMaches = await compare(password, user.password_hash)

    if (!doesPasswordMaches) {
      throw new InvalidCredentialError()
    }

    return {
      user,
    }
  }
}
