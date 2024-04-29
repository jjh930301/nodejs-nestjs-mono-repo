export enum AuthorizationStatus {
  Accepted = 'Accepted', // Identifier is allowed for charging.
  Blocked = 'Blocked', // Identifier has been blocked. Not allowed for charging.
  Expired = 'Expired', // Identifier has expired. Not allowed for charging.
  Invalid = 'Invalid', // Identifier is unknown. Not allowed for charging
  ConcurrentTx = 'ConcurrentTx', // Identifier is already involved in another transaction and multiple transactions are not allowed. (Only relevant for a StartTransaction.req.)
}
