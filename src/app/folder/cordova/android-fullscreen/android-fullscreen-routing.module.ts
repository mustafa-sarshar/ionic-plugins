import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AndroidFullscreenPage } from "./android-fullscreen.page";

const routes: Routes = [
  {
    path: "",
    component: AndroidFullscreenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AndroidFullscreenPageRoutingModule {}
