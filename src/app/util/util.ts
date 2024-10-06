// Generate common email variations based on contact name and company name
export const generateEmployeeEmailVariations = (
	contactName: string,
	companyName: string
) => {
	const domain = companyName.toLowerCase().replace(/\s+/g, "");

	const nameParts = contactName.split(" ").map((part) => part.toLowerCase());
	const firstName = nameParts[0];
	const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

	// Common email patterns
	const emailVariations = [
		`${firstName}@${domain}`,
		`${firstName}.${lastName}@${domain}`,
		`${lastName}.${firstName}@${domain}`,
		`${firstName.charAt(0)}.${lastName}@${domain}`,
		`${lastName}.${firstName.charAt(0)}@${domain}`,
		`${firstName}${lastName}@${domain}`,
		`${firstName.charAt(0)}${lastName}@${domain}`,
		`${lastName}${firstName.charAt(0)}@${domain}`,
	];

	return emailVariations;
};

// Generate email variations for all contacts separated by commas
export const generateEmailsForAllContacts = (
	contacts: string[],
	companyName: string
) => {
	console.log("contacts", contacts);
	const contactList = contacts.map((contact) => contact.trim());
	let allEmailVariations: string[] = [];

	contactList.forEach((contact) => {
		if (contact) {
			const emailVariations = generateEmployeeEmailVariations(
				contact,
				companyName
			);
			allEmailVariations = [...allEmailVariations, ...emailVariations];
		}
	});

	return allEmailVariations.join("\n");
};

// Helper function to merge arrays and remove duplicates
export const mergeEmailLists = (
	existingEmails: string[],
	newEmails: string[]
): string[] => {
	const emailSet = new Set([...existingEmails, ...newEmails]);
	return Array.from(emailSet);
};
