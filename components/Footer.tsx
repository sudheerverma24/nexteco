import { Github, Twitter, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";
import { getCompanyInfo } from "@/lib/data-fetchers";
import Link from "next/link";

export default async function Footer() {
    const info = await getCompanyInfo();

    return (
        <footer className="border-t border-white/5 py-12 mt-20 bg-slate-950/50 backdrop-blur-md">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">{info.name}</span>
                        </div>
                        <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
                            {info.tagline}. {info.mission}
                        </p>
                        <div className="space-y-3 text-sm text-slate-500">
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4" />
                                <span>{info.contact.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-left">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>{info.contact.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4" />
                                <span>{info.contact.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-white">Resources</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li><Link href="/support/documentation" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                            <li><Link href="/support/security-policy" className="hover:text-blue-400 transition-colors">Security Policy</Link></li>
                            <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-6 text-white">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 glass rounded-lg hover:bg-white/10 transition-colors" aria-label="GitHub">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 glass rounded-lg hover:bg-white/10 transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 {info.name}. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/support/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="/support/terms-of-service" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
