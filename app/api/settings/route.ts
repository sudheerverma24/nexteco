import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'site-settings.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);
        return NextResponse.json(settings.company || {});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedCompany = await request.json();
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);

        settings.company = updatedCompany;

        await fs.writeFile(dataPath, JSON.stringify(settings, null, 2));
        return NextResponse.json(settings.company);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
