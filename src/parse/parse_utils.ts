import { App, TFile, MetadataCache, Vault } from 'obsidian';

export function parseDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parsedDate = value.match(/(\[\[)?(?<date>[0-9-]+)(\]\])?/)
  if (!parsedDate || !parsedDate.groups) {
    return undefined;
  }
  return new Date(parsedDate.groups['date']);
}

export function getLastContactDate(contactFile: TFile, app: App): Date | undefined {
	const vault = app.vault;
	const metadataCache: MetadataCache = app.metadataCache;

	if (!metadataCache) {
		return;
	}

	let metadata = metadataCache.getFileCache(contactFile);
	let sortedBacklinkDates;

	let backlinks = metadataCache.getBacklinksForFile(contactFile);

	if (backlinks && backlinks.data) {
		let backlinkFiles = Object.keys(backlinks.data);
		let backlinkDates = backlinkFiles.map((x) => {
			let backlinkAbstractFile = vault.getAbstractFileByPath(x) as TFile;
			if (backlinkAbstractFile) {
				return backlinkAbstractFile.stat.mtime;
			}
		});

		sortedBacklinkDates = backlinkDates.sort((a, b) => {
			return b - a;
		});
	}

	if (sortedBacklinkDates && sortedBacklinkDates.length > 0) {
		return new Date(sortedBacklinkDates[0]);
	}
}
