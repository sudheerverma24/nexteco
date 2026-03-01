import FAQClient from "./FAQClient";
import { getFAQs } from "@/lib/data-fetchers";

export default async function FAQ() {
    const faqs = await getFAQs();
    const visibleFaqs = faqs.filter(f => !f.hidden);

    return <FAQClient items={visibleFaqs} />;
}
