import { Component } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { BLE } from "@awesome-cordova-plugins/ble/ngx";
import { Subscription } from "rxjs";

import { BleDevice } from "./ble-device.model";
import { UtilityService } from "../../../shared/services/utility/utility.service";

@Component({
  selector: "app-ble",
  templateUrl: "./ble.page.html",
  styleUrls: ["./ble.page.scss"],
})
export class BlePage implements ViewDidEnter, ViewDidLeave {
  public platformAvailable: boolean = false;
  public devicesFound: BleDevice[] = [];
  private _scansubscription?: Subscription;

  constructor(
    private readonly _platform: Platform,
    private readonly _utilityService: UtilityService,
    private readonly _ble: BLE,
  ) {}

  public ionViewDidEnter() {
    this._platform
      .ready()
      .then(() => {
        this.platformAvailable = true;
      })
      .catch((err: any) => {
        this.platformAvailable = false;
        this._utilityService.showToast(err, "bottom");
      });
  }

  public ionViewDidLeave() {
    this._unsubscribeSubscriptions();
  }

  public onClickScan() {
    if (this.platformAvailable) {
      this._scansubscription = this._ble.scan([], 5).subscribe({
        next: (device: BleDevice) => {
          this.devicesFound.push(device);
          this._utilityService.showToast(`Device found: ${device.name}`, "middle");
        },
        error: (err: any) => {
          this._utilityService.showToast(err, "bottom");
          this._unsubscribeSubscriptions();
        },
      });
    } else {
      this._utilityService.showToast("Platform not available", "bottom");
    }
  }

  private _unsubscribeSubscriptions() {
    this._scansubscription?.unsubscribe();
  }
}
