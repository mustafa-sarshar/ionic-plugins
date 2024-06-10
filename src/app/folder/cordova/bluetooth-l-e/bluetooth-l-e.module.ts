import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { BluetoothLE } from "@awesome-cordova-plugins/bluetooth-le/ngx";

import { BluetoothLEPageRoutingModule } from "./bluetooth-l-e-routing.module";

import { BluetoothLEPage } from "./bluetooth-l-e.page";

@NgModule({
  declarations: [BluetoothLEPage],
  imports: [CommonModule, FormsModule, IonicModule, BluetoothLEPageRoutingModule],
  providers: [BluetoothLE],
})
export class BluetoothLEPageModule {}
