"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "../../components/AdminNav";
import { Save, ChevronLeft, Loader2, Eye, Edit3 } from "lucide-react";

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [pageData, setPageData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin/login");
            return;
        }

        const fetchPage = async () => {
            try {
                const res = await fetch(`/api/pages/${slug}`);
                if (res.ok) {
                    const data = await res.json();
                    setPageData(data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPage();
    }, [slug, router]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch(`/api/pages/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pageData),
            });
            if (res.ok) {
                alert("Page saved!");
            }
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black pl-64 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        </div>
    );

    if (!pageData) return null;

    return (
        <div className="min-h-screen bg-black text-slate-50 pl-64">
            <AdminNav />
            <main className="p-12 max-w-5xl">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <button onClick={() => router.back()} className="p-2 hover:bg-white/5 rounded-full">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-4xl font-bold">{pageData.title}</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setPreview(!preview)}
                            className="px-6 py-2 glass rounded-xl font-bold flex items-center gap-2"
                        >
                            {preview ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            {preview ? "Edit" : "Preview"}
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-8 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold flex items-center gap-2"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save
                        </button>
                    </div>
                </div>

                <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
                    {preview ? (
                        <div className="p-12 prose prose-invert max-w-none">
                            <h1 className="text-4xl font-bold mb-8">{pageData.title}</h1>
                            <div className="text-slate-300 whitespace-pre-wrap">{pageData.content}</div>
                        </div>
                    ) : (
                        <textarea
                            className="w-full bg-black/50 p-12 min-h-[600px] outline-none text-slate-300 font-mono text-lg resize-none"
                            value={pageData.content}
                            onChange={(e) => setPageData({ ...pageData, content: e.target.value })}
                            placeholder="Page content (Markdown/HTML supported)..."
                        />
                    )}
                </div>
            </main>
        </div>
    );
}
