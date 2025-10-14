import { useState, useMemo } from "react";
import { CubeIcon, TagIcon, CurrencyDollarIcon, EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TabelPerBarang({ periode, customRange }) {
    const [showDetail, setShowDetail] = useState(false);
    const [selected, setSelected] = useState(null);

    const data = [
        {
            tanggal: "09-09-2025",
            barang: "Minyak Goreng",
            jumlah: 1,
            hpp: 20000,
            harga: 25000,
            untung: 5000 },
        {
            tanggal: "09-09-2025",
            barang: "Sabun Cuci Piring",
            jumlah: 2,
            hpp: 15000,
            harga: 20000,
            untung: 10000
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

    const totalUntung = data.reduce((a, b) => a + b.untung, 0);

    return (
        <div className="bg-white shadow-sm rounded-2xl p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-primary-base mb-4 flex items-center gap-2">
                <CubeIcon className="w-5 h-5 md:w-6 md:h-6" /> Laporan Penjualan - Per Barang
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full text-sm md:text-base border-t border-gray-100">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 text-left">Tanggal</th>
                            <th className="p-3 text-left">Barang</th>
                            <th className="p-3 text-center">Jumlah</th>
                            <th className="p-3 text-right">HPP</th>
                            <th className="p-3 text-right">Harga Jual</th>
                            <th className="p-3 text-right">Keuntungan</th>
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
                                <td className="p-3">{d.tanggal}</td>
                                <td className="p-3 flex items-center gap-2 whitespace-nowrap">
                                    <TagIcon className="w-4 h-4 text-gray-500" /> {d.barang}
                                </td>
                                <td className="p-3 text-center">{d.jumlah}</td>
                                <td className="p-3 text-right text-gray-600">Rp {d.hpp.toLocaleString()}</td>
                                <td className="p-3 text-right text-primary-dark font-medium">Rp {d.harga.toLocaleString()}</td>
                                <td className="p-3 text-right text-success-base font-semibold">Rp {d.untung.toLocaleString()}</td>
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
                                <td colSpan="5" className="p-3 text-right text-gray-700 whitespace-nowrap">Total Keuntungan:</td>
                                <td className="p-3 text-right text-danger-base whitespace-nowrap">Rp 0</td>
                                <td></td>
                            </tr>
                        ) : (
                            <tr className="bg-gray-50 font-semibold">
                                <td colSpan="5" className="p-3 text-right text-gray-700 whitespace-nowrap">Total Keuntungan:</td>
                                <td className="p-3 text-right text-success-base whitespace-nowrap">Rp {totalUntung.toLocaleString()}</td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Detail */}
            {showDetail && selected && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 sm:px-0 animate-fadeIn">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative animate-fadeIn">
                        <button
                            onClick={() => setShowDetail(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-semibold text-primary-base mb-4 flex items-center gap-2">
                            <TagIcon className="w-5 h-5" /> Detail Barang
                        </h3>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-primary-base mb-4 flex items-center gap-2">
                                <TagIcon className="w-5 h-5" /> Detail Barang
                            </h3>
                            <div className="space-y-2 text-sm md:text-base">
                                <p>
                                    <span className="font-medium">Tanggal:</span> {selected.tanggal}
                                </p>
                                <p>
                                    <span className="font-medium">Nama Barang:</span> {selected.barang}
                                </p>
                                <p>
                                    <span className="font-medium">Jumlah:</span> {selected.jumlah}
                                </p>
                                <p>
                                    <span className="font-medium">Harga Pokok (HPP):</span> Rp {selected.hpp.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium">Harga Jual:</span> Rp {selected.harga.toLocaleString()}
                                </p>
                                <p>
                                    <span className="font-medium text-success-base">Keuntungan:</span> Rp {selected.untung.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
