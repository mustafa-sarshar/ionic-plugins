import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BLE } from "@awesome-cordova-plugins/ble/ngx";

import { BlePageRoutingModule } from "./ble-routing.module";
import { BlePage } from "./ble.page";
import { BleService } from "./ble.service";
import { BleDeviceItemModule } from "./ble-device-item/ble-device-item.module";

@NgModule({
  declarations: [BlePage],
  imports: [CommonModule, FormsModule, IonicModule, BlePageRoutingModule, BleDeviceItemModule],
  providers: [BleService, BLE],
})
export class BlePageModule {}
