import { Component } from "@angular/core";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  public appPages = [
    {
      pageCat: "awsome-cordova-plugins",
      pageChildren: [
        {
          title: "Android Fullscreen",
          url: "/folder/cordova/android-fullscreen",
          icon: "expand",
        },
        {
          title: "Android Permissions",
          url: "/folder/cordova/android-permissions",
          icon: "aperture",
        },
        { title: "BLE", url: "/folder/cordova/ble", icon: "bluetooth" },
        {
          title: "BluetoothLE",
          url: "/folder/cordova/bluetooth-l-e",
          icon: "bluetooth",
        },
        
      ],
    },
  ];

  constructor() {}
}
