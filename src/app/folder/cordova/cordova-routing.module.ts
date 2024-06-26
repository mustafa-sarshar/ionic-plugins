import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CordovaPage } from "./cordova.page";

const routes: Routes = [
  {
    path: "",
    component: CordovaPage,
  },
  {
    path: "ble",
    loadChildren: () => import("./ble/ble.module").then(m => m.BlePageModule),
  },
  {
    path: "bluetooth-l-e",
    loadChildren: () =>
      import("./bluetooth-l-e/bluetooth-l-e.module").then(m => m.BluetoothLEPageModule),
  },
  {
    path: "android-fullscreen",
    loadChildren: () =>
      import("./android-fullscreen/android-fullscreen.module").then(
        m => m.AndroidFullscreenPageModule,
      ),
  },
  {
    path: "android-permissions",
    loadChildren: () =>
      import("./android-permissions/android-permissions.module").then(
        m => m.AndroidPermissionsPageModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CordovaPageRoutingModule {}
