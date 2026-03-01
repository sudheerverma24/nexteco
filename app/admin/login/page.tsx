"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple mock password for demo purposes
        if (password === "admin123") {
            localStorage.setItem("admin_auth", "true");
            router.push("/admin");
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-12 rounded-[3.5rem] border-white/10 w-full max-w-md relative overflow-hidden"
            >
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                        <Lock className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-3">Admin Access</h1>
                    <p className="text-slate-400">Enter your credentials to manage NextECO software ecosystem.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Admin Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-black/40 border ${error ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 focus:border-blue-500 outline-none transition-all pr-12`}
                        />
                        {error && (
                            <ShieldAlert className="w-5 h-5 text-red-500 absolute right-4 top-4 animate-bounce" />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20"
                    >
                        Access Dashboard
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                <p className="text-center text-xs text-slate-600 mt-10">
                    Secure encrypted session. Unauthorized access is monitored.
                </p>

                {/* Background glow hack */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl -z-10" />
            </motion.div>
        </div>
    );
}
