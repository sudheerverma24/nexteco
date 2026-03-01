import fs from 'fs/promises';
import path from 'path';
import { CompanyInfo, companyInfoFallback } from '@/data/company';
import { FAQItem } from '@/data/faq';
import { Product } from '@/data/products';

const dataPath = path.join(process.cwd(), 'data', 'site-settings.json');

export async function getSiteSettings() {
    try {
        const data = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read site-settings.json:', error);
        return null;
    }
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
    const settings = await getSiteSettings();
    if (!settings?.company) return companyInfoFallback;
    return {
        ...companyInfoFallback,
        ...settings.company,
        values: settings.company.values || companyInfoFallback.values
    };
}

export async function getFAQs(): Promise<FAQItem[]> {
    const settings = await getSiteSettings();
    return settings?.faqs || [];
}

export async function getPage(slug: string) {
    const settings = await getSiteSettings();
    return settings?.pages?.[slug] || null;
}

export async function getProducts(): Promise<Product[]> {
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    try {
        const data = await fs.readFile(productsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read products.json:', error);
        return [];
    }
}

export async function getProductById(id: string): Promise<Product | undefined> {
    const products = await getProducts();
    return products.find((p) => p.id === id);
}
