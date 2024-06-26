import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FolderPage } from "./folder.page";

const routes: Routes = [
  {
    path: "",
    component: FolderPage,
  },
  {
    path: "cordova",
    loadChildren: () => import("./cordova/cordova.module").then(m => m.CordovaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
