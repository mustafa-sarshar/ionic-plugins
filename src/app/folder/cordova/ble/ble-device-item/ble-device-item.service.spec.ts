import { TestBed } from "@angular/core/testing";

import { BleDeviceItemService } from "./ble-device-item.service";

describe("BleDeviceItemService", () => {
  let service: BleDeviceItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BleDeviceItemService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
