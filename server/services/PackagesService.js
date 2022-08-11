import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { shipsService } from "./ShipsService.js"

// TODO Write the Service
class PackagesService {
  async getPackagesOnShip(shipId) {
    let shipPackages = await dbContext.Packages.find({ shipId }, '-message')
      .populate('sender', 'picture')
      .populate('recipient', 'picture')
    return shipPackages
  }

  async getUserReceivedPackages(userId) {
    let yourPackages = await dbContext.Packages.find({ recipientId: userId })
      .populate('sender', 'name picture')
      .populate('transportShip')
    return yourPackages
  }

  async getUserSentPackages(userId) {
    let yourPackages = await dbContext.Packages.find({ senderId: userId })
      .populate('recipient', 'name picture')
      .populate('transportShip')
    return yourPackages
  }


  async create(packageData) {

    // What could go wrong???
    // Verify the recipient
    let recipient = await dbContext.Account.findById(packageData.recipientId)
    if (!recipient) {
      throw new BadRequest('Cannot find recipient')
    }

    // verify the ship with the already written code we know works!!!
    await shipsService.getById(packageData.shipId)

    let shipPackage = await dbContext.Packages.create(packageData)
    return shipPackage

  }

}
export const packagesService = new PackagesService()
