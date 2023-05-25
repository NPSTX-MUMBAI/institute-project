// export class AddressDetails {
//   PostOffice!: string[];
//   COUNTRY!: string;
//   STATE!: string;
//   DISTRICT!: string;
// }
export class AddressDetails {
  Message!: string;
  Status!: string;
  PostOffice!: PostOffice[];
}
export class PostOffice {
  Region!: string;
  State!: string;
  Country!: string;
}
