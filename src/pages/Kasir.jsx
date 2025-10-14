import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import ProductCard from "../components/pos/ProductCard";
import PaymentSummary from "../components/pos/PaymentSummary";

export default function Kasir() {
    const [kategori, setKategori] = useState(["Sembako", "Makanan", "Minuman"]);

    return (
        <div className="p-4 sm:p-5 md:p-6 xl:p-8 space-y-6">
            {/* Header */}
            <h1 className="text-xl sm:text-2xl font-bold text-primary-base">Kasir</h1>

            {/* Info Penjualan */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
                <div>
                    <label className="text-sm font-medium text-gray-600">Kode Penjualan</label>
                    <div className="border rounded-xl px-3 py-2 text-primary-base bg-primary-light/10 text-xs sm:text-sm">
                        202509090522350001
                    </div>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Tanggal</label>
                    <input type="date" className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Jam</label>
                    <input type="time" className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-primary-light" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Pembeli</label>
                    <select className="w-full border rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-primary-light">
                        <option>--- Pilih Pembeli ---</option>
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">Kasir</label>
                    <div className="border rounded-xl px-3 py-2 text-info-base bg-info-light/10 text-sm">John Doe</div>
                </div>
            </div>

            {/* Filter & Pencarian */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="flex items-center border rounded-xl px-2 sm:px-3 py-1.5 sm:py-2 w-full sm:w-64 bg-white shadow-sm">
                    <input
                        type="text"
                        placeholder="Kode barang atau nama barang..."
                        className="w-full outline-none text-sm"
                    />
                    <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {kategori.map((k, i) => (
                        <button
                            key={i}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border text-xs sm:text-sm transition-all ${
                                i === 0 ? "bg-primary-base text-white shadow-md" : "hover:bg-primary-light/10 text-gray-700"
                            }`}
                        >
                            {k}
                        </button>
                    ))}
                </div>
            </div>

            {/* Produk & Ringkasan */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
                    {[...Array(12)].map((_, i) => (
                        <ProductCard key={i} />
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <PaymentSummary />
                </div>
            </div>
        </div>
    );
}