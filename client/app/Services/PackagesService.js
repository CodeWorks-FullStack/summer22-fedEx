import { ProxyState } from "../AppState.js"
import { Package } from "../Models/Package.js"
import { api } from "./AxiosService.js"
import { shipsService } from "./ShipsService.js"

class PackagesService {

  async sendPackage(packageData) {
    await api.post('/api/packages', packageData)
    await this.getSentPackages()
    await shipsService.setActiveShip(packageData.shipId)
  }

  // get packages? which ones?
  async getSentPackages() {
    let res = await api.get('account/my-sent-packages')
    ProxyState.sentPackages = res.data.map(p => new Package(p))
  }

  async getReceivedPackages() {
    let res = await api.get('account/my-received-packages')
    ProxyState.receivedPackages = res.data.map(p => new Package(p))
  }

}

export const packagesService = new PackagesService()
