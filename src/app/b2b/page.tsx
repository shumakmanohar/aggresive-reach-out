import B2BForm from "@/components/custom/B2BForm";

const page = () => {
	return (
		<div className="container p-10 mx-auto">
			<h1 className="text-3xl text-center mb-10 font-bold">
				Business Reach Out
			</h1>
			<div className="flex items-center justify-center">
				<B2BForm />
			</div>
		</div>
	);
};

export default page;
