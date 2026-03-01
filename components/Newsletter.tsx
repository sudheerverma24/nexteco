"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 5000);
        }, 1500);
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="glass rounded-[3rem] p-12 md:p-20 border-white/10 text-center relative overflow-hidden"
                >
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold mb-6"
                        >
                            Stay Ahead of the Curve
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-slate-400 mb-12"
                        >
                            Get the latest security updates, performance tips, and early access to new products from NextECO Solutions.
                        </motion.p>

                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="relative max-w-lg mx-auto"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    required
                                    placeholder="Enter your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-grow px-8 py-5 rounded-2xl bg-black/40 border border-white/10 focus:border-blue-500 outline-none transition-all text-lg"
                                    disabled={status === "success"}
                                />
                                <button
                                    type="submit"
                                    disabled={status !== "idle"}
                                    className="px-8 py-5 bg-blue-600 hover:bg-blue-700 disabled:bg-emerald-500/80 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group min-w-[160px]"
                                >
                                    {status === "idle" && (
                                        <>
                                            Subscribe
                                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                    {status === "loading" && (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    )}
                                    {status === "success" && (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            Subscribed
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 mt-6">
                                By subscribing, you agree to our Privacy Policy. No spam, just pure tech insights.
                            </p>
                        </motion.form>
                    </div>

                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-3xl -z-10" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/5 blur-3xl -z-10" />
                </motion.div>
            </div>
        </section>
    );
}
