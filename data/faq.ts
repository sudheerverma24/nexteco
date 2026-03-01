export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    hidden?: boolean;
}

// Fallback static data
export const faqDataFallback: FAQItem[] = [
    {
        id: "faq-1",
        question: "Is NextECO software free to use?",
        answer: "Most of our core products offer a fully functional free tier with essential features. For advanced enterprise-grade optimization and security, we offer premium licenses."
    },
    {
        id: "faq-2",
        question: "Is my data safe with NextECO?",
        answer: "Yes. We follow a 'Privacy First' philosophy. Our software, like EcoVault and EcoMail, uses zero-knowledge encryption, meaning only you have the keys to your data."
    }
];
