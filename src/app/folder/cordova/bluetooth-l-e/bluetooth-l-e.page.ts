import { Component } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import {
  BluetoothLE,
  InitParams,
  ScanParams,
  ScanStatus,
} from "@awesome-cordova-plugins/bluetooth-le/ngx";
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
    private readonly _bluetoothLE: BluetoothLE,
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

    this._bluetoothLE
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
    await this._bluetoothLE.stopScan();
    this.scanning = false;

    if (this.platformAvailable) {
      const initParams: InitParams = {
        "request": true,
        "statusReceiver": true,
        "restoreKey": "bluetoothleplugin",
      };
      this._bluetoothLE.initialize(initParams).subscribe(({ status }) => {
        this._utilityService.showToast(status, "middle");
      });

      // this.scanning = true;

      // const scanParams: ScanParams = { allowDuplicates: false };
      // this._scansubscription = this._bluetoothLE
      //   .startScan(scanParams)
      //   .subscribe((scanStatus: ScanStatus) => {
      //     if (scanStatus) {
      //       this.devicesFound.push(scanStatus);

      //       this._utilityService.showToast(`Device found: ${scanStatus.name}`, "middle");
      //     }
      //   });
    } else {
      this.scanning = false;
      this._unsubscribeSubscriptions();

      this._utilityService.showToast("Platform not available", "bottom");
    }
  }

  public async onClickStopScan() {
    await this._bluetoothLE.stopScan();
    this.scanning = false;
  }

  public onClickConnect(deviceId: string) {
    // this._connectSubscription = this._bluetoothLE.connect(deviceId).subscribe(() => {
    //   this._utilityService.showToast(`Connected to ${deviceId}`, "middle");
    // });
  }

  private _unsubscribeSubscriptions() {
    this._scansubscription?.unsubscribe();
    this._connectSubscription?.unsubscribe();
  }
}
