import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { BLE } from "@awesome-cordova-plugins/ble/ngx";
import { Subscription } from "rxjs";

import { BleDevice, BleDeviceCharacteristic } from "./ble-device.model";
import { UtilityService } from "../../../shared/services/utility/utility.service";

@Component({
  selector: "my-ble",
  templateUrl: "./ble.page.html",
  styleUrls: ["./ble.page.scss"],
})
export class BlePage implements ViewDidEnter, ViewDidLeave, OnDestroy {
  public isPlatformAvailable: boolean = false;
  public isPluginEnabled: boolean = false;
  public isScanningDevices: boolean = false;
  public isReadingData: boolean = false;
  public dataRead_1: string[] = [];
  public dataRead_2: string[] = [];
  public dataRead_3: string[] = [];
  public dataRead_4: string[] = [];
  public dataRead_5: string[] = [];
  public devicesFound: BleDevice[] = [];
  public deviceConnected?: BleDevice;

  private _scanDuration: number = 5;
  private _TARGET_BLE_SERVER_ID: string = "C8:C9:A3:CB:9C:E6";
  private _TARGET_BLE_SERVICE_UUID: string = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  private _TARGET_BLE_CHARACTERISTIC_UUID: string = "beb5483e-36e1-4688-b7f5-ea07361b26a8";
  private _TARGET_BLE_MTU_SIZE: number = 517; // Max Value can be 517
  private _scanSubscription?: Subscription;
  private _connectSubscription?: Subscription;
  private _notificationSubscription?: Subscription;

  constructor(
    private readonly _platform: Platform,
    private readonly _changeDetectorRef: ChangeDetectorRef,
    private readonly _utilityService: UtilityService,
    private readonly _ble: BLE,
  ) {}

  public ionViewDidEnter() {
    this._platform
      .ready()
      .then(() => {
        this.isPlatformAvailable = true;
      })
      .catch((err: any) => {
        this.isPlatformAvailable = false;
        this._utilityService.showToast(err, "bottom");
      });

    this._ble
      .isEnabled()
      .then(() => {
        this.isPluginEnabled = true;
      })
      .catch((err: any) => {
        this.isPluginEnabled = false;
        this._utilityService.showToast(err, "bottom");
      });
  }

  public ionViewDidLeave() {
    this._unsubscribeSubscriptions();
    this._disconnectDevice();
  }

  public ngOnDestroy() {
    this._unsubscribeSubscriptions();
    this._disconnectDevice();
  }

  public async onClickStartScan() {
    this._unsubscribeSubscriptions("SCAN");
    this._disconnectDevice();
    this.devicesFound.length = 0;
    await this._ble.stopScan();
    this.isScanningDevices = false;
    this._changeDetectorRef.detectChanges();

    if (this.isPlatformAvailable) {
      this.isScanningDevices = true;

      this._scanSubscription = this._ble.startScan([]).subscribe((device: BleDevice) => {
        if (device) {
          this.devicesFound.push(device);
          this._changeDetectorRef.detectChanges();

          this._utilityService.showToast(`Device found: ${device.name}`, "middle");
        }
      });
    } else {
      this.isScanningDevices = false;
      this._unsubscribeSubscriptions();

      this._utilityService.showToast("Platform not available", "bottom");
    }
  }

  public async onClickStopScan() {
    await this._ble.stopScan();
    this.isScanningDevices = false;
    this.deviceConnected = undefined;
    this._unsubscribeSubscriptions("SCAN");
    this._changeDetectorRef.detectChanges();
  }

  public async onClickConnect(deviceId: string) {
    this.onClickStopScan();
    this._unsubscribeSubscriptions("CONNECT");

    this._connectSubscription = this._ble.connect(deviceId).subscribe(async (device: BleDevice) => {
      this._utilityService.showToast(
        `Connected to ${device.name ? device.name : device.id}`,
        "middle",
      );
      this.deviceConnected = device;
      this._changeDetectorRef.detectChanges();
      console.log("Connected to");
      console.log(this.deviceConnected);

      await this._requestMtu(device.id);
    });
  }

  public async onClickDisconnect() {
    await this._disconnectDevice();
    await this._stopNotification();
    this._unsubscribeSubscriptions();
  }

  public async onClickReadData() {
    // await this._readDataFromDevice();
    this._startNotification();
  }

  public async onClickStopData() {
    await this._stopNotification();
  }

  private async _requestMtu(deviceId: string) {
    try {
      const res = await this._ble.requestMtu(deviceId, this._TARGET_BLE_MTU_SIZE);
      return res;
    } catch (err: any) {
      return err;
    }
  }

