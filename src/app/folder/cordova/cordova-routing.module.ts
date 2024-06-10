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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CordovaPageRoutingModule {}
