"use client";

import { useState, useEffect } from "react";
import { X, Save, Plus, Trash2 } from "lucide-react";
import { Product, VersionHistory } from "@/data/products";

interface ProductFormProps {
    product?: Product;
    onClose: () => void;
    onSave: () => void;
}

export default function ProductForm({ product, onClose, onSave }: ProductFormProps) {
    const [formData, setFormData] = useState<Product>(
        product || {
            id: "",
            name: "",
            description: "",
            fullDescription: "",
            features: [""],
            icon: "Package",
            windowsDownloadUrl: "#",
            androidDownloadUrl: "#",
            windowsSha256: "",
            androidSha256: "",
            versionHistory: [{ version: "1.0.0", date: new Date().toISOString().split('T')[0], changes: [""] }],
        }
    );

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simple ID generation if missing
        if (!formData.id) {
            formData.id = formData.name.toLowerCase().replace(/\s+/g, '-');
        }

        const method = product ? 'PUT' : 'POST';
        const url = product ? `/api/products/${product.id}` : '/api/products';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onSave();
                onClose();
            } else {
                alert("Failed to save product");
            }
        } catch (error) {
            console.error("Save error:", error);
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const removeFeature = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures });
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="sticky top-0 bg-slate-900 px-8 py-6 border-b border-white/5 flex items-center justify-between z-10">
                    <h2 className="text-2xl font-bold">{product ? "Edit Product" : "Add New Product"}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/5 rounded-full transition-colors"
                        title="Close"
                        aria-label="Close"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Product Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                placeholder="e.g., EcoCleaner Pro"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Icon (Lucide Name)</label>
                            <input
                                required
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                placeholder="Zap, Shield, Lock, Cloud..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">Short Description</label>
                        <input
                            required
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                            placeholder="One-line summary for the grid"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-400">Full Description</label>
                        <textarea
                            required
                            rows={4}
                            value={formData.fullDescription}
                            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all resize-none"
                            placeholder="Detailed explanation for the product page"
                        />
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-slate-400">Key Features</label>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-xs font-bold text-blue-400 flex items-center gap-1 hover:text-blue-300"
                            >
                                <Plus className="w-3 h-3" /> Add Feature
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {formData.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        required
                                        type="text"
                                        value={feature}
                                        onChange={(e) => updateFeature(idx, e.target.value)}
                                        className="flex-grow bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none transition-all"
                                        aria-label={`Feature ${idx + 1}`}
                                        placeholder={`Feature ${idx + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(idx)}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                        aria-label="Remove feature"
                                        title="Remove feature"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Download URLs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Windows Download (.exe)</label>
                            <input
                                type="text"
                                value={formData.windowsDownloadUrl}
                                onChange={(e) => setFormData({ ...formData, windowsDownloadUrl: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                aria-label="Windows Download URL"
                                placeholder="https://..."
                            />
                            <input
                                type="text"
                                value={formData.windowsSha256}
                                onChange={(e) => setFormData({ ...formData, windowsSha256: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-mono focus:border-blue-500 outline-none transition-all"
                                placeholder="Windows SHA256 Hash"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-400">Android Download (.apk)</label>
                            <input
                                type="text"
                                value={formData.androidDownloadUrl}
                                onChange={(e) => setFormData({ ...formData, androidDownloadUrl: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all"
                                aria-label="Android Download URL"
                                placeholder="https://..."
                            />
                            <input
                                type="text"
                                value={formData.androidSha256}
                                onChange={(e) => setFormData({ ...formData, androidSha256: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs font-mono focus:border-blue-500 outline-none transition-all"
                                placeholder="Android SHA256 Hash"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pb-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 rounded-xl hover:bg-white/5 transition-all font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save className="w-5 h-5" />
                            {loading ? "Saving..." : "Save Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
