import { getProductById } from "@/lib/data-fetchers";
import { notFound } from "next/navigation";
import ProductNavbar from "@/components/ProductNavbar";
import Footer from "@/components/Footer";
import * as LucideIcons from "lucide-react";
import { Monitor, Smartphone, CheckCircle2, Shield, Clock, Download, Copy, Check } from "lucide-react";
import CopyButton from "@/components/CopyButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    const IconComponent = (LucideIcons as any)[product.icon] || LucideIcons.Package;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            <ProductNavbar />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    {/* Hero Section of Product */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <div className="w-20 h-20 bg-blue-600/20 rounded-3xl flex items-center justify-center mb-8">
                                <IconComponent className="w-10 h-10 text-blue-400" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6">{product.name}</h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-10">
                                {product.fullDescription}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={product.windowsDownloadUrl}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                                >
                                    <Monitor className="w-5 h-5" />
                                    Download for Windows
                                </a>
                                <a
                                    href={product.androidDownloadUrl}
                                    className="px-8 py-4 glass hover:bg-white/10 text-white rounded-full font-bold transition-all flex items-center gap-3 hover:scale-105 active:scale-95"
                                >
                                    <Smartphone className="w-5 h-5" />
                                    Download for Android
                                </a>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full -z-10" />
                            <div className="glass aspect-video rounded-[3rem] p-1 border-white/10 overflow-hidden">
                                <div className="w-full h-full bg-slate-900 rounded-[2.8rem] flex items-center justify-center relative">
                                    <IconComponent className="w-32 h-32 text-blue-600/20 absolute pulse" />
                                    <div className="z-10 text-center">
                                        <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                        <span className="text-blue-400 font-mono text-sm uppercase tracking-widest">Verified & Secure</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features & Technical Specs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                        <div className="glass p-10 rounded-[2.5rem] border-white/5">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                                Key Features
                            </h2>
                            <ul className="space-y-6">
                                {product.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-1 flex-shrink-0">
                                            <Check className="w-3 h-3 text-emerald-400" />
                                        </div>
                                        <span className="text-lg text-slate-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="glass p-10 rounded-[2.5rem] border-white/5">
                            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                                <Shield className="w-8 h-8 text-blue-400" />
                                Security Verification
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <span className="block text-sm text-slate-500 mb-2 uppercase tracking-wider font-semibold">Windows Executable (.exe)</span>
                                    <div className="bg-black/40 rounded-2xl p-4 font-mono text-sm break-all text-slate-400 border border-white/5 relative group/copy">
                                        SHA256: {product.windowsSha256}
                                        <CopyButton text={product.windowsSha256} />
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-sm text-slate-500 mb-2 uppercase tracking-wider font-semibold">Android Package (.apk)</span>
                                    <div className="bg-black/40 rounded-2xl p-4 font-mono text-sm break-all text-slate-400 border border-white/5 relative group/copy">
                                        SHA256: {product.androidSha256}
                                        <CopyButton text={product.androidSha256} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Version History Full */}
                    <div className="mb-24">
                        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                            <Clock className="w-8 h-8 text-slate-400" />
                            Complete Version History
                        </h2>
                        <div className="space-y-6">
                            {product.versionHistory.map((history, idx) => (
                                <div key={idx} className="glass p-8 rounded-3xl border-white/5 flex flex-col md:flex-row md:items-start gap-8">
                                    <div className="md:w-48 flex-shrink-0">
                                        <span className="text-2xl font-bold text-blue-400">v{history.version}</span>
                                        <span className="block text-sm text-slate-500 mt-1">{history.date}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-4 text-slate-200">What's New:</h4>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                                            {history.changes.map((change, cIdx) => (
                                                <li key={cIdx} className="flex items-center gap-3 text-slate-400">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                                    {change}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="glass p-12 rounded-[3rem] border-white/10 text-center bg-gradient-to-b from-blue-600/10 to-transparent">
                        <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
                        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                            Download {product.name} today and join thousands of users who trust NextECO Solutions.
                        </p>
                        <div className="flex justify-center gap-6">
                            <a href={product.windowsDownloadUrl} className="flex items-center gap-2 font-bold hover:text-blue-400 transition-colors">
                                <Download className="w-5 h-5" /> Windows
                            </a>
                            <a href={product.androidDownloadUrl} className="flex items-center gap-2 font-bold hover:text-blue-400 transition-colors">
                                <Download className="w-5 h-5" /> Android
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
