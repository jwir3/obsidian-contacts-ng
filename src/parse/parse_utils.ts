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

	let sortedBacklinkDates;

	// @ts-expect-error
	let backlinks = metadataCache.getBacklinksForFile(contactFile);

	if (backlinks && backlinks.data) {
		let backlinkFiles = Object.keys(backlinks.data);
		let backlinkDates = backlinkFiles.map((x) => {
			let abstractFile = vault.getAbstractFileByPath(x);
			if (abstractFile instanceof TFile) {
				return abstractFile.stat.ctime;
			}
		});

		sortedBacklinkDates = backlinkDates.sort((a, b) => {
			if (!b) {
				b = new Date().getMilliseconds();
			}

			if (!a) {
				a = new Date().getMilliseconds();
			}

			return b - a;
		});
	}

	if (sortedBacklinkDates && sortedBacklinkDates.length > 0) {
		if (!sortedBacklinkDates[0]) {
			return new Date();
		}

		return new Date(sortedBacklinkDates[0]);
	}
}
