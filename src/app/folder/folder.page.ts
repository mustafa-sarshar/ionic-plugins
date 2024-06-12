import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuController, NavController } from "@ionic/angular";

@Component({
  selector: "my-folder",
  templateUrl: "./folder.page.html",
  styleUrls: ["./folder.page.scss"],
})
export class FolderPage implements OnInit {
  public pluginName: string = "";

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _navCtrl: NavController,
    private readonly _menuCtrl: MenuController,
  ) {}

  public ngOnInit() {
    this.pluginName = this._route.snapshot.paramMap.get("id") as string;
  }
}
