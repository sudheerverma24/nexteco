"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "../components/AdminNav";
import { FileText, ChevronRight, Loader2, Plus, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminPagesList() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin/login");
            return;
        }

        const fetchPages = async () => {
            try {
                const res = await fetch("/api/faqs"); // We need a proper pages API, but for now I'll deduce from site-settings
                const resSettings = await fetch("/api/settings"); // Or just read site-settings.json directly via another route
                // Actually, let's create a dedicated list for internal use or just hardcode the slugs for now
                const slugs = ["documentation", "security-policy", "privacy-policy", "terms-of-service"];
                const pagesData = slugs.map(slug => ({
                    slug,
                    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
                }));
                setPages(pagesData);
            } catch (error) {
                console.error("Failed to fetch pages:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPages();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-slate-50 pl-64 flex items-center justify-center">
                <AdminNav />
                <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-slate-50 pl-64">
            <AdminNav />

            <main className="p-12">
                <header className="mb-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Static Pages</h1>
                        <p className="text-slate-400">Edit legal documentation, security policies, and user guides.</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/admin/pages/${page.slug}`}
                            className="glass p-8 rounded-[2.5rem] border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                                    <FileText className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{page.title}</h3>
                                    <p className="text-sm text-slate-500 font-mono tracking-tight lowercase">/support/{page.slug}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-2 transition-all" />
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
}
