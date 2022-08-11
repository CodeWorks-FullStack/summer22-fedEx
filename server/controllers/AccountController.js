import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { packagesService } from '../services/PackagesService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/my-sent-packages', this.getUserSentPackages)
      .get('/my-received-packages', this.getUserReceivedPackages)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }


  async getUserSentPackages(req, res, next) {
    try {
      let sentPackages = await packagesService.getUserSentPackages(req.userInfo.id)
      res.send(sentPackages)
    } catch (error) {
      next(error)
    }
  }

  async getUserReceivedPackages(req, res, next) {
    try {
      let receivedPackages = await packagesService.getUserReceivedPackages(req.userInfo.id)
      res.send(receivedPackages)
    } catch (error) {
      next(error)
    }
  }






}
