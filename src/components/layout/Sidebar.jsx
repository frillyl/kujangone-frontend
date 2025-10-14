import { NavLink } from "react-router-dom";
import { RectangleGroupIcon, UserGroupIcon, UsersIcon, BuildingStorefrontIcon, ArchiveBoxIcon, DocumentChartBarIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const menu = [
        {
            title: "",
            items: [{ path: "/admin/dashboard", label: "Dashboard", icon: RectangleGroupIcon }],
        },
        {
            title: "Data Utama",
            items: [
                {
                    path: "/master/anggota",
                    label: "Anggota",
                    icon: UserGroupIcon
                },
                {
                    path: "/master/karyawan",
                    label: "Karyawan",
                    icon: UsersIcon
                },
                {
                    path: "/master/agen",
                    label: "Agen",
                    icon: BuildingStorefrontIcon
                },
                {
                    path: "/master/barang",
                    label: "Barang",
                    icon: ArchiveBoxIcon
                }
            ],
        },
        {
            title: "Transaksi",
            items: [{ path: "/kasir", label: "Kasir", icon: ShoppingCartIcon }],
        },
        {
            title: "Laporan",
            items: [
                {
                    path: "/laporan/penjualan",
                    label: "Penjualan",
                    icon: DocumentChartBarIcon
                },
                {
                    path: "/laporan/shu",
                    label: "Sisa Hasil Usaha",
                    icon: DocumentChartBarIcon
                }
            ],
        },
    ];

    return (
        <>
            {/* Overlay untuk mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed md:relative top-0 left-0 h-full z-30
                    bg-primary-base text-white flex flex-col shadow-xl transition-all duration-300
                    ${sidebarOpen ? "w-64" : "w-16"}
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                `}
            >
                {/* Logo + Tombol Close (mobile) */}
                <div className="flex items-center justify-between px-4 py-4 border-b border-primary-dark">
                    {sidebarOpen ? (
                        <h1 className="text-xl font-bold tracking-wide">KujangOne</h1>
                    ) : (
                        <RectangleGroupIcon className="w-7 h-7 text-accent-base" />
                    )}
                    {/* Close hanya muncul di mobile */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden text-white hover:text-accent-base"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-2 py-6 space-y-4 overflow-y-auto overflow-x-hidden">
                    {menu.map((group) => (
                        <div key={group.title}>
                            {sidebarOpen && (
                                <p className="uppercase text-xs font-semibold text-gray-300 px-2 mb-2">
                                    {group.title}
                                </p>
                            )}
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => {
                                            if (window.innerWidth < 768) setSidebarOpen(false);
                                        }}
                                        className={({ isActive }) =>
                                            `group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                                isActive
                                                ? "bg-primary-light text-white font-semibold shadow-inner"
                                                : "text-gray-100 hover:bg-primary-dark hover:text-white"
                                            }`
                                        }
                                    >
                                        <item.icon className="w-5 h-5 flex-shrink-0" />
                                        {sidebarOpen && <span>{item.label}</span>}

                                        {/* Tooltip saat sidebar tertutup */}
                                        {!sidebarOpen && (
                                            <span className="absolute left-14 bg-gray-900 text-white text-sm rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-20">
                                                {item.label}
                                            </span>
                                        )}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-primary-dark text-xs text-gray-200 text-center">
                    {sidebarOpen ? "© 2025 Koperasi PDPKI" : "©"}
                </div>
            </aside>
        </>
    );
}
