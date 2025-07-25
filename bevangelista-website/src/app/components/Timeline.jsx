import React from "react";

import Image from "next/image";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {useDarkMode} from "@/context/DarkModeContext";
import {ICON} from "@/utils/constants/constants";

const Timeline = () => {
    const { darkMode, setDarkMode } = useDarkMode();

    const timelineElements = [
        { date: "August 2018", classElement: "education", icon: <Image className="w-10 h-10" src={darkMode ? ICON.EDUCATION_DARK : ICON.EDUCATION} alt="Education Icon"/>, iconStyle: { background: "rgb(233, 30, 99)" }, title: "CpE Student", location: "Gainesville, FL", description: "Enrolled as a computer engineering student at the University of Florida 🐊" },
        { date: "June 2021 - August 2021", classElement: "work", icon: <Image className="w-10 h-10" src={darkMode ? ICON.AMEX_DARK : ICON.AMEX} alt="Amex Icon"/>, iconStyle: { background: "rgb(33, 150, 243)" }, title: "SWE Intern", location: "Virtual, FL", description: "First internship at American Express" },
        { date: "May 2022", classElement: "education", icon: <Image className="w-10 h-10" src={darkMode ? ICON.EDUCATION_DARK : ICON.EDUCATION} alt="Education Icon"/>, iconStyle: { background: "rgb(233, 30, 99)" }, title: "CpE Graduate", location: "Gainesville, FL", description: "Graduated from the University of Florida with a B.S in Computer Engineering and a Minor in Mathematics" },
        { date: "August 2022 - April 2024", classElement: "work", icon: <Image className="w-10 h-10" src={darkMode ? ICON.AMEX_DARK : ICON.AMEX} alt="Amex Icon"/>, iconStyle: { background: "rgb(33, 150, 243)" }, title: "SWE - Financial Data Engineering", location: "Phoenix, AZ", description: "Joined American Express as an Engineer III in the Financial Data Engineering department" },
        { date: "April 2024 - Present", classElement: "work", icon: <Image className="w-10 h-10" src={darkMode ? ICON.AMEX_DARK : ICON.AMEX} alt="Amex Icon"/>, iconStyle: { background: "rgb(33, 150, 243)" }, title: "SWE - Production Management & Engineering", location: "Phoenix, AZ", description: "Joined American Express as an Engineer III in the Financial Data Engineering department" },
    ]
    return (
        <>
            <div className="pt-40">
                <VerticalTimeline lineColor={darkMode ? "#fff" : "#000"}>
                    {timelineElements.map(({date, classElement, title, icon, iconStyle, location, description}, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className={`vertical-timeline-element--${classElement}`}
                            contentStyle={{
                                background: darkMode ? "#3E3E40" : "#EFF6FF",
                                color: darkMode ? "#fff" : "#000",
                            }}
                            date={date}
                            icon={<div className="flex items-center justify-center w-full h-full">{icon}</div>}
                            iconStyle={{
                                ...iconStyle,
                                color: darkMode ? "4px solid white" : "3px solid black",
                                border: darkMode ? "4px solid white" : "3px solid black",
                                boxShadow: "None",
                            }}
                            contentArrowStyle={{
                                borderRight: darkMode
                                    ? '7px solid #3E3E40'
                                    : '7px solid #EFF6FF',
                            }}
                        >
                            <h3 className="my-4 font-semibold text-gray-700 dark:!text-white">{title}</h3>
                            <h4 className="my-4 font-semibold text-gray-700 dark:!text-white">{location}</h4>
                            <p className="text-gray-600 text-sm dark:!text-white">{description}</p>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </div>
        </>
    );
}

export default Timeline;