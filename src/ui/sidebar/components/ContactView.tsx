import * as React from "react";
import { useApp } from "src/context/hooks";
import { openFile } from "src/file/file";
import { Contact } from "src/parse/contact";
import { daysUntilBirthday, diffDateToday } from "src/util/dates";

type ContactProps = {
	contact: Contact;
};

export const ContactView = (props: ContactProps) => {
	const { workspace } = useApp();
	const contact = props.contact;
	let lastContactDays, dayPlurality;
	console.log(`${contact.firstName} ${contact.lastName}: ${contact.lastContact}`);

	if (contact.lastContact) {
		lastContactDays = diffDateToday(contact.lastContact);
		dayPlurality = lastContactDays > 1 ? 'days' : 'day';
	}

	return (
		<div
			className="contact-card"
			onClick={() => openFile(contact.file, workspace)}
		>
			<div className="content">
				<div className="name">
					{contact.firstName} {contact.lastName}
				</div>
				{contact.lastContact && (
					<div className="lastContact">
						Last Contact: {lastContactDays} {dayPlurality} ago
					</div>
				)}
				{contact.birthday && (
					<div className="lastContact">
						Birthday: in {daysUntilBirthday(contact.birthday)} days
					</div>
				)}
			</div>
		</div>
	);
};
