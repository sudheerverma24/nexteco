"use client";

import { motion } from "framer-motion";
import { CompanyInfo } from "@/data/company";

export default function AboutSectionClient({ info }: { info: CompanyInfo }) {
    return (
        <section id="about" className="py-32 bg-slate-900/40 relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full -z-10" />
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold mb-10"
                    >
                        About {info.name}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <p className="text-2xl md:text-3xl text-slate-300 leading-relaxed mb-16 italic font-light">
                            "{info.mission}"
                        </p>

                        <div className="text-lg md:text-xl text-slate-400 leading-relaxed space-y-8 text-left glass p-12 md:p-16 rounded-[3rem] border-white/5 relative overflow-hidden group">
                            <p className="relative z-10">
                                Founded in <span className="text-blue-400 font-bold">{info.founded}</span>, {info.name} has been at the forefront of
                                building a cleaner, faster digital world. Our headquarters in <span className="text-emerald-400 font-semibold">{info.headquarters}</span> serves as the hub for our global efforts to redefine how users interact with their devices.
                            </p>
                            <p className="relative z-10 leading-loose">
                                {info.about}
                            </p>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] -z-10 group-hover:bg-blue-600/10 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 blur-[80px] -z-10 group-hover:bg-emerald-600/10 transition-colors" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
