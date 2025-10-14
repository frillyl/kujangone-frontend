import { BanknotesIcon, CreditCardIcon, QrCodeIcon } from "@heroicons/react/16/solid";

export default function PaymentSummary() {
    const metode = [
        { nama: "Tunai", icon: <BanknotesIcon className="w-4 h-4" /> },
        { nama: "Kredit", icon: <CreditCardIcon className="w-4 h-4" /> },
        { nama: "QRIS", icon: <QrCodeIcon className="w-4 h-4" /> },
    ];

    return (
        <div className="bg-white border border-gray-100 eounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 sm:sticky sm:top-6">
            <div>
                <h4 className="font-semibold text-gray-800 text-sm sm:text-base">Item Dibeli <span className="text-xs sm:text-sm font-normal text-gray-500">(2)</span></h4>
                <div className="text-xs sm:text-sm text-gray-700 mt-1">
                    <p>1x Minyak Goreng 1L <span className="float-right">25.000</span></p>
                    <p>1x Gula Pasir 1KG <span className="float-right">15.000</span></p>
                </div>
            </div>
            <hr />
            <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                <p>Subtotal <span className="float-right font-medium">40.000</span></p>
                <p>Potongan <span className="float-right text-danger-base">-4.000</span></p>
                <p className="font-semibold mt-2 text-gray-800">Total <span className="float-right text-primary-base">36.000</span></p>
            </div>
            <div>
                <p className="font-semibold text-gray-800 text-sm sm:text-base">Metode Pembayaran</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {metode.map((m, i) => (
                        <button
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 border rounded-xl hover:bg-primary-light hover:text-white transition-all duration-150 text-xs sm:text-sm w-full sm:w-auto justify-center"
                        >
                            {m.icon}
                            {m.nama}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}