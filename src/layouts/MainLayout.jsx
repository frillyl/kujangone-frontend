import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const isDesktop = window.innerWidth >= 768;
        setSidebarOpen(isDesktop);
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Konten */}
            <div className="flex flex-col flex-1">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main
                    id="main-content"
                    className="flex-1 p-4 md:p-6 overflow-y-auto relative">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
