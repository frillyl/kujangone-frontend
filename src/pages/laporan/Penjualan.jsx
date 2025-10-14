import { useState } from "react";
import { PrinterIcon, FunnelIcon, ChartBarIcon, BriefcaseIcon, UserIcon, CalendarIcon } from "@heroicons/react/24/outline";
import TabelPerTransaksi from "../../components/laporan/penjualan/TabelPerTransaksi";
import TabelPerBarang from "../../components/laporan/penjualan/TabelPerBarang";
import TabelPerPembeli from "../../components/laporan/penjualan/TabelPerPembeli";

export default function Penjualan() {
    const [mode, setMode] = useState("transaksi");
    const [showPeriode, setShowPeriode] = useState(false);
    const [periode, setPeriode] = useState("Mingguan");
    const [customRange, setCustomRange] = useState({ from: "", to: "" });
    const [showCustomModal, setShowCustomModal] = useState(false);

    const handleSelectPeriode = (p) => {
        setPeriode(p);
        setShowPeriode(false);

        if (p === "Kustomisasi Periode") {
            setShowCustomModal(true);
        }
    };

    const handleCustomApply = () => {
        if (customRange.from && customRange.to) {
            setPeriode(
                `Dari ${customRange.from} s.d ${customRange.to}`
            );
            setShowCustomModal(false);
        }
    };

    return (
        <div className="p-4 md:p-6 xl:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h1 className="text-xl md:text-2xl font-bold text-primary-base">Laporan Penjualan</h1>
                <div className="text-sm text-gray-500 md:text-right">
                    Laporan /
                    <span className="font-semibold text-gray-700">Penjualan</span>
                </div>
            </div>

            {/* Filter Button */}
            <div className="flex flex-col lg:flex-row lg:justify-between gap-3">
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {[
                        { key: "transaksi", label: "Per Transaksi", icon: ChartBarIcon },
                        { key: "barang", label: "Per Barang", icon: BriefcaseIcon },
                        { key: "pembeli", label: "Per Pembeli", icon: UserIcon },
                    ].map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => setMode(key)}
                            className={`px-3 md:px-4 py-2 rounded-full flex items-center gap-2 border transition text-sm md:text-base ${
                                mode === key
                                ? "bg-primary-base text-white"
                                : "hover:bg-gray-50 text-gray-700"
                            }`}
                        >
                            <Icon className="w--4 h-4 md:w-5 md:h-5" /> {label}
                        </button>
                    ))}
                </div>

                <div className="flex justify-center lg:justify-end gap-2">
                    <button className="px-4 py-2 rounded-full flex items-center gap-2 bg-accent-base text-white hover:bg-accent-dark transition text-sm md:text-base">
                        <PrinterIcon className="w-5 h-5" /> Cetak
                    </button>

                    {/* Periode Button */}
                    <div className="relative">
                        <button
                            onClick={() => setShowPeriode(!showPeriode)}
                            className="px-4 py-2 rounded-full border flex items-center gap-2 hover:bg-gray-50 transition text-sm md:text-base"
                        >
                            <FunnelIcon className="w-5 h-5" /> {periode}
                        </button>

                        {showPeriode && (
                            <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg w-48 z-50 animate-fadeIn">
                                {["Harian", "Mingguan", "Bulanan", "Kustomisasi Periode"].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => handleSelectPeriode(item)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                                            periode === item
                                            ? "text-primary-base font-semibold"
                                            : "text-gray-700"
                                        }`}
                                    >
                                        <CalendarIcon className="inline w-4 h-4 mr-2 text-gray-400" />
                                        {item}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                {mode === "transaksi" && (
                    <TabelPerTransaksi periode={periode} customRange={customRange} />
                )}
                {mode === "barang" && (
                    <TabelPerBarang periode={periode} customRange={customRange} />
                )}
                {mode === "pembeli" && (
                    <TabelPerPembeli periode={periode} customRange={customRange} />
                )}
            </div>
            

            {/* Custom Range Modal */}
            {showCustomModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 sm:p-6 z-50 animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg xl:max-w-xl p-4 sm:p-6 shadow-xl border border-gray-100 space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-primary-base flex items-center gap-2">
                            <CalendarIcon className="w-5 h-5" /> Pilih Rentang Tanggal
                        </h3>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Dari Tanggal</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-primary-base focus:border-primary-base"
                                    value={customRange.from}
                                    onChange={(e) => setCustomRange({ ...customRange, from: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Sampai Tanggal</label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-primary-base focus:border-primary-base"
                                    value={customRange.to}
                                    onChange={(e) => setCustomRange({ ...customRange, to: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
                            <button
                                onClick={() => setShowCustomModal(false)}
                                className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition text-sm sm:text-base"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleCustomApply}
                                className="px-4 py-2 rounded-lg bg-primary-base text-white hover:bg-primary-dark transition text-sm sm:text-base"
                            >
                                Terapkan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}