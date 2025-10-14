import { useState, useMemo } from "react";
import { UserIcon, BanknotesIcon, QrCodeIcon, CreditCardIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TabelPerPembeli({ periode, customRange }) {
    const [showDetail, setShowDetail] = useState(false);
    const [selected, setSelected] = useState(null);

    const data = [
        {
            tanggal: "09-09-2025",
            pembeli: "Aldi",
            total: 250000,
            tunai: 150000,
            qris: 50000,
            kredit: 50000
        },
        {
            tanggal: "09-09-2025",
            pembeli: "Sinta",
            total: 180000,
            tunai: 100000,
            qris: 80000,
            kredit: 0
        },
    ];

    const filteredData = useMemo(() => {
        if (periode.includes("Dari")) {
            const from = new Date(customRange.from);
            const to = new Date(customRange.to);
            return data.filter((d) => {
                const date = new Date(d.tanggal);
                return date >= from && date <= to;
            });
        }
        return data;
    }, [periode, customRange, data]);

    const totalSemua = data.reduce((a, b) => a + b.total, 0);

    return (
        <div className="bg-white shadow-sm rounded-2xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-primary-base mb-4 flex items-center gap-2">
                <UserIcon className="w-5 h-5 md:w-6 md:h-6" /> Laporan Penjualan - Per Pembeli
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base border-t border-gray-100">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">Pembeli</th>
                            <th className="p-3 text-right">Total Transaksi</th>
                            <th className="p-3 text-right">Tunai</th>
                            <th className="p-3 text-right">QRIS</th>
                            <th className="p-3 text-right">Kredit</th>
                            <th className="p-3 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center py-6 text-gray-500">
                            Data yang Anda cari tidak ditemukan
                            </td>
                        </tr>
                        ) : (
                        filteredData.map((d, i) => (
                            <tr
                                key={i}
                                className="border-b hover:bg-gray-50 transition-colors"
                            >
                                <td className="p-3 whitespace-nowrap">{d.tanggal}</td>
                                <td className="p-3 whitespace-nowrap">{d.pembeli}</td>
                                <td className="p-3 text-right text-primary-dark font-medium">
                                    Rp {d.total.toLocaleString()}
                                </td>
                                <td className="p-3 text-right text-success-base whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1">
                                        <BanknotesIcon className="w-4 h-4" /> Rp {d.tunai.toLocaleString()}
                                    </div>
                                </td>
                                <td className="p-3 text-right text-info-base whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1">
                                        <QrCodeIcon className="w-4 h-4" /> Rp {d.qris.toLocaleString()}
                                    </div>
                                </td>
                                <td className="p-3 text-right text-accent-base whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-1">
                                        <CreditCardIcon className="w-4 h-4" /> Rp {d.kredit.toLocaleString()}
                                    </div>
                                </td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => {
                                            setSelected(d);
                                            setShowDetail(true);
                                        }}
                                        className="p-2 rounded-full hover:bg-gray-100 transition"
                                    >
                                        <EyeIcon className="w-4 h-4 text-primary-base" />
                                    </button>
                                </td>
                            </tr>
                        )))}
                        {filteredData.length === 0 ? (
                            <tr className="bg-gray-50 font-semibold">
                                <td className="p-3 text-right text-gray-700" colSpan="5">
                                    Total Penjualan:
                                </td>
                                <td className="p-3 text-right text-danger-base">Rp 0</td>
                            </tr>
                        ) : (
                            <tr className="bg-gray-50 font-semibold">
                                <td className="p-3 text-right text-gray-700" colSpan="5">
                                    Total Penjualan:
                                </td>
                                <td className="p-3 text-right text-primary-base">Rp {totalSemua.toLocaleString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Detail */}
            {showDetail && selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 sm:px-0">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fadeIn">
                        <button
                            onClick={() => setShowDetail(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-primary-base mb-4 flex items-center gap-2">
                                <UserIcon className="w-5 h-5" /> Detail Pembeli
                            </h3>

                            <div className="space-y-2 text-sm md:text-base">
                                <p>
                                    <span className="font-medium">Nama Pembeli:</span> {selected.pembeli}
                                </p>
                                <p>
                                    <span className="font-medium">Total Transaksi:</span> Rp {selected.total.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium text-success-base">Tunai:</span> Rp {selected.tunai.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium text-info-base">QRIS:</span> Rp {selected.qris.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium text-accent-base">Kredit:</span> Rp {selected.kredit.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
