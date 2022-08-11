import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ShipsService {
  async getAll(query = {}) {
    return await dbContext.Ships.find(query).populate('creatorInfo', 'name picture')
  }

  async getById(id) {
    const ship = await dbContext.Ships.findById(id).populate('creatorInfo', 'name picture')
    if (!ship) {
      throw new BadRequest('Invalid Hull Id')
    }
    return ship
  }

  async create(body) {
    let ship = await dbContext.Ships.create(body)
    await ship.populate('creatorInfo', 'name picture')
    return ship
  }

  async remove(shipId, userId) {
    const ship = await this.getById(shipId)
    if (ship.creatorId.toString() !== userId) {
      throw new Forbidden('You lack the proper documents to complete this action')
    }
    await ship.remove()
    return ship
  }
}
export const shipsService = new ShipsService()
