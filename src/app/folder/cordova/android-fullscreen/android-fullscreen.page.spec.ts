import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AndroidFullscreenPage } from "./android-fullscreen.page";

describe("AndroidFullscreenPage", () => {
  let component: AndroidFullscreenPage;
  let fixture: ComponentFixture<AndroidFullscreenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidFullscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
