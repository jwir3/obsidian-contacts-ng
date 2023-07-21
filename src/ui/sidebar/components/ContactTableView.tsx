import { MarkdownRenderChild, MarkdownRenderer } from "obsidian";
import { Contact } from '../../../parse/contact';

export class ContactTableView extends MarkdownRenderChild {
	contact: Contact;

	constructor(containerEl: HTMLElement, contact: Contact) {
		super(containerEl);

		this.contact = contact;
	}

	onload() {
		let doc = this.containerEl.ownerDocument;
		let table = doc.createElement('table');
		let markdownFriends: HTMLElement = doc.createElement('div');
		MarkdownRenderer.renderMarkdown(this.contact.friends || " ", markdownFriends, this.contact.file.path, this)
			.then(() => {
				let markdownTags: HTMLElement = doc.createElement("div");
				MarkdownRenderer.renderMarkdown(this.contact.tags || " ", markdownTags, this.contact.file.path, this)
					.then(() => {
						table.addClass('contacts-ng-contact-reading-view');
						table.innerHTML = `
							<tr>
								<th>First Name</th><td>${this.contact.firstName || " "}</td>
							</tr>
							<tr>
								<th>Last Name</th><td>${this.contact.lastName || " "}</td>
							</tr>
							<tr>
								<th>Phone</th><td>${this.contact.phone || " "}</td>
							</tr>
							<tr>
								<th>Email</th><td>${this.contact.email || " " }</td>
							</tr>
							<tr>
								<th>LinkedIn</th><td>${this.contact.linkedIn || " "}</td>
							</tr>
							<tr>
								<th>Last Contact</th><td>${this.contact.lastContact || "Unknown"}</td>
							</tr>
							<tr>
								<th>Birthday</th><td>${this.contact.birthday || " "}</td>
							</tr>
							<tr>
								<th>Friends</th><td>${markdownFriends.innerHTML || " "}</td>
							</tr>
							<tr>
								<th>Tags</th><td>${markdownTags.innerHTML || " "}</td>
							</tr>
						`;
						this.containerEl.parentElement!.appendChild(table);
					});
			});
	}
}

// export class Emoji extends MarkdownRenderChild {
//   static ALL_EMOJIS: Record<string, string> = {
//     ":+1:": "👍",
//     ":sunglasses:": "😎",
//     ":smile:": "😄",
//   };

//   text: string;

//   constructor(containerEl: HTMLElement, text: string) {
//     super(containerEl);

//     this.text = text;
//   }

//   onload() {
//     const emojiEl = this.containerEl.createSpan({
//       text: Emoji.ALL_EMOJIS[this.text] ?? this.text,
//     });
//     this.containerEl.replaceWith(emojiEl);
//   }
// }
