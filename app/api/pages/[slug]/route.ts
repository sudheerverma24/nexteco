import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'site-settings.json');

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);
        const page = settings.pages?.[slug];

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load page' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const updatedPage = await request.json();
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);

        if (!settings.pages) settings.pages = {};
        settings.pages[slug] = updatedPage;

        await fs.writeFile(dataPath, JSON.stringify(settings, null, 2));
        return NextResponse.json(updatedPage);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}
