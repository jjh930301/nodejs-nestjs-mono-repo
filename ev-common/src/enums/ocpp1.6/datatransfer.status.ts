export enum DataTransferStatus {
  Accepted = 'Accepted', // Identifier is allowed for charging.
  Rejected = 'Rejected', // Identifier has been blocked. Not allowed for charging.
  UnknownMessageId = 'UnknownMessageId', // Identifier has expired. Not allowed for charging.
  UnknwonVendor = 'UnknwonVendor', // Identifier is unknown. Not allowed for charging
}
