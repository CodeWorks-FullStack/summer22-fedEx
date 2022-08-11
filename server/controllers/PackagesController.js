import { Auth0Provider } from '@bcwdev/auth0provider'
import { packagesService } from '../services/PackagesService.js'
import BaseController from '../utils/BaseController'

// TODO Write the Controller
export class PackagesController extends BaseController {
  constructor() {
    super('api/packages')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async create(req, res, next) {
    try {
      let packageData = req.body
      packageData.senderId = req.userInfo.id // this works!!!
      let shipPackage = await packagesService.create(packageData)
      res.send(shipPackage)
    } catch (error) {
      next(error)
    }
  }
}
