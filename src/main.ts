import { Plugin, Workspace, MarkdownView, MarkdownRenderChild, MetadataCache, MarkdownPostProcessorContext, TFile } from 'obsidian';
import { ContactsView } from "src/ui/sidebar/sidebarView";
import { CONTACTS_VIEW_CONFIG } from "src/util/constants";
import { ContactsPluginSettings, ContactsSettingTab, DEFAULT_SETTINGS } from './settings/settings';
import { ContactTableView } from './ui/sidebar/components/ContactTableView';
import { parseContactData } from './parse/front_matter_format_parser';
import { Contact } from './parse/contact';


export default class ContactsPlugin extends Plugin {
	settings: ContactsPluginSettings;

	async onload() {
		await this.loadSettings();
		this.registerView(
			CONTACTS_VIEW_CONFIG.type,
			(leaf) => new ContactsView(leaf, this)
		);

		this.addRibbonIcon('contact', 'Contacts', () => {
			this.activateSidebarView();
		});

		this.addSettingTab(new ContactsSettingTab(this.app, this));

		this.registerMarkdownPostProcessor((element, context) => {
			if (context.frontmatter && context.frontmatter.type == 'contact') {
				let contactFile: TFile = this.app.vault.getAbstractFileByPath(context.sourcePath) as TFile;
				let frontmatterContainers = element.getElementsByClassName('frontmatter-container');
				if (frontmatterContainers && frontmatterContainers.length > 0) {
					let contactProm: Promise<Contact | null> = parseContactData(contactFile, this.app.metadataCache);
					contactProm.then((value: Contact | null) => {
						if (value != null) {
							let fmcLength = frontmatterContainers.length;
							let lastContainer = frontmatterContainers.item(fmcLength - 1);
							context.addChild(new ContactTableView(lastContainer as HTMLElement, value));
						} else {
							console.warn(`Contact was not retrievable from source path: ${context.sourcePath}`);
						}
					});
				}
			}
		});
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateSidebarView() {
		this.app.workspace.detachLeavesOfType(CONTACTS_VIEW_CONFIG.type);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: CONTACTS_VIEW_CONFIG.type,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(CONTACTS_VIEW_CONFIG.type)[0]
		);
	}
}
