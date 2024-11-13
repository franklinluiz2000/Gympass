import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'
import { describe, expect, it, beforeEach } from 'vitest'

let gymsRepositoy: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepositoy = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepositoy)
  })

  it('Shloud be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -5.885686,
      longitude: -35.1955522,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
