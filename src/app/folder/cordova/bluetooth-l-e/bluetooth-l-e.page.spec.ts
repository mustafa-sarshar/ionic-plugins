import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BluetoothLEPage } from "./bluetooth-l-e.page";

describe("BluetoothLEPage", () => {
  let component: BluetoothLEPage;
  let fixture: ComponentFixture<BluetoothLEPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BluetoothLEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
