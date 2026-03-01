import { getProducts } from "@/lib/data-fetchers";
import ProductCard from "@/components/ProductCard";

export default async function ProductGrid() {
    const products = await getProducts();

    return (
        <section id="products" className="py-20 container mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-bold mb-4">Our Products</h2>
                    <p className="text-slate-400 max-w-xl">
                        Explore our suite of high-performance tools designed to enhance your digital workflow
                        across all your devices.
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 glass rounded-full text-sm font-medium">All Apps</span>
                    <span className="px-4 py-2 bg-blue-600/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">{products.length} Total</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
