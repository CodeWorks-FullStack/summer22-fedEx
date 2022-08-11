import { ProxyState } from "../AppState.js"
import { Package } from "../Models/Package.js"
import { Ship } from "../Models/Ship.js"
import { api } from "./AxiosService.js"

class ShipsService {

  async setActiveShip(shipId) {
    let res = await api.get(`/api/ships/${shipId}`)
    ProxyState.activeShip = new Ship(res.data)
    // TODO get shipPackages
    await this.getShipPackages(shipId)

  }

  async getShipPackages(shipId) {
    let res = await api.get(`/api/ships/${shipId}/packages`)
    ProxyState.shipPackages = res.data.map(p => new Package(p))
  }


  async getShips() {
    let res = await api.get('/api/ships')
    // how do I know when I need to use .map???
    ProxyState.ships = res.data.map(s => new Ship(s))
  }

}

export const shipsService = new ShipsService()
