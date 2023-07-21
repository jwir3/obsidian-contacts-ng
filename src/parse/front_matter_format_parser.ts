import { MetadataCache, TFile } from "obsidian";
import { Contact } from "./contact";
import { parseDate } from "./parse_utils";

export function isContactFile(
  file: TFile, metadataCache: MetadataCache
): boolean {
  const type = metadataCache.getFileCache(file)?.frontmatter?.type;
  return type == 'contact';
}

export async function parseContactData(file: TFile, metadataCache: MetadataCache): Promise<Contact | null> {
  const frontmatter = metadataCache.getFileCache(file)?.frontmatter;
  if (frontmatter == null) {
    return null;
  }

  return {
    firstName: frontmatter['name']['first'],
    lastName: frontmatter['name']['last'],
    phone: frontmatter['phone'],
		email: frontmatter['email'],
		linkedIn: frontmatter['linkedin'],
    lastContact: parseDate(frontmatter['last_contact']),
    birthday: parseDate(frontmatter['birthday']),
		friends: frontmatter['friends'],
		tags: frontmatter['tags'],
    file: file,
  }
}
