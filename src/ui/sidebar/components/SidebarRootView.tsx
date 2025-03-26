import { normalizePath, TFile, TFolder } from "obsidian";
import * as React from "react";
import { useApp } from "src/context/hooks";
import { createContactFile, findContactFiles } from "src/file/file";
import ContactsPlugin from "src/main";
import { Contact } from "src/parse/contact";
import { parseContactFiles } from "src/parse/parse";
import { Sort } from "src/util/constants";
import { ContactsListView } from "./ContactsListView";
import { HeaderView } from "./HeaderView";

type RootProps = {
	plugin: ContactsPlugin;
};

export const SidebarRootView = (props: RootProps) => {
	const { vault, metadataCache, workspace } = useApp();
	const [contacts, setContacts] = React.useState<Contact[]>([]);
	const [sort, setSort] = React.useState<Sort>(Sort.LAST_CONTACT);
	const folder = props.plugin.settings.contactsFolder;

	React.useEffect(() => {
		const abstractContactsFolder = vault.getAbstractFileByPath(normalizePath(folder));
		let contactsFolder: TFolder;
		if (abstractContactsFolder instanceof TFolder) {
			contactsFolder = abstractContactsFolder;
			const contactFiles: TFile[] = findContactFiles(contactsFolder);
			parseContactFiles(contactFiles, props.plugin).then((contactsData) => setContacts(contactsData)
		);

		} else {
			setContacts([]);
		}
	}, []);

	return (
		<div>
			<HeaderView
				onSortChange={setSort}
				onCreateContact={() =>
					createContactFile(
						props.plugin,
						folder,
						vault,
						workspace
					)
				}
				sort={sort}
			/>
			<ContactsListView contacts={contacts} sort={sort} />
		</div>
	);
};
