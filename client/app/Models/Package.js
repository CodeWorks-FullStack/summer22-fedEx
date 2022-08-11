export class Package {
  constructor(data) {
    // TODO
    console.log(data)

    this.message = data.message || ''
    this.sender = data.sender || {}
    this.recipient = data.recipient || {}
    this.transportShip = data.transportShip || {}

  }

  get SenderTemplate() {
    return `
      <div>
        <p>Going To: <img src="${this.recipient.picture}" height="40" width="40" class="rounded-circle" alt=""></p>
      </div>
    `
  }

  get ReceivedTemplate() {
    return `
      <div>
        <p>Sent From: <img src="${this.sender.picture}" height="40" width="40" class="rounded-circle" alt=""></p>
      </div>
    `
  }

  get ShipPackageTemplate() {
    return `
      <div>
        <p>Sent: <img src="${this.sender.picture}" height="40" width="40" class="rounded-circle" alt=""> </p>
        <p>Recieve: <img src="${this.recipient.picture}" height="40" width="40" class="rounded-circle" alt=""></p>

      </div>
    `
  }
}