  private _startNotification() {
    this._unsubscribeSubscriptions("NOTIFICATION");
    this.dataRead_1.length = 0;
    this.dataRead_2.length = 0;
    this.dataRead_3.length = 0;
    this.dataRead_4.length = 0;
    this.dataRead_5.length = 0;
    this._changeDetectorRef.detectChanges();

    if (
      this.deviceConnected &&
      this.deviceConnected.services &&
      this.deviceConnected.characteristics
    ) {
      const targetServerIdFound = this.deviceConnected.id === this._TARGET_BLE_SERVER_ID;
      const targetServiceUuidFound = this.deviceConnected.services.includes(
        this._TARGET_BLE_SERVICE_UUID,
      );
      const targetCharacteristicUuidFound = this.deviceConnected.characteristics.find(
        (char: BleDeviceCharacteristic) =>
          char.characteristic === this._TARGET_BLE_CHARACTERISTIC_UUID,
      );
      if (targetServerIdFound && targetServiceUuidFound && targetCharacteristicUuidFound) {
        this.isReadingData = true;
        this._notificationSubscription = this._ble
          .startNotification(
            this._TARGET_BLE_SERVER_ID,
            this._TARGET_BLE_SERVICE_UUID,
            this._TARGET_BLE_CHARACTERISTIC_UUID,
          )
          .subscribe((data: ArrayBuffer[]) => {
            const dataDecoded = this._utilityService.decodeBytes(data[0]);
            if (dataDecoded) {
              const dataDecodedSplit = dataDecoded.split("|")[0].split(";");
              switch (dataDecodedSplit[0]) {
                case "1":
                  this.dataRead_1 = dataDecodedSplit.slice();
                  break;
                case "2":
                  this.dataRead_2 = dataDecodedSplit.slice();
                  break;
                case "3":
                  this.dataRead_3 = dataDecodedSplit.slice();
                  break;
                case "4":
                  this.dataRead_4 = dataDecodedSplit.slice();
                  break;
                case "5":
                  this.dataRead_5 = dataDecodedSplit.slice();
                  break;
                default:
                  break;
              }
              this._changeDetectorRef.detectChanges();
            }
          });
      } else {
        this._utilityService.showToast("Device not found", "bottom");
      }
    } else {
      this._utilityService.showToast("Something went wrong!", "bottom");
    }
  }

  private async _stopNotification() {
    try {
      await this._ble.stopNotification(
        this._TARGET_BLE_SERVER_ID,
        this._TARGET_BLE_SERVICE_UUID,
        this._TARGET_BLE_CHARACTERISTIC_UUID,
      );
      this._unsubscribeSubscriptions("NOTIFICATION");
      this.isReadingData = false;
    } catch (err: any) {
      this._utilityService.showToast(err.errorMessage, "bottom");
      console.error(err);
    }

    this._changeDetectorRef.detectChanges();
  }

  private async _readDataFromDevice() {
    if (
      this.deviceConnected &&
      this.deviceConnected.services &&
      this.deviceConnected.characteristics
    ) {
      try {
        const targetServerIdFound = this.deviceConnected.id === this._TARGET_BLE_SERVER_ID;
        const targetServiceUuidFound = this.deviceConnected.services.includes(
          this._TARGET_BLE_SERVICE_UUID,
        );
        const targetCharacteristicUuidFound = this.deviceConnected.characteristics.find(
          (char: BleDeviceCharacteristic) =>
            char.characteristic === this._TARGET_BLE_CHARACTERISTIC_UUID,
        );
        if (targetServerIdFound && targetServiceUuidFound && targetCharacteristicUuidFound) {
          const dataRead = await this._ble.read(
            this._TARGET_BLE_SERVER_ID,
            this._TARGET_BLE_SERVICE_UUID,
            this._TARGET_BLE_CHARACTERISTIC_UUID,
          );
          const dataReadDecoded = this._utilityService.decodeBytes(dataRead);
          console.log(dataReadDecoded);
        } else {
          this._utilityService.showToast("Something went wrong!", "bottom");
        }
      } catch (err: any) {
        this._utilityService.showToast(err.errorMessage, "bottom");
        console.error(err);
      }
    } else {
      this._utilityService.showToast("No device connected yet!", "bottom");
    }
  }

  private _unsubscribeSubscriptions(subscriptionId?: "SCAN" | "CONNECT" | "NOTIFICATION") {
    if (subscriptionId) {
      switch (subscriptionId) {
        case "SCAN":
          this._scanSubscription?.unsubscribe();
          break;
        case "CONNECT":
          this._connectSubscription?.unsubscribe();
          break;
        case "NOTIFICATION":
          this._notificationSubscription?.unsubscribe();
          break;
        default:
          break;
      }
    } else {
      this._scanSubscription?.unsubscribe();
      this._connectSubscription?.unsubscribe();
      this._notificationSubscription?.unsubscribe();
    }
  }

  private async _disconnectDevice() {
    if (this.deviceConnected) {
      this._ble
        .isConnected(this.deviceConnected.id)
        .then(
          () => {
            if (this.deviceConnected) {
              this._ble.disconnect(this.deviceConnected.id).then(() => {
                if (this.deviceConnected) {
                  this._utilityService.showToast(
                    `Disconnected from ${this.deviceConnected.name ? this.deviceConnected.name : this.deviceConnected.id}`,
                    "middle",
                  );
                }
              });
            }
          },
          () => {},
        )
        .catch((err: any) => {
          console.error(err);
          this._utilityService.showToast(err.message, "bottom");
        })
        .finally(() => {
          console.log("FINALLY");
          this.deviceConnected = undefined;
          this._changeDetectorRef.detectChanges();
        });
    }
  }
}
