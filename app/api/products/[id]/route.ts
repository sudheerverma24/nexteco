import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/data/products';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await fs.readFile(dataPath, 'utf8');
        const products: Product[] = JSON.parse(data);
        const product = products.find((p) => p.id === id);

        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const updatedProduct: Product = await request.json();
        const data = await fs.readFile(dataPath, 'utf8');
        const products: Product[] = JSON.parse(data);

        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        products[index] = { ...updatedProduct, id }; // Ensure ID matches

        await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
        return NextResponse.json(products[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await fs.readFile(dataPath, 'utf8');
        const products: Product[] = JSON.parse(data);

        const filteredProducts = products.filter((p) => p.id !== id);
        if (filteredProducts.length === products.length) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        await fs.writeFile(dataPath, JSON.stringify(filteredProducts, null, 2));
        return NextResponse.json({ message: 'Product deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}
