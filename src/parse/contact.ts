import { TFile } from "obsidian";

export type Contact = {
  firstName: string;
  lastName: string;
  phone: string;
	email?: string;
	linkedIn?: string;
  file: TFile;
  lastContact?: Date;
  birthday?: Date;
	friends?: string;
	tags?: string;
}
