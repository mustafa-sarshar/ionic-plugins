import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { BleDeviceItemComponent } from "./ble-device-item.component";
import { BleDeviceItemService } from "./ble-device-item.service";

@NgModule({
  declarations: [BleDeviceItemComponent],
  imports: [CommonModule, IonicModule],
  providers: [BleDeviceItemService],
  exports: [BleDeviceItemComponent],
})
export class BleDeviceItemModule {}
