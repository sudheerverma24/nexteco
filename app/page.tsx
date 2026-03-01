import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AboutSection from "@/components/AboutSection";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Hero />
            <ProductGrid />
            <Features />
            <AboutSection />
            <FAQ />
            <Newsletter />
            <Footer />
        </main>
    );
}
