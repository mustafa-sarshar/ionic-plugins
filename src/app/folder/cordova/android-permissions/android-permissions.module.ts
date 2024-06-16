import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";

import { AndroidPermissionsPageRoutingModule } from "./android-permissions-routing.module";

import { AndroidPermissionsPage } from "./android-permissions.page";

@NgModule({
  declarations: [AndroidPermissionsPage],
  imports: [CommonModule, FormsModule, IonicModule, AndroidPermissionsPageRoutingModule],
  providers: [AndroidPermissions],
})
export class AndroidPermissionsPageModule {}
