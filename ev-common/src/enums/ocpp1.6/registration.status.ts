export enum RegistrationStatus {
  Accepted = 'Accepted', // Charge point is accepted by Central System.
  Pending = 'Pending', // Central System is not yet ready to accept the Charge Point. Central System may send messages to retrieve information or prepare the Charge Point.
  Rejected = 'Rejected', // Charge point is not accepted by Central System. This may happen when the Charge Point id is not known by Central System.
}
