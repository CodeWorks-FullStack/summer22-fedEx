export function getPackageForm(){

  return `
    <form onsubmit="app.packagesController.createPackage()">
      <textarea type="text" name="message" required minlength="1" maxlength="10000" class="form-control"></textarea>
      <div class="my-2">
        <button class="btn btn-primary">Send Package</button>
      </div>
    </form>
  `


}
