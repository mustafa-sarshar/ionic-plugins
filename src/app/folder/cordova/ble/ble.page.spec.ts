import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BlePage } from "./ble.page";

describe("BlePage", () => {
  let component: BlePage;
  let fixture: ComponentFixture<BlePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
