import { ProxyState } from "../AppState.js";
import { shipsService } from "../Services/ShipsService.js";
import { Pop } from "../Utils/Pop.js";

function drawShips() {
  let template = ''
  ProxyState.ships.forEach(s => template += s.ListTemplate)

  // @ts-ignore
  document.getElementById('viewport').innerHTML = template
}


function drawActiveShip() {
  // @ts-ignore
  document.getElementById('viewport').innerHTML = ProxyState.activeShip.ActiveShipTemplate
}

function drawShipPackages() {

  let template = ''
  ProxyState.shipPackages.forEach(p => template += p.ShipPackageTemplate)

  // @ts-ignore
  document.getElementById('ship-packages').innerHTML = template
}


export class ShipsController {
  constructor() {

    ProxyState.on('ships', drawShips)
    ProxyState.on('activeShip', drawActiveShip)
    ProxyState.on('shipPackages', drawShipPackages)
    this.getShips()

  }

  async getShips() {
    try {
      await shipsService.getShips()
    } catch (error) {
      console.error('[GettingShips]', error)
      Pop.error(error)
    }
  }


  async setActiveShip(shipId) {
    try {
      await shipsService.setActiveShip(shipId)
    } catch (error) {
      console.error('[Setting Active Ship]', error)
      Pop.error(error)
    }
  }


}
