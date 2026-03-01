import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getCompanyInfo } from "@/lib/data-fetchers";

export default async function ProductNavbar() {
    const config = await getCompanyInfo();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Back to Home</span>
                </Link>

                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">{config.name}</span>
                </div>

                <div className="w-24"></div> {/* Spacer for symmetry */}
            </div>
        </nav>
    );
}
