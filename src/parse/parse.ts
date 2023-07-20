import { TFile } from "obsidian";
import { Contact } from "./contact";
import { isContactFile as isContactFormatFile, parseContactData as parseContactFormatData } from "./custom_format_parser";
import { isContactFile as isFrontmatterFormatFile, parseContactData as parseFrontmatterFormatData } from "./front_matter_format_parser";
import { getLastContactDate } from './parse_utils';
import ContactsPlugin from '../main';

export async function parseContactFiles(files: TFile[], plugin: ContactsPlugin) {
	const vault = plugin.app.vault;
	const metadataCache = plugin.app.metadataCache;

  const contactsData: Contact[] = [];
  for (const file of files) {
    if (isFrontmatterFormatFile(file, metadataCache)) {
      const contact = await parseFrontmatterFormatData(file, metadataCache);
      if (!contact) {
        continue;
      }
      contactsData.push(contact);
    } else if (await isContactFormatFile(file, vault)) {
      const contact = await parseContactFormatData(file, plugin);
      if (!contact) {
        continue;
      }
      contactsData.push(contact);
    }
  }
  return contactsData;
}
