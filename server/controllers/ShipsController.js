import { Auth0Provider } from '@bcwdev/auth0provider'
import { packagesService } from '../services/PackagesService.js'
import { shipsService } from '../services/ShipsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class ShipsController extends BaseController {
  constructor() {
    super('api/ships')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .get('/:id/packages', this.getPackagesOnShip)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const query = req.query
      const ships = await shipsService.getAll(query)
      return res.send(ships)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const ship = await shipsService.getById(req.params.id)
      return res.send(ship)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }


  async getPackagesOnShip(req, res, next){
    try {
      let packages = await packagesService.getPackagesOnShip(req.params.id)
      res.send(packages)
    } catch (error) {
      next(error)
    }


  }


  async create(req, res, next) {
    try {
      // REVIEW you will need this for a checkpoint in two weeks!!!!
      // req.userInfo -> Auth0 is the req.bearerToken valid? 👍
      req.body.creatorId = req.userInfo.id // THIS IS SOOOOO IMPORTANT
      const ship = await shipsService.create(req.body)
      res.send(ship)
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const shipId = req.params.id
      const userId = req.userInfo.id // the user who is currently logged in
      await shipsService.remove(shipId, userId)
      return res.send('That ship has been decommissioned')
    } catch (error) {
      logger.log(error)
      next(error)
    }
  }
}
