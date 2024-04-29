export enum Measurand {
  'Current.Export' = 'Current.Export', // EV로 부터 순간 전류 흐름
  'Current.Import' = 'Current.Import', // EV로 순간 전류 흐름
  'Current.Offered' = 'Current.Offered', // EV로 제공된 최대 전류
  'Energy.Active.Export.Register' = 'Energy.Active.Export.Register', // EV로 보낸 에너지(Wh / kWh)
  'Energy.Active.Import.Register' = 'Energy.Active.Import.Register', // EV에서 유입된 에너지(Wh / kWh)
  'Energy.Reactive.Export.Register' = 'Energy.Reactive.Export.Register', // EV로 보낸 무효 에너지(varh / kvarh)
  'Energy.Reactive.Import.Register' = 'Energy.Reactive.Import.Register', // EV에서 유입된 무효 에너지(varh / kvarh)
  'Energy.Active.Export.Interval' = 'Energy.Active.Export.Interval', // EV로 보낸 에너지(Wh / kWh)
  'Energy.Active.Import.Interval' = 'Energy.Active.Import.Interval', // EV에서 유입된 에너지(Wh / kWh)
  'Energy.Reactive.Export.Interval' = 'Energy.Reactive.Export.Interval', // EV로 보낸 무효 에너지(varh / kvarh)
  'Energy.Reactive.Import.Interval' = 'Energy.Reactive.Import.Interval', // EV에서 유입된 무효 에너지(varh / kvarh)
  'Frequency' = 'Frequency', // 전력선에 흐르는 주파수의 순간 값
  'Power.Active.Export' = 'Power.Active.Export', // EV에서 내보낸 순시 유효 전력(varh or kvarh)
  'Power.Active.Import' = 'Power.Active.Import', // EV로 보낸 순시 유효 전력(varh or kvarh)
  'Power.Factor' = 'Power.Factor', // 총 에너지 흐름의 순시 역률
  'Power.Offered' = 'Power.Offered', // EV에 제공되는 최대전력
  'Power.Reactive.Export' = 'Power.Reactive.Export', // EV에서 유입된 순시 무효 전력(varh or kvarh)
  'Power.Reactive.Import' = 'Power.Reactive.Import', // EV로 보낸 순시 무효 전력(varh or kvarh)
  'RPM' = 'RPM', // FAN 속도
  'SoC' = 'SoC', // 충전중인 차량의 배터리 충전 상태(비율)
  'Temperature' = 'Temperature', // 충전 포인트의 내부 온도
  'Voltage' = 'Voltage', // 순간적인 AC RMS 공급 전압
}
