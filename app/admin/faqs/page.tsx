"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "../components/AdminNav";
import { Plus, Trash2, Save, Loader2, Eye, EyeOff, GripVertical, Check, X } from "lucide-react";
import { FAQItem } from "@/data/faq";

export default function AdminFAQs() {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin/login");
            return;
        }

        fetchFaqs();
    }, [router]);

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/faqs");
            const data = await res.json();
            setFaqs(data);
        } catch (error) {
            console.error("Failed to fetch FAQs:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveFaqs = async (updatedFaqs: FAQItem[]) => {
        setSaving(true);
        try {
            const res = await fetch("/api/faqs", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedFaqs),
            });
            if (res.ok) {
                setFaqs(updatedFaqs);
            } else {
                alert("Failed to save FAQs");
            }
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    const addFaq = () => {
        const newFaq: FAQItem = {
            id: `faq-${Date.now()}`,
            question: "New Question?",
            answer: "New Answer.",
            hidden: false,
        };
        const newFaqs = [...faqs, newFaq];
        setFaqs(newFaqs);
        setIsEditing(newFaq.id);
    };

    const deleteFaq = (id: string) => {
        if (!confirm("Are you sure you want to delete this FAQ?")) return;
        const newFaqs = faqs.filter((f) => f.id !== id);
        saveFaqs(newFaqs);
    };

    const toggleVisibility = (id: string) => {
        const newFaqs = faqs.map((f) =>
            f.id === id ? { ...f, hidden: !f.hidden } : f
        );
        saveFaqs(newFaqs);
    };

    const updateFaqContent = (id: string, field: keyof FAQItem, value: any) => {
        setFaqs(faqs.map((f) => f.id === id ? { ...f, [field]: value } : f));
    };

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
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">FAQ Management</h1>
                        <p className="text-slate-400">Manage support questions and toggle visibility for the home page.</p>
                    </div>
                    <button
                        onClick={addFaq}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-5 h-5" />
                        Add New FAQ
                    </button>
                </header>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div
                            key={faq.id}
                            className={`glass p-8 rounded-3xl border border-white/5 transition-all ${faq.hidden ? 'opacity-50 grayscale select-none' : ''}`}
                        >
                            <div className="flex items-start gap-6">
                                <div className="pt-2 text-slate-600 cursor-grab active:cursor-grabbing">
                                    <GripVertical className="w-5 h-5" />
                                </div>

                                <div className="flex-grow space-y-4">
                                    {isEditing === faq.id ? (
                                        <>
                                            <input
                                                autoFocus
                                                type="text"
                                                title="FAQ Question"
                                                placeholder="Enter question"
                                                value={faq.question}
                                                onChange={(e) => updateFaqContent(faq.id, "question", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all font-bold text-lg"
                                            />
                                            <textarea
                                                rows={3}
                                                title="FAQ Answer"
                                                placeholder="Enter answer"
                                                value={faq.answer}
                                                onChange={(e) => updateFaqContent(faq.id, "answer", e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all resize-none text-slate-300"
                                            />
                                            <div className="flex justify-end gap-2 pt-2">
                                                <button
                                                    onClick={() => setIsEditing(null)}
                                                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-bold transition-all"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => { setIsEditing(null); saveFaqs(faqs); }}
                                                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                                                >
                                                    <Check className="w-4 h-4" /> Save
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-xl font-bold">{faq.question}</h3>
                                            <p className="text-slate-400">{faq.answer}</p>
                                        </>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setIsEditing(faq.id)}
                                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-slate-300"
                                        title="Edit"
                                    >
                                        <Save className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => toggleVisibility(faq.id)}
                                        className={`p-3 rounded-xl transition-all ${faq.hidden ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'}`}
                                        title={faq.hidden ? "Show" : "Hide"}
                                    >
                                        {faq.hidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => deleteFaq(faq.id)}
                                        className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors text-red-500"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {faqs.length === 0 && !loading && (
                        <div className="text-center py-20 glass rounded-[3rem] border-dashed border-white/10">
                            <p className="text-slate-500">No FAQs found. Add your first support question.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
