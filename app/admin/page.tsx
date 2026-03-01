"use client";

import { useState, useEffect } from "react";
import AdminNav from "./components/AdminNav";
import ProductForm from "./components/ProductForm";
import { Product } from "@/data/products";
import { Plus, Edit2, Trash2, ExternalLink, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
    const router = useRouter();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const isAuth = localStorage.getItem("admin_auth");
        if (!isAuth) {
            router.push("/admin/login");
        } else {
            fetchProducts();
        }
    }, [router]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts(products.filter((p) => p.id !== id));
            } else {
                alert("Failed to delete product");
            }
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleAdd = () => {
        setEditingProduct(undefined);
        setIsFormOpen(true);
    };

    return (
        <div className="min-h-screen bg-black text-slate-50 pl-64">
            <AdminNav />

            <main className="p-12">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Product Management</h1>
                        <p className="text-slate-400">Manage your software ecosystem, updates, and download links.</p>
                    </div>
                    <button
                        onClick={handleAdd}
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Product
                    </button>
                </header>

                {loading ? (
                    <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-slate-500">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
                        <p className="font-medium">Loading products...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="glass p-8 rounded-[2rem] border-white/5 flex items-center gap-8 group hover:border-white/10 transition-all">
                                <div className="w-20 h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/20 transition-colors">
                                    <Package className="w-10 h-10 text-blue-400" />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                                    <p className="text-slate-400 text-sm line-clamp-1 mb-4">{product.description}</p>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-slate-300"
                                            title="Edit Product"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors text-red-400"
                                            title="Delete Product"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <Link
                                            href={`/product/${product.id}`}
                                            target="_blank"
                                            className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors text-blue-400"
                                            title="View Live Page"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="text-right flex-shrink-0 hidden sm:block">
                                    <span className="text-xs uppercase tracking-widest font-bold text-slate-600 block mb-1">Downloads</span>
                                    <div className="flex gap-2">
                                        <span className={`w-3 h-3 rounded-full ${product.windowsDownloadUrl !== '#' ? 'bg-emerald-500' : 'bg-slate-700'}`} title="Windows Link" />
                                        <span className={`w-3 h-3 rounded-full ${product.androidDownloadUrl !== '#' ? 'bg-emerald-500' : 'bg-slate-700'}`} title="Android Link" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {products.length === 0 && !loading && (
                    <div className="h-[50vh] flex flex-col items-center justify-center text-center p-12 glass rounded-[3rem] border-dashed border-white/10">
                        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <Package className="w-10 h-10 text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No products found</h3>
                        <p className="text-slate-400 max-w-sm mb-8">Start building your software ecosystem by adding your first product.</p>
                        <button
                            onClick={handleAdd}
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all"
                        >
                            Add Your First Product
                        </button>
                    </div>
                )}
            </main>

            {isFormOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => setIsFormOpen(false)}
                    onSave={fetchProducts}
                />
            )}
        </div>
    );
}
