import { App, TFile, Vault } from "obsidian";
import { Contact } from "./contact";
import { getLastContactDate, parseDate } from "./parse_utils";
import ContactsPlugin from "../main";

export async function isContactFile(
  file: TFile, vault: Vault
): Promise<boolean> {
  const content = await vault.cachedRead(file);
  return (content.match(/\/---contact---\//g) || []).length === 2;
}

export async function parseContactData(file: TFile, plugin: ContactsPlugin): Promise<Contact | null> {
	const vault = app.vault;
  const fileContents = await vault.cachedRead(file);
  const regexpNames = /^\|(?<key>.+)\|(?<value>.+)\|(\s)*$/gm;
  const contactsDict: { [key: string]: string } = {};
  for (const match of fileContents.matchAll(regexpNames)) {
    if (!match.groups) {
      continue;
    }
    const key = match.groups.key.trim()
    const value = match.groups.value.trim()
    if (key === "" || value === "") {
      continue;
    }
    contactsDict[key] = value;
  }
	console.log(contactsDict['Last Contact']);

	let lastContact: Date|undefined = parseDate(contactsDict['Last Contact']);

	if (plugin.settings.autoUpdateLastContact) {
		lastContact = contactsDict['Last Contact'] != null ? parseDate(contactsDict['Last Contact']) : getLastContactDate(file, app);
	}

  return {
    firstName: contactsDict['First Name'],
    lastName: contactsDict['Last Name'],
    phone: contactsDict['Phone'],
		email: contactsDict['Email'],
    lastContact: lastContact,
    birthday: parseDate(contactsDict['Birthday']),
    file: file,
  }
}
