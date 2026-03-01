"use client";

import { Shield, Zap, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, any> = {
    "Security First": Shield,
    "Performance Driven": Zap,
    "Sustainability": Leaf,
};

export default function FeaturesClient({ info, name }: { info: any[], name: string }) {
    return (
        <section className="py-24 container mx-auto px-6">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                >
                    Why Choose {name}?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-400 max-w-2xl mx-auto text-lg"
                >
                    We combine cutting-edge technology with a human-centric approach to deliver
                    unparalleled digital experiences.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {info.map((value, idx) => {
                    const Icon = iconMap[value.title] || Shield;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="glass p-10 rounded-[2.5rem] border-white/5 hover:border-white/20 transition-all group relative overflow-hidden"
                        >
                            <div className="relative z-10 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-600/20 transition-all duration-500">
                                    <Icon className="w-10 h-10 text-blue-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-center">
                                    {value.description}
                                </p>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl group-hover:bg-blue-600/10 transition-colors" />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
