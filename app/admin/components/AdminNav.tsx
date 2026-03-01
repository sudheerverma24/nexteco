"use client";

import Link from "next/link";
import { LayoutDashboard, LogOut, Settings, Globe, HelpCircle, FileText } from "lucide-react";

export default function AdminNav() {
    const handleLogout = () => {
        localStorage.removeItem("admin_auth");
        window.location.href = "/admin/login";
    };

    return (
        <nav className="fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-white/5 p-6 flex flex-col z-50">
            <div className="mb-12">
                <Link href="/" className="text-2xl font-bold gradient-text flex items-center gap-2">
                    NextECO <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full">Admin</span>
                </Link>
            </div>

            <div className="flex-grow space-y-2">
                <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all font-medium"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    Products
                </Link>
                <Link
                    href="/admin/faqs"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all font-medium"
                >
                    <HelpCircle className="w-5 h-5" />
                    FAQs
                </Link>
                <Link
                    href="/admin/pages"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all font-medium"
                >
                    <FileText className="w-5 h-5" />
                    Static Pages
                </Link>
                <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all font-medium"
                >
                    <Settings className="w-5 h-5" />
                    Global Settings
                </Link>
                <div className="pt-4 mt-4 border-t border-white/5">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all font-medium"
                    >
                        <Globe className="w-5 h-5" />
                        Live Website
                    </Link>
                </div>
            </div>

            <div className="pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-all font-bold"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </div>
        </nav>
    );
}
