import { Component } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import {
  AndroidPermissionResponse,
  AndroidPermissions,
} from "@awesome-cordova-plugins/android-permissions/ngx";

import { AndroidPermission } from "./android-permission.enum";
import { UtilityService } from "../../../shared/services/utility/utility.service";

@Component({
  selector: "app-android-permissions",
  templateUrl: "./android-permissions.page.html",
  styleUrls: ["./android-permissions.page.scss"],
})
export class AndroidPermissionsPage implements ViewDidEnter, ViewDidLeave {
  public isPlatformAvailable: boolean = false;
  public isDisplayFullscreen: boolean = false;
  public permissionToRequest?: string;
  public androidPermission = AndroidPermission;

  constructor(
    private readonly _platform: Platform,
    private readonly _utilityService: UtilityService,
    private readonly _permissions: AndroidPermissions,
  ) {}

  public ionViewDidEnter() {
    this._platform
      .ready()
      .then(() => {
        this.isPlatformAvailable = true;
      })
      .catch((err: any) => {
        this.isPlatformAvailable = false;
        this._utilityService.showToast(err, "bottom");
      });
  }

  public ionViewDidLeave() {}

  public handleChangePermission(selection: CustomEvent) {
    this.permissionToRequest = selection.detail.value;
  }

  public onClickRequestPermission() {
    if (this.permissionToRequest) {
      this._permissions
        .requestPermission(this.permissionToRequest)
        .then((res: AndroidPermissionResponse) => {
          console.log(res);
        })
        .catch((err: any) => {
          this._utilityService.showToast(err, "bottom");
        });
    }
  }
}
