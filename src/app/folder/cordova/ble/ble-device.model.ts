export class BleDevice {
  constructor(
    public id: string,
    public name?: string,
    public connectable?: boolean,
    public advertising?: any,
    public rssi?: number,
  ) {}
}
