import { TFile } from "obsidian";

export type Contact = {
  firstName: string;
  lastName: string;
  phone: string;
	email: string;
  file: TFile;
  lastContact?: Date;
  birthday?: Date;
}
