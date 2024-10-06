"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { generateEmailsForAllContacts, mergeEmailLists } from "@/app/util/util";
import { Button } from "../ui/button";
import { postData } from "@/server-actions/b2b";
import toast from "react-hot-toast";

type Props = {};

const B2BForm = (props: Props) => {
	const [formValues, setFormValues] = useState({
		companyName: "",
		note: "",
		website: "",
		xHandle: "",
		location: "",
		instagramHandle: "",
		emailList: "",
	});
	const [loading, setLoading] = useState(false);

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;

		setFormValues((prevValues) => {
			const updatedValues = {
				...prevValues,
				[name]: value,
			};
			return updatedValues;
		});
	};

	const handleFormSubmission = async (e: any) => {
		e.preventDefault();
		setLoading(true);
		const serverResponse = await postData(formValues);
		if (serverResponse.status) {
			toast.success(serverResponse.message || "Added");
			setLoading(false);
			setFormValues({
				companyName: "",
				website: "",
				note: "",
				xHandle: "",
				location: "",
				instagramHandle: "",
				emailList: "",
			});
			return;
		}
		setLoading(false);
		toast.error(serverResponse.message || "Something went wrong in server");
	};
	return (
		<form
			className="flex flex-col gap-8 w-[500px]"
			onSubmit={handleFormSubmission}
		>
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
				<Label htmlFor="company">Website</Label>
				<Input
					type="name"
					id="company"
					name="website"
					placeholder="Company Website"
					value={formValues.website}
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
				<Label htmlFor="insta-handle">Instagram Handle</Label>
				<Input
					type="name"
					id="insta-handle"
					name="instagramHandle"
					placeholder="Instagram"
					value={formValues.instagramHandle}
					onChange={handleInputChange}
				/>
			</div>
			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="x-handle">X Handle</Label>
				<Input
					type="name"
					id="x-handle"
					name="xHandle"
					placeholder="X - handle"
					value={formValues.xHandle}
					onChange={handleInputChange}
				/>
			</div>

			<div className="grid w-full max-w-lg items-center gap-1.5">
				<Label htmlFor="email-list">Email List</Label>
				<Textarea
					id="note"
					name="emailList"
					placeholder="Email List"
					className="h-[120px]"
					value={formValues.emailList}
					onChange={handleInputChange}
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
			<Button
				className="grid w-full max-w-lg items-center gap-1.5"
				disabled={loading}
			>
				{loading ? "LOADING ...." : "Add"}
			</Button>
		</form>
	);
};

export default B2BForm;
