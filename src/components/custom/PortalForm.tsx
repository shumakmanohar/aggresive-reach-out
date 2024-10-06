"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { generateEmailsForAllContacts, mergeEmailLists } from "@/app/util/util";

type Props = {};

const PortalForm = (props: Props) => {
	const [formValues, setFormValues] = useState({
		companyName: "",
		note: "",
		location: "",
		mode: "",
		contacts: "",
		emailList: "",
		position: "",
	});

	const [generatedCompanyEmails, setGeneratedCompanyEmails] = useState("");
	const [generatedEmloyeeEmails, setGeneratedEmployeeEmails] = useState("");

	const generateCompanyEmailList = (companyName: string) => {
		const domain = companyName.toLowerCase().replace(/\s+/g, "");
		const emailVariations = [
			`careers@${domain}`,
			`talent@${domain}`,
			`people@${domain}`,
			`hr@${domain}`,
			`jobs@${domain}`,
			`hiring@${domain}`,
			`work@${domain}`,
			`recruitment@${domain}`,
		];
		return emailVariations.join("\n");
	};

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;

		setFormValues((prevValues) => {
			const updatedValues = {
				...prevValues,
				[name]: value,
			};

			if (name === "companyName" && value.trim() !== "") {
				setGeneratedCompanyEmails(generateCompanyEmailList(value));
				updatedValues.emailList = generateCompanyEmailList(value);
			}
			console.log("company emails in input change", generatedCompanyEmails);
			return updatedValues;
		});
	};

	const handleContactsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		const contactList = value
			.split(",")
			.map((contact) => contact.trim())
			.filter((contact) => contact); // Filter out empty values

		console.log("company emails", generatedCompanyEmails);
		setGeneratedEmployeeEmails(
			generateEmailsForAllContacts(contactList, formValues.companyName)
		);
		setFormValues((prevValues) => {
			return {
				...prevValues,
				contacts: value, // Store the raw contacts input
				emailList: generatedCompanyEmails.concat(
					"\n",
					generateEmailsForAllContacts(contactList, formValues.companyName)
				), // Update email list with new emails
			};
		});
	};

	const handleEmailChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value;
		setFormValues((prevValues) => ({
			...prevValues,
			emailList: value, // Allow user to manually edit the email list
		}));
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log(formValues);
	};
	return (
		<form className="flex flex-col gap-8 w-[500px]" onSubmit={handleSubmit}>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="company">Company</Label>
				<Input
					type="name"
					id="company"
					name="companyName"
					placeholder="Company"
					value={formValues.companyName}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="location">Location</Label>
				<Input
					type="name"
					id="location"
					name="location"
					placeholder="Location"
					value={formValues.location}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="mode">Mode</Label>
				<Input
					type="name"
					id="mode"
					name="mode"
					placeholder="Mode"
					value={formValues.mode}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="hr-contact-list">HR/Contact List</Label>
				<Textarea
					id="hr-contact-list"
					placeholder="HR/Contact List"
					className="h-[80px]"
					name="contacts"
					value={formValues.contacts}
					onChange={handleContactsChange}
				/>
			</div>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="emailList">Email List</Label>
				<Textarea
					id="emailList"
					placeholder="Email List"
					className="h-[120px]"
					name="emailList"
					value={formValues.emailList}
					onChange={handleEmailChange}
				/>
			</div>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="note">Note</Label>
				<Textarea
					id="note"
					name="note"
					placeholder="Note"
					className="h-[120px]"
					value={formValues.note}
					onChange={handleInputChange}
				/>
			</div>
			<Button className="grid w-full max-w-lg items-center gap-1.5">Add</Button>
		</form>
	);
};

export default PortalForm;
