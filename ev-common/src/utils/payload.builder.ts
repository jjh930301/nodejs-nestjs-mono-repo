import { MessageName } from '../constants/constant';
interface Target {
  idTag?: string;
  connectorNumber?: number;
  key?: string | string[];
  value?: string;
  location?: string;
  retrieveDate?: string;
  retries?: number;
  retriesInterval?: number;
  transactionId?: string;
  type?: string;
  code?: string;
}

interface Detail {
  connectorNumber?: number;
}

interface Body {
  targets: Target[];
  type?: string;
}
export type Action = (typeof MessageName)[keyof typeof MessageName];
export class PayloadBuilder {
  action: Action;
  body: Body;
  index: number;
  payload: unknown;
  detail: Detail;

  constructor(actionName: Action, body: Body, index: number, detail: Detail) {
    this.action = actionName;
    this.body = body;
    this.index = index ? index : 0;
    this.detail = detail;
  }

  build() {
    switch (this.action) {
      case MessageName.RemoteStartTransaction:
        this.payload = {
          idTag: this.body.targets[this.index].idTag,
          connectorNumber: this.body.targets[this.index].connectorNumber,
        };

        break;
      case MessageName.ChangeConfiguration:
        this.payload = {
          key: this.body.targets[this.index].key,
          value: this.body.targets[this.index].value,
        };
        break;
      case MessageName.GetConfiguration:
        this.payload = this.body.targets[this.index].key
          ? { key: this.body.targets[this.index].key }
          : {};
        break;
      case MessageName.ClearCache:
        this.payload = {};
        break;
      case MessageName.UnlockConnector:
        this.payload = { connectorNumber: this.detail.connectorNumber };
        break;
      case MessageName.UpdateFirmware:
        this.payload = {
          location: this.body.targets[this.index].location,
          retrieveDate: this.body.targets[this.index].retrieveDate,
          retries: this.body.targets[this.index].retries ?? 0,
          retryInterval: this.body.targets[this.index].retriesInterval ?? 0,
        };
        break;
      case MessageName.RemoteStopTransaction:
        this.payload = {
          transactionId: this.body.targets[this.index].transactionId,
        };
        break;
      case MessageName.Reset:
        this.payload = {
          connectorNumber: 0,
          type: this.body.targets[this.index].type,
        };
        break;
      case MessageName.ChangeAvailability:
        this.payload = {
          connectorNumber: this.body.targets[this.index].connectorNumber,
          type: this.body.type,
        };
        break;
    }

    return this.payload;
  }
}
