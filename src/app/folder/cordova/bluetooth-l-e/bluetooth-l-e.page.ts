import { Component } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { BluetoothLE } from "@awesome-cordova-plugins/bluetooth-le/ngx";
import { Subscription } from "rxjs";

import { UtilityService } from "../../../shared/services/utility/utility.service";

@Component({
  selector: "my-bluetooth-l-e",
  templateUrl: "./bluetooth-l-e.page.html",
  styleUrls: ["./bluetooth-l-e.page.scss"],
})
export class BluetoothLEPage implements ViewDidEnter, ViewDidLeave {
  public platformAvailable: boolean = false;
  public pluginEnabled: boolean = false;
  public scanning: boolean = false;
  public devicesFound: any[] = [];
  private _scansubscription?: Subscription;
  private _connectSubscription?: Subscription;

  constructor(
    private readonly _platform: Platform,
    private readonly _utilityService: UtilityService,
    private readonly _bleutoothLE: BluetoothLE,
  ) {}

  public ionViewDidEnter(): void {
    this._platform
      .ready()
      .then(() => {
        this.platformAvailable = true;
      })
      .catch((err: any) => {
        this.platformAvailable = false;
        this._utilityService.showToast(err, "bottom");
      });

    this._bleutoothLE
      .isEnabled()
      .then(({ isEnabled }) => {
        this.pluginEnabled = isEnabled;
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
    await this._bleutoothLE.stopScan();
    this.scanning = false;

    if (this.platformAvailable) {
      this.scanning = true;

      // this._scansubscription = this._bleutoothLE.startScan([]).subscribe((device: any) => {
      //   if (device) {
      //     this.devicesFound.push(device);

      //     this._utilityService.showToast(`Device found: ${device.name}`, "middle");
      //   }
      // });
    } else {
      this.scanning = false;
      this._unsubscribeSubscriptions();

      this._utilityService.showToast("Platform not available", "bottom");
    }
  }

  public async onClickStopScan() {
    await this._bleutoothLE.stopScan();
    this.scanning = false;
  }

  public onClickConnect(deviceId: string) {
    // this._connectSubscription = this._bleutoothLE.connect(deviceId).subscribe(() => {
    //   this._utilityService.showToast(`Connected to ${deviceId}`, "middle");
    // });
  }

  private _unsubscribeSubscriptions() {
    this._scansubscription?.unsubscribe();
    this._connectSubscription?.unsubscribe();
  }
}
