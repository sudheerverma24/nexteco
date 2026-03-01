import { getPage, getCompanyInfo } from "@/lib/data-fetchers";
import { notFound } from "next/navigation";
import ProductNavbar from "@/components/ProductNavbar";
import Footer from "@/components/Footer";

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPage(slug);
    const company = await getCompanyInfo();

    if (!page || page.hidden) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
            <ProductNavbar />

            <main className="flex-grow pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="glass rounded-[3rem] p-12 md:p-20 border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -z-10" />

                        <h1 className="text-4xl md:text-6xl font-extrabold mb-12 tracking-tight">
                            {page.title}
                        </h1>

                        <article className="prose prose-invert max-w-none prose-slate prose-lg">
                            <div className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                                {page.content}
                            </div>
                        </article>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
