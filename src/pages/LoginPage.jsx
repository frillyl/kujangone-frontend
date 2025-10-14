import { AtSymbolIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/admin/dashboard");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary-light px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md md:mx-w-lg lg:max-w-xl xl:max-w-2xl p-6 sm:p-8">
                {/* Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-2 text-primary-dark">Selamat Datang</h1>
                <p className="text-center text-xs sm:text-sm md:text-base mb-6 text-gray-600">
                    Belum memiliki akun?{" "}
                    <a href="/register" className="font-semibold text-primary-base hover:underline">
                        Daftar
                    </a>
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {/* Email */}
                    <div className="flex items-center border border-gray-300 rounded-xl px-2 sm:px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-base">
                        <AtSymbolIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Email atau Username"
                            className="w-full outline-none bg-transparent text-xs sm:text-sm"
                        />
                    </div>
                    {/* Password */}
                    <div className="flex items-center border border-gray-300 rounded-xl px-2 sm:px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-primary-base">
                        <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full outline-none bg-transparent text-xs sm:text-sm"
                        />
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2 text-gray-600">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 text-primary-base focus:ring-primary-base"
                            />
                            <span>Ingat Saya</span>
                        </label>
                        <a
                            href="/forgot-password"
                            className="text-primary-base hover:underline font-medium"
                        >
                            Lupa Password?
                        </a>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-primary-base text-white py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-primary-dark transition text-sm sm:text-base"
                    >
                        Masuk
                    </button>
                </form>
            </div>
        </div>
    );
}