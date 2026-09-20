import Image from "next/image";
import React from "react";
import { useProfilePic } from "@/app/components/UseProfilePic";

const Header = () => {
	const { profilePicUrl } = useProfilePic(
		"be-website-private",
		"chicago_pic.JPG",
		"photos"
	);

	return (
		<div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-20">
			<div>
				{profilePicUrl && (
					<Image src={profilePicUrl} alt="Headshot" className="rounded-full w-32" />
				)}
			</div>
			<h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo">
				Hi! I'm Branden Evangelista 👋🏽
			</h3>
			<h1 className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo">
				Fullstack developer based in Phoenix
			</h1>
			<p className="max-w-2xl mx-auto font-Ovo">
				I am a fullstack software engineer from Florida, USA with 3 years of experience.
				Currently work at American Express. Obsessed with designing and architecting simple
				solutions for complex problems
			</p>
			<footer className="mt-10 text-center text-sm">
				<p>📥 evangelistabranden@gmail.com</p>
				<p>📳 (813) 394-2478</p>
			</footer>
		</div>
	);
};

export default Header;
