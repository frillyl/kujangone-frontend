import { MinusIcon, PlusIcon, ShoppingBagIcon } from "@heroicons/react/16/solid";

export default function ProductCard() {
    return (
        <div className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-md transition-all duration-200 group">
            <div className="flex items-center gap-2 mb-1 text-primary-base">
                <ShoppingBagIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <p className="text-[10px] sm:text-xs font-medium">Sembako</p>
            </div>
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-primary-dark">Minyak Goreng 1L</h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Rp 25.000,00</p>
            <div className="flex items-center justify-between mt-2 sm:mt-3 text-gray-500">
                <button className="p-1 rounded-full hover:bg-gray-100">
                    <MinusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="text-xs sm:text-sm font-medium text-gray-800">0</span>
                <button className="p-1 rounded-full hover:bg-gray-100">
                    <PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
            </div>
        </div>
    );
}