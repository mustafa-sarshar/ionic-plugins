export class BleDevice {
  constructor(
    public id: string,
    public name?: string,
    public connectable?: boolean,
    public rssi?: number,
    public advertising?: any,
    public services?: string[],
    public characteristics?: BleDeviceCharacteristic[],
  ) {}
}

export class BleDeviceCharacteristic {
  constructor(
    public characteristic: string,
    public properties: BleDeviceProperty[],
    service?: string,
    public descriptors?: BleDeviceDescriptor[],
  ) {}
}

export class BleDeviceDescriptor {
  constructor(public uuid?: string) {}
}

export type BleDeviceProperty = "Read" | "Write" | "Notify" | "Indicate" | any;
