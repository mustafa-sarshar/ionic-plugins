import { Injectable } from "@angular/core";
import { ModalController, ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UtilityService {
  constructor(private readonly _toastCtrl: ToastController) {}

  public async showToast(
    message: string,
    position: "top" | "middle" | "bottom",
    duration: number = 1500,
  ) {
    try {
      const toast = await this._toastCtrl.create({ message, position, duration });

      await toast.present();
    } catch (err) {
      console.error(err);
    }
  }
}
