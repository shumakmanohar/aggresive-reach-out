"use server";

export const postData = async (formJson: any) => {
	const formData = new FormData();
	try {
		Object.entries(formJson).forEach(([key, value]) => {
			formData.append(key, value as string);
		});
		const response = await fetch(process.env.B2BLINK!!, {
			method: "POST",
			body: formData,
		});
		const data = await response.json();
		console.log(data);
		if (data.result !== "success") throw Error("Sheets returned Error");
		return {
			status: true,
			message: "New Record Created",
		};
	} catch (error: any) {
		console.log(error);
		return {
			status: false,
			message: error?.message,
		};
	}
};
