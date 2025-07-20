import React, { useRef } from 'react'
import Image from "next/image";
import {CONTACT, ICON, IMAGE_CONSTANTS} from "@/utils/constants/constants";

const NavBar = ({ darkMode, setDarkMode }) => {
    const sideMenuRef = useRef();

    const openMenu = () => {
        sideMenuRef.current.style.transform = "translateX(-16rem)";
    }
    const closeMenu = () => {
        sideMenuRef.current.style.transform = "translateX(16rem)";
    }

    return (
        <>
            <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 bg-white dark:bg-darkTheme">
                <a href="">
                    <Image
                        src={darkMode ? IMAGE_CONSTANTS.INITIALS_LOGO_DARK : IMAGE_CONSTANTS.INITIALS_LOGO}
                        alt="NavBar logo"
                        className="w-40 cursor-pointer mr-14"
                    />
                </a>
                <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50">
                    {[
                        { href: "", title: "Home" },
                        { href: "about", title: "About" },
                        { href: "resume", title: "Resume" },
                    ].map(({ href, title }, index) => (
                        <li key={index}>
                            <a href={href}>{title}</a>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-4">
                    <button onClick={() => setDarkMode(prev => !prev)}>
                        <Image src={darkMode ? ICON.DARK_MODE : ICON.LIGHT_MODE} alt="Set Dark Mode" className="w-6"
                        />
                    </button>
                    <ul className="hidden md:flex items-end gap-0 lg:gap-0 rounded-full px-12 py-3">
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={CONTACT.INSTAGRAM}
                                className="hidden lg:flex items-center px-2.5 py-2.5 border border-gray-500 rounded-full ml-4"
                            >
                                <Image
                                    src={ICON.INSTAGRAM}
                                    alt="Contact button"
                                    className="w-4 bg-transparent"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={CONTACT.LINKEDIN}
                                className="hidden lg:flex items-center px-2.5 py-2.5 border border-gray-500 rounded-full ml-4"
                            >
                                <Image
                                    src={ICON.LINKEDIN}
                                    alt="Contact button"
                                    className="w-4 bg-transparent"
                                />
                            </a>
                        </li>
                        <li>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={CONTACT.GITHUB}
                                className="hidden lg:flex items-center px-2.5 py-2.5 border border-gray-500 rounded-full ml-4"
                            >
                                <Image
                                    src={darkMode ? ICON.GITHUB_WHITE : ICON.GITHUB}
                                    alt="Contact button"
                                    className="w-4 bg-transparent"
                                />
                            </a>
                        </li>
                    </ul>
                    <button className="block md:hidden ml-3" onClick={openMenu}>
                        <Image src={darkMode ? ICON.BURGER_MENU_LIGHT : ICON.BURGER_MENU} alt="Burger Menu" className="w-6"
                        />
                    </button>
                </div>

                {/*    Create Menu for mobile users    */}
                <ul ref={sideMenuRef} className="flex md:hidden flex-col gap-4 px-10 py-20 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-blue-50 dark:bg-[#3E3E40] transition duration-500">
                    <div className="absolute right-6 top-6" onClick={closeMenu}>
                        <Image src={darkMode ? ICON.WHITE_X : ICON.BLACK_X} alt="Close Menu" className="w-5 cursor-pointer" />
                    </div>

                    {[
                        { href: "", title: "Home" },
                        { href: "about", title: "About" },
                        { href: "resume", title: "Resume" },
                    ].map(({ href, title }, index) => (
                        <li key={index}>
                            <a href={href} onClick={closeMenu}>{title}</a>
                        </li>
                    ))}

                    {/* Spacer to push icons to bottom */}
                    <div className="mt-auto">
                        <ul className="flex flex-row justify-center gap-4 pt-6">
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={CONTACT.INSTAGRAM}
                                >
                                    <Image
                                        src={ICON.INSTAGRAM}
                                        alt="Contact button"
                                        className="w-5 h-5 bg-transparent"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={CONTACT.LINKEDIN}
                                >
                                    <Image
                                        src={ICON.LINKEDIN}
                                        alt="Contact button"
                                        className="w-5 h-5 bg-transparent"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={CONTACT.GITHUB}
                                >
                                    <Image
                                        src={darkMode ? ICON.GITHUB_WHITE : ICON.GITHUB}
                                        alt="Contact button"
                                        className="w-5 h-5 bg-transparent"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;