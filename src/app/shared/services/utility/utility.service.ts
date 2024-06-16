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

  public decodeBytes(data: any) {
    try {
      const textDecoder = new TextDecoder();
      return textDecoder.decode(data);
      // return Buffer.from(data).toString("utf8");   // in node.js
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public convertArrayBuffersToUnit8Array(data: ArrayBuffer[]) {
    // Calculate the total byte length of all the ArrayBuffer objects
    const totalByteLength = data.reduce((total, curr) => total + curr.byteLength, 0);

    // Create a new Uint8Array with the calculated total byte length
    const combinedData = new Uint8Array(totalByteLength);

    // Copy the contents of each ArrayBuffer into the Uint8Array
    let offset = 0;
    for (const buffer of data) {
      combinedData.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }

    return combinedData;
  }
}
