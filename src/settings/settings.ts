import { App, PluginSettingTab, Setting, Plugin } from "obsidian";
import ContactsPlugin from "src/main";

const defaultTemplate: string =
`---
name:
  first:
  last:
phone:
email:
linkedin: linkedin.com/in/
birthday: YYYY-MM-DD
last_contact: YYYY-MM-DD
friends: ""
tags: ""
type: contact
---`;

export interface ContactsPluginSettings {
  contactsFolder: string;
  template: string,
	autoUpdateLastContact: boolean
}

export const DEFAULT_SETTINGS: ContactsPluginSettings = {
  contactsFolder: '/',
	template: defaultTemplate,
	autoUpdateLastContact: false
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

    containerEl.createEl('h2', { text: 'Settings for "Contacts NextGen" plugin.' });

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
      .setName("Update Last Contact Date")
      .setDesc("Automatically updates the last contact date based on the creation time of the newest of the pages in the backlinks to this contact.")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.autoUpdateLastContact)
        .onChange(async (value) => {
          this.plugin.settings.autoUpdateLastContact = value;
					await this.plugin.saveSettings();
        }
      )
    );
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
