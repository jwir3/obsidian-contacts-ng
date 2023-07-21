import { normalizePath, Notice, TFile, TFolder, Vault, Workspace } from "obsidian";
import { join } from "path";
import ContactsPlugin from "src/main";

export async function openFile(file: TFile, workspace: Workspace) {
  const leaf = workspace.getLeaf()
  await leaf.openFile(file, { active: true });
}

export function findContactFiles(contactsFolder: TFolder) {
  const contactFiles: TFile[] = [];
  Vault.recurseChildren(contactsFolder, async (contactNote) => {
    if (contactNote instanceof TFile) {
      contactFiles.push(contactNote);
    }
  });
  return contactFiles;
}

export function createContactFile(plugin: ContactsPlugin, folderPath: string, vault: Vault, workspace: Workspace) {
  const folder = vault.getAbstractFileByPath(folderPath)
  if (!folder) {
    new Notice(`Can not find path: '${folderPath}'. Please update "Contacts NextGen" plugin settings`);
    return;
  }

  vault.create(normalizePath(join(folderPath, `Contact ${findNextFileNumber(folderPath, vault)}.md`)), getNewFileContent(plugin))
    .then(createdFile => openFile(createdFile, workspace));
}

function findNextFileNumber(folderPath: string, vault: Vault) {
  const folder = vault.getAbstractFileByPath(
    normalizePath(folderPath)
  ) as TFolder;

  let nextNumber = 0;
  Vault.recurseChildren(folder, (contactNote) => {
    if (!(contactNote instanceof TFile)) {
      return;
    }
    const name = contactNote.basename;
    const regex = /Contact(?<number>\s\d+)*/g;
    for (const match of name.matchAll(regex)) {
      if (!match.groups || !match.groups.number) {
        if (nextNumber === 0) {
          nextNumber = 1;
        }
        continue;
      }
      const currentNumberString = match.groups.number.trim();
      if (currentNumberString != undefined && currentNumberString !== "") {
        const currentNumber = parseInt(currentNumberString);
        nextNumber = Math.max(nextNumber, (currentNumber + 1));
      }
    }
  });
  return nextNumber === 0 ? "" : nextNumber.toString();
}

function getNewFileContent(plugin: ContactsPlugin): string {
	return plugin.settings.template;
}
