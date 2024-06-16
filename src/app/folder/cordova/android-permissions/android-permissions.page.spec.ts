import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AndroidPermissionsPage } from "./android-permissions.page";

describe("AndroidPermissionsPage", () => {
  let component: AndroidPermissionsPage;
  let fixture: ComponentFixture<AndroidPermissionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPermissionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
