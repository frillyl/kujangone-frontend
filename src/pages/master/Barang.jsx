import { useState } from "react";
import Swal from "sweetalert2";
import { EyeIcon, PencilSquareIcon, TrashIcon, ArrowPathIcon, PlusIcon, XMarkIcon, ArchiveBoxIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Barang() {
    const [data, setData] = useState([
        { id: 1, kode: "8992388120177", nama: "Indomie Goreng 85 g", kategori: "Makanan", status: "Milik Koperasi", harga_pokok: "3.500", harga_jual: "4.000", stok: "40", satuan: "Bungkus", created_at: "2025-09-01", created_by: "Admin", edited_at: "2025-09-20", edited_by: "Admin", },
        { id: 2, kode: "8991002100271", nama: "Kopi Kapal Api Special Mix 165 g Goreng", kategori: "Minuman", status: "Milik Koperasi", harga_pokok: "14.000", harga_jual: "14.500", stok: "20", satuan: "Bungkus", created_at: "2025-09-01", created_by: "Admin", edited_at: "2025-09-20", edited_by: "Admin", },
        { id: 3, kode: "8999999055010", nama: "Rinso Anti Noda 800 g", kategori: "Deterjen", status: "Milik Koperasi", harga_pokok: "25.000", harga_jual: "25.500", stok: "10", satuan: "Bungkus", created_at: "2025-09-01", created_by: "Admin", edited_at: "2025-09-20", edited_by: "Admin", },
        { id: 4, kode: "8999999706011", nama: "Clear Men Cool Sport Menthol 170 ml", kategori: "Perawatan", status: "Milik Koperasi", harga_pokok: "25.000", harga_jual: "25.500", stok: "15", satuan: "Botol", created_at: "2025-09-01", created_by: "Admin", edited_at: "2025-09-20", edited_by: "Admin", },
        { id: 5, kode: "8997009091054", nama: "Minyak Goreng Sania 1 L", kategori: "Sembako", status: "Milik Koperasi", harga_pokok: "18.000", harga_jual: "18.500", stok: "30", satuan: "Pouch", created_at: "2025-09-01", created_by: "Admin", edited_at: "2025-09-20", edited_by: "Admin", },
    ]);

    const [modalType, setModalType] = useState(null);
    const [selected, setSelected] = useState(null);

    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = data.filter((item) => 
        item.nama.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIdx, startIdx + itemsPerPage);

    const openDetail = (item) => {
        setSelected(item);
        setModalType("detail");
    };

    const openForm = (item = null) => {
        setSelected(item);
        setModalType("form");
    };

    const closeModal = () => {
        setSelected(null);
        setModalType(null);
    };

    const confirmDelete = (item) => {
        Swal.fire({
            target: document.getElementById('main-content'),
            title: "Hapus Data?",
            text: `Apakah Anda yakin ingin menghapus ${item.nama}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "var(--color-danger-base)",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Ya, Hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                setData(data.filter((d) => d.id !== item.id));
                Swal.fire({
                    target: document.getElementById('main-content'),
                    title: "Terhapus!",
                    text: "Data berhasil dihapus.",
                    icon: "success",
                });
            }
        });
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {/* Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
                <div className="flex items-center gap-2">
                    <ArchiveBoxIcon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-base" />
                    <h1 className="text-lg sm:text-2xl font-bold text-primary-dark">Data Barang</h1>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                    Data Utama /{" "}
                    <span className="font-semibold text-gray-800">Barang</span>
                </div>
            </div>

            {/* Search + Button Tambah */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2 w-full">
                {/* Search Box */}
                <div className="w-full sm:w-auto order-2 sm:order-1">
                    <input
                        type="text"
                        placeholder="Cari data barang..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full sm:w-64 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-base text-sm"
                    />
                </div>

                {/* Button Tambah */}
                <div className="w-full sm:w-auto flex justify-end order-1 sm:order-2">
                    <button
                        onClick={() => openForm()}
                        className="flex items-center gap-2 bg-primary-base hover:bg-primary-dark text-white px-3 py-2 rounded-lg shadow text-sm sm:text-base transition">
                            <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            Tambah Data
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs sm:text-sm md:text-base border-separate border-spacing-y-2">
                    <thead>
                        <tr className="bg-primary-light text-white">
                            <th className="px-2 py-1 sm:px-4 sm:py-2 rounded-l-md">No.</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2">Kode</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2">Nama</th>
                            <th className="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">Harga Jual</th>
                            <th className="hidden lg:table-cell px-2 py-1 sm:px-4 sm:py-2">Status</th>
                            <th className="px-2 py-1 sm:px-4 sm:py-2 rounded-r-md">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    Data yang Anda cari tidak ditemukan
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item, idx) => (
                                <tr key={item.id} className="bg-white hover:bg-gray-50 shadow-sm transition">
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{startIdx + idx + 1}.</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{item.kode}</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{item.nama}</td>
                                    <td className="hidden md:table-cell px-2 py-1 sm:px-4 sm:py-2">{item.harga_jual}</td>
                                    <td className="hidden lg:table-cell px-2 py-1 sm:px-4 sm:py-2">{item.status}</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 flex gap-2 sm:gap-3">
                                        <EyeIcon
                                            onClick={() => openDetail(item)}
                                            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 cursor-pointer hover:text-info-base" />
                                        <PencilSquareIcon
                                            onClick={() => openForm(item)}
                                            className="w-4 h-4 sm:w-5 sm:h-5 text-primary-base cursor-pointer hover:text-primary-dark" />
                                        <TrashIcon
                                            onClick={() => confirmDelete(item)}
                                            className="w-4 h-4 sm:w-5 sm:h-5 text-danger-base cursor-pointer hover:text-danger-dark" />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
                <div className="flex justify-end mt-4 gap-2 text-sm items-center">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="p-2 border rounded disabled:opacity-50"
                    >
                        <ChevronLeftIcon className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 border rounded">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="p-2 border rounded disabled:opacity-50"
                    >
                        <ChevronRightIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Modal Detail */}
            {modalType === "detail" && selected && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-[95%] sm:w-[600px] max-w-3xl relative shadow-lg">
                        <button onClick={closeModal} className="absolute top-2 right-2">
                            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700" />
                        </button>
                        <h2 className="text-lg sm:text-xl font-bold mb-4 text-primary-base">Detail Anggota</h2>

                        <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold w-28 sm:w-40 bg-gray-50">Kode</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.kode}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold w-28 sm:w-40 bg-gray-50">Nama</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.nama}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Kategori</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.kategori}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Status</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.status}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Harga Pokok</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.harga_pokok}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Harga Jual</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.harga_jual}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Stok</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.stok} {selected.satuan}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Didaftarkan Pada</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.created_at}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Didaftarkan Oleh</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.created_by}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Diperbarui Pada</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.edited_at}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2 font-semibold bg-gray-50">Diperbarui Oleh</td>
                                    <td className="px-2 py-1 sm:px-4 sm:py-2">{selected.edited_by}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal Form Tambah/Edit */}
            {modalType === "form" && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-[95%] sm:w-[600px] max-w-3xl relative shadow-lg">
                        <button onClick={closeModal} className="absolute top-2 right-2">
                            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 hover:text-gray-700" />
                        </button>
                        <h2 className="text-lg sm:text-xl font-bold mb-4 text-primary-base">
                            {selected ? "Edit Anggota" : "Tambah Anggota"}
                        </h2>
                        <form className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base">
                            <input
                                type="text"
                                defaultValue={selected?.kode || ""}
                                placeholder="Kode"
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            />
                            <input
                                type="text"
                                defaultValue={selected?.nama || ""}
                                placeholder="Nama"
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            />
                            <select
                                defaultValue={selected?.kategori || ""}
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            >
                                <option value="" disabled>--- Pilih Kategori ---</option>
                                <option value="makanan">Makanan</option>
                                <option value="minuman">Minuman</option>
                                <option value="deterjen">Deterjen</option>
                                <option value="perawatan">Perawatan</option>
                                <option value="sembako">Sembako</option>
                            </select>
                            <select
                                defaultValue={selected?.status || ""}
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            >
                                <option value="" disabled>--- Pilih Status ---</option>
                                <option value="koperasi">Milik Koperasi</option>
                                <option value="konsinyasi">Konsinyasi</option>
                            </select>
                            <input
                                type="text"
                                defaultValue={selected?.harga_pokok || ""}
                                placeholder="Harga Pokok"
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            />
                            <input
                                type="text"
                                defaultValue={selected?.harga_jual || ""}
                                placeholder="Harga Jual"
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            />
                            <input
                                type="text"
                                defaultValue={selected?.stok || ""}
                                placeholder="Stok"
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            />
                            <select
                                defaultValue={selected?.satuan || ""}
                                className="w-full border rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-primary-base"
                            >
                                <option value="" disabled>--- Pilih Satuan ---</option>
                                <option value="bungkus">Bungkus</option>
                                <option value="botol">Botol</option>
                                <option value="pouch">Pouch</option>
                            </select>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-blue-600 text-white"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}