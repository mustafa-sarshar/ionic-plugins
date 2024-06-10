import { Component, EventEmitter, Input, Output } from "@angular/core";

import { BleDevice } from "../ble-device.model";

@Component({
  selector: "my-ble-device-item",
  templateUrl: "./ble-device-item.component.html",
  styleUrls: ["./ble-device-item.component.scss"],
})
export class BleDeviceItemComponent {
  @Input({ required: true }) public device?: BleDevice;
  @Output("onClickConnect") onClickConnectEventEmitter = new EventEmitter<string>();

  constructor() {}

  public onClickConnect() {
    if (this.device) {
      this.onClickConnectEventEmitter.emit(this.device.id);
    }
  }
}
