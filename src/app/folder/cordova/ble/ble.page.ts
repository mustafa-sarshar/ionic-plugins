import { Component } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { BLE } from "@awesome-cordova-plugins/ble/ngx";
import { Subscription } from "rxjs";

import { BleDevice } from "./ble-device.model";
import { UtilityService } from "../../../shared/services/utility/utility.service";

@Component({
  selector: "my-ble",
  templateUrl: "./ble.page.html",
  styleUrls: ["./ble.page.scss"],
})
export class BlePage implements ViewDidEnter, ViewDidLeave {
  public platformAvailable: boolean = false;
  public pluginEnabled: boolean = false;
  public scanning: boolean = false;
  public devicesFound: BleDevice[] = [];
  private _stateNotificationsSubscription?: Subscription;
  private _scansubscription?: Subscription;
  private _connectSubscription?: Subscription;

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

    this._ble
      .isEnabled()
      .then(() => {
        this.pluginEnabled = true;
      })
      .catch((err: any) => {
        this.pluginEnabled = false;
        this._utilityService.showToast(err, "bottom");
      });
  }

  public ionViewDidLeave() {
    this._unsubscribeSubscriptions();
  }

  public async onClickStartScan() {
    this.devicesFound.length = 0;
    await this._ble.stopScan();
    this.scanning = false;

    if (this.platformAvailable) {
      this.scanning = true;

      this._scansubscription = this._ble.startScan([]).subscribe((device: BleDevice) => {
        if (device) {
          this.devicesFound.push(device);

          this._utilityService.showToast(`Device found: ${device.name}`, "middle");
        }
      });
    } else {
      this.scanning = false;
      this._unsubscribeSubscriptions();

      this._utilityService.showToast("Platform not available", "bottom");
    }
  }

  public async onClickStopScan() {
    await this._ble.stopScan();
    this.scanning = false;
  }

  public onClickConnect(deviceId: string) {
    this._connectSubscription = this._ble.connect(deviceId).subscribe(() => {
      this._utilityService.showToast(`Connected to ${deviceId}`, "middle");
    });
  }

  private _unsubscribeSubscriptions() {
    this._scansubscription?.unsubscribe();
    this._connectSubscription?.unsubscribe();
  }
}
