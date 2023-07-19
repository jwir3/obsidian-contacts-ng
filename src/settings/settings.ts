import { App, PluginSettingTab, Setting, Plugin } from "obsidian";
import ContactsPlugin from "src/main";

const defaultTemplate: string =
`/---contact---/
| key                   | value      |
| -------------- | -------- |
| First Name      |                |
| Last Name      |                |
| Email               |                |
| Phone             |                |
| LinkedIn          |                |
| Birthday          |                |
| Last Contact  |                |
| Friends           |                 |
| Tags              | #contacts       |
/---contact---/`;

export interface ContactsPluginSettings {
  contactsFolder: string;
  template: string,
	templateType: TemplateType
}

export enum TemplateType {
  CUSTOM = "custom", FRONTMATTER = "frontmatter"
}

export const DEFAULT_SETTINGS: ContactsPluginSettings = {
  contactsFolder: '/',
	template: defaultTemplate,
  templateType: TemplateType.CUSTOM
}

export class ContactsSettingTab extends PluginSettingTab {
  plugin: ContactsPlugin;

  constructor(app: App, plugin: ContactsPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();
		containerEl.addClass("settingsTemplate");

    containerEl.createEl('h2', { text: 'Settings for "Contacts" plugin.' });

    new Setting(containerEl)
      .setName('Contacts folder location')
      .setDesc('Files in this folder and all subfolders will be available as contacts')
      .addText(text => text
        .setPlaceholder('Personal/Contacts')
        .setValue(this.plugin.settings.contactsFolder)
        .onChange(async (value) => {
          this.plugin.settings.contactsFolder = value;
          await this.plugin.saveSettings();
        }));
		new Setting(containerEl)
      .setName('Contact Template Type')
      .setDesc('Template type to be used when creating a new contact file')
      .addDropdown(dropdown => dropdown
        .addOption(TemplateType.CUSTOM, "Custom")
        .addOption(TemplateType.FRONTMATTER, "Frontmatter (YAML Metadata)")
        .setValue(this.plugin.settings.templateType)
        .onChange(async (value) => {
          this.plugin.settings.template = value as TemplateType;
          await this.plugin.saveSettings();
        }));
		new Setting(containerEl)
			.setClass("settingsTemplateRow")
			.setName("Contacts Template")
			.setDesc(
				"Template for new contacts. Feel free to add lines. Removing lines will likely result in inconsistencies."
			)
			.addButton((btn) =>
				btn
					.setButtonText("Reset to Default")
					.setClass("settingsTemplateButton")
					.setCta()
					.onClick(async () => {
						this.plugin.settings.template = defaultTemplate;
						await this.plugin.saveSettings();
						this.display();
					})
			)
			.addTextArea((textArea) => {
				textArea.setValue(this.plugin.settings.template).onChange(
					async (value) => {
						this.plugin.settings.template = value;
						await this.plugin.saveSettings();
					}
				);
			});
  }
}
