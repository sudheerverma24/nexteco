import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { Product } from '@/data/products';

const dataPath = path.join(process.cwd(), 'data', 'products.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newProduct: Product = await request.json();
        const data = await fs.readFile(dataPath, 'utf8');
        const products: Product[] = JSON.parse(data);

        products.push(newProduct);

        await fs.writeFile(dataPath, JSON.stringify(products, null, 2));
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
    }
}
