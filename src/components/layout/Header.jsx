import { useState } from "react";
import { BellIcon, Bars3Icon, SunIcon, MoonIcon, Cog6ToothIcon, ArrowRightEndOnRectangleIcon, UserCircleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Header({ onToggleSidebar }) {
    const [darkMode, setDarkMode] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const user = {
        firstName: "John",
        fullName: "John Doe",
        email: "johndoe@gmail.com"
    };

    return (
        <header className="flex justify-between items-center bg-primary-base text-white px-6 py-3 shadow-md">
            {/* Left Section */}
            <div className="flex items-center">
                {/* Sidebar Toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="hover:text-primary-light transition rounded-lg p-1.5 hover:bg-primary-dark"
                >
                    <Bars3Icon className="w-7 h-7" />
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-5 relative">
                {/* Dark/Light Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="hover:text-primary-light transition rounded-lg p-1.5 hover:bg-primary-dark"
                >
                    {darkMode ? (
                        <SunIcon className="w-6 h-6" />
                    ) : (
                        <MoonIcon className="w-6 h-6" />
                    )}
                </button>

                {/* Notification */}
                <button className="relative hover:text-primary-light transition rounded-lg p-1.5 hover:bg-primary-dark">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-danger-base text-white text-xs rounded-full px-1">
                        3
                    </span>
                </button>

                {/* User Info */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-2 border-l border-primary-light pl-4 hover:text-primary-light transition"
                    >
                        <img
                            src="https://via.placeholder.com/32"
                            alt="User"
                            className="w-8 h-8 rounded-full ring-2 ring-accent-base"
                        />
                        <span className="font-medium">{user.firstName}</span>
                        <ChevronDownIcon
                            className={`w-5 h-5 transition-transform ${
                                dropdownOpen ? "rotate-180" : ""
                            }`}
                        />
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white text-gray-700 rounded-xl shadow-xl overflow-hidden z-20 animate-fade-in">
                            <div className="p-4 border-b">
                                <p className="font-semibold">{user.fullName}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                            <ul className="flex flex-col">
                                <li>
                                    <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-50 transition">
                                        <UserCircleIcon className="w-5 h-5 text-primary-base" />
                                        Edit Profil
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-50 transition">
                                        <Cog6ToothIcon className="w-5 h-5 text-primary-base" />
                                        Pengaturan Akun
                                    </button>
                                </li>
                                <li>
                                    <button className="w-full flex items-center gap-2 text-left px-4 py-2 text-danger-base hover:bg-gray-50 transition">
                                        <ArrowRightEndOnRectangleIcon className="w-5 h-5" />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
