import { Address } from "./address.model";
import { User } from "./user.model";

export interface Admin extends User {
	_id?: string;
	firstname?:string;
	lastName:string;
	address: Address;

}
