import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AndroidPermissionsPage } from "./android-permissions.page";

const routes: Routes = [
  {
    path: "",
    component: AndroidPermissionsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AndroidPermissionsPageRoutingModule {}
