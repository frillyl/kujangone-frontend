import { useState, useMemo } from "react";
import { EyeIcon, XMarkIcon, ReceiptPercentIcon, BanknotesIcon, UserIcon, CalendarIcon } from "@heroicons/react/24/outline";

export default function TabelPerTransaksi({ periode, customRange }) {
  const [selectedTransaksi, setSelectedTransaksi] = useState(null);

  const data = [
    {
      kode: "202509090522350001",
      tanggal: "09-09-2025",
      pembeli: "Aldi",
      total: 90000,
      kasir: "Budi",
      detail: [
        { nama: "Minyak Goreng", qty: 2, harga: 25000 },
        { nama: "Sabun Cuci Piring", qty: 2, harga: 20000 },
      ],
      metode: "Tunai",
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

  const handleClose = () => setSelectedTransaksi(null);

  return (
    <div className="bg-white shadow-sm rounded-2xl p-3 sm:p-4 md:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-primary-base mb-3 sm:mb-4 flex items-center gap-2">
        <ReceiptPercentIcon className="w-5 h-5" /> Laporan Penjualan - Per Transaksi
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm text-left border-t border-gray-100">
          <thead bg-gray-50 text-gray-600>
            <tr>
              <th className="p-2 sm:p-3">Kode</th>
              <th className="p-2 sm:p-3">Tanggal</th>
              <th className="p-2 sm:p-3">Pembeli</th>
              <th className="p-2 sm:p-3">Total</th>
              <th className="p-2 sm:p-3">Kasir</th>
              <th className="p-2 sm:p-3 text-center">Aksi</th>
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
              filteredData.map((trx, idx) => (
                <tr
                  key={idx}
                  className="border-b hover:bg-gray-50 transition text-gray-800"
                >
                  <td className="p-2 sm:p-3 font-medium break-all">{trx.kode}</td>
                  <td className="p-2 sm:p-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      {trx.tanggal}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3">
                    <div className="flex items-center gap-1">
                      <UserIcon className="w-4 h-4 text-gray-500" />
                      {trx.pembeli}
                    </div>
                  </td>
                  <td className="p-2 sm:p-3 text-primary-dark font-semibold whitespace-nowrap">
                    Rp {trx.total.toLocaleString()}
                  </td>
                  <td className="p-2 sm:p-3">{trx.kasir}</td>
                  <td className="p-2 sm:p-3 text-center">
                    <button
                      onClick={() => setSelectedTransaksi(trx)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-primary-light hover:text-white transition"
                      title="Lihat Detail"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
      </div>

      {/* Modal Detail Transaksi */}
      {selectedTransaksi && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-3 sm:p-6 z-50 animate-fadeIn overflow-auto">
          <div className="bg-white rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg shadow-xl border border-gray-100">
            {/* Header Modal */}
            <div className="p-3 sm:p-4 border-b flex justify-between items-center">
              <h3 className="text-base sm:text-lg font-semibold text-primary-base flex items-center gap-2">
                <ReceiptPercentIcon className="w-5 h-5" />  Detail Transaksi:
                <span className="break-all">{selectedTransaksi.kode}</span>
              </h3>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Isi Modal */}
            <div className="p-3 sm:p-4 space-y-3 text-sm sm:text-base">
              <p><strong>Tanggal:</strong> {selectedTransaksi.tanggal}</p>
              <p><strong>Pembeli:</strong> {selectedTransaksi.pembeli}</p>
              <p><strong>Kasir:</strong> {selectedTransaksi.kasir}</p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm mt-3 border-t border-gray-100">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="p-2 text-left">Nama Barang</th>
                      <th className="p-2 text-center">Qty</th>
                      <th className="p-2 text-right">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaksi.detail.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="p-2">{item.nama}</td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-right">
                          Rp {item.harga.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-3 gap-2">
                <span className="font-medium text-gray-600 flex items-center gap-1">
                  <BanknotesIcon className="w-4 h-4 text-success-base" /> Metode Pembayaran:
                </span>
                <span className="font-semibold text-success-dark">
                  {selectedTransaksi.metode}
                  </span>
              </div>

              <div className="text-right font-semibold pt-2 border-t">
                Total: Rp {selectedTransaksi.total.toLocaleString()}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t text-right">
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-primary-base text-white rounded-lg hover:bg-primary-dark transition text-sm sm:text-base"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}