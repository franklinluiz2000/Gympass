import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearbly gyms', async () => {
    await gymsRepository.create({
      title: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Javascript Gym' })])
  })
})