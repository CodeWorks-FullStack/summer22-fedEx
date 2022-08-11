import { ProxyState } from "../AppState.js";
import { packagesService } from "../Services/PackagesService.js";
import { Pop } from "../Utils/Pop.js";

function drawSentPackages() {

  let template = ''
  ProxyState.sentPackages.forEach(p => template += p.SenderTemplate)
  // @ts-ignore
  document.getElementById('sent-packages').innerHTML = template
}

function drawReceivedPackages() {
  let template = ''
  ProxyState.receivedPackages.forEach(p => template += p.ReceivedTemplate)
  // @ts-ignore
  document.getElementById('received-packages').innerHTML = template
}

export class PackagesController {
  constructor() {
    ProxyState.on('sentPackages', drawSentPackages)
    ProxyState.on('receivedPackages', drawReceivedPackages)

    // this.getPackages() we dont have a user yet....
  }

  async createPackage() {
    try {
      // @ts-ignore
      event.preventDefault()
      // @ts-ignore
      const form = event.target

      const packageData = {
        // @ts-ignore
        message: form.message.value,
        shipId: ProxyState.activeShip.id, // TODO where do I get this from?
        recipientId: '62f405b652f3ab7c35a6eb5b'
      }

      packagesService.sendPackage(packageData)
    } catch (error) {
      console.error('[Creating Package]', error)
      Pop.error(error)
    }
  }
}
