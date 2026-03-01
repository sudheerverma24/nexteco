"use client";

import { useState } from "react";
import { Monitor, Smartphone, Shield, ChevronDown, ChevronUp, Copy, Check, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [showHistory, setShowHistory] = useState(false);
    const [copiedSha, setCopiedSha] = useState<string | null>(null);

    const IconComponent = (LucideIcons as any)[product.icon] || LucideIcons.Package;

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        setCopiedSha(type);
        setTimeout(() => setCopiedSha(null), 2000);
    };

    return (
        <div className="glass rounded-3xl p-8 transition-all hover:border-white/20 hover:bg-white/[0.07] group flex flex-col h-full">
            <div className="flex items-start justify-between mb-6">
                <Link href={`/product/${product.id}`} className="p-4 bg-blue-600/20 rounded-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <IconComponent className="w-8 h-8 text-blue-400" />
                </Link>
                <div className="text-right">
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">v{product.versionHistory[0].version}</span>
                </div>
            </div>

            <Link href={`/product/${product.id}`} className="cursor-pointer group/title">
                <h3 className="text-2xl font-bold mb-3 group-hover/title:text-blue-400 transition-colors">{product.name}</h3>
            </Link>
            <p className="text-slate-400 mb-8 leading-relaxed flex-grow">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                    <a
                        href={product.windowsDownloadUrl}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-medium text-sm"
                    >
                        <Monitor className="w-4 h-4" />
                        Windows
                    </a>
                    <button
                        onClick={() => copyToClipboard(product.windowsSha256, 'win')}
                        className="w-full text-[10px] font-mono text-slate-500 truncate bg-black/20 px-3 py-2 rounded-lg hover:text-slate-300 transition-colors flex items-center justify-between"
                    >
                        <span className="truncate">SHA256: {product.windowsSha256}</span>
                        {copiedSha === 'win' ? <Check className="w-3 h-3 flex-shrink-0 text-emerald-400" /> : <Copy className="w-3 h-3 flex-shrink-0" />}
                    </button>
                </div>

                <div className="space-y-3">
                    <a
                        href={product.androidDownloadUrl}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl transition-all font-medium text-sm"
                    >
                        <Smartphone className="w-4 h-4" />
                        Android
                    </a>
                    <button
                        onClick={() => copyToClipboard(product.androidSha256, 'apk')}
                        className="w-full text-[10px] font-mono text-slate-500 truncate bg-black/20 px-3 py-2 rounded-lg hover:text-slate-300 transition-colors flex items-center justify-between"
                    >
                        <span className="truncate">SHA256: {product.androidSha256}</span>
                        {copiedSha === 'apk' ? <Check className="w-3 h-3 flex-shrink-0 text-emerald-400" /> : <Copy className="w-3 h-3 flex-shrink-0" />}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                >
                    History
                    {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <Link
                    href={`/product/${product.id}`}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
                >
                    Full Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>

            {showHistory && (
                <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    {product.versionHistory.map((history, idx) => (
                        <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-xs text-slate-300">v{history.version}</span>
                                <span className="text-[10px] text-slate-500">{history.date}</span>
                            </div>
                            <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
                                {history.changes.map((change, cIdx) => (
                                    <li key={cIdx}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
