import { User } from "./user.model";

export interface Parent extends User {
	relationType: RELATION_TYPE;
}

export enum RELATION_TYPE {
	"FATHER" = "FATHER",
	"MOTHER" = "MOTHER",
	"GUARDIAN" = "GUARDIAN",
}
