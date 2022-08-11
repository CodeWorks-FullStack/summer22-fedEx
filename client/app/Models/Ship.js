import { getPackageForm } from "../Componets/PackageForm.js"

export class Ship {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.captain = data.captain
    // TODO look at the creator
    this.creatorInfo = data.creatorInfo
  }

  get ListTemplate() {
    return `<p class="p-1 selectable" onclick="app.shipsController.setActiveShip('${this.id}')">${this.name}</p>`
  }

  get ActiveShipTemplate() {

    return `
      <div>
        <h5>${this.name}</h5>
        <p>${this.captain}</p>

        <div>
          ${getPackageForm()}
        </div>

        <div id="ship-packages">
          finding the packages for this ship....
        </div>


      </div>
    `

  }
}
