"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminNav from "../components/AdminNav";
import { Save, Loader2, Mail, MapPin, Phone, Building, Globe, Zap } from "lucide-react";
import { CompanyInfo } from "@/data/company";

export default function AdminSettings() {
    const [settings, setSettings] = useState<CompanyInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin/login");
            return;
        }

        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!settings) return;

        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert("Settings updated successfully!");
            } else {
                alert("Failed to update settings");
            }
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading || !settings) {
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

            <main className="p-12 max-w-5xl">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Global Site Settings</h1>
                    <p className="text-slate-400">Update your company information, mission statement, and contact details.</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Company Branding */}
                    <section className="glass p-10 rounded-[2.5rem] border-white/5 space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Building className="w-6 h-6 text-blue-400" />
                            Company Identity
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Company Name</label>
                                <input
                                    type="text"
                                    title="Company Name"
                                    placeholder="Enter company name"
                                    value={settings.name}
                                    onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400">Tagline / Headline</label>
                                <input
                                    type="text"
                                    title="Tagline"
                                    placeholder="Enter company tagline"
                                    value={settings.tagline}
                                    onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Mission Statement</label>
                            <textarea
                                rows={3}
                                title="Mission Statement"
                                placeholder="Enter mission statement"
                                value={settings.mission}
                                onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">About Description (Long)</label>
                            <textarea
                                rows={5}
                                title="About Description"
                                placeholder="Enter company description"
                                value={settings.about}
                                onChange={(e) => setSettings({ ...settings, about: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all resize-none"
                            />
                        </div>
                    </section>

                    {/* Contact Info */}
                    <section className="glass p-10 rounded-[2.5rem] border-white/5 space-y-8">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <Zap className="w-6 h-6 text-emerald-400" />
                            Contact Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                                    <Mail className="w-4 h-4" /> Email Address
                                </label>
                                <input
                                    type="email"
                                    title="Contact Email"
                                    placeholder="Enter contact email"
                                    value={settings.contact.email}
                                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                                    <Phone className="w-4 h-4" /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    title="Phone Number"
                                    placeholder="Enter contact phone"
                                    value={settings.contact.phone}
                                    onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                                <MapPin className="w-4 h-4" /> Office Address
                            </label>
                            <input
                                type="text"
                                title="Office Address"
                                placeholder="Enter office address"
                                value={settings.contact.address}
                                onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </section>

                    <div className="flex justify-end gap-4 pb-12">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
