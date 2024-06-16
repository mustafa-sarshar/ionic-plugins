import { Component } from "@angular/core";
import { Platform, ViewDidEnter, ViewDidLeave } from "@ionic/angular";
import { AndroidFullScreen } from "@awesome-cordova-plugins/android-full-screen/ngx";

import { UtilityService } from "../../../shared/services/utility/utility.service";

@Component({
  selector: "app-android-fullscreen",
  templateUrl: "./android-fullscreen.page.html",
  styleUrls: ["./android-fullscreen.page.scss"],
})
export class AndroidFullscreenPage implements ViewDidEnter, ViewDidLeave {
  public isPlatformAvailable: boolean = false;
  public isPluginEnabled: boolean = false;
  public isDisplayFullscreen: boolean = false;

  constructor(
    private readonly _platform: Platform,
    private readonly _utilityService: UtilityService,
    private readonly _fullscreen: AndroidFullScreen,
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

    this._fullscreen
      .isSupported()
      .then(() => {
        this.isPluginEnabled = true;
      })
      .catch((err: any) => {
        this.isPluginEnabled = false;
        this._utilityService.showToast(err, "bottom");
      });
  }

  public ionViewDidLeave() {}

  public onClickToggleFullscreen() {
    if (this.isPlatformAvailable && this.isPluginEnabled) {
      if (this.isDisplayFullscreen) {
        this._fullscreen
          .showSystemUI()
          .then(() => {
            this._fullscreen
              .showUnderStatusBar()
              .then(() => {
                this.isDisplayFullscreen = false;
              })
              .catch((err: any) => {
                this._utilityService.showToast(err, "bottom");
              });
          })
          .catch((err: any) => {
            this._utilityService.showToast(err, "bottom");
          });
      } else {
        this._fullscreen
          .immersiveMode()
          .then(() => {
            this.isDisplayFullscreen = true;
          })
          .catch((err: any) => {
            this._utilityService.showToast(err, "bottom");
          });
      }
    }
  }
}
