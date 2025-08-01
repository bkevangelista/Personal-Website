"use client";

import Image from "next/image";
import { IMAGE_CONSTANTS, ICON } from "@/utils/constants/constants";
import NavBar from "@/app/components/NavBar";
import { useDarkMode } from "@/context/DarkModeContext";

export default function About() {
	const { darkMode, setDarkMode } = useDarkMode();

	const aboutMeCards = [
		{
			icon: ICON.EDUCATION,
			iconDark: ICON.EDUCATION_DARK,
			title: "Education",
			description: "B.S in Computer Engineering and Minor in Mathematics",
		},
		{
			icon: ICON.CODE_TAG,
			iconDark: ICON.CODE_TAG_DARK,
			title: "Languages",
			description: "Java, JavaScript, Python",
		},
	];

	return (
		<>
			<NavBar />

			<div id="about" className="w-full px-[12%] py-10 pt-28 scroll-mt-20">
				<h4 className="text-center mb-2 text-lg font-Ovo">Introduction</h4>
				<h2 className="text-center text-5xl font-Ovo">About Me</h2>

				<div className="flex w-full flex-col lg:flex-row items-center gap-20 my-20">
					<div className="w-64 sm:w-80 rounded-3xl max-w-none">
						<Image
							src={IMAGE_CONSTANTS.SAN_DIEGO_PIC}
							alt="User photo"
							className="w-full rounded-3xl"
						/>
					</div>
					<div className="flex-1">
						<p className="mb-10 max-w-2xl font-Ovo">
							I am a software engineer with 3 years of professional experience. I
							specialize in full-stack development, with experience in technologies
							like React JavaScript, Python, Java, and cloud platforms like Google
							Cloud.
						</p>
						<p className="mb-10 max-w-2xl font-Ovo">
							During my time as student, I gained hands-on experience working on both
							web applications and on low-level code for interfacing with
							microcontrollers. Once I landed my first engineering role, I developed a
							deeper understanding of building robust, production-grade systems and
							collaborating within agile teams.
						</p>
						<p className="mb-10 max-w-2xl font-Ovo">
							Outside of working, I enjoy staying active: working out, running,
							playing pickleball or playing basketball. I am also looking for new
							creative outlets, especially in music.
						</p>
						<ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl">
							{aboutMeCards.map(({ icon, iconDark, title, description }, index) => (
								<li
									key={index}
									className="border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-lightShadow dark:border-white dark:hover:shadow-darkShadow dark:hover:bg-darkHover/50"
								>
									<Image
										className="w-10 mt-3"
										src={darkMode ? iconDark : icon}
										alt={title}
									/>
									<h3 className="my-4 font-semibold text-gray-700 dark:text-white">
										{title}
									</h3>
									<p className="text-gray-600 text-sm dark:text-white/80">
										{description}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
