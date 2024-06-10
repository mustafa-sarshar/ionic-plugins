import { Component, Input } from "@angular/core";

import { BleDevice } from "../ble-device.model";

@Component({
  selector: "my-ble-device-item",
  templateUrl: "./ble-device-item.component.html",
  styleUrls: ["./ble-device-item.component.scss"],
})
export class BleDeviceItemComponent {
  @Input({ required: true }) device?: BleDevice;

  constructor() {}

  public onClickConnect() {
    if (this.device) {
      console.log(this.device);
    }
  }
}
