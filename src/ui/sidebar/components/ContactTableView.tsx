import { MarkdownRenderChild, MarkdownRenderer } from "obsidian";
import { Contact } from '../../../parse/contact';

export class ContactTableView extends MarkdownRenderChild {
	contact: Contact;

	constructor(containerEl: HTMLElement, contact: Contact) {
		super(containerEl);

		this.contact = contact;
	}

	async onload() {
		let doc = this.containerEl.ownerDocument;
		let table = doc.createElement('table');
		let markdownFriends: HTMLElement = doc.createElement('div');
		await MarkdownRenderer.renderMarkdown(this.contact.friends || " ", markdownFriends, this.contact.file.path, this);
		let markdownTags: HTMLElement = doc.createElement("div");
		await MarkdownRenderer.renderMarkdown(this.contact.tags || " ", markdownTags, this.contact.file.path, this);
		table.addClass('contacts-ng-contact-reading-view');
		for (let row of [{
			label: "First Name",
			value: this.contact.firstName || ""
		},
		{
			label: "Last Name",
			value: this.contact.lastName || ""
		},
		{
			label: "Phone",
			value: this.contact.phone || ""
		},
		{
			label: "Email",
			value: this.contact.email || ""
		},
		{
			label: "LinkedIn",
			value: this.contact.linkedIn || ""
		},
		{
			label: "Github",
			value: this.contact.github || ""
		},
		{
			label: "Last Contact",
			value: this.contact.lastContact || "Unknown"
		},
		{
			label: "Birthday",
			value: this.contact.birthday || ""
		},
		{
			label: "Friends",
			value: markdownFriends || ""
		},
		{
			label: "Tags",
			value: markdownTags || ""
		}
	]) {
		let rowEl = doc.createElement('tr');
		let labelEl = doc.createElement('th');
		labelEl.textContent = row.label;
		let valueEl = doc.createElement('td');

		if (row.value instanceof HTMLElement) {
			valueEl.appendChild(row.value);
		} else {
			valueEl.innerText = `${row.value}`;
		}
		rowEl.appendChild(labelEl);
		rowEl.appendChild(valueEl);
		table.appendChild(rowEl);
	}
		this.containerEl.parentElement!.appendChild(table);
	}
}
