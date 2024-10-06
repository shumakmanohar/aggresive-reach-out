import PortalForm from "@/components/custom/PortalForm";
import Image from "next/image";

export default function Home() {
	return (
		<div className="container p-10 mx-auto">
			<h1 className="text-3xl text-center mb-10">Aggressive Apply</h1>
			<div className="flex items-center justify-center">
				<PortalForm />
			</div>
		</div>
	);
}
