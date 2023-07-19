# Obsidian Contacts NextGen Plugin
Originally based off of [Obsidian Contacts Plugin](https://github.com/vbeskrovnov/obsidian-contacts) by [Vadim Beskrovnov](https://github.com/vbeskrovnov), this plugin for [Obsidian](https://obsidian.md/) allows you to easily organize and manage your contacts. Simply create a note with contact information and use the plugin's features to quickly search and sort through your contacts. The Contacts NextGen plugin also helps you to remember birthdays of your contacts, and keeps track of the last time you met with them!

<img width="600" alt="Obsidian Contacts plugin image" src="https://user-images.githubusercontent.com/9114994/209868806-e4d8c95e-e144-4a7f-8b8f-52f036cd2df8.png">


## Installation

### Automatic

#### Disable `Safe Mode` in Obsidian to be able to install community plugins:
1. Go to the `Settings` menu and select `Community Plugins`.
1. In the `Community Plugins` menu, disable `Safe Mode`.

#### Install and enable `Contacts NextGen` plugin:
1. From the `Community Plugins` menu, click on `Browse`.
1. Search for the `Contacts NextGen` plugin.
1. Click the `Install` button to add the plugin.
1. In the `Community Plugins` menu, enable the `Contacts NextGen` plugin.

### Manual
1. Download `main.js`, `manifest.json`, and `styles.css` from the latest [release](https://github.com/jwir3/obsidian-contacts-ng/releases).
1. Create a directory `obsidian-contacts` in your Obsidian vault plugins directory: `<VaultFolder>/.obsidian/plugins/`. The final path should be `<VaultFolder>/.obsidian/plugins/obsidian-contacts-ng`.
1. Move the downloaded files (`main.js`, `manifest.json`, and `styles.css`) into the newly created directory.(`<VaultFolder>/.obsidian/plugins/obsidian-contacts-ng`)
1. Restart Obsidian app.
1. Enable `Contacts NextGen` plugin in the `Community Plugins` settings tab.

## Usage
After enabling the plugin in the settings menu, you should see the contacts button appear in the left sidebar. Click it to open the Contacts view in the right sidebar.

The plugin reads your contacts folder, which can be changed in the settings, to render all your contacts in the right sidebar.

### Changing the Contacts Folder
1. Go to the Settings.
1. Find the "Contacts NextGen" tab.
1. Change the value of "Contacts Folder Location" to an existing folder.

### Creating a New Contact
1. Click the "Contacts" icon in the left sidebar. The Contacts view should be opened in the right sidebar.
1. Click the "Create" button in the opened Contacts view in the right sidebar.
1. Fill out the created template. See an example below:
```
/---contact---/
| key          | value                     |
| ------------ | ------------------------- |
| First Name   | Scott                     |
| Last Name    | Johnson                   |
| Email        | sjohnson@mozilla.com      |
| Phone        | +1 555 555 5555           |
| LinkedIn     | linkedin.com/in/scottjj57 |
| Birthday     | 1983-07-20                |
| Last Contact | 2022-12-06                |
| Friends      | [[Bob]] [[Sue]]           |
| Tags         | #contacts                 |
/---contact---/
```
Feel free to add more rows, and leave existing ones empty. **Do not rename or delete** existing keys, as they are used internally by the plugin.

### Searching for Сontacts
You can use different sorting options to find the required contacts:
- Use sorting by birthday to find contacts with the nearest birthdays.
- Use sorting by last contact date to find contacts that you haven't talked to in a long time.
- Use sorting by name to find a specific contact.

## Contact File Formats
Any of the following formats can be used for storing contact data in Obsidian files. The default for new contacts is `Custom Format`, but this behavior can be changed in the settings using the `Contact File Template` menu item.

### (Default) Custom Format
The default format used by this plugin is the markdown table for storing contact's data.
```
/---contact---/
| key       | value                    |
| --------- | ------------------------ |
| Name      | carl                     |
| Last Name | johnson                  |
| Phone     | +1 555 555 5555          |
| Telegram  | @carlj567                |
| Linkedin  | linkedin.com/in/carlj567 |
| Birthday  | 1966-12-06               |
| Last chat | 2022-12-06               |
| Friends   | [[Bob]] [[Sue]]          |
/---contact---/
```

### Frontmatter Format

The [Frontmatter](https://help.obsidian.md/Advanced+topics/YAML+front+matter) format is used by Obsidian as metadata for files and is also supported by the [Dataview](https://github.com/blacksmithgu/obsidian-dataview) plugin, allowing you to build queries for your contacts.

> :warning: **Do not change or remove `type` field**. It is used to detect if the current file is a contact.

> :warning: **It needs to be placed at the very top of the file**. Be very careful here!

```
---
name:
  first: carl
  last: johnson
phone: +1 555 555 5555
telegram: @carlj567
linkedin: linkedin.com/in/carlj567
birthday: 1966-12-06
last_chat: 2022-12-06
friends: "[[Bob]] [[Sue]]"
type: contact
---
```
