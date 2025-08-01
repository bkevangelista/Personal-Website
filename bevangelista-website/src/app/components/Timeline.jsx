import React from "react";

import Image from "next/image";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useDarkMode } from "@/context/DarkModeContext";
import { DOCUMENTS, ICON } from "@/utils/constants/constants";
import FileHandler from "@/app/components/FileHandler";

const Timeline = () => {
	const { darkMode, setDarkMode } = useDarkMode();

	const timelineElements = [
		{
			date: "August 2018",
			classElement: "education",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.EDUCATION_DARK : ICON.EDUCATION}
					alt="Education Icon"
				/>
			),
			iconStyle: { background: "rgb(233, 30, 99)" },
			title: "CpE Student",
			location: "Gainesville, FL",
			description:
				"Enrolled as a computer engineering student at the University of Florida 🐊",
		},
		{
			date: "June 2021 - August 2021",
			classElement: "work",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.AMEX_DARK : ICON.AMEX}
					alt="Amex Icon"
				/>
			),
			iconStyle: { background: "rgb(33, 150, 243)" },
			title: "SWE Intern",
			location: "Virtual, FL",
			description: "First internship at American Express",
		},
		{
			date: "August 2021 - April 2022",
			classElement: "project",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.CODE_TAG_DARK : ICON.CODE_TAG}
					alt="Project Icon"
				/>
			),
			iconStyle: { background: "rgb(135,33,243)" },
			title: "Automatic Handle Cleaning System",
			location: "Gainesville, FL",
			description:
				"Senior design project to create a UV-based door handle sanitizing system. Can create an account and access usage statistics of each linked device via UI",
			techTags: ["React", "TI432 Microprocessor", "C"],
			sourceCode: "https://github.com/davidhutchins/Automatic-Sanitizing-System",
		},
		{
			date: "May 2022",
			classElement: "education",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.EDUCATION_DARK : ICON.EDUCATION}
					alt="Education Icon"
				/>
			),
			iconStyle: { background: "rgb(233, 30, 99)" },
			title: "CpE Graduate",
			location: "Gainesville, FL",
			description:
				"Graduated from the University of Florida with a B.S in Computer Engineering and a Minor in Mathematics",
		},
		{
			date: "August 2022 - April 2024",
			classElement: "work",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.AMEX_DARK : ICON.AMEX}
					alt="Amex Icon"
				/>
			),
			iconStyle: { background: "rgb(33, 150, 243)" },
			title: "SWE - Financial Data Engineering",
			location: "Phoenix, AZ",
			description:
				"Joined American Express as an Engineer III in the Financial Data Engineering department",
		},
		{
			date: "September 2022",
			classElement: "project",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.CODE_TAG_DARK : ICON.CODE_TAG}
					alt="Project Icon"
				/>
			),
			iconStyle: { background: "rgb(135,33,243)" },
			title: "Fish Can Choose",
			location: "Phoenix, AZ",
			description:
				"An application to have a fish trade stocks. Plans to polish and finalize the project in the future",
			techTags: ["Python", "OpenCV", "MongoDB"],
			sourceCode: "https://github.com/bkevangelista/fish-can-code/tree/dev",
		},
		{
			date: "February 2023",
			classElement: "project",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.CODE_TAG_DARK : ICON.CODE_TAG}
					alt="Project Icon"
				/>
			),
			iconStyle: { background: "rgb(135,33,243)" },
			title: "Operation Mel",
			location: "Phoenix, AZ",
			description:
				"A website created as a birthday present. Plans to refactor, optimize, and update the project in the future",
			techTags: ["React", "Firebase"],
			website: "https://operation-mel.web.app/",
			sourceCode: "https://github.com/bkevangelista/A-History-of-Mel",
		},
		{
			date: "April 2024 - Present",
			classElement: "work",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.AMEX_DARK : ICON.AMEX}
					alt="Amex Icon"
				/>
			),
			iconStyle: { background: "rgb(33, 150, 243)" },
			title: "SWE - Production Management & Engineering",
			location: "Phoenix, AZ",
			description:
				"Switched to the Site Reliability Engineering department as an Engineer II",
		},
		{
			date: "July 2025",
			classElement: "project",
			icon: (
				<Image
					className="w-10 h-10"
					src={darkMode ? ICON.CODE_TAG_DARK : ICON.CODE_TAG}
					alt="Project Icon"
				/>
			),
			iconStyle: { background: "rgb(135,33,243)" },
			title: "bkevangelista.io",
			location: "Phoenix, AZ",
			description: "My own personal website",
			techTags: ["React", "Python", "Docker", "GitHub Actions", "Cloud Storage", "Cloud Run"],
			sourceCode: "https://github.com/bkevangelista/Personal-Website",
		},
	];
	return (
		<>
			<div className="pt-40">
				<VerticalTimeline lineColor={darkMode ? "#fff" : "#000"}>
					{timelineElements.map(
						(
							{
								date,
								classElement,
								title,
								icon,
								iconStyle,
								location,
								description,
								techTags,
								website,
								sourceCode,
							},
							index
						) => (
							<VerticalTimelineElement
								key={index}
								className={`vertical-timeline-element--${classElement}`}
								contentStyle={{
									background: darkMode ? "#3E3E40" : "#EFF6FF",
									color: darkMode ? "#fff" : "#000",
								}}
								date={date}
								icon={
									<div className="flex items-center justify-center w-full h-full">
										{icon}
									</div>
								}
								iconStyle={{
									...iconStyle,
									color: darkMode ? "4px solid white" : "3px solid black",
									border: darkMode ? "4px solid white" : "3px solid black",
									boxShadow: "None",
								}}
								contentArrowStyle={{
									borderRight: darkMode
										? "7px solid #3E3E40"
										: "7px solid #EFF6FF",
								}}
							>
								{techTags && techTags.length > 0 && (
									<div className="flex flex-wrap gap-2 mt-2">
										{techTags.map((techStack, index) => (
											<span
												key={index}
												className="dark:!text-white bg-gray-400 dark:bg-[#FFFFFF80] text-sm px-3 py-1 rounded-full"
											>
												{techStack}
											</span>
										))}
									</div>
								)}
								<h3 className="my-4 font-semibold text-gray-700 dark:!text-white">
									{title}
								</h3>
								<h4 className="my-4 font-semibold text-gray-700 dark:!text-white">
									{location}
								</h4>
								<p className="text-gray-600 text-sm dark:!text-white">
									{description}
								</p>
								{(website || sourceCode) && (
									<div className="flex gap-4 mt-4">
										{website && (
											<a
												href={website}
												target="_blank"
												rel="noopener noreferrer"
												className="px-4 py-2 border border-gray-500 cursor-pointer hover:bg-lightHover hover:-translate-y-0.5 duration-500 hover:shadow-lightShadow dark:border-white dark:hover:shadow-darkShadow dark:hover:bg-darkHover/50"
											>
												Visit Website
											</a>
										)}
										{sourceCode && (
											<a
												href={sourceCode}
												target="_blank"
												rel="noopener noreferrer"
												className="px-4 py-2 border border-gray-500 cursor-pointer hover:bg-lightHover hover:-translate-y-0.5 duration-500 hover:shadow-lightShadow dark:border-white dark:hover:shadow-darkShadow dark:hover:bg-darkHover/50"
											>
												View Source Code
											</a>
										)}
									</div>
								)}
							</VerticalTimelineElement>
						)
					)}
					<VerticalTimelineElement
						className="vertical-timeline-element--resume"
						contentStyle={{
							background: darkMode ? "#3E3E40" : "#EFF6FF",
							color: darkMode ? "#fff" : "#000",
						}}
						contentArrowStyle={{
							borderRight: darkMode ? "7px solid #3E3E40" : "7px solid #EFF6FF",
						}}
						iconStyle={{
							background: "#21f33d",
							color: darkMode ? "4px solid white" : "3px solid black",
							border: darkMode ? "4px solid white" : "3px solid black",
							boxShadow: "None",
						}}
					>
						<h3 className="vertical-timeline-element-title font-bold">Resume</h3>
						<p className="text-gray-600 text-sm dark:!text-white">
							Click on the button below to the resume in full screen
						</p>
						<div className="flex flex-col items-center mt-4 gap-4">
							<FileHandler
								fileName={`Branden_Evangelista_Resume${darkMode ? "_Dark" : ""}.pdf`}
								prefix="resume"
							/>
							<button
								className="lg:flex items-center px-2.5 py-2.5 border border-gray-500 rounded-full ml-4"
								onClick={() => window.open(DOCUMENTS.RESUME, "_blank")}
							>
								<Image
									src={darkMode ? ICON.RESUME_ICON_DARK : ICON.RESUME_ICON}
									alt="Resume button"
									className="w-4 bg-transparent"
								/>
							</button>
						</div>
					</VerticalTimelineElement>
				</VerticalTimeline>
			</div>
		</>
	);
};

export default Timeline;
