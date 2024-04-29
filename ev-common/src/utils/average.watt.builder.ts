import { Dayjs } from 'dayjs';
export class AverageWattBuilder {
  watt = 0;
  startTime: Dayjs;
  endTime: Dayjs;
  constructor() {}

  addProperty({
    watt,
    startTime,
    endTime,
  }: {
    watt: number;
    startTime: Dayjs;
    endTime: Dayjs;
  }) {
    this.watt = watt;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  getAverageWatt() {
    return (
      Math.round(
        (this.watt / (this.endTime.diff(this.startTime) / 1000)) * 100,
      ) / 100
    );
  }
}
