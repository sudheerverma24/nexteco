"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";

interface HeroContent {
    name: string;
    tagline: string;
    mission: string;
}

export default function HeroClient({ content }: { content: HeroContent }) {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full -z-10" />
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-6"
                >
                    <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold mb-4">
                        {content.tagline}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight whitespace-pre-line">
                        The Future of <br />
                        <span className="gradient-text">{content.name}</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
                >
                    {content.mission}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-5 justify-center"
                >
                    <a
                        href="#products"
                        className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all flex items-center justify-center gap-3 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        <Download className="w-5 h-5" />
                        Explore Products
                    </a>
                    <Link
                        href="/support/documentation"
                        className="px-10 py-5 glass hover:bg-white/10 text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95 text-center flex items-center justify-center"
                    >
                        View Documentation
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
