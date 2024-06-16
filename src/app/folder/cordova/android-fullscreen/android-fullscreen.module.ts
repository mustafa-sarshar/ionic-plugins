import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { AndroidFullScreen } from "@awesome-cordova-plugins/android-full-screen/ngx";

import { AndroidFullscreenPageRoutingModule } from "./android-fullscreen-routing.module";

import { AndroidFullscreenPage } from "./android-fullscreen.page";

@NgModule({
  declarations: [AndroidFullscreenPage],
  imports: [CommonModule, FormsModule, IonicModule, AndroidFullscreenPageRoutingModule],
  providers: [AndroidFullScreen],
})
export class AndroidFullscreenPageModule {}
