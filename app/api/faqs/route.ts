import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { FAQItem } from '@/data/faq';

const dataPath = path.join(process.cwd(), 'data', 'site-settings.json');

export async function GET() {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);
        return NextResponse.json(settings.faqs || []);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load FAQs' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newFaq: FAQItem = await request.json();
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);

        if (!newFaq.id) {
            newFaq.id = `faq-${Date.now()}`;
        }

        if (!settings.faqs) settings.faqs = [];
        settings.faqs.push(newFaq);

        await fs.writeFile(dataPath, JSON.stringify(settings, null, 2));
        return NextResponse.json(newFaq, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add FAQ' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const updatedFaqs: FAQItem[] = await request.json();
        const data = await fs.readFile(dataPath, 'utf8');
        const settings = JSON.parse(data);

        settings.faqs = updatedFaqs;

        await fs.writeFile(dataPath, JSON.stringify(settings, null, 2));
        return NextResponse.json(settings.faqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update FAQs' }, { status: 500 });
    }
}
