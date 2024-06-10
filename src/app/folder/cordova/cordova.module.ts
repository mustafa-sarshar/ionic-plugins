import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { CordovaPageRoutingModule } from "./cordova-routing.module";
import { CordovaPage } from "./cordova.page";

@NgModule({
  declarations: [CordovaPage],
  imports: [CommonModule, FormsModule, IonicModule, CordovaPageRoutingModule],
})
export class CordovaPageModule {}
